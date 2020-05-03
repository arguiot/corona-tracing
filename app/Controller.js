import { Bob, Alice, Charlie, David } from "./Persons/Everyone"
import Server from "./Server"
import Popup from "./Popup"
import Simulation from "./Simulation"
import Broadcast from "@arguiot/broadcast.js"
const { NotificationCenter, Notification } = Broadcast

import {
    isSameDay,
    getDayForIndex
} from "./utils"

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
        document.querySelector(".now").innerHTML = this.sim.today.toTimeString()

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
            document.querySelector(".now").innerHTML = this.sim.today.toTimeString()
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
            document.querySelector(".now").innerHTML = this.sim.today.toTimeString()
        })

        document.querySelector(".control .plus-min").addEventListener("click", e => {
            if (isSameDay(this.sim.today, getDayForIndex(0))) {
                alert("Can't go past the initial date.")
                return
            }
            this.sim.today = new Date(this.sim.today.getTime() + 5 * 60 * 1000) // + 5 min
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options)
            document.querySelector(".now").innerHTML = this.sim.today.toTimeString()
        })
        document.querySelector(".control .minus-min").addEventListener("click", e => {
            if (isSameDay(this.sim.today, getDayForIndex(13))) {
                alert("Can't go any further. Sorry.")
                return
            }
            this.sim.today = new Date(this.sim.today.getTime() - 5 * 60 * 1000) // - 5 min
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            document.querySelector(".today").innerHTML = this.sim.today.toLocaleDateString(navigator.language || navigator.userLanguage, options)
            document.querySelector(".now").innerHTML = this.sim.today.toTimeString()
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
                glot.render("auto", document.querySelector(".app"))
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

        NotificationCenter.default.post(msg)
    }
}

export default Controller