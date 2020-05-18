import Controller from "./Controller"

let con = new Controller();

con.reset = (protocol = "dp3t") => {
    window.clearAllInterval()
    cancelAnimationFrame(con.sim.animationFrame)

    con.sim.removeListeners(document.querySelector(".app"))

    con.init(protocol)

    tour.hide()
    tour.isShown = false
}

export default con