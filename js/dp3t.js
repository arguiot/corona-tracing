"use strict";

//Implementation of DP-3T protocol.
//Specification: https://github.com/DP-3T/documents

//Fixed global default broadcast key for ephID generation:
const BROADCAST_KEY = "Broadcast key";

//Length of an epoch (in minutes):
const EPOCH_LENGTH = 15;

//Number of epochs per day:
const NUM_EPOCHS_PER_DAY = Math.floor(24 * 60 / EPOCH_LENGTH);

//Size of ephIDs:
const EPHID_SIZE = 16;

//Size of a day key:
const DAY_KEY_SIZE = 32;

//Library SJCL requires us to call this method in order to use CTR:
sjcl.beware["CTR mode is dangerous because it doesn't protect message integrity."]();

const iv = sjcl.codec.hex.toBits("00000000000000000000000000000000");
const broadcastKey = sjcl.codec.utf8String.toBits(BROADCAST_KEY);

class DP3T {

    /**
     * Creates a private initial key for a user.
     */
    createInitialKey() {
        const randomWords = sjcl.random.randomWords(DAY_KEY_SIZE / 4);
        return sjcl.codec.bytes.fromBits(randomWords);
    }

    /**
     * Returns list of "daysCount" subsequent day keys starting from day "startDay".
     * Those keys are derived from user's private "initialKey".
     * 
     * In DP-3T, the actual start day is irrelevant.
     */
    getSecretDayKeys(initialKey, startDay, daysCount) {
        const dayKeys = [];
        let currentKey = initialKey;
        dayKeys.push(currentKey);
        for (let dayIndex = 0; dayIndex < daysCount - 1; dayIndex++) {
            currentKey = this._hash(currentKey);
            dayKeys.push(currentKey);
        }
        return dayKeys;
    }

    /**
     * Generates one possible history of all broadcast IDs on one specific day.
     * The "day" and corresponding "dayKey" are needed for deriving those IDs.
     * 
     * In DP-3T, broadcast IDs are called EphId.
     */
    generateBroadcastHistoryForDay(day, dayKey) {
        const ephIds = this._getAllEphIdsForDay(dayKey);
        this._shuffle(ephIds);

        const timeSlots = [];

        let timeSlotIterator = startOfDay(day);
        const nextDayStart = startOfDay(day);
        nextDayStart.setDate(nextDayStart.getDate() + 1);
        let index = 0;
        while (timeSlotIterator < nextDayStart) {
            timeSlots.push({ time: new Date(timeSlotIterator), broadcastId: ephIds[index++] });
            timeSlotIterator.setMinutes(timeSlotIterator.getMinutes() + EPOCH_LENGTH);
        }

        return timeSlots;
    }

    /**
     * Returns list of all broadcast IDs which can be derived from one day key. 
     * The parameter "startDay" corresponds to the parameter "dayKey".
     * 
     * In DP-3T, EphIDs of all subsequent days after "startDay" can be derived. 
     * Only up to "maxDaysCount" days will be derived.
     */
    getAllBroadcastIdsFromDayKey(startDay, dayKey, maxDaysCount) {
        const ephIdsList = [];
        for (let dayIndex = 0; dayIndex < maxDaysCount; dayIndex++) {
            const ephIds = this._getAllEphIdsForDay(dayKey);
            const day = new Date(startDay);
            day.setDate(day.getDate() + dayIndex);
            ephIds.forEach(ephId => ephIdsList.push({ day, broadcastId: ephId }));
            dayKey = this._hash(dayKey);
        }
        return ephIdsList;
    }

    /**
     * Returns list of all day keys to report to the public server in case the user
     * with "initialKey" reports himself as infected.
     * 
     * In DP-3T, only the day key of the day on which the infection started needs to be reported,
     * because day keys of all subsequent days can be derived automatically from it.
     */
    getAllDayKeysToReport(initialKey, startDay, startDayIndex, maxDaysCount) {
        let dayKey = initialKey;
        for (let dayIndex = 0; dayIndex < startDayIndex; dayIndex++) {
            dayKey = this._hash(dayKey);
        }
        return [{dayIndex: startDayIndex, dayKey}];
    }

    _hash(key) {
        const data = sjcl.codec.bytes.toBits(key);
        const hash = sjcl.hash.sha256.hash(data);
        return sjcl.codec.bytes.fromBits(hash);
    }

    _getAllEphIdsForDay(dayKey) {
        //Compare this to https://github.com/DP-3T/reference_implementation/blob/master/LowCostDP3T.py
        const hmac = new sjcl.misc.hmac(sjcl.codec.bytes.toBits(dayKey), sjcl.hash.sha256);
        const prf = hmac.encrypt(broadcastKey);
        const aes = new sjcl.cipher.aes(prf);
        const stream = sjcl.codec.bytes.toBits(new Array(EPHID_SIZE * NUM_EPOCHS_PER_DAY).fill(0));
        const prg = sjcl.mode.ctr.encrypt(aes, stream, iv);

        const ephIds = [];
        //Slice the PRG into ephIds of EPHID_SIZE bytes: 
        for (let epoch = 0; epoch < NUM_EPOCHS_PER_DAY; epoch++) {
            const offset = epoch * EPHID_SIZE * 8;
            const ephId = sjcl.bitArray.bitSlice(prg, offset, offset + EPHID_SIZE * 8);
            ephIds.push(sjcl.codec.bytes.fromBits(ephId));
        }

        return ephIds;
    }

    _shuffle(array) {
        //Taken from https://github.com/Daplie/knuth-shuffle/
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}

// Shared
function startOfDay(date) {
    //Calculate start of day in UTC:
    const denominator = 1000 * 60 * 60 * 24;
    return new Date(((date.getTime() / denominator) | 0) * denominator);
}

function isSameDay(date1, date2) {
    return startOfDay(date1).valueOf() === startOfDay(date2).valueOf();
}

function convertToUTC(date) {
    //Simply convert by adding timezone offset. 
    //Resulting object may still have the "wrong" timezone set, but object can be used for displaying purposes.
    const offset = date.getTimezoneOffset();
    const utcDate = new Date(date);
    utcDate.setMinutes(utcDate.getMinutes() + offset);
    return utcDate;
}

Date.prototype.toUTCDateString = function() {
    return convertToUTC(this).toLocaleDateString();
}

Date.prototype.toUTCTimeString = function() {
    const options = {
        hour: '2-digit', 
        minute:'2-digit'
    }
    return convertToUTC(this).toLocaleTimeString(navigator.language || navigator.userLanguage, options);
}

// Numbers of day to observe
const OBSERVATION_DAYS = 14

let observationStartTime = new Date();
observationStartTime.setDate(observationStartTime.getDate() - OBSERVATION_DAYS + 3); // So it doesn't get over 13. We set to 12 to be safe
observationStartTime = startOfDay(observationStartTime);

function getDayForIndex(dayIndex) {
    const day = new Date(observationStartTime);
    day.setDate(day.getDate() + dayIndex);
    return day;
}

function getMaxDayIndex() {
    return OBSERVATION_DAYS - 1;  //(indices 0..OBSERVATION_DAYS-1)
}