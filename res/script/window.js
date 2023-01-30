let windows = []
let icons = []
let zIndex = 60
let centerDeflection = 32
let desktop = document.getElementById("desktop")
let taskbar = document.getElementById("taskbarIcons")

document.addEventListener("mousemove", (e) => {
    let targetWindow = e.target;
    if (targetWindow.id.includes("-dragger")) {
        dragElement(document.getElementById(targetWindow.id.toString().replace("-dragger", "")))
    }
})

document.addEventListener("click", async (e) => {
    let targetClicked = e.target;
    if (targetClicked.id.includes("-min")) minimazeElement(document.getElementById(targetClicked.id.toString().replace("-min", '')))
    else if (targetClicked.id.includes("-max")) maximazeElement(document.getElementById(targetClicked.id.toString().replace("-max", '')))
    else if (targetClicked.id.includes("-off")) await deleteElement(document.getElementById(targetClicked.id.toString().replace("-off", '')))
    if (targetClicked.id.includes("-icon")) setOnTop(document.getElementById(targetClicked.id.toString().replace("-icon", "")))
})

function minimazeElement(elmnt) {console.log("min")}
function maximazeElement(elmnt) {console.log("max")}

async function deleteElement(elmnt) {
    let element = document.getElementById(elmnt.id)
    let elementIcon = document.getElementById(element.id + "-icon")
    // for (let i = 0; i < windows.length; i++) if (!document.getElementById(windows[i].id)) delete windows[i]
    // for (let i = 0; i < icons.length; i++) if (!document.getElementById(icons[i].id)) delete icons[i]
    // windows.sort()
    // windows.length = windows.length - 1
    // icons.sort()
    // icons.length = icons.length - 1
    element.style.transform = "scale(0)"
    elementIcon.style.width = '0'
    await sleep(200)
    // element.remove()
    // elementIcon.remove()
}

async function createWindow(innerHTML, title, icon, resizable, center) {
    const id = "window_" + randomString(24)
    const window = document.createElement("div")
    let resizer = ''
    if (resizable) resizer = "resizable"
    if (!icon) icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32s14.3-32 32-32z\"/></svg>"
    if (!title) title = "Window"
    window.id = id
    window.classList.add("desktop-window")
    window.innerHTML = '' +
        '<div class="desktop-window-header">' +
        '<div class="desktop-window-header-title" id="' + id + '-dragger">' +
        '<div class="desktop-window-header-title-icon">' +
        icon +
        '</div>' +
        title +
        '</div>' +
        '<div class="desktop-window-header-tools">' +
        '<div class="desktop-window-header-tools-min" id="' + id + '-min"></div>' +
        '<div class="desktop-window-header-tools-max" id="' + id + '-max"></div>' +
        '<div class="desktop-window-header-tools-off" id="' + id + '-off"></div>' +
        '</div>' +
        '</div>' +
        '<div class="desktop-window-content ' + resizer + '">' +
        innerHTML +
        '<div>' +
        '<button>Okay</button>' +
        '<button>Cancel</button>' +
        '</div>' +
        '</div>'
    desktop.appendChild(window)
    if (center) {
        window.style.top = ((desktop.offsetHeight / 2) - (window.clientHeight / 2) + windows.length * centerDeflection) + "px"
        window.style.left = ((desktop.offsetWidth / 2) - (window.clientWidth / 2) + windows.length * centerDeflection) + "px"
    }
    window.classList.add("scaleIn")
    requestAnimationFrame(() => {
        window.classList.remove("scaleIn")
    })
    windows.push(window)
    createIcon(id)
    setOnTop(document.getElementById(id))
}

function createIcon(windowId) {
    const icon = document.createElement("div")
    icon.id = windowId + "-icon"
    icon.classList.add("taskbar-icon")
    icon.classList.add("taskbar-icon-active")
    icon.innerHTML = document.getElementById(windowId).getElementsByClassName("desktop-window-header-title-icon")[0].innerHTML
    taskbar.appendChild(icon)
    icon.classList.add("widthIn")
    requestAnimationFrame(() => {
        icon.classList.remove("widthIn")
    })
    icons.push(icon)
}

function iconsFocus(windowId) {
    for (let i = 0; i < icons.length; i++) {
        if (icons[i].id.includes(windowId)) {
            document.getElementById(icons[i].id).classList.add("taskbar-icon-focus")
        } else {
            if (document.getElementById(icons[i].id).classList.contains("taskbar-icon-focus")) {
                document.getElementById(icons[i].id).classList.remove("taskbar-icon-focus")
            }
        }
        icons[i] = document.getElementById(icons[i].id)
    }
}

createWindow(
    "<p>Good morning</p>",
    "Welcome message",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32s14.3-32 32-32z\"/></svg>",
    false,
    true
)

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-dragger")) {
        document.getElementById(elmnt.id + "-dragger").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    elmnt.onmousedown = () => setOnTop(elmnt)


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function setOnTop(element) {
    element.style.zIndex = zIndex + ""
    zIndex++
    iconsFocus(element.id.replace("-dragger", ""))
}