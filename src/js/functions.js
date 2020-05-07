var con = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function () {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var it,
        normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var broadcast = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
       module.exports = factory() ;
    })(commonjsGlobal, function () {

      var BroadcastJSNotification = function BroadcastJSNotification(name) {
        var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, BroadcastJSNotification);

        this.name = name;
        this.object = object;
      };

      var NotificationCenter = /*#__PURE__*/function () {
        function NotificationCenter() {
          _classCallCheck(this, NotificationCenter);

          this.observers = new Map();
        }

        _createClass(NotificationCenter, [{
          key: "addObserver",
          value: function addObserver(name, callback) {
            var reference = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            this.observers.set("".concat(name, ", ").concat(reference), callback);
          }
        }, {
          key: "removeObserver",
          value: function removeObserver(name) {
            var reference = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            this.observers["delete"]("".concat(name, ", ").concat(reference));
          }
        }, {
          key: "post",
          value: function post(notification) {
            var name = notification.name;

            var _iterator = _createForOfIteratorHelper(this.observers.keys()),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var n = _step.value;

                if (n.split(",")[0] == name) {
                  this.observers.get(n)(notification.object);
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        }, {
          key: "default",
          get: function get() {
            var exportGlobal = function exportGlobal(name, object) {
              if (typeof commonjsGlobal !== "undefined") {
                // Node.js
                commonjsGlobal[name] = object;
              } else if (typeof window !== "undefined") {
                // JS with GUI (usually browser)
                window[name] = object;
              } else {
                throw new Error("Unkown run-time environment. Currently only browsers and Node.js are supported.");
              }
            };

            if (typeof BroadcastJS_Shared_Instance == "undefined") {
              exportGlobal("BroadcastJS_Shared_Instance", new NotificationCenter());
            }

            return BroadcastJS_Shared_Instance;
          }
        }]);

        return NotificationCenter;
      }();

      var index = {
        Notification: BroadcastJSNotification,
        NotificationCenter: new NotificationCenter()
      };
      return index;
    });
  });

  // Shared
  function startOfDay(date) {
    var d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d; // //Calculate start of day in UTC:
    // const denominator = 1000 * 60 * 60 * 24;
    // return new Date(((date.getTime() / denominator) | 0) * denominator);
  }
  function isSameDay(date1, date2) {
    return startOfDay(date1).valueOf() === startOfDay(date2).valueOf();
  }
  function convertToUTC(date) {
    //Simply convert by adding timezone offset. 
    //Resulting object may still have the "wrong" timezone set, but object can be used for displaying purposes.
    var offset = date.getTimezoneOffset();
    var utcDate = new Date(date);
    utcDate.setMinutes(utcDate.getMinutes() + offset);
    return utcDate;
  }

  Date.prototype.toUTCDateString = function () {
    return convertToUTC(this).toLocaleDateString();
  };

  Date.prototype.toTimeString = function () {
    var options = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return this.toLocaleTimeString(navigator.language || navigator.userLanguage, options); // convertToUTC(this)
  }; // Numbers of day to observe


  var OBSERVATION_DAYS = 14;
  var observationStartTime = new Date();
  observationStartTime.setDate(observationStartTime.getDate() - OBSERVATION_DAYS + 3); // So it doesn't get over 13. We set to 12 to be safe

  observationStartTime = startOfDay(observationStartTime);
  function getDayForIndex(dayIndex) {
    var day = new Date(observationStartTime);
    day.setDate(day.getDate() + dayIndex);
    return day;
  }

  var EPOCH_LENGTH = 10; //Number of epochs per day:

  var NUM_EPOCHS_PER_DAY = Math.floor(24 * 60 / EPOCH_LENGTH); //Size of rolling proximity ids:

  var ROLLING_PROXIMITY_ID_SIZE = 16; //Size of a Temporary Exposure Key:

  var TEMPORARY_EXPOSURE_KEY_SIZE = 16;
  var EN_RPIK = sjcl.codec.utf8String.toBits("EN-RPIK");
  var EN_RPI = sjcl.codec.utf8String.toBits("EN-RPI");
  var PAD_FILL = sjcl.codec.bytes.toBits(new Array(6).fill(0));

  var ExposureNotification = /*#__PURE__*/function () {
    function ExposureNotification() {
      _classCallCheck(this, ExposureNotification);
    }

    _createClass(ExposureNotification, [{
      key: "createInitialKey",

      /**
       * Creates a private initial key for a user.
       * 
       * In "Exposure Notification", there are no initial keys.
       */
      value: function createInitialKey() {
        return null;
      }
      /**
       * Returns list of "daysCount" subsequent day keys starting from day "startDay".
       * Those keys are derived from user's private "initialKey".
       * 
       * In "Exposure Notification", day keys are called "Temporary Exposure Key".
       */

    }, {
      key: "getSecretDayKeys",
      value: function getSecretDayKeys(initialKey, startDay, daysCount) {
        var dayKeys = [];

        for (var dayIndex = 0; dayIndex < daysCount; dayIndex++) {
          var randomWords = sjcl.random.randomWords(TEMPORARY_EXPOSURE_KEY_SIZE / 4);
          var tek = sjcl.codec.bytes.fromBits(randomWords);
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

    }, {
      key: "generateBroadcastHistoryForDay",
      value: function generateBroadcastHistoryForDay(day, dayKey) {
        var rollingProxIds = this._getAllRollingProxIdsForDay(day, dayKey);

        return rollingProxIds.map(function (entry) {
          return {
            time: entry.timeSlot,
            broadcastId: entry.rpi
          };
        });
      }
      /**
       * Returns list of all broadcast IDs which can be derived from one day key. 
       * The parameter "startDay" corresponds to the parameter "dayKey".
       * 
       * In "Exposure Notification", Rolling Proximity Identifiers of only one day can be derived from
       * the Daily Tracing Key. 
       */

    }, {
      key: "getAllBroadcastIdsFromDayKey",
      value: function getAllBroadcastIdsFromDayKey(startDay, dayKey, maxDaysCount) {
        var rollingProxIds = this._getAllRollingProxIdsForDay(startDay, dayKey);

        return rollingProxIds.map(function (entry) {
          return {
            day: startDay,
            broadcastId: entry.rpi
          };
        });
      }
      /**
       * Returns list of all day keys to report to the public server in case the user
       * with "initialKey" reports himself as infected.
       * 
       * In "Exposure Notification", day keys are not derived from an "initial key".
       * Instead, the "Temporary Exposure Key" are randomly generated keys which are stored
       * in the app of the person.
       */

    }, {
      key: "getAllDayKeysToReport",
      value: function getAllDayKeysToReport(_, dayKeyStorage, startDay, startDayIndex, maxDaysCount) {
        var dayKeys = [];

        for (var dayIndex = startDayIndex; dayIndex < startDayIndex + maxDaysCount; dayIndex++) {
          dayKeys.push({
            dayIndex: dayIndex,
            dayKey: dayKeyStorage(dayIndex)
          });
        }

        return dayKeys;
      }
    }, {
      key: "_getAllRollingProxIdsForDay",
      value: function _getAllRollingProxIdsForDay(day, dayKey) {
        var dayStart = startOfDay(day);
        var tek = sjcl.codec.bytes.toBits(dayKey);
        var rpik = sjcl.misc.hkdf(tek, ROLLING_PROXIMITY_ID_SIZE * 8, null, EN_RPIK, sjcl.hash.sha256);
        var aes = new sjcl.cipher.aes(rpik);
        var timeSlots = [];

        for (var epoch = 0; epoch < NUM_EPOCHS_PER_DAY; epoch++) {
          var timeSlot = new Date(dayStart);
          timeSlot.setMinutes(timeSlot.getMinutes() + epoch * EPOCH_LENGTH);
          var enIntervalNumber = timeSlot.getTime() / (1000 * 60 * EPOCH_LENGTH) | 0;
          var paddedData = sjcl.bitArray.concat(EN_RPI, PAD_FILL).concat([enIntervalNumber]);
          var rpi = aes.encrypt(paddedData);
          timeSlots.push({
            timeSlot: timeSlot,
            rpi: sjcl.codec.bytes.fromBits(rpi)
          });
        }

        return timeSlots;
      }
    }]);

    return ExposureNotification;
  }();

  var BROADCAST_KEY = "broadcast key"; //Length of an epoch (in minutes):

  var EPOCH_LENGTH$1 = 15; //Number of epochs per day:

  var NUM_EPOCHS_PER_DAY$1 = Math.floor(24 * 60 / EPOCH_LENGTH$1); //Size of ephIDs:

  var EPHID_SIZE = 16; //Size of a day key:

  var DAY_KEY_SIZE = 32; //Library SJCL requires us to call this method in order to use CTR:

  sjcl.beware["CTR mode is dangerous because it doesn't protect message integrity."]();

  var DP3T = /*#__PURE__*/function () {
    function DP3T() {
      _classCallCheck(this, DP3T);

      this.iv = sjcl.codec.hex.toBits("00000000000000000000000000000000");
      this.broadcastKey = sjcl.codec.utf8String.toBits(BROADCAST_KEY);
    }
    /**
     * Creates a private initial key for a user.
     */


    _createClass(DP3T, [{
      key: "createInitialKey",
      value: function createInitialKey() {
        var randomWords = sjcl.random.randomWords(DAY_KEY_SIZE / 4);
        return sjcl.codec.bytes.fromBits(randomWords);
      }
      /**
       * Returns list of "daysCount" subsequent day keys starting from day "startDay".
       * Those keys are derived from user's private "initialKey".
       * 
       * In DP-3T, the actual start day is irrelevant.
       */

    }, {
      key: "getSecretDayKeys",
      value: function getSecretDayKeys(initialKey, startDay, daysCount) {
        var dayKeys = [];
        var currentKey = initialKey;
        dayKeys.push(currentKey);

        for (var dayIndex = 0; dayIndex < daysCount - 1; dayIndex++) {
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

    }, {
      key: "generateBroadcastHistoryForDay",
      value: function generateBroadcastHistoryForDay(day, dayKey) {
        var ephIds = this._getAllEphIdsForDay(dayKey);

        this._shuffle(ephIds);

        var timeSlots = [];
        var timeSlotIterator = startOfDay(day);
        var nextDayStart = startOfDay(day);
        nextDayStart.setDate(nextDayStart.getDate() + 1);
        var index = 0;

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

    }, {
      key: "getAllBroadcastIdsFromDayKey",
      value: function getAllBroadcastIdsFromDayKey(startDay, dayKey, maxDaysCount) {
        var _this = this;

        var ephIdsList = [];

        var _loop = function _loop(dayIndex) {
          var ephIds = _this._getAllEphIdsForDay(dayKey);

          var day = new Date(startDay);
          day.setDate(day.getDate() + dayIndex);
          ephIds.forEach(function (ephId) {
            return ephIdsList.push({
              day: day,
              broadcastId: ephId
            });
          });
          dayKey = _this._hash(dayKey);
        };

        for (var dayIndex = 0; dayIndex < maxDaysCount; dayIndex++) {
          _loop(dayIndex);
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

    }, {
      key: "getAllDayKeysToReport",
      value: function getAllDayKeysToReport(initialKey, _, startDay, startDayIndex, maxDaysCount) {
        var dayKey = initialKey;

        for (var dayIndex = 0; dayIndex < startDayIndex; dayIndex++) {
          dayKey = this._hash(dayKey);
        }

        return [{
          dayIndex: startDayIndex,
          dayKey: dayKey
        }];
      }
    }, {
      key: "_hash",
      value: function _hash(key) {
        var data = sjcl.codec.bytes.toBits(key);
        var hash = sjcl.hash.sha256.hash(data);
        return sjcl.codec.bytes.fromBits(hash);
      }
    }, {
      key: "_getAllEphIdsForDay",
      value: function _getAllEphIdsForDay(dayKey) {
        //Compare this to https://github.com/DP-3T/reference_implementation/blob/master/LowCostDP3T.py
        var hmac = new sjcl.misc.hmac(sjcl.codec.bytes.toBits(dayKey), sjcl.hash.sha256);
        var prf = hmac.encrypt(this.broadcastKey);
        var aes = new sjcl.cipher.aes(prf);
        var stream = sjcl.codec.bytes.toBits(new Array(EPHID_SIZE * NUM_EPOCHS_PER_DAY$1).fill(0));
        var prg = sjcl.mode.ctr.encrypt(aes, stream, this.iv);
        var ephIds = []; //Slice the PRG into ephIds of EPHID_SIZE bytes: 

        for (var epoch = 0; epoch < NUM_EPOCHS_PER_DAY$1; epoch++) {
          var offset = epoch * EPHID_SIZE * 8;
          var ephId = sjcl.bitArray.bitSlice(prg, offset, offset + EPHID_SIZE * 8);
          ephIds.push(sjcl.codec.bytes.fromBits(ephId));
        }

        return ephIds;
      }
    }, {
      key: "_shuffle",
      value: function _shuffle(array) {
        //Taken from https://github.com/Daplie/knuth-shuffle/
        var currentIndex = array.length,
            temporaryValue,
            randomIndex; // While there remain elements to shuffle...

        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1; // And swap it with the current element.

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }
    }]);

    return DP3T;
  }();

  var Person = /*#__PURE__*/function () {
    function Person(mode) {
      _classCallCheck(this, Person);

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
      this.published = false;
      this.wave = 0;
      this.isPark = false;
      this.setAlgo({
        mode: mode
      });
    }

    _createClass(Person, [{
      key: "notify",
      value: function notify(notif) {
        var _this = this;

        if (notif.from == this.name) {
          return;
        }

        Array.from(this.heard).forEach(function (broadcast) {
          if (broadcast != null && broadcast.slot == notif.slot && _this.receivedNotification == false) {
            return alert(glot.get("notify", {
              name: _this.name
            }));
          }
        });
      }
    }, {
      key: "setAlgo",
      value: function setAlgo(notif) {
        this.mode = notif.mode;
        this.algo = notif.mode == "dp3t" ? new DP3T() : new ExposureNotification();
        this.initial = this.algo.createInitialKey();
        this.broadcastHistory = Array(OBSERVATION_DAYS - 1).fill(null);
        this.heard = new Set();
        this.secretDayKeys = null;

        this._generateSecretDayKey();
      }
    }, {
      key: "day",
      value: function day(today) {
        this._generateSecretDayKey();

        return this.secretDayKeys[today];
      }
    }, {
      key: "update",
      value: function update() {
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
    }, {
      key: "goToPark",
      value: function goToPark() {
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
    }, {
      key: "goToHouse",
      value: function goToHouse() {
        this.x = this.pastX;
        this.y = this.pastY;
        this.minX = this.pastMinX;
        this.maxX = this.pastMaxX;
        this.minY = this.pastMinY;
        this.maxY = this.pastMaxY;
        this.isPark = false;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.pastVx = this.vx;
        this.pastVy = this.vy;
        this.vx = 0;
        this.vy = 0;
      }
    }, {
      key: "play",
      value: function play() {
        this.vx = this.pastVx;
        this.vy = this.pastVy;
      }
    }, {
      key: "getBroadcastHistory",
      value: function getBroadcastHistory(dayIndex) {
        if (!this.broadcastHistory[dayIndex]) {
          this.broadcastHistory[dayIndex] = this._generateBroadcastHistory(dayIndex);
        }

        return this.broadcastHistory[dayIndex];
      }
    }, {
      key: "getDayKeys",
      value: function getDayKeys() {
        var _this2 = this;

        var keys = this.algo.getAllDayKeysToReport(this.initial, function (dayIndex) {
          return _this2.day(dayIndex);
        }, getDayForIndex(0), 0, OBSERVATION_DAYS);
        return keys.map(function (id, i) {
          return {
            time: getDayForIndex(id.dayIndex),
            broadcastId: id.dayKey
          };
        });
      }
    }, {
      key: "generateBroadcastHistoryFull",
      value: function generateBroadcastHistoryFull() {
        for (var i = 0; i < OBSERVATION_DAYS; i++) {
          this.getBroadcastHistory(i);
        }

        return this.broadcastHistory;
      }
    }, {
      key: "_generateSecretDayKey",
      value: function _generateSecretDayKey() {
        if (!this.secretDayKeys) {
          var startTime = getDayForIndex(0);
          this.secretDayKeys = this.algo.getSecretDayKeys(this.initial, startTime, OBSERVATION_DAYS + 1);
        }
      }
    }, {
      key: "_generateBroadcastHistory",
      value: function _generateBroadcastHistory(dayIndex) {
        this._generateSecretDayKey();

        var dayKey = this.secretDayKeys[dayIndex];
        var timeSlots = [];
        var day = getDayForIndex(dayIndex);
        this.algo.generateBroadcastHistoryForDay(day, dayKey).forEach(function (slot) {
          return timeSlots.push({
            time: slot.time,
            broadcastId: slot.broadcastId,
            hadContact: false
          });
        });
        return {
          day: day,
          dayKey: dayKey,
          timeSlots: timeSlots
        };
      }
    }]);

    return Person;
  }();

  var NotificationCenter = broadcast.NotificationCenter,
      Notification = broadcast.Notification;

  var Bob = /*#__PURE__*/function (_Person) {
    _inherits(Bob, _Person);

    var _super = _createSuper(Bob);

    function Bob() {
      var _this;

      _classCallCheck(this, Bob);

      _this = _super.apply(this, arguments);
      _this.name = "Bob";
      _this.x = 75;
      _this.y = 95;
      _this.minX = 10;
      _this.maxX = 140;
      _this.minY = 85;
      _this.maxY = 140;
      _this.contagious = false;
      _this.alerted = false;
      _this.past = new Set();
      _this.heard = new Set();
      _this.d = Math.random() * (2 * Math.PI);
      _this.color = "#1277EB";
      NotificationCenter["default"].addObserver("mode", _this.setAlgo.bind(_assertThisInitialized(_this)), _this.name);
      NotificationCenter["default"].addObserver("server", _this.notify.bind(_assertThisInitialized(_this)), _this.name);
      return _this;
    }

    return Bob;
  }(Person);

  var Alice = /*#__PURE__*/function (_Person2) {
    _inherits(Alice, _Person2);

    var _super2 = _createSuper(Alice);

    function Alice() {
      var _this2;

      _classCallCheck(this, Alice);

      _this2 = _super2.apply(this, arguments);
      _this2.name = "Alice";
      _this2.x = 225;
      _this2.y = 95;
      _this2.minX = 160;
      _this2.maxX = 290;
      _this2.minY = 85;
      _this2.maxY = 140;
      _this2.contagious = true;
      _this2.alerted = false;
      _this2.past = new Set();
      _this2.heard = new Set();
      _this2.d = Math.random() * (2 * Math.PI);
      _this2.color = "#F66A09";
      NotificationCenter["default"].addObserver("mode", _this2.setAlgo.bind(_assertThisInitialized(_this2)), _this2.name);
      NotificationCenter["default"].addObserver("server", _this2.notify.bind(_assertThisInitialized(_this2)), _this2.name);
      return _this2;
    }

    return Alice;
  }(Person);

  var Charlie = /*#__PURE__*/function (_Person3) {
    _inherits(Charlie, _Person3);

    var _super3 = _createSuper(Charlie);

    function Charlie() {
      var _this3;

      _classCallCheck(this, Charlie);

      _this3 = _super3.apply(this, arguments);
      _this3.name = "Charlie";
      _this3.x = 225;
      _this3.y = 50;
      _this3.minX = 160;
      _this3.maxX = 290;
      _this3.minY = 10;
      _this3.maxY = 65;
      _this3.contagious = false;
      _this3.alerted = false;
      _this3.past = new Set();
      _this3.heard = new Set();
      _this3.d = Math.random() * (2 * Math.PI);
      _this3.color = "#65CE60";
      NotificationCenter["default"].addObserver("mode", _this3.setAlgo.bind(_assertThisInitialized(_this3)), _this3.name);
      NotificationCenter["default"].addObserver("server", _this3.notify.bind(_assertThisInitialized(_this3)), _this3.name);
      return _this3;
    }

    return Charlie;
  }(Person);

  var David = /*#__PURE__*/function (_Person4) {
    _inherits(David, _Person4);

    var _super4 = _createSuper(David);

    function David() {
      var _this4;

      _classCallCheck(this, David);

      _this4 = _super4.apply(this, arguments);
      _this4.name = "David";
      _this4.x = 75;
      _this4.y = 35;
      _this4.minX = 10;
      _this4.maxX = 140;
      _this4.minY = 10;
      _this4.maxY = 65;
      _this4.contagious = false;
      _this4.alerted = false;
      _this4.past = new Set();
      _this4.heard = new Set();
      _this4.d = Math.random() * 100;
      _this4.color = "#F2C94C";
      NotificationCenter["default"].addObserver("mode", _this4.setAlgo.bind(_assertThisInitialized(_this4)), _this4.name);
      NotificationCenter["default"].addObserver("server", _this4.notify.bind(_assertThisInitialized(_this4)), _this4.name);
      return _this4;
    }

    return David;
  }(Person);

  var NotificationCenter$1 = broadcast.NotificationCenter,
      Notification$1 = broadcast.Notification;

  var Server = /*#__PURE__*/function () {
    function Server() {
      _classCallCheck(this, Server);

      this.slots = [];
      this.dayKeys = [];
    }

    _createClass(Server, [{
      key: "addKeys",
      value: function addKeys(name, slots, dayKeys) {
        var _this$dayKeys,
            _this = this;

        (_this$dayKeys = this.dayKeys).push.apply(_this$dayKeys, _toConsumableArray(dayKeys));

        var Slots = slots.map(function (el) {
          return el.timeSlots;
        });
        var array = [].concat.apply([], Slots);
        array.forEach(function (slot) {
          if (slot.hadContact == true) {
            _this.slots.push(slot);

            var msg = new Notification$1("server", {
              slot: slot,
              from: name
            });
            NotificationCenter$1["default"].post(msg);
          }
        });
      }
    }, {
      key: "display",
      value: function display(popup) {
        var _this2 = this;

        popup.show(glot.get("serverdata"), function () {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve(_this2.dayKeys.map(function (el) {
                el.name = el.time.toLocaleDateString();
                el.value = con.sim.toHex(el.broadcastId);
                return el;
              }));
            }, 0);
          });
        });
      }
    }]);

    return Server;
  }();

  var Popup = /*#__PURE__*/function () {
    function Popup() {
      _classCallCheck(this, Popup);

      this.state = false;
      this.el = document.querySelector(".popup");
      this.listen();
    }

    _createClass(Popup, [{
      key: "listen",
      value: function listen() {
        var _this = this;

        this.el.querySelector(".cross").addEventListener("click", function (e) {
          _this.state = false;

          _this.render();
        });
        this.el.addEventListener("click", function (e) {
          if (e.target == e.currentTarget) {
            _this.state = false;

            _this.render();
          }
        });
      }
    }, {
      key: "displayData",
      value: function displayData(title, data) {
        this.show(title, function () {
          return new Promise(function (resolve, reject) {
            return resolve(data);
          });
        });
      }
    }, {
      key: "show",
      value: function show(title, promise) {
        var _this2 = this;

        this.state = true;
        this.render(); // Putting elements

        this.el.querySelector(".title").innerHTML = title;
        this.el.querySelector(".container").innerHTML = "<div class=\"center\">Loading...</div>";
        promise().then(function (data) {
          // Reset
          _this2.el.querySelector(".container").innerHTML = "";

          if (data.length == 0) {
            _this2.el.querySelector(".container").innerHTML = "<div class=\"center\">No data</div>";
          }

          data.forEach(function (row) {
            _this2.el.querySelector(".container").innerHTML += "<div class=\"row\">\n                <div class=\"variable\">".concat(row.name, "</div>\n                <div class=\"value\">").concat(row.value, "</div>\n                </div>");
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state == true) {
          this.el.style.display = "flex";
        } else {
          this.el.style.display = "none";
        }
      }
    }]);

    return Popup;
  }();

  window.originalSetInterval = window.setInterval;
  window.activeTimers = [];

  window.Interval = function (func, delay) {
    clearAllInterval(); // Only 1 allowed

    var timer = window.originalSetInterval(func, delay);
    window.activeTimers.push(timer);
    return timer;
  };

  window.clearAllInterval = function () {
    window.activeTimers.forEach(function (timer) {
      window.clearInterval(window.activeTimers.shift());
    });
  };

  var Simulation = /*#__PURE__*/function () {
    function Simulation(bob, alice, charlie, david) {
      _classCallCheck(this, Simulation);

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
      this.animationFrame = window.requestAnimationFrame(this.draw.bind(this));
      this.interval = Interval(this.panel.bind(this), 1000);
      this.panelListeners();
    }

    _createClass(Simulation, [{
      key: "resize",
      value: function resize() {
        var scale = 1;

        if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches) {
          scale = 4 / 3;
        }

        var canvasWidth = 300 * scale;
        var canvasHeight = 300 * scale;
        this.canvas.width = canvasWidth * window.devicePixelRatio;
        this.canvas.height = canvasHeight * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    }, {
      key: "draw",
      value: function draw() {
        var _this = this;

        this.monitor(); // Update

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Scale

        var scale = 1;

        if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches) {
          scale = 4 / 3;
        } // Layout


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
        this.ctx.strokeRect(150 * scale, 75 * scale, 150 * scale, 75 * scale); // Text

        this.ctx.font = "".concat(12 * scale, "px sans-serif");
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
        }), 35 * scale, 60 * scale); // Persons

        this.ctx.lineWidth = 2 * scale;
        [this.bob, this.alice, this.charlie, this.david].forEach(function (p) {
          _this.ctx.beginPath();

          _this.ctx.arc(p.x * scale, p.y * scale, 6 * scale, 0, Math.PI * 2, true); // Inner circle


          _this.ctx.fillStyle = p.color;

          _this.ctx.fill();

          _this.ctx.beginPath();

          _this.ctx.arc(p.x * scale, p.y * scale, p.wave * scale, 0, Math.PI * 2, true); // Outer circle


          _this.ctx.globalAlpha = 1 - p.wave / 25;
          _this.ctx.strokeStyle = "#76B7FF";

          _this.ctx.stroke();

          _this.ctx.globalAlpha = 1;

          if (p.contagious) {
            _this.ctx.beginPath();

            _this.ctx.arc(p.x * scale, p.y * scale, 8.5 * scale, 0, Math.PI * 2, true); // Outer circle


            _this.ctx.strokeStyle = "#DD3D12";

            _this.ctx.stroke();
          }

          p.update();
        }); // Redraw

        this.animationFrame = window.requestAnimationFrame(this.draw.bind(this));
      }
    }, {
      key: "monitor",
      value: function monitor() {
        var _this2 = this;

        var persons = [this.bob, this.alice, this.david, this.charlie];
        persons.filter(function (person) {
          return person.isPark;
        }).forEach(function (p) {
          persons.filter(function (person) {
            return person.isPark;
          }).forEach(function (pp) {
            if (p == pp) {
              return;
            }

            var diffX = p.x - pp.x;
            var diffY = p.y - pp.y;
            var dist = Math.sqrt(diffX * diffX + diffY * diffY);

            if (dist <= 40) {
              _this2.contact(p, pp);
            }
          });
        });
      }
    }, {
      key: "panel",
      value: function panel() {
        var i = this.panelState;
        var persons = [this.bob, this.alice, this.charlie, this.david]; // Values

        document.querySelector(".contagious").innerHTML = glot.get(persons[i].contagious);
        document.querySelector(".alerted").innerHTML = glot.get(persons[i].alerted);
        document.querySelector(".initial").innerHTML = this.toHex(persons[i].initial).substring(0, 10) + "...";
        document.querySelector(".initial").title = this.toHex(persons[i].initial);
        document.querySelector(".day").innerHTML = this.toHex(persons[i].day(this.dayIndex)).substring(0, 10) + "...";
        document.querySelector(".day").title = this.toHex(persons[i].day(this.dayIndex)); // Interaction

        document.querySelector(".row > .goto").innerHTML = persons[i].isPark == true ? glot.get("gohouse") : glot.get("gopark");
        document.querySelector(".row > .test").innerHTML = persons[i].alerted == false ? glot.get("testcovid") : glot.get("publishcovid");
        document.querySelector(".row > .test").disabled = persons[i].published;
        glot.render("auto", document.querySelector(".app"));
      }
    }, {
      key: "panelListeners",
      value: function panelListeners() {
        var _this3 = this;

        var persons = [this.bob, this.alice, this.charlie, this.david];
        document.querySelector(".row > .goto").addEventListener("click", function (e) {
          var i = _this3.panelState;

          if (persons[i].isPark == true) {
            persons[i].goToHouse();
          } else {
            persons[i].goToPark();
          }

          _this3.panel();
        });
        document.querySelector(".row > .test").addEventListener("click", function (e) {
          var i = _this3.panelState;

          if (persons[i].alerted == true) {
            // Publish
            persons[i].published = true;

            _this3.server.addKeys(persons[i].name, persons[i].generateBroadcastHistoryFull(), persons[i].getDayKeys());
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

          _this3.panel();
        });
        document.querySelector(".past.show").addEventListener("click", function (e) {
          var i = _this3.panelState;

          _this3.popup.show(glot.get("namepast", {
            name: persons[i].name
          }), function () {
            return new Promise(function (resolve, reject) {
              setTimeout(function () {
                resolve(persons[i].getBroadcastHistory(_this3.dayIndex).timeSlots.map(function (el) {
                  el.name = el.time.toTimeString();
                  el.value = _this3.toHex(el.broadcastId);
                  return el;
                }));
              }, 0);
            });
          });
        });
        document.querySelector(".heard.show").addEventListener("click", function (e) {
          var i = _this3.panelState;

          _this3.popup.displayData(glot.get("nameheard", {
            name: persons[i].name
          }), Array.from(persons[i].heard).map(function (el) {
            el.name = "".concat(el.duration, "min").concat(el.duration > 1 ? 's' : '', " at ").concat(el.slot.time.toTimeString());
            el.value = _this3.toHex(el.slot.broadcastId);
            return el;
          }));
        });
      }
    }, {
      key: "contact",
      value: function contact(p1, p2) {
        var _this4 = this;

        // Get correct ephID
        var getSlot = function getSlot(p) {
          var broadcastHistory = p.getBroadcastHistory(_this4.dayIndex);
          var length = broadcastHistory.timeSlots.length - 1;
          var i = 0;

          while (i <= length && broadcastHistory.timeSlots[i].time < new Date()) {
            i += 1;
          }

          var index = i > 0 ? i - 1 : 0;
          return [broadcastHistory.timeSlots[index], index];
        };

        var slot1 = getSlot(p1);
        var slot2 = getSlot(p2);
        var todayBroadcast = p1.broadcastHistory[this.dayIndex];

        if (Array.from(p1.heard).map(function (el) {
          return el.slot;
        }).includes(slot2[0]) || Array.from(p2.heard).map(function (el) {
          return el.slot;
        }).includes(slot1[0])) {
          return;
        }

        var result = window.prompt(glot.get("meeting", {
          p1: p1,
          p2: p2
        }), 5);

        if (result == null || isNaN(parseInt(result))) {
          // In case the user tap cancel
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
        } // Finally, we update the date


        this.today = new Date(this.today.getTime() + 1000 * 60 * parseInt(result));

        if (tour.isShown == true) {
          tour.next();
        }
      } // UTILS

    }, {
      key: "removeListeners",
      value: function removeListeners(el) {
        el.parentNode.replaceChild(el.cloneNode(true), el);
      }
    }, {
      key: "toHex",
      value: function toHex(byteArray) {
        if (byteArray == null) {
          return "null";
        }

        return byteArray.map(function (b) {
          return b.toString(16).padStart(2, '0');
        }).join('').toUpperCase();
      }
    }, {
      key: "dayIndex",
      get: function get() {
        var oneDay = 24 * 60 * 60 * 1000;
        var dayK = Math.floor(Math.abs((this.today - getDayForIndex(0)) / oneDay));
        return dayK;
      }
    }]);

    return Simulation;
  }();

  var NotificationCenter$2 = broadcast.NotificationCenter,
      Notification$2 = broadcast.Notification;

  var Controller = /*#__PURE__*/function () {
    function Controller() {
      var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "dp3t";

      _classCallCheck(this, Controller);

      this.init(protocol);
    }

    _createClass(Controller, [{
      key: "init",
      value: function init() {
        var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "dp3t";
        var bob = new Bob(protocol);
        var alice = new Alice(protocol);
        var charlie = new Charlie(protocol);
        var david = new David(protocol);
        this.sim = new Simulation(bob, alice, charlie, david);
        this.state = 0;
        this.sim.mode = protocol;
        this.sim.today = new Date();
        this.sim.popup = new Popup();
        this.sim.server = new Server();
        this.selector();
        this.listen();
        this.date();
      }
    }, {
      key: "date",
      value: function date() {
        var _this = this;

        var options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
        document.querySelector(".now").innerHTML = this.sim.today.toTimeString();
        document.querySelector(".control .past").addEventListener("click", function (e) {
          if (isSameDay(_this.sim.today, getDayForIndex(0))) {
            alert("Can't go past the initial date.");
            return;
          }

          _this.sim.today = new Date(_this.sim.today.getTime() - 1000 * 60 * 60 * 24); // -1 day

          var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          document.querySelector(".today").innerHTML = _this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
          document.querySelector(".now").innerHTML = _this.sim.today.toTimeString();
        });
        document.querySelector(".control .future").addEventListener("click", function (e) {
          if (isSameDay(_this.sim.today, getDayForIndex(13))) {
            alert("Can't go any further. Sorry.");
            return;
          }

          _this.sim.today = new Date(_this.sim.today.getTime() + 1000 * 60 * 60 * 24); // +1 day

          var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          document.querySelector(".today").innerHTML = _this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
          document.querySelector(".now").innerHTML = _this.sim.today.toTimeString();
        });
        document.querySelector(".control .plus-min").addEventListener("click", function (e) {
          if (isSameDay(_this.sim.today, getDayForIndex(0))) {
            alert("Can't go past the initial date.");
            return;
          }

          _this.sim.today = new Date(_this.sim.today.getTime() + 5 * 60 * 1000); // + 5 min

          var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          document.querySelector(".today").innerHTML = _this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
          document.querySelector(".now").innerHTML = _this.sim.today.toTimeString();
        });
        document.querySelector(".control .minus-min").addEventListener("click", function (e) {
          if (isSameDay(_this.sim.today, getDayForIndex(13))) {
            alert("Can't go any further. Sorry.");
            return;
          }

          _this.sim.today = new Date(_this.sim.today.getTime() - 5 * 60 * 1000); // - 5 min

          var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          document.querySelector(".today").innerHTML = _this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options);
          document.querySelector(".now").innerHTML = _this.sim.today.toTimeString();
        });
      }
    }, {
      key: "listen",
      value: function listen() {
        var _this2 = this;

        // Bottom Segmented Control
        document.querySelectorAll(".app > .selector > div").forEach(function (el, i) {
          el.addEventListener("click", function (e) {
            _this2.state = i;

            _this2.selector();
          });
        }); // Panel Segmented Control

        document.querySelectorAll(".panel > .selector > div").forEach(function (el, i) {
          el.addEventListener("click", function (e) {
            _this2.sim.panelState = i;

            _this2.sim.panel();

            _this2.selector();
          });
        }); // Server

        document.querySelector(".server.show").addEventListener("click", function (e) {
          _this2.sim.server.display(_this2.sim.popup);
        });
      }
    }, {
      key: "selector",
      value: function selector() {
        var _this3 = this;

        // Bottom Segmented Control
        document.querySelectorAll(".app > .selector > div").forEach(function (el, i) {
          if (_this3.state == i) {
            // Active
            el.classList.add("active");
            document.querySelector(".show-".concat(i)).style.display = "block";
          } else {
            // Inactive
            el.classList.remove("active");
            document.querySelector(".show-".concat(i)).style.display = "none";
          }
        }); // Panel

        document.querySelectorAll(".panel > .selector > div").forEach(function (el, i) {
          if (_this3.sim.panelState == i) {
            // Active
            el.classList.add("active");
          } else {
            // Inactive
            el.classList.remove("active");
          }
        });
      }
    }, {
      key: "goToPark",
      value: function goToPark() {
        this.sim.isPark = true;
        [this.sim.bob, this.sim.alice, this.sim.charlie, this.sim.david].forEach(function (person) {
          person.goToPark();
        });
      }
    }, {
      key: "goToHouse",
      value: function goToHouse() {
        this.sim.isPark = false;
        [this.sim.bob, this.sim.alice, this.sim.charlie, this.sim.david].forEach(function (person) {
          person.goToHouse();
        });
      }
    }, {
      key: "changeMode",
      value: function changeMode(mode) {
        this.sim.mode = mode;
        var msg = new Notification$2("mode", {
          mode: mode
        });
        NotificationCenter$2["default"].post(msg);
      }
    }]);

    return Controller;
  }();

  var con$1 = new Controller();

  con$1.reset = function () {
    var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "dp3t";
    window.clearAllInterval();
    cancelAnimationFrame(con$1.sim.animationFrame);
    document.querySelector("select").value = protocol; // So the selector value is the same

    con$1.sim.removeListeners(document.querySelector(".app"));
    con$1.init(protocol);
  };

  return con$1;

}());
//# sourceMappingURL=functions.js.map
