"use strict";

//Implementation of Privacy-Preserving Contact Tracing protocol.
//Specification: https://www.apple.com/covid19/contacttracing/

//Fixed global default broadcast key for ephID generation:
const CT_DTK = "CT-DTK";
const CT_RPI = "CT-RPI";

//Length of an epoch (in minutes):
const CT_EPOCH_LENGTH = 10;

//Number of epochs per day:
const CT_NUM_EPOCHS_PER_DAY = Math.floor(24 * 60 / CT_EPOCH_LENGTH);

//Size of rolling proximity ids:
const ROLLING_PROXIMITY_ID_SIZE = 16;

//Size of a Tracing Key:
const TRACING_KEY_SIZE = 32;

const ct_dtk = sjcl.codec.utf8String.toBits(CT_DTK);
const ct_rpi = sjcl.codec.utf8String.toBits(CT_RPI);

class ContactTracing {

    /**
     * Creates a private initial key for a user.
     * 
     * In "Contact Tracing", initial keys are called "Tracing Key".
     */
    createInitialKey() {
        const randomWords = sjcl.random.randomWords(TRACING_KEY_SIZE / 4);
        return sjcl.codec.bytes.fromBits(randomWords);
    }

    /**
     * Returns list of "daysCount" subsequent day keys starting from day "startDay".
     * Those keys are derived from user's private "initialKey".
     * 
     * In "Contact Tracing", day keys are called "Daily Tracing Key".
     */
    getSecretDayKeys(initialKey, startDay, daysCount) {
        const dayIterator = startOfDay(startDay);
        const dayKeys = [];
        for (let dayIndex = 0; dayIndex < daysCount; dayIndex++) {
            dayKeys.push(this._getDailyTracingKey(initialKey, dayIterator));
            dayIterator.setDate(dayIterator.getDate() + 1);
        }
        return dayKeys;
    }

    /**
     * Generates one possible history of all broadcast IDs on one specific day.
     * The "day" and corresponding "dayKey" are needed for deriving those IDs.
     * 
     * In "Contact Tracing", broadcast IDs are called "Rolling Proximity Identifiers".
     */
    generateBroadcastHistoryForDay(day, dayKey) {
        return this._getAllRollingProxIdsForDay(day, dayKey)
            .map(entry => ({ time: entry.timeSlot, broadcastId: entry.rpi }));
    }

    /**
     * Returns list of all broadcast IDs which can be derived from one day key. 
     * The parameter "startDay" corresponds to the parameter "dayKey".
     * 
     * In "Contact Tracing", Rolling Proximity Identifiers of only one day can be derived from
     * the Daily Tracing Key. 
     */
    getAllBroadcastIdsFromDayKey(startDay, dayKey, maxDaysCount) {
        const rollingProxIds = this._getAllRollingProxIdsForDay(startDay, dayKey);
        return rollingProxIds.map(id => ({ day: startDay, broadcastId: id.rpi }));
    }

    /**
     * Returns list of all day keys to report to the public server in case the user
     * with "initialKey" reports himself as infected.
     * 
     * In "Contact Tracing", all individual day keys starting from the infection day need to be reported.
     */
    getAllDayKeysToReport(initialKey, startDay, startDayIndex, maxDaysCount) {
        const dayKeys = [];
        for (let dayIndex = startDayIndex; dayIndex < startDayIndex + maxDaysCount; dayIndex++) {
            const day = new Date(startDay);
            day.setDate(day.getDate() + dayIndex);
            dayKeys.push({ dayIndex, dayKey: this._getDailyTracingKey(initialKey, day) });
        }
        return dayKeys;
    }

    _getDailyTracingKey(initialKey, day) {
        const tk = sjcl.codec.bytes.toBits(initialKey);
        const dayNumber = day.getTime() / (1000 * 60 * 60 * 24) | 0;
        const info = ct_dtk.concat([dayNumber]);
        const hkdf = sjcl.misc.hkdf(tk, ROLLING_PROXIMITY_ID_SIZE * 8, null, info, sjcl.hash.sha256);
        return sjcl.codec.bytes.fromBits(hkdf);
    }

    _getAllRollingProxIdsForDay(day, dayKey) {
        const timeSlots = [];
        const dayKeyBits = sjcl.codec.bytes.toBits(dayKey);
        for (let epoch = 0; epoch < CT_NUM_EPOCHS_PER_DAY; epoch++) {
            timeSlots.push(this._getRollingProxId(day, dayKeyBits, epoch));
        }
        return timeSlots;
    }

    _getRollingProxId(day, dayKey, epoch) {
        const hmac = new sjcl.misc.hmac(dayKey, sjcl.hash.sha256);
        const dayStart = startOfDay(day);
        const timeSlot = new Date(dayStart);
        timeSlot.setMinutes(timeSlot.getMinutes() + epoch * CT_EPOCH_LENGTH);
        const secondsSinceStartOfDay = (timeSlot.getTime() - dayStart.getTime()) / 1000 | 0;
        const tin = secondsSinceStartOfDay / (60 * CT_EPOCH_LENGTH) | 0;
        const rpiFull = hmac.encrypt(ct_dtk.concat([tin]));
        const rpi = sjcl.bitArray.bitSlice(rpiFull, 0, ROLLING_PROXIMITY_ID_SIZE * 8);
        return { timeSlot, rpi: sjcl.codec.bytes.fromBits(rpi) };
    }
}