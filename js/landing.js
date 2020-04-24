const glot = new Glottologist()

glot.assign("step1-bold", {
    en: "Alice’s phone broadcasts a random message every few minutes"
})

glot.assign("step1-text", {
    en: `In order to maintain user privacy, the message is sent over Bluetooth and does not use location for proximity detection.
    <br><br>
    This message is called a Proximity Identifier or <code>EphID</code>. Theses identifiers are unique and change often.`
})

glot.assign("step2-bold", {
    en: "Alice and Bob meet each other for the first time and have a 10-minute conversation."
})

glot.assign("step2-text", {
    en: `While they discuss, their phone keep sending random messages.
    <br><br>
    Alice doesn’t have any symptoms and Bob doesn’t know that she is contagious.`
})

glot.assign("step2.5-bold", {
    en: "Their phones exchange anonymous identifier beacons (which change frequently)."
})
glot.assign("step2.5-text", {
    en: `Both phones remember what they said and heard from each other in the past 14 days.
    <br><br>
    With no servers involved, only the phones know that they have been in contact.`
})

glot.assign("step3-bold", {
    en: "Alice is positively diagnosed for COVID-19 and enters the test result in an app from a public health authority."
})
glot.assign("step3-text", {
    en: `With Alice’s consent, his phone uploads the last 14 days of keys for his broadcast beacons to the cloud.`
})

glot.assign("step4-bold", {
    en: "Bob’s phone periodically downloads the broadcast beacon keys of everyone who has tested positive for COVID-19 in her region. "
})
glot.assign("step4-text", {
    en: `A match is found with Alice’s anonymous identifier beacons.
    <br><br>
    Bob’s phone receives a notification with information about what to do next.
    `
})
// Text Scramble
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        if (newText == oldText) {
            return
        }
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);

        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 15);
            const end = Math.floor(Math.random() * 15) + start;
            this.queue.push({
                from,
                to,
                start,
                end
            });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {
                from,
                to,
                start,
                end,
                char
            } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class='dud'>${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

// Slides / Scroll controller
class SlideController {
    constructor() {
        this.setUpScramble()
        addEventListener("scroll", () => {
            requestAnimationFrame(this.effectRendering.bind(this))
        })

        this.render("1")
    }

    setUpScramble() {
        this.title = new TextScramble(document.querySelector(".text > h1 > span"))
        this.bold = new TextScramble(document.querySelector(".text > .bold"))
        this.text = new TextScramble(document.querySelector(".text > p"))
    }

    effectRendering() {
        const step = window.innerHeight
        let scrolled = window.scrollY // Monitoring for the article only

        if (window.matchMedia && window.matchMedia('(max-width: 1470px)').matches) {
            scrolled -= 500
        }
        let nstep = Math.floor((scrolled + 200) / step) // Max = 5
        if (nstep >= 5) {
            nstep = 5
        } else if (nstep <= 1) {
            nstep = 1
        }

        if (nstep == 3) {
            this.render("2.5")
        } else if (nstep >= 4) {
            this.render(String(nstep - 1))
        } else {
            this.render(String(nstep))
        }
    }

    render(step) {
        if (this.lastStep == step || parseInt(step) <= 0) {
            return
        }
        this.title.setText(step)
        this.bold.setText(glot.get(`step${step}-bold`))
        this.text.setText(glot.get(`step${step}-text`))

        this.lastStep = step
    }
}

const slides = new SlideController()