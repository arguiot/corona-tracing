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

        this.wave = 0;

        this.isPark = false

        this.setAlgo({
            mode: mode
        })
        new NotificationCenter().default.addObserver("mode", this.setAlgo.bind(this))
    }

    setAlgo(notif) {
        this.mode = notif.mode
        this.algo = notif.mode == "dp3t" ? new DP3T() : new ContactTracing()

        this.initial = this.algo.createInitialKey()
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

class Bob extends Person {
    constructor() {
        super(...arguments);

        this.name = "Bob"

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

        this.color = "#1277EB"
    }
}

class Alice extends Person {
    constructor() {
        super(...arguments);

        this.name = "Alice"

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

        this.color = "#F66A09"
    }
}

class Charlie extends Person {
    constructor() {
        super(...arguments);

        this.name = "Charlie"

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

        this.color = "#65CE60"
    }
}

class David extends Person {
    constructor() {
        super(...arguments);

        this.name = "David"

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

        this.color = "#F2C94C"
    }
}

class Server {
    constructor() {
        this.slots = []
    }
    addKeys(keys) {
        const slots = keys.map(el => el.timeSlots)
        const array = [].concat.apply([], slots)
        array.forEach(slot => {
            if (slot.hadContact == true) {
                this.slots.push(slot)
            }
        })
    }
    display(popup) {
        popup.show("Server's data", () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.slots.map(el => {
                        el.name = el.time.toLocaleString()
                        el.value = con.sim.toHex(el.broadcastId)
                        return el
                    }))
                }, 0)
            })
        })
    }
}

class Simulation {
    constructor(bob, alice, charlie, david) {
        this.bob = bob;
        this.alice = alice;
        this.charlie = charlie
        this.david = david

        this.panelState = 0;

        this.isPark = false;

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.resize()

        window.addEventListener('resize', this.resize.bind(this))

        this.draw();

        setInterval(this.panel.bind(this), 1000);
    }

    resize() {
        let scale = 1
        if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches) {
            scale = 4 / 3
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
        let scale = 1
        if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches) {
            scale = 4 / 3
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
        this.ctx.fillText("Bob's House", 41 * scale, 130 * scale, 70 * scale);
        this.ctx.fillText("Alice's House", 185 * scale, 130 * scale, 80 * scale);
        this.ctx.fillText("Charlie's House", 180 * scale, 60 * scale);
        this.ctx.fillText("David's House", 35 * scale, 60 * scale);
        this.ctx.fillText("Park", 135 * scale, 285 * scale);

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

            p.update()
        })
        // Redraw
        window.requestAnimationFrame(this.draw.bind(this));
    }

    monitor() {
        const list = [this.bob, this.alice, this.david, this.charlie].filter(person => person.isPark)
        list.forEach(p => {
            list.forEach(pp => {
                if (p == pp) { return }
                const diffX = p.x - pp.x;
                const diffY = p.y - pp.y;

                const dist = Math.sqrt(diffX * diffX + diffY * diffY);
                if (dist <= 40 && !(pp.contagious == true && p.contagious == true)) {
                    this.contact(p, pp)
                }
            })
        })
    }

    panel() {
        const i = this.panelState
        const persons = [this.bob, this.alice, this.charlie, this.david]

        // Cleans some elements
        this.removeListeners(document.querySelector(".row > .goto"))
        this.removeListeners(document.querySelector(".row > .test"))
        this.removeListeners(document.querySelector(".past.show"))
        this.removeListeners(document.querySelector(".heard.show"))
        // Values

        document.querySelector(".contagious").innerHTML = persons[i].contagious;
        document.querySelector(".alerted").innerHTML = persons[i].alerted;
        document.querySelector(".initial").innerHTML = this.toHex(persons[i].initial).substring(0, 10) + "...";
        document.querySelector(".initial").title = this.toHex(persons[i].initial)
        document.querySelector(".day").innerHTML = this.toHex(persons[i].day(this.dayIndex)).substring(0, 10) + "...";
        document.querySelector(".day").title = this.toHex(persons[i].day(this.dayIndex))

        // Interaction

        document.querySelector(".row > .goto > span").innerHTML = persons[i].isPark == true ? "house" : "park"
        document.querySelector(".row > .test").innerHTML = persons[i].alerted == false ? "Test for COVID-19" : "Publish past EphIDs"

        document.querySelector(".row > .goto").addEventListener("click", e => {

            if (persons[i].isPark == true) {
                persons[i].goToHouse()
            } else {
                persons[i].goToPark()
            }
            this.panel()
        })
        document.querySelector(".row > .test").addEventListener("click", e => {
            if (persons[i].alerted == true) {
                // Publish
                this.server.addKeys(persons[i].generateBroadcastHistoryFull())
            } else if (persons[i].contagious == true) {
                persons[i].alerted = true
            }
            this.panel()
        })

        document.querySelector(".past.show").addEventListener("click", e => {
            this.popup.show(`${persons[i].name}'s past EphIDs`, () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(persons[i].getBroadcastHistory(this.dayIndex).timeSlots.map(el => {
                            el.name = el.time.toTimeString()
                            el.value = this.toHex(el.broadcastId)
                            return el
                        }))
                    }, 0);
                })
            })
        })

        document.querySelector(".heard.show").addEventListener("click", e => {
            this.popup.displayData(`${persons[i].name}'s heard EphIDs`, Array.from(persons[i].heard).map(el => {
                el.name = `${el.duration}min${el.duration > 1 ? 's' : ''} at ${el.slot.time.toTimeString()}`
                el.value = this.toHex(el.slot.broadcastId)
                return el
            }))
        })
    }

    contact(p1, p2) {
        const result = window.prompt(`${p1.name} and ${p2.name} met each other at the park. How much time (in minutes) did they spent together?`, 5)

        // Get correct ephID
        const getSlot = p => {
            const broadcastHistory = p.getBroadcastHistory(this.dayIndex)
            const length = broadcastHistory.timeSlots.length - 1
            let i = 0
            while (i <= length && broadcastHistory.timeSlots[i].time < new Date()) {
                i += 1
            }
            const index = i > 0 ? i - 1 : 0
            return [broadcastHistory.timeSlots[index], index]
        }
        const slot1 = getSlot(p1)
        const slot2 = getSlot(p2)

        p1.broadcastHistory[this.dayIndex].timeSlots[slot1[1]].hadContact = true
        p2.broadcastHistory[this.dayIndex].timeSlots[slot2[1]].hadContact = true

        p1.heard.add({
            duration: parseInt(result),
            slot: slot2[0]
        })
        p2.heard.add({
            duration: parseInt(result),
            slot: slot1[0]
        })

        if (p1.contagious == true || p2.contagious == true) {
            p1.contagious = true;
            p2.contagious = true;
        }
    }

    // UTILS
    removeListeners(el) {
        var newEl = el.cloneNode(false);
        while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
        el.parentNode.replaceChild(newEl, el);
    }
    toHex(byteArray) {
        return byteArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    }
    get dayIndex() {
        const oneDay = 24 * 60 * 60 * 1000;
        const dayK = Math.floor(Math.abs((this.today - getDayForIndex(0)) / oneDay))
        return dayK
    }
}

