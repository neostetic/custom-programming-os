window.addEventListener("load", async () => {
    document.getElementById("loadingScreen").style.opacity = '0';
    await sleep(1000)
    document.getElementById("loadingScreen").style.display = "none";
})

let clockHeres = document.getElementsByClassName("clockHere")

const startUp = async () => {
    for (let i = 0; i < clockHeres.length; i++) {
        await startTime(clockHeres[i])
    }
    await sleep(10000)
    await startUp()
}

let isLocked = true;
let lockScreenBlackoutTime = 120000

const lockdown = async () => {
    isLocked = true
    lockScreen.style.top = '0'
}

const password = "password"
let lockScreen = document.getElementById("lockScreen");
let lockScreenInput = document.getElementById("lockScreenInput");

let lockdownTimeout = setTimeout(lockdown, lockScreenBlackoutTime)

const counterEvents = async () => {
    clearTimeout(lockdownTimeout)
    lockdownTimeout = setTimeout(lockdown, lockScreenBlackoutTime)
}

const counterEventsLock = async () => {
    if (isLocked) {
        if (!password) {
            await sleep(120)
            lockScreen.style.top = "-300%"
            isLocked = false
            lockScreenInput.value = ""
        }
    }
    await counterEvents
}

document.onmousemove = counterEvents
document.onkeypress = counterEventsLock


lockScreenInput.oninput = async () => {
    if (isLocked) {
        if (lockScreenInput.value === password) {
            await sleep(120)
            lockScreen.style.top = "-300%"
            isLocked = false;
            lockScreenInput.value = ""
        }
    }
}

const startTime = async (element) => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    element.innerHTML = h + ":" + m;
}

const checkTime = (i) => {
    if (i < 10) {i = "0" + i};
    return i;
}

const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); }
document.addEventListener("mousemove", parallax);

function parallax(event) {
    this.querySelectorAll(".parallax").forEach((shift) => {
        const position = shift.getAttribute("value");
        const x = (window.innerWidth - event.pageX * position) / 90;
        const y = (window.innerHeight - event.pageY * position) / 90;

        shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}
