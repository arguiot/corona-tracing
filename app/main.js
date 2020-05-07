import Controller from "./Controller"

let con = new Controller();

con.reset = (protocol = "dp3t") => {
    window.clearAllInterval()
    cancelAnimationFrame(con.sim.animationFrame)

    document.querySelector("select").value = protocol // So the selector value is the same

    con.sim.removeListeners(document.querySelector(".app"))

    con.init(protocol)
}

export default con