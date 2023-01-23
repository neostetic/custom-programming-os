let clocksHere = document.getElementsByClassName("clockHere");

const startUp = () => {
    for (let i = 0; i < clocksHere.length; i++) {
        startTime(clocksHere[i])
    }
}

const startTime = (element) => {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    element.innerHTML =  h + ":" + m;
    setTimeout(startTime, 10000);
}

const checkTime = (i) => {
    if (i < 10) {i = "0" + i};
    return i;
}