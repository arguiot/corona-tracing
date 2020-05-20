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
        // In case the tour is going on...
        window.tour.hide()
        window.tour.isShown = false

        // Putting elements
        this.el.querySelector(".title").innerHTML = title

        glot.assign("loading", {
            "en": "Loading...",
            "fr": "Chargement...",
            "de": "Laden...",
            "es": "Cargando..."
        })

        this.el.querySelector(".container").innerHTML = "<div class=\"center\">" + glot.get("loading") + "</div>"

        promise().then(data => {
            // Reset
            this.el.querySelector(".container").innerHTML = ""

            if (data.length == 0) {
                glot.assign("nodata", {
                    "en": "No Data",
                    "fr": "Pas de données",
                    "de": "Keine Daten",
                    "es": "No hay datos"
                })

                glot.assign("hint", {
                    "en": "Data will appear, if someone reported himself as infected.",
                    "fr": "Des données apparaîtront, si quelqu'un se déclare lui-même infecté.",
                    "de": "Daten erscheinen, wenn sich jemand als infiziert gemeldet hat.",
                    "es": "Los datos aparecerán, si alguien se reporta como infectado."
                })

                this.el.querySelector(".container").innerHTML = `<div class="center">
                                                                    ${glot.get("nodata")}
                                                                </div>
                                                                <div style="text-align: center">
                                                                    ${glot.get("hint")}
                                                                </div>
                                                                `
            }
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

export default Popup