const glot = new Glottologist()

glot.assign("title", {
    "en": "Privacy-friendly contact tracking",
    "fr": "Traçage de contact préservant la vie privée",
    "de": "Datenschutzfreundliche Kontaktverfolgung",
    "es": "Seguimiento de contactos amigable con la privacidad"
})
glot.assign("description", {
    "en": "Governments and health authorities around the world are working together to find solutions to the COVID-19 pandemic, to protect people and to get society back on its feet. ",
    "fr": "Partout dans le monde, les gouvernements et les autorités sanitaires travaillent ensemble pour trouver des solutions à la pandémie de COVID-19, pour protéger les personnes et remettre la société sur pied. Les développeurs de logiciels apportent leur contribution en concevant des outils techniques pour aider à combattre le virus et à sauver des vies.\n    <br>\n    Au cours des dernières semaines, certaines inquiétudes concernant certaines technologies de suivi ont été soulevées par ceux qui craignent une restriction des libertés individuelles et de leur vie privée.\n    <br>\n    Chez CrypTool, nous essayons d'expliquer au mieux ce qui se cache dans ces protocoles de traçage décentralisés afin que vous puissiez vous faire votre propre opinion sur le sujet.",
    "de": "Regierungen und Gesundheitsbehörden auf der ganzen Welt arbeiten zusammen, um Lösungen für die COVID-19-Pandemie zu finden, Menschen zu schützen und die Gesellschaft wieder auf die Beine zu stellen. ",
    "es": "Los gobiernos y las autoridades sanitarias de todo el mundo están trabajando juntos para encontrar soluciones a la pandemia de COVID-19, para proteger a las personas y para que la sociedad vuelva a sus pies. "
})
glot.assign("step1-bold", {
    "en": "Alice’s phone broadcasts a random message every few minutes",
    "fr": "Le téléphone d'Alice diffuse un message aléatoire toutes les quelques minutes"
})
glot.assign("step1-text", {
    "en": "In order to maintain user privacy, the message is sent over Bluetooth and does not use location for proximity detection.\n    <br><br>\n    This message is called a Proximity Identifier or <code>EphID</code>. Theses identifiers are unique and change often.",
    "fr": "Afin de préserver la vie privée des utilisateurs, le message est envoyé par Bluetooth et n'utilise pas la localisation pour la détection de proximité.\n    <br><br>\n    Ce message s'appelle un identifiant de proximité ou <code>EphID</code>. Ces identificateurs sont uniques et changent souvent."
})
glot.assign("step2-bold", {
    "en": "Alice and Bob meet each other for the first time and have a 10-minute conversation.",
    "fr": "Alice et Bob se rencontrent pour la première fois et ont une conversation de 10 minutes."
})
glot.assign("step2-text", {
    "en": "While they discuss, their phone keep sending random messages.\n    <br><br>\n    Alice doesn’t have any symptoms and Bob doesn’t know that she is contagious.",
    "fr": "Pendant qu'ils discutent, leur téléphone continue d'envoyer des messages aléatoires.\n    <br><br>\n    Alice n'a aucun symptôme et Bob ne sait pas qu'elle est contagieuse."
})
glot.assign("step2.5-bold", {
    "en": "Their phones exchange anonymous identifier beacons (which change frequently).",
    "fr": "Leurs téléphones échangent des balises d'identification anonymes (qui changent fréquemment)."
})
glot.assign("step2.5-text", {
    "en": "Both phones remember what they said and heard from each other in the past 14 days.\n    <br><br>\n    With no servers involved, only the phones know that they have been in contact.",
    "fr": "Les deux téléphones se souviennent de ce qu'ils ont dit et entendu l'un de l'autre au cours des 14 derniers jours.\n    <br><br>\n    En l'absence de serveurs, seuls les téléphones savent qu'ils ont été en contact."
})
glot.assign("step3-bold", {
    "en": "Alice is positively diagnosed for COVID-19 and enters the test result in an app from a public health authority.",
    "fr": "Alice reçoit un diagnostic positif de COVID-19 et saisit le résultat du test dans une application d'une autorité de santé publique."
})
glot.assign("step3-text", {
    "en": "With Alice’s consent, his phone uploads the last 14 days of keys for his broadcast beacons to the cloud.",
    "fr": "Avec l'accord d'Alice, son téléphone télécharge les 14 derniers jours de clés pour ses balises de diffusion dans le cloud."
})
glot.assign("step4-bold", {
    "en": "Bob’s phone periodically downloads the broadcast beacon keys of everyone who has tested positive for COVID-19 in her region.",
    "fr": "Le téléphone de Bob télécharge périodiquement les clés des balises de diffusion de tous ceux qui ont été testés positifs pour COVID-19 dans sa région."
})
glot.assign("step4-text", {
    "en": "A match is found with Alice’s anonymous identifier beacons.\n    <br><br>\n    Bob’s phone receives a notification with information about what to do next.\n    ",
    "fr": "Une correspondance est trouvée avec les balises d'identification anonymes d'Alice.\n    <br><br>\n    Le téléphone de Bob reçoit une notification contenant des informations sur la marche à suivre."
})
glot.assign("step", {
    "en": "Step",
    "fr": "Étape",
    "de": "Schritt",
    "es": "Paso"
})
glot.assign("try", {
    "en": "Try it yourself!",
    "fr": "Essayez-le vous-même!",
    "de": "Versuch es selber!",
    "es": "¡Inténtalo tú mismo!"
})
glot.assign("try-desc", {
    "en": "We have made a small animation, so that you can visualize each step of the protocol.",
    "fr": "Nous avons réalisé une petite animation, afin que vous puissiez visualiser chaque étape du protocole.",
    "de": "Wir haben eine kleine Animation erstellt, damit Sie jeden Schritt des Protokolls visualisieren können.",
    "es": "Hemos realizado una pequeña animación para que pueda visualizar cada paso del protocolo."
})
glot.assign("contagious", {
    "en": "Contagious",
    "fr": "Contagieux",
    "de": "Ansteckend",
    "es": "Contagioso"
})
glot.assign("alerted", {
    "en": "Alerted about infectivity",
    "fr": "Alerte sur l'infectiosité",
    "de": "Alarmiert über Infektiosität",
    "es": "Alertado sobre infectividad"
})
glot.assign("initial-key", {
    "en": "Secret Initial Key",
    "fr": "Clé initiale secrète",
    "de": "Geheimer Anfangsschlüssel",
    "es": "Clave inicial secreta"
})
glot.assign("secret-day", {
    "en": "Secret Day Key",
    "fr": "Clé du jour secret",
    "de": "Geheimer Tagesschlüssel",
    "es": "Clave del día secreto"
})
glot.assign("past", {
    "en": "Past EphIDs (of the day)",
    "fr": "EphID antérieurs (du jour)",
    "de": "Vergangene EphIDs (des Tages)",
    "es": "EphID pasados (del día)"
})

glot.render()


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