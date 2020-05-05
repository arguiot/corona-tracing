import Controller from "./Controller"

let con = new Controller();

con.reset = () => {
    clearInterval(con.sim.interval)
    cancelAnimationFrame(con.sim.animationFrame)
    con.init()
}

export default con