import Broadcast from "@arguiot/broadcast.js"
const { NotificationCenter, Notification } = Broadcast

class Server {
    constructor() {
        this.slots = []
        this.dayKeys = []
    }
    addKeys(name, slots, dayKeys) {
        this.dayKeys.push(...dayKeys)
        const Slots = slots.map(el => el.timeSlots)
        const array = [].concat.apply([], Slots)
        array.forEach(slot => {
            if (slot.hadContact == true) {
                this.slots.push(slot)
                const msg = new Notification("server", {
                    slot: slot,
                    from: name
                })
                NotificationCenter.default.post(msg)
            }
        })
    }
    display(popup) {
        popup.show(glot.get("serverdata"), () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.dayKeys.map(el => {
                        el.name = el.time.toLocaleDateString()
                        el.value = con.sim.toHex(el.broadcastId)
                        return el
                    }))
                }, 0)
            })
        })
    }
}

export default Server