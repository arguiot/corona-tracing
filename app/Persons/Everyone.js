import Broadcast from "@arguiot/broadcast.js"
const { NotificationCenter, Notification } = Broadcast

import Person from "./Person"

class Bob extends Person {
    constructor() {
        super(...arguments);

        this.name = "Bob"

        this.x = 75;
        this.y = 95;
        this.home = [this.x, this.y]
        this.parkY = this.y + 150

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

        NotificationCenter.default.addObserver("mode", this.setAlgo.bind(this), this.name)

        NotificationCenter.default.addObserver("server", this.notify.bind(this), this.name)
    }
}

class Alice extends Person {
    constructor() {
        super(...arguments);

        this.name = "Alice"

        this.x = 225;
        this.y = 95;
        this.home = [this.x, this.y]
        this.parkY = this.y + 150

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

        NotificationCenter.default.addObserver("mode", this.setAlgo.bind(this), this.name)

        NotificationCenter.default.addObserver("server", this.notify.bind(this), this.name)
    }
}

class Charlie extends Person {
    constructor() {
        super(...arguments);

        this.name = "Charlie"

        this.x = 225;
        this.y = 50;
        this.home = [this.x, this.y]
        this.parkY = this.y + 150

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

        NotificationCenter.default.addObserver("mode", this.setAlgo.bind(this), this.name)

        NotificationCenter.default.addObserver("server", this.notify.bind(this), this.name)
    }
}

class David extends Person {
    constructor() {
        super(...arguments);

        this.name = "David"

        this.x = 75;
        this.y = 35;
        this.home = [this.x, this.y]
        this.parkY = this.y + 150

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

        NotificationCenter.default.addObserver("mode", this.setAlgo.bind(this), this.name)

        NotificationCenter.default.addObserver("server", this.notify.bind(this), this.name)
    }
}

export { Bob, Alice, Charlie, David }