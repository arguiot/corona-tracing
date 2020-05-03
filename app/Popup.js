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

        this.el.querySelector(".container").innerHTML = "<div class=\"center\">Loading...</div>"

        promise().then(data => {
            // Reset
            this.el.querySelector(".container").innerHTML = ""

            if (data.length == 0) {
                this.el.querySelector(".container").innerHTML = "<div class=\"center\">No data</div>"
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