class Popup {
    constructor() {
        this.state = false

        this.el = document.querySelector(".popup");
        this.listen()
    }
    listen() {
        this.el.querySelector(".cross").addEventListener("click", e => {
            this.state = false
            this.render()
        })
        this.el.addEventListener("click", e => {
            if (e.target == e.currentTarget) {
                this.state = false
                this.render()
            }
        })
    }

    displayData(title, data) {
        this.show(title, () => {
            return new Promise((resolve, reject) => resolve(data))
        })
    }

    show(title, promise) {
        this.state = true
        this.render()

        // Putting elements
        this.el.querySelector(".title").innerHTML = title
        promise().then(data => {
            // Reset
            this.el.querySelector(".container").innerHTML = ""

            data.forEach(row => {
                this.el.querySelector(".container").innerHTML += `<div class="row">
                <div class="variable">${row.name}</div>
                <div class="value">${row.value}</div>
                </div>`
            })
        })
    }

    render() {
        if (this.state == true) {
            this.el.style.display = "flex"
        } else {
            this.el.style.display = "none"
        }
    }
}

class Controller {
    constructor() {
        const bob = new Bob("dp3t")
        const alice = new Alice("dp3t")
        const charlie = new Charlie("dp3t")
        const david = new David("dp3t")
        this.sim = new Simulation(bob, alice, charlie, david);

        this.state = 0;

        this.sim.mode = "dp3t"
        this.sim.today = new Date()

        this.sim.popup = new Popup()

        this.sim.server = new Server()

        this.selector();
        this.listen();
        this.date()
    }

    date() {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options)

        document.querySelector(".control .past").addEventListener("click", e => {
            if (isSameDay(this.sim.today, getDayForIndex(0))) {
                alert("Can't go past the initial date.")
                return 
            }
            this.sim.today = new Date(this.sim.today.getTime() - 1000 * 60 * 60 * 24) // -1 day
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options)
        })
        document.querySelector(".control .future").addEventListener("click", e => {
            if (isSameDay(this.sim.today, getDayForIndex(13))) {
                alert("Can't go any further. Sorry.")
                return 
            }
            this.sim.today = new Date(this.sim.today.getTime() + 1000 * 60 * 60 * 24) // +1 day
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options)
        })
    }

    listen() {
        // Bottom Segmented Control
        document.querySelectorAll(".app > .selector > div").forEach((el, i) => {
            el.addEventListener("click", (e) => {
                this.state = i;
                this.selector();
            });
        })
        // Panel Segmented Control
        document.querySelectorAll(".panel > .selector > div").forEach((el, i) => {
            el.addEventListener("click", (e) => {
                this.sim.panelState = i;
                this.sim.panel();
                this.selector();
            });
        })
        // Server
        document.querySelector(".server.show").addEventListener("click", e => {
            this.sim.server.display(this.sim.popup)
        })
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
        })
        // Panel
        document.querySelectorAll(".panel > .selector > div").forEach((el, i) => {
            if (this.sim.panelState == i) {
                // Active
                el.classList.add("active");
            } else {
                // Inactive
                el.classList.remove("active");
            }
        })
    }

    goToPark() {
        this.sim.isPark = true;
        [this.sim.bob, this.sim.alice, this.sim.charlie, this.sim.david].forEach(person => {
            person.goToPark();
        })
    }
    goToHouse() {
        this.sim.isPark = false;
        [this.sim.bob, this.sim.alice, this.sim.charlie, this.sim.david].forEach(person => {
            person.goToHouse();
        })
    }

    changeMode(mode) {
        this.sim.mode = mode
        const msg = new Notification("mode", {
            mode: mode
        })

        new NotificationCenter().default.post(msg)
    }
}

let con = new Controller();