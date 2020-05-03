
// Shared
export function startOfDay(date) {
    const d = new Date(date)
    d.setHours(0,0,0,0)
    return d
    // //Calculate start of day in UTC:
    // const denominator = 1000 * 60 * 60 * 24;
    // return new Date(((date.getTime() / denominator) | 0) * denominator);
}

export function isSameDay(date1, date2) {
    return startOfDay(date1).valueOf() === startOfDay(date2).valueOf();
}

export function convertToUTC(date) {
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

Date.prototype.toTimeString = function() {
    const options = {
        hour: '2-digit', 
        minute:'2-digit'
    }
    return this.toLocaleTimeString(navigator.language || navigator.userLanguage, options); // convertToUTC(this)
}

// Numbers of day to observe
export const OBSERVATION_DAYS = 14

export let observationStartTime = new Date();
observationStartTime.setDate(observationStartTime.getDate() - OBSERVATION_DAYS + 3); // So it doesn't get over 13. We set to 12 to be safe
observationStartTime = startOfDay(observationStartTime);

export function getDayForIndex(dayIndex) {
    const day = new Date(observationStartTime);
    day.setDate(day.getDate() + dayIndex);
    return day;
}

export function getMaxDayIndex() {
    return OBSERVATION_DAYS - 1;  //(indices 0..OBSERVATION_DAYS-1)
}