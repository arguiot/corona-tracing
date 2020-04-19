class Person {
    constructor() {
        this.x = 75;
        this.y = 75;

        this.minX = 10;
        this.maxX = 140;
        this.minY = 10;
        this.maxY = 140;

        this.contagious = false;
        this.alerted = false;

        this.ephID = "";

        this.past = new Set();
        this.heard = new Set();

        this.vx = 1;
        this.vy = 1;
        this.d = Math.random() * (2 * Math.PI);

        this.wave = 0;
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
        this.pastX = this.x;
        this.pastY = this.y;

        this.minX = 10;
        this.maxX = 290;

        this.minY = 160;
        this.maxY = 290;

        this.y += 150;
    }

    goToHouse() {
        this.x = this.pastX;
        this.y = this.pastY;

        this.minX = this.pastMinX;
        this.maxX = this.pastMaxX;

        this.minY = 10;
        this.maxY = 140;
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
}

class Bob extends Person {
    constructor() {
        super();

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
        super();

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
        super();

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
        super();

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
        if (window.devicePixelRatio > 1) {
            var canvasWidth = this.canvas.width;
            var canvasHeight = this.canvas.height;

            this.canvas.width = canvasWidth * window.devicePixelRatio;
            this.canvas.height = canvasHeight * window.devicePixelRatio;
            this.canvas.style.width = canvasWidth;
            this.canvas.style.height = canvasHeight;

            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        this.draw();

        setInterval(this.panel.bind(this), 1000);
    }

    draw() {
        this.monitor();

        // Update
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Layout
        this.ctx.fillStyle = "#000";
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(0, 0, 300, 300);
        this.ctx.strokeRect(0, 0, 150, 75);
        this.ctx.strokeRect(0, 75, 150, 75);
        this.ctx.strokeRect(150, 0, 150, 75);
        this.ctx.strokeRect(150, 75, 150, 75);
        // Text
        this.ctx.font = "12px sans-serif";
        this.ctx.fillText("Bob's House", 41, 130, 70);
        this.ctx.fillText("Alice's House", 185, 130, 80);
        this.ctx.fillText("Charlie's House", 180, 60);
        this.ctx.fillText("David's House", 35, 60);
        this.ctx.fillText("Park", 135, 285);

        // Persons
        this.ctx.lineWidth = 2;

        [this.bob, this.alice, this.charlie, this.david].forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 6, 0, Math.PI * 2, true); // Inner circle
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.wave, 0, Math.PI * 2, true); // Outer circle
            this.ctx.globalAlpha = 1 - p.wave / 25;
            this.ctx.strokeStyle = "#76B7FF";
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;

            if (p.contagious) {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, 8.5, 0, Math.PI * 2, true); // Outer circle
                this.ctx.strokeStyle = "#DD3D12";
                this.ctx.stroke();
            }

            p.update()
        })
        // Redraw
        window.requestAnimationFrame(this.draw.bind(this));
    }

    monitor() {
        if (this.isPark == true) {
            [this.bob, this.alice, this.david, this.charlie].forEach(p => {
                [this.bob, this.alice, this.david, this.charlie].forEach(pp => {
                    const diffX = p.x - pp.x;
                    const diffY = p.y - pp.y;

                    const dist = Math.sqrt(diffX * diffX + diffY * diffY);
                    if (dist <= 40 && (p.contagious == true || pp.contagious == true)) {
                        p.heard.add(pp.ephID);
                        pp.heard.add(p.ephID);

                        p.contagious = true;
                        pp.contagious = true;
                    }
                })
            })
        }
    }

    panel() {
        const i = this.panelState
        const persons = [this.bob, this.alice, this.charlie, this.david]
        document.querySelector(".contagious").innerHTML = persons[i].contagious;
        document.querySelector(".alerted").innerHTML = persons[i].alerted;
        document.querySelector(".ephid").innerHTML = persons[i].ephid;
        // document.querySelector(".past").innerHTML = Array.from(
        //     persons[i].past
        // ).join(", ");
        // document.querySelector(".heard").innerHTML = Array.from(
        //     persons[i].heard
        // ).join(", ");
    }
}

class Controller {
    constructor() {
        const bob = new Bob()
        const alice = new Alice()
        const charlie = new Charlie()
        const david = new David()
        this.sim = new Simulation(bob, alice, charlie, david);

        this.state = 0;

        this.selector();
        this.listen();
    }
    listen() {
        // Bottom Segmented Control
        document.querySelectorAll("body > .selector > div").forEach((el, i) => {
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
    }
    selector() {
        // Bottom Segmented Control
        document.querySelectorAll("body > .selector > div").forEach((el, i) => {
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
        this.sim.bob.goToPark();
        this.sim.alice.goToPark();
    }
    goToHouse() {
        this.sim.isPark = false;
        this.sim.bob.goToHouse();
        this.sim.alice.goToHouse();
    }
}

const con = new Controller();