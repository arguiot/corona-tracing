var con = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var broadcast = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		 module.exports = factory() ;
	}(commonjsGlobal, (function () {
		class BroadcastJSNotification {
			constructor(name, object = null) {
				this.name = name;
				this.object = object;
			}
		}
		class NotificationCenter {
			constructor() {
				this.observers = new Map();
			}
			get default() {
				const exportGlobal = (name, object) => {
					if (typeof(commonjsGlobal) !== "undefined") {
						// Node.js
						commonjsGlobal[name] = object;
					} else if (typeof(window) !== "undefined") {
						// JS with GUI (usually browser)
						window[name] = object;
					} else {
						throw new Error("Unkown run-time environment. Currently only browsers and Node.js are supported.");
					}
				};

				if (typeof BroadcastJS_Shared_Instance == "undefined") {
					exportGlobal("BroadcastJS_Shared_Instance", new NotificationCenter());
				}
				return BroadcastJS_Shared_Instance
			}
			addObserver(name, callback, reference = null) {
				this.observers.set(`${name}, ${reference}`, callback);
			}
			removeObserver(name, reference = null) {
				this.observers.delete(`${name}, ${reference}`);
			}
			post(notification) {
				const name = notification.name;
				for (const n of this.observers.keys()) {
					if (n.split(",")[0] == name) {
						this.observers.get(n)(notification.object);
					}
				}
			}
		}


		var index = {
			Notification: BroadcastJSNotification,
			NotificationCenter: new NotificationCenter()
		};

		return index;

	})));
	});

	// Shared
	function startOfDay(date) {
	    const d = new Date(date);
	    d.setHours(0,0,0,0);
	    return d
	    // //Calculate start of day in UTC:
	    // const denominator = 1000 * 60 * 60 * 24;
	    // return new Date(((date.getTime() / denominator) | 0) * denominator);
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
	};

	Date.prototype.toTimeString = function() {
	    const options = {
	        hour: '2-digit', 
	        minute:'2-digit'
	    };
	    return this.toLocaleTimeString(navigator.language || navigator.userLanguage, options); // convertToUTC(this)
	};

	// Numbers of day to observe
	const OBSERVATION_DAYS = 14;

	let observationStartTime = new Date();
	observationStartTime.setDate(observationStartTime.getDate() - OBSERVATION_DAYS + 3); // So it doesn't get over 13. We set to 12 to be safe
	observationStartTime = startOfDay(observationStartTime);

	function getDayForIndex(dayIndex) {
	    const day = new Date(observationStartTime);
	    day.setDate(day.getDate() + dayIndex);
	    return day;
	}

	//Length of an epoch (in minutes):
	const EPOCH_LENGTH = 10;

	//Number of epochs per day:
	const NUM_EPOCHS_PER_DAY = Math.floor(24 * 60 / EPOCH_LENGTH);

	//Size of rolling proximity ids:
	const ROLLING_PROXIMITY_ID_SIZE = 16;

	//Size of a Temporary Exposure Key:
	const TEMPORARY_EXPOSURE_KEY_SIZE = 16;

	const EN_RPIK = sjcl.codec.utf8String.toBits("EN-RPIK");
	const EN_RPI = sjcl.codec.utf8String.toBits("EN-RPI");
	const PAD_FILL = sjcl.codec.bytes.toBits(new Array(6).fill(0));

	class ExposureNotification {

	    /**
	     * Creates a private initial key for a user.
	     * 
	     * In "Exposure Notification", there are no initial keys.
	     */
	    createInitialKey() {
	        return null;
	    }

	    /**
	     * Returns list of "daysCount" subsequent day keys starting from day "startDay".
	     * Those keys are derived from user's private "initialKey".
	     * 
	     * In "Exposure Notification", day keys are called "Temporary Exposure Key".
	     */
	    getSecretDayKeys(initialKey, startDay, daysCount) {
	        const dayKeys = [];
	        for (let dayIndex = 0; dayIndex < daysCount; dayIndex++) {
	            const randomWords = sjcl.random.randomWords(TEMPORARY_EXPOSURE_KEY_SIZE / 4);
	            const tek = sjcl.codec.bytes.fromBits(randomWords);
	            dayKeys.push(tek);
	        }
	        return dayKeys;
	    }

	    /**
	     * Generates one possible history of all broadcast IDs on one specific day.
	     * The "day" and corresponding "dayKey" are needed for deriving those IDs.
	     * 
	     * In "Exposure Notification", broadcast IDs are called "Rolling Proximity Identifiers".
	     */
	    generateBroadcastHistoryForDay(day, dayKey) {
	        const rollingProxIds = this._getAllRollingProxIdsForDay(day, dayKey);
	        return rollingProxIds.map(entry => ({
	            time: entry.timeSlot,
	            broadcastId: entry.rpi
	        }));
	    }

	    /**
	     * Returns list of all broadcast IDs which can be derived from one day key. 
	     * The parameter "startDay" corresponds to the parameter "dayKey".
	     * 
	     * In "Exposure Notification", Rolling Proximity Identifiers of only one day can be derived from
	     * the Daily Tracing Key. 
	     */
	    getAllBroadcastIdsFromDayKey(startDay, dayKey, maxDaysCount) {
	        const rollingProxIds = this._getAllRollingProxIdsForDay(startDay, dayKey);
	        return rollingProxIds.map(entry => ({
	            day: startDay,
	            broadcastId: entry.rpi
	        }));
	    }

	    /**
	     * Returns list of all day keys to report to the public server in case the user
	     * with "initialKey" reports himself as infected.
	     * 
	     * In "Exposure Notification", day keys are not derived from an "initial key".
	     * Instead, the "Temporary Exposure Key" are randomly generated keys which are stored
	     * in the app of the person.
	     */
	    getAllDayKeysToReport(_, dayKeyStorage, startDay, startDayIndex, maxDaysCount) {
	        const dayKeys = [];
	        for (let dayIndex = startDayIndex; dayIndex < startDayIndex + maxDaysCount; dayIndex++) {
	            dayKeys.push({
	                dayIndex,
	                dayKey: dayKeyStorage(dayIndex)
	            });
	        }
	        return dayKeys;
	    }

	    _getAllRollingProxIdsForDay(day, dayKey) {
	        const dayStart = startOfDay(day);
	        const tek = sjcl.codec.bytes.toBits(dayKey);
	        const rpik = sjcl.misc.hkdf(tek, ROLLING_PROXIMITY_ID_SIZE * 8, null, EN_RPIK, sjcl.hash.sha256);
	        const aes = new sjcl.cipher.aes(rpik);

	        const timeSlots = [];
	        for (let epoch = 0; epoch < NUM_EPOCHS_PER_DAY; epoch++) {
	            const timeSlot = new Date(dayStart);
	            timeSlot.setMinutes(timeSlot.getMinutes() + epoch * EPOCH_LENGTH);
	            const enIntervalNumber = timeSlot.getTime() / (1000 * 60 * EPOCH_LENGTH) | 0;

	            const paddedData = sjcl.bitArray.concat(EN_RPI, PAD_FILL).concat([enIntervalNumber]);
	            const rpi = aes.encrypt(paddedData);

	            timeSlots.push({
	                timeSlot,
	                rpi: sjcl.codec.bytes.fromBits(rpi)
	            });
	        }

	        return timeSlots;
	    }
	}

	//Fixed global default broadcast key for ephID generation:
	const BROADCAST_KEY = "broadcast key";

	//Length of an epoch (in minutes):
	const EPOCH_LENGTH$1 = 15;

	//Number of epochs per day:
	const NUM_EPOCHS_PER_DAY$1 = Math.floor(24 * 60 / EPOCH_LENGTH$1);

	//Size of ephIDs:
	const EPHID_SIZE = 16;

	//Size of a day key:
	const DAY_KEY_SIZE = 32;

	//Library SJCL requires us to call this method in order to use CTR:
	sjcl.beware["CTR mode is dangerous because it doesn't protect message integrity."]();

	class DP3T {

	    constructor() {
	        this.iv = sjcl.codec.hex.toBits("00000000000000000000000000000000");
	        this.broadcastKey = sjcl.codec.utf8String.toBits(BROADCAST_KEY);
	    }

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
	            timeSlots.push({
	                time: new Date(timeSlotIterator),
	                broadcastId: ephIds[index++]
	            });
	            timeSlotIterator.setMinutes(timeSlotIterator.getMinutes() + EPOCH_LENGTH$1);
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
	            ephIds.forEach(ephId => ephIdsList.push({
	                day,
	                broadcastId: ephId
	            }));
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
	    getAllDayKeysToReport(initialKey, _, startDay, startDayIndex, maxDaysCount) {
	        let dayKey = initialKey;
	        for (let dayIndex = 0; dayIndex < startDayIndex; dayIndex++) {
	            dayKey = this._hash(dayKey);
	        }
	        return [{
	            dayIndex: startDayIndex,
	            dayKey
	        }];
	    }

	    _hash(key) {
	        const data = sjcl.codec.bytes.toBits(key);
	        const hash = sjcl.hash.sha256.hash(data);
	        return sjcl.codec.bytes.fromBits(hash);
	    }

	    _getAllEphIdsForDay(dayKey) {
	        //Compare this to https://github.com/DP-3T/reference_implementation/blob/master/LowCostDP3T.py
	        const hmac = new sjcl.misc.hmac(sjcl.codec.bytes.toBits(dayKey), sjcl.hash.sha256);
	        const prf = hmac.encrypt(this.broadcastKey);
	        const aes = new sjcl.cipher.aes(prf);
	        const stream = sjcl.codec.bytes.toBits(new Array(EPHID_SIZE * NUM_EPOCHS_PER_DAY$1).fill(0));
	        const prg = sjcl.mode.ctr.encrypt(aes, stream, this.iv);

	        const ephIds = [];
	        //Slice the PRG into ephIds of EPHID_SIZE bytes: 
	        for (let epoch = 0; epoch < NUM_EPOCHS_PER_DAY$1; epoch++) {
	            const offset = epoch * EPHID_SIZE * 8;
	            const ephId = sjcl.bitArray.bitSlice(prg, offset, offset + EPHID_SIZE * 8);
	            ephIds.push(sjcl.codec.bytes.fromBits(ephId));
	        }

	        return ephIds;
	    }

	    _shuffle(array) {
	        //Taken from https://github.com/Daplie/knuth-shuffle/
	        var currentIndex = array.length,
	            temporaryValue, randomIndex;

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

	        this.receivedNotification = false;

	        this.wave = 0;

	        this.isPark = false;

	        this.setAlgo({
	            mode: mode
	        });
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
	        });
	    }

	    setAlgo(notif) {
	        this.mode = notif.mode;
	        this.algo = notif.mode == "dp3t" ? new DP3T() : new ExposureNotification();

	        this.initial = this.algo.createInitialKey();
	        this.broadcastHistory = Array(OBSERVATION_DAYS - 1).fill(null);
	        this.heard = new Set();
	        this.secretDayKeys = null;
	        this._generateSecretDayKey();
	    }
	    day(today) {
	        this._generateSecretDayKey();
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

	        this.isPark = true;
	    }

	    goToHouse() {
	        this.x = this.pastX;
	        this.y = this.pastY;

	        this.minX = this.pastMinX;
	        this.maxX = this.pastMaxX;
	        this.minY = this.pastMinY;
	        this.maxY = this.pastMaxY;

	        this.isPark = false;
	    }

	    pause() {
	        this.pastVx = this.vx;
	        this.pastVy = this.vy;

	        this.vx = 0;
	        this.vy = 0;
	    }

	    play() {
	        this.vx = this.pastVx;
	        this.vy = this.pastVy;
	    }

	    getBroadcastHistory(dayIndex) {
	        if (!this.broadcastHistory[dayIndex]) {
	            this.broadcastHistory[dayIndex] = this._generateBroadcastHistory(dayIndex);
	        }

	        return this.broadcastHistory[dayIndex];
	    }
	    getDayKeys() {
	        for (let i = 0; i < OBSERVATION_DAYS; i++) {
	            this.day(i);
	        }
	        return this.secretDayKeys.map((id, i) => {
	            return {
	                time: getDayForIndex(i),
	                broadcastId: id
	            }
	        })
	    }
	    generateBroadcastHistoryFull() {
	        for (let i = 0; i < OBSERVATION_DAYS; i++) {
	            this.getBroadcastHistory(i);
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

	const { NotificationCenter, Notification } = broadcast;

	class Bob extends Person {
	    constructor() {
	        super(...arguments);

	        this.name = "Bob";

	        this.x = 75;
	        this.y = 95;

	        this.minX = 10;
	        this.maxX = 140;
	        this.minY = 85;
	        this.maxY = 140;

	        this.contagious = false;
	        this.alerted = false;
	        this.past = new Set();
	        this.heard = new Set();
	        this.d = Math.random() * (2 * Math.PI);

	        this.color = "#1277EB";

	        NotificationCenter.default.addObserver("mode", this.setAlgo.bind(this), this.name);

	        NotificationCenter.default.addObserver("server", this.notify.bind(this), this.name);
	    }
	}

	class Alice extends Person {
	    constructor() {
	        super(...arguments);

	        this.name = "Alice";

	        this.x = 225;
	        this.y = 95;

	        this.minX = 160;
	        this.maxX = 290;
	        this.minY = 85;
	        this.maxY = 140;

	        this.contagious = true;
	        this.alerted = false;
	        this.past = new Set();
	        this.heard = new Set();

	        this.d = Math.random() * (2 * Math.PI);

	        this.color = "#F66A09";

	        NotificationCenter.default.addObserver("mode", this.setAlgo.bind(this), this.name);

	        NotificationCenter.default.addObserver("server", this.notify.bind(this), this.name);
	    }
	}

	class Charlie extends Person {
	    constructor() {
	        super(...arguments);

	        this.name = "Charlie";

	        this.x = 225;
	        this.y = 50;

	        this.minX = 160;
	        this.maxX = 290;
	        this.minY = 10;
	        this.maxY = 65;

	        this.contagious = false;
	        this.alerted = false;
	        this.past = new Set();
	        this.heard = new Set();

	        this.d = Math.random() * (2 * Math.PI);

	        this.color = "#65CE60";

	        NotificationCenter.default.addObserver("mode", this.setAlgo.bind(this), this.name);

	        NotificationCenter.default.addObserver("server", this.notify.bind(this), this.name);
	    }
	}

	class David extends Person {
	    constructor() {
	        super(...arguments);

	        this.name = "David";

	        this.x = 75;
	        this.y = 35;

	        this.minX = 10;
	        this.maxX = 140;
	        this.minY = 10;
	        this.maxY = 65;

	        this.contagious = false;
	        this.alerted = false;
	        this.past = new Set();
	        this.heard = new Set();

	        this.d = Math.random() * (100);

	        this.color = "#F2C94C";

	        NotificationCenter.default.addObserver("mode", this.setAlgo.bind(this), this.name);

	        NotificationCenter.default.addObserver("server", this.notify.bind(this), this.name);
	    }
	}

	const { NotificationCenter: NotificationCenter$1, Notification: Notification$1 } = broadcast;

	class Server {
	    constructor() {
	        this.slots = [];
	        this.dayKeys = [];
	    }
	    addKeys(name, slots, dayKeys) {
	        this.dayKeys.push(...dayKeys);
	        const Slots = slots.map(el => el.timeSlots);
	        const array = [].concat.apply([], Slots);
	        array.forEach(slot => {
	            if (slot.hadContact == true) {
	                this.slots.push(slot);
	                const msg = new Notification$1("server", {
	                    slot: slot,
	                    from: name
	                });
	                NotificationCenter$1.default.post(msg);
	            }
	        });
	    }
	    display(popup) {
	        popup.show(glot.get("serverdata"), () => {
	            return new Promise((resolve, reject) => {
	                setTimeout(() => {
	                    resolve(this.dayKeys.map(el => {
	                        el.name = el.time.toLocaleDateString();
	                        el.value = con.sim.toHex(el.broadcastId);
	                        return el
	                    }));
	                }, 0);
	            })
	        });
	    }
	}

	class Popup {
	    constructor() {
	        this.state = false;

	        this.el = document.querySelector(".popup");
	        this.listen();
	    }
	    listen() {
	        this.el.querySelector(".cross").addEventListener("click", e => {
	            this.state = false;
	            this.render();
	        });
	        this.el.addEventListener("click", e => {
	            if (e.target == e.currentTarget) {
	                this.state = false;
	                this.render();
	            }
	        });
	    }

	    displayData(title, data) {
	        this.show(title, () => {
	            return new Promise((resolve, reject) => resolve(data))
	        });
	    }

	    show(title, promise) {
	        this.state = true;
	        this.render();

	        // Putting elements
	        this.el.querySelector(".title").innerHTML = title;

	        this.el.querySelector(".container").innerHTML = "<div class=\"center\">Loading...</div>";

	        promise().then(data => {
	            // Reset
	            this.el.querySelector(".container").innerHTML = "";

	            if (data.length == 0) {
	                this.el.querySelector(".container").innerHTML = "<div class=\"center\">No data</div>";
	            }
	            data.forEach(row => {
	                this.el.querySelector(".container").innerHTML += `<div class="row">
                <div class="variable">${row.name}</div>
                <div class="value">${row.value}</div>
                </div>`;
	            });
	        });
	    }

	    render() {
	        if (this.state == true) {
	            this.el.style.display = "flex";
	        } else {
	            this.el.style.display = "none";
	        }
	    }
	}

	class Simulation {
	    constructor(bob, alice, charlie, david) {
	        this.bob = bob;
	        this.alice = alice;
	        this.charlie = charlie;
	        this.david = david;

	        this.panelState = 0;

	        this.isPark = false;

	        this.canvas = document.getElementById("canvas");
	        this.ctx = this.canvas.getContext("2d");
	        this.el = document.querySelector(".app");

	        this.resize();

	        window.addEventListener('resize', this.resize.bind(this));

	        this.draw();

	        setInterval(this.panel.bind(this), 1000);

	        this.panelListeners();
	    }

	    resize() {
	        let scale = 1;
	        if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches) {
	            scale = 4 / 3;
	        }

	        if (window.devicePixelRatio > 1) {
	            const canvasWidth = 300 * scale;
	            const canvasHeight = 300 * scale;

	            this.canvas.width = canvasWidth * window.devicePixelRatio;
	            this.canvas.height = canvasHeight * window.devicePixelRatio;

	            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	        }
	    }
	            
	    draw() {
	        this.monitor();

	        // Update
	        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	        // Scale
	        let scale = 1;
	        if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches) {
	            scale = 4 / 3;
	        }
	        // Layout
	        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	            this.ctx.fillStyle = "#fff";
	            this.ctx.strokeStyle = "#fff";
	        } else {
	            this.ctx.fillStyle = "#000";
	            this.ctx.strokeStyle = "#000";
	        }
	        this.ctx.lineWidth = 5 * scale;
	        this.ctx.strokeRect(0, 0, 300 * scale, 300 * scale);
	        this.ctx.strokeRect(0, 0, 150 * scale, 75 * scale);
	        this.ctx.strokeRect(0, 75 * scale, 150 * scale, 75 * scale);
	        this.ctx.strokeRect(150 * scale, 0, 150 * scale, 75 * scale);
	        this.ctx.strokeRect(150 * scale, 75 * scale, 150 * scale, 75 * scale);
	        // Text
	        this.ctx.font = `${12 * scale}px sans-serif`;

	        this.ctx.fillText(glot.get("park"), 135 * scale, 285 * scale);

	        this.ctx.fillStyle = this.bob.color;
	        this.ctx.fillText(glot.get("house", {
	            name: "Bob"
	        }), 41 * scale, 130 * scale, 70 * scale);
	        this.ctx.fillStyle = this.alice.color;
	        this.ctx.fillText(glot.get("house", {
	            name: "Alice"
	        }), 185 * scale, 130 * scale, 80 * scale);
	        this.ctx.fillStyle = this.charlie.color;
	        this.ctx.fillText(glot.get("house", {
	            name: "Charlie"
	        }), 180 * scale, 60 * scale);
	        this.ctx.fillStyle = this.david.color;
	        this.ctx.fillText(glot.get("house", {
	            name: "David"
	        }), 35 * scale, 60 * scale);

	        // Persons
	        this.ctx.lineWidth = 2 * scale;

	        [this.bob, this.alice, this.charlie, this.david].forEach(p => {
	            this.ctx.beginPath();
	            this.ctx.arc(p.x * scale, p.y * scale, 6 * scale, 0, Math.PI * 2, true); // Inner circle
	            this.ctx.fillStyle = p.color;
	            this.ctx.fill();

	            this.ctx.beginPath();
	            this.ctx.arc(p.x * scale, p.y * scale, p.wave * scale, 0, Math.PI * 2, true); // Outer circle
	            this.ctx.globalAlpha = 1 - p.wave / 25;
	            this.ctx.strokeStyle = "#76B7FF";
	            this.ctx.stroke();
	            this.ctx.globalAlpha = 1;

	            if (p.contagious) {
	                this.ctx.beginPath();
	                this.ctx.arc(p.x * scale, p.y * scale, 8.5 * scale, 0, Math.PI * 2, true); // Outer circle
	                this.ctx.strokeStyle = "#DD3D12";
	                this.ctx.stroke();
	            }

	            p.update();
	        });
	        // Redraw
	        window.requestAnimationFrame(this.draw.bind(this));
	    }

	    monitor() {
	        const persons = [this.bob, this.alice, this.david, this.charlie];
	        persons.filter(person => person.isPark).forEach(p => {
	            persons.filter(person => person.isPark).forEach(pp => {
	                if (p == pp) {
	                    return
	                }
	                const diffX = p.x - pp.x;
	                const diffY = p.y - pp.y;

	                const dist = Math.sqrt(diffX * diffX + diffY * diffY);
	                if (dist <= 40) {
	                    this.contact(p, pp);
	                }
	            });
	        });
	    }

	    panel() {
	        const i = this.panelState;
	        const persons = [this.bob, this.alice, this.charlie, this.david];
	        // Values

	        document.querySelector(".contagious").innerHTML = glot.get(persons[i].contagious);
	        document.querySelector(".alerted").innerHTML = glot.get(persons[i].alerted);
	        document.querySelector(".initial").innerHTML = this.toHex(persons[i].initial).substring(0, 10) + "...";
	        document.querySelector(".initial").title = this.toHex(persons[i].initial);
	        document.querySelector(".day").innerHTML = this.toHex(persons[i].day(this.dayIndex)).substring(0, 10) + "...";
	        document.querySelector(".day").title = this.toHex(persons[i].day(this.dayIndex));

	        // Interaction

	        document.querySelector(".row > .goto").innerHTML = persons[i].isPark == true ? glot.get("gohouse") : glot.get("gopark");
	        document.querySelector(".row > .test").innerHTML = persons[i].alerted == false ? glot.get("testcovid") : glot.get("publishcovid");
	    }

	    panelListeners() {
	        const persons = [this.bob, this.alice, this.charlie, this.david];

	        document.querySelector(".row > .goto").addEventListener("click", e => {
	            const i = this.panelState;
	            if (persons[i].isPark == true) {
	                persons[i].goToHouse();
	            } else {
	                persons[i].goToPark();
	            }
	            this.panel();
	        });
	        document.querySelector(".row > .test").addEventListener("click", e => {
	            const i = this.panelState;
	            if (persons[i].alerted == true) {
	                // Publish
	                this.server.addKeys(persons[i].name, persons[i].generateBroadcastHistoryFull(), persons[i].getDayKeys());
	            } else if (persons[i].contagious == true) {
	                persons[i].alerted = true;
	                alert(glot.get("gotest", {
	                    name: persons[i].name,
	                    result: glot.get("gotesttrue")
	                }));
	            } else {
	                alert(glot.get("gotest", {
	                    name: persons[i].name,
	                    result: glot.get("gotestfalse")
	                }));
	            }
	            this.panel();
	        });

	        document.querySelector(".past.show").addEventListener("click", e => {
	            const i = this.panelState;
	            this.popup.show(glot.get("namepast", {
	                name: persons[i].name
	            }), () => {
	                return new Promise((resolve, reject) => {
	                    setTimeout(() => {
	                        resolve(persons[i].getBroadcastHistory(this.dayIndex).timeSlots.map(el => {
	                            el.name = el.time.toTimeString();
	                            el.value = this.toHex(el.broadcastId);
	                            return el
	                        }));
	                    }, 0);
	                })
	            });
	        });

	        document.querySelector(".heard.show").addEventListener("click", e => {
	            const i = this.panelState;
	            this.popup.displayData(glot.get("nameheard", {
	                name: persons[i].name
	            }), Array.from(persons[i].heard).map(el => {
	                el.name = `${el.duration}min${el.duration > 1 ? 's' : ''} at ${el.slot.time.toTimeString()}`;
	                el.value = this.toHex(el.slot.broadcastId);
	                return el
	            }));
	        });
	    }

	    contact(p1, p2) {
	        // Get correct ephID
	        const getSlot = p => {
	            const broadcastHistory = p.getBroadcastHistory(this.dayIndex);
	            const length = broadcastHistory.timeSlots.length - 1;
	            let i = 0;
	            while (i <= length && broadcastHistory.timeSlots[i].time < new Date()) {
	                i += 1;
	            }
	            const index = i > 0 ? i - 1 : 0;
	            return [broadcastHistory.timeSlots[index], index]
	        };
	        const slot1 = getSlot(p1);
	        const slot2 = getSlot(p2);

	        const todayBroadcast = p1.broadcastHistory[this.dayIndex];
	        if (Array.from(p1.heard).map(el => el.slot).includes(slot2[0]) || Array.from(p2.heard).map(el => el.slot).includes(slot1[0])) {
	            return
	        }

	        let result = window.prompt(glot.get("meeting", {
	            p1,
	            p2
	        }), 5);

	        if (result == null || isNaN(parseInt(result))) { // In case the user tap cancel
	            result = 5;
	        }

	        p1.broadcastHistory[this.dayIndex].timeSlots[slot1[1]].hadContact = true;
	        p2.broadcastHistory[this.dayIndex].timeSlots[slot2[1]].hadContact = true;

	        p1.heard.add({
	            duration: parseInt(result),
	            slot: slot2[0]
	        });
	        p2.heard.add({
	            duration: parseInt(result),
	            slot: slot1[0]
	        });
	        if (p1.contagious == true || p2.contagious == true) {
	            if (p1.contagious == true) {
	                p2.contagious = true;
	            } else {
	                p1.contagious = true;
	            }
	        }
	        // Finally, we update the date
	        this.today = new Date(this.today.getTime() + 1000 * 60 * parseInt(result));

	        if (tour.isActive()) {
	            tour.next();
	        }
	    }

	    // UTILS
	    removeListeners(el) {
	        var newEl = el.cloneNode(false);
	        while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
	        el.parentNode.replaceChild(newEl, el);
	    }
	    toHex(byteArray) {
	        if (byteArray == null) {
	            return "null"
	        }
	        return byteArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
	    }
	    get dayIndex() {
	        const oneDay = 24 * 60 * 60 * 1000;
	        const dayK = Math.floor(Math.abs((this.today - getDayForIndex(0)) / oneDay));
	        return dayK
	    }
	}

	const { NotificationCenter: NotificationCenter$2, Notification: Notification$2 } = broadcast;

	class Controller {
	    constructor() {
	        const bob = new Bob("dp3t");
	        const alice = new Alice("dp3t");
	        const charlie = new Charlie("dp3t");
	        const david = new David("dp3t");
	        this.sim = new Simulation(bob, alice, charlie, david);

	        this.state = 0;

	        this.sim.mode = "dp3t";
	        this.sim.today = new Date();

	        this.sim.popup = new Popup();

	        this.sim.server = new Server();

	        this.selector();
	        this.listen();
	        this.date();
	    }

	    date() {
	        const options = {
	            year: 'numeric',
	            month: 'long',
	            day: 'numeric'
	        };
	        document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
	        document.querySelector(".now").innerHTML = this.sim.today.toTimeString();

	        document.querySelector(".control .past").addEventListener("click", e => {
	            if (isSameDay(this.sim.today, getDayForIndex(0))) {
	                alert("Can't go past the initial date.");
	                return
	            }
	            this.sim.today = new Date(this.sim.today.getTime() - 1000 * 60 * 60 * 24); // -1 day
	            const options = {
	                year: 'numeric',
	                month: 'long',
	                day: 'numeric'
	            };
	            document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
	            document.querySelector(".now").innerHTML = this.sim.today.toTimeString();
	        });
	        document.querySelector(".control .future").addEventListener("click", e => {
	            if (isSameDay(this.sim.today, getDayForIndex(13))) {
	                alert("Can't go any further. Sorry.");
	                return
	            }
	            this.sim.today = new Date(this.sim.today.getTime() + 1000 * 60 * 60 * 24); // +1 day
	            const options = {
	                year: 'numeric',
	                month: 'long',
	                day: 'numeric'
	            };
	            document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
	            document.querySelector(".now").innerHTML = this.sim.today.toTimeString();
	        });

	        document.querySelector(".control .plus-min").addEventListener("click", e => {
	            if (isSameDay(this.sim.today, getDayForIndex(0))) {
	                alert("Can't go past the initial date.");
	                return
	            }
	            this.sim.today = new Date(this.sim.today.getTime() + 5 * 60 * 1000); // + 5 min
	            const options = {
	                year: 'numeric',
	                month: 'long',
	                day: 'numeric'
	            };
	            document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
	            document.querySelector(".now").innerHTML = this.sim.today.toTimeString();
	        });
	        document.querySelector(".control .minus-min").addEventListener("click", e => {
	            if (isSameDay(this.sim.today, getDayForIndex(13))) {
	                alert("Can't go any further. Sorry.");
	                return
	            }
	            this.sim.today = new Date(this.sim.today.getTime() - 5 * 60 * 1000); // - 5 min
	            const options = {
	                year: 'numeric',
	                month: 'long',
	                day: 'numeric'
	            };
	            document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
	            document.querySelector(".now").innerHTML = this.sim.today.toTimeString();
	        });
	    }

	    listen() {
	        // Bottom Segmented Control
	        document.querySelectorAll(".app > .selector > div").forEach((el, i) => {
	            el.addEventListener("click", (e) => {
	                this.state = i;
	                this.selector();
	            });
	        });
	        // Panel Segmented Control
	        document.querySelectorAll(".panel > .selector > div").forEach((el, i) => {
	            el.addEventListener("click", (e) => {
	                this.sim.panelState = i;
	                this.sim.panel();
	                glot.render("auto", document.querySelector(".app"));
	                this.selector();
	            });
	        });
	        // Server
	        document.querySelector(".server.show").addEventListener("click", e => {
	            this.sim.server.display(this.sim.popup);
	        });
	    }
	    selector() {
	        // Bottom Segmented Control
	        document.querySelectorAll(".app > .selector > div").forEach((el, i) => {
	            if (this.state == i) {
	                // Active
	                el.classList.add("active");
	                document.querySelector(`.show-${i}`).style.display = "block";
	            } else {
	                // Inactive
	                el.classList.remove("active");
	                document.querySelector(`.show-${i}`).style.display = "none";
	            }
	        });
	        // Panel
	        document.querySelectorAll(".panel > .selector > div").forEach((el, i) => {
	            if (this.sim.panelState == i) {
	                // Active
	                el.classList.add("active");
	            } else {
	                // Inactive
	                el.classList.remove("active");
	            }
	        });
	    }

	    goToPark() {
	        this.sim.isPark = true;
	        [this.sim.bob, this.sim.alice, this.sim.charlie, this.sim.david].forEach(person => {
	            person.goToPark();
	        });
	    }
	    goToHouse() {
	        this.sim.isPark = false;
	        [this.sim.bob, this.sim.alice, this.sim.charlie, this.sim.david].forEach(person => {
	            person.goToHouse();
	        });
	    }

	    changeMode(mode) {
	        this.sim.mode = mode;
	        const msg = new Notification$2("mode", {
	            mode: mode
	        });

	        NotificationCenter$2.default.post(msg);
	    }
	}

	const con$1 = new Controller();

	return con$1;

}());
//# sourceMappingURL=functions.js.map
