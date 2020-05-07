import Controller from "./Controller"

let con = new Controller();

con.reset = (protocol = "dp3t") => {
    con.sim.removeListeners(document.querySelector(".app"))

    clearInterval(con.sim.interval)
    cancelAnimationFrame(con.sim.animationFrame)

    document.querySelector("select").value = protocol // So the selector value is the same

    con.init(protocol)
}

export default con