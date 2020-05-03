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
        this.title = new TextScramble(document.querySelector(".text > h1 > span.digit"))
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