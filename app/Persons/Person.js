import ExposureNotification from "../Algorithms/ExposureNotification";
import DP3T from "../Algorithms/DP3T"
import {
    OBSERVATION_DAYS,
    getDayForIndex
} from "../utils"

class Person {
    constructor(mode) {
        this.x = 75;
        this.y = 75;

        this.minX = 10;
        this.maxX = 140;
        this.minY = 10;
        this.maxY = 140;

        this.contagious = false;
        this.alerted = false;

        this.broadcastHistory = Array(OBSERVATION_DAYS - 1).fill(null);
        this.heard = new Set();

        this.vx = 1;
        this.vy = 1;
        this.d = Math.random() * (2 * Math.PI);

        this.receivedNotification = false
        this.published = false
        
        this.wave = 0;

        this.isPark = false

        this.setAlgo({
            mode: mode
        })
    }

    notify(notif) {
        if (notif.from == this.name) {
            return
        }
        Array.from(this.heard).forEach(broadcast => {
            if (broadcast != null && broadcast.slot == notif.slot && this.receivedNotification == false) {
                return alert(glot.get("notify", {
                    name: this.name
                }))
            }
        })
    }

    setAlgo(notif) {
        this.mode = notif.mode
        this.algo = notif.mode == "dp3t" ? new DP3T() : new ExposureNotification()

        this.initial = this.algo.createInitialKey()
        this.broadcastHistory = Array(OBSERVATION_DAYS - 1).fill(null)
        this.heard = new Set();
        this.secretDayKeys = null
        this._generateSecretDayKey()
    }
    day(today) {
        this._generateSecretDayKey()
        return this.secretDayKeys[today]
    }

    update() {
        this.x += this.vx * Math.cos(this.d);
        this.y += this.vy * Math.sin(this.d);
        if (this.x >= this.maxX || this.x <= this.minX) {
            this.vx = -this.vx;
        }
        if (this.y >= this.maxY || this.y <= this.minY) {
            this.vy = -this.vy;
        }

        this.wave += 0.3;
        if (this.wave >= 20) {
            this.wave = 0;
        }
    }

    goToPark() {
        this.pastMinX = this.minX;
        this.pastMaxX = this.maxX;
        this.pastMinY = this.minY;
        this.pastMaxY = this.maxY;
        this.pastX = this.x;
        this.pastY = this.y;

        this.minX = 10;
        this.maxX = 290;

        this.minY = 160;
        this.maxY = 290;

        this.y += 150;

        this.isPark = true
    }

    goToHouse() {
        this.x = this.pastX;
        this.y = this.pastY;

        this.minX = this.pastMinX;
        this.maxX = this.pastMaxX;
        this.minY = this.pastMinY;
        this.maxY = this.pastMaxY;

        this.isPark = false
    }

    pause() {
        this.pastVx = this.vx
        this.pastVy = this.vy

        this.vx = 0
        this.vy = 0
    }

    play() {
        this.vx = this.pastVx
        this.vy = this.pastVy
    }

    getBroadcastHistory(dayIndex) {
        if (!this.broadcastHistory[dayIndex]) {
            this.broadcastHistory[dayIndex] = this._generateBroadcastHistory(dayIndex);
        }

        return this.broadcastHistory[dayIndex];
    }
    getDayKeys() {
        const keys = this.algo.getAllDayKeysToReport(
            this.initial,
            dayIndex => this.day(dayIndex),
            getDayForIndex(0),
            0,
            OBSERVATION_DAYS)
        return keys.map((id, i) => {
            return {
                time: getDayForIndex(id.dayIndex),
                broadcastId: id.dayKey
            }
        })
    }
    generateBroadcastHistoryFull() {
        for (let i = 0; i < OBSERVATION_DAYS; i++) {
            this.getBroadcastHistory(i)
        }
        return this.broadcastHistory
    }
    _generateSecretDayKey() {
        if (!this.secretDayKeys) {
            const startTime = getDayForIndex(0);
            this.secretDayKeys = this.algo.getSecretDayKeys(this.initial, startTime, OBSERVATION_DAYS + 1);
        }
    }

    _generateBroadcastHistory(dayIndex) {
        this._generateSecretDayKey();
        const dayKey = this.secretDayKeys[dayIndex];

        const timeSlots = [];
        const day = getDayForIndex(dayIndex);
        this.algo.generateBroadcastHistoryForDay(day, dayKey).forEach(slot =>
            timeSlots.push({
                time: slot.time,
                broadcastId: slot.broadcastId,
                hadContact: false
            })
        );
        return {
            day,
            dayKey,
            timeSlots
        };
    }
}

export default Person