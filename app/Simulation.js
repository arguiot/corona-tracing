import { getDayForIndex } from "./utils"

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

        this.panelListeners()
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
        this.ctx.fillStyle = "#000";
        this.ctx.fillText(glot.get("park"), 135 * scale, 285 * scale);

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
        const persons = [this.bob, this.alice, this.david, this.charlie]
        persons.filter(person => person.isPark).forEach(p => {
            persons.filter(person => person.isPark).forEach(pp => {
                if (p == pp) {
                    return
                }
                const diffX = p.x - pp.x;
                const diffY = p.y - pp.y;

                const dist = Math.sqrt(diffX * diffX + diffY * diffY);
                if (dist <= 40) {
                    this.contact(p, pp)
                }
            })
        })
    }

    panel() {
        const i = this.panelState
        const persons = [this.bob, this.alice, this.charlie, this.david]
        // Values

        document.querySelector(".contagious").innerHTML = glot.get(persons[i].contagious);
        document.querySelector(".alerted").innerHTML = glot.get(persons[i].alerted);
        document.querySelector(".initial").innerHTML = this.toHex(persons[i].initial).substring(0, 10) + "...";
        document.querySelector(".initial").title = this.toHex(persons[i].initial)
        document.querySelector(".day").innerHTML = this.toHex(persons[i].day(this.dayIndex)).substring(0, 10) + "...";
        document.querySelector(".day").title = this.toHex(persons[i].day(this.dayIndex))

        // Interaction

        document.querySelector(".row > .goto").innerHTML = persons[i].isPark == true ? glot.get("gohouse") : glot.get("gopark")
        document.querySelector(".row > .test").innerHTML = persons[i].alerted == false ? glot.get("testcovid") : glot.get("publishcovid")
    }

    panelListeners() {
        const persons = [this.bob, this.alice, this.charlie, this.david]

        document.querySelector(".row > .goto").addEventListener("click", e => {
            const i = this.panelState
            if (persons[i].isPark == true) {
                persons[i].goToHouse()
            } else {
                persons[i].goToPark()
            }
            this.panel()
        })
        document.querySelector(".row > .test").addEventListener("click", e => {
            const i = this.panelState
            if (persons[i].alerted == true) {
                // Publish
                this.server.addKeys(persons[i].name, persons[i].generateBroadcastHistoryFull(), persons[i].getDayKeys())
            } else if (persons[i].contagious == true) {
                persons[i].alerted = true
            }
            this.panel()
        })

        document.querySelector(".past.show").addEventListener("click", e => {
            const i = this.panelState
            this.popup.show(glot.get("namepast", {
                name: persons[i].name
            }), () => {
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
            const i = this.panelState
            this.popup.displayData(glot.get("nameheard", {
                name: persons[i].name
            }), Array.from(persons[i].heard).map(el => {
                el.name = `${el.duration}min${el.duration > 1 ? 's' : ''} at ${el.slot.time.toTimeString()}`
                el.value = this.toHex(el.slot.broadcastId)
                return el
            }))
        })
    }

    contact(p1, p2) {
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

        const todayBroadcast = p1.broadcastHistory[this.dayIndex]
        if (Array.from(p1.heard).map(el => el.slot).includes(slot2[0]) || Array.from(p2.heard).map(el => el.slot).includes(slot1[0])) {
            return
        }

        let result = window.prompt(glot.get("meeting", {
            p1,
            p2
        }), 5)

        if (result == null) { // In case the user tap cancel
            result = 5
        }

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
            if (p1.contagious == true) {
                p2.contagious = true;
            } else {
                p1.contagious = true;
            }
        }
        // Finally, we update the date
        this.today = new Date(this.today.getTime() + 1000 * 60 * parseInt(result))

        if (tour.isActive()) {
            tour.next()
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
        const dayK = Math.floor(Math.abs((this.today - getDayForIndex(0)) / oneDay))
        return dayK
    }
}

export default Simulation