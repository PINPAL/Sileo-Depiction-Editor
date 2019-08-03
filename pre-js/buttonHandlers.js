// Function called when user clicks "Add View" button
var newViewIndex
function callAddViewUI(element) {
    newViewIndex = indexInClass(element, document.getElementsByClassName("tabContent")[currentViewingTab])
    createAlert(
        "Add View",
        "Add Section to " + element.parentElement.id.slice(0,-7),
        "addViewUI",
        null
    )
    // Focus New View Position
    document.getElementById("previewElementFocuser").style.display = "inline"
    element.classList.add("focused")
}

// Function called when user clicks "edit image" button
function editImage(imageForEditing) {
    createAlert(
                "Change Image",
                "Package Header Banner",
                "editImageUI",
                "saveBanner()"
    )
}



// Function called when user clicks "Edit View" button 
function editView(element) {
    var viewIndex = indexInClass(element, document.getElementsByClassName("tabContent")[currentViewingTab])
    var currentView = config.tabs[currentViewingTab].views[viewIndex]
    var type = currentView.class
    var typeName = type.replace(/(Depiction)|(View)/g,"");
    createAlert(
        "Edit " + typeName,
        "Customize " + typeName + " Content",
        "edit" + type,
        "alert('sorry no work yet')"
    )
    // Focus View Position
    document.getElementById("previewElementFocuser").style.display = "inline"
    element.classList.add("focused")
}

// Function called when user clicks "Add Tab" button
function editTabs() {
    createAlert (
        "Edit Tabs",
        "Create or Edit Section Tabs",
        "editTabUI",
        "saveEditTabs()"
    )
    // Focus Tabs in Preview
    document.getElementById("previewElementFocuser").style.display = "inline"
    document.getElementsByClassName("headerPillSelector")[0].classList.add("focused")
}

// Function called when user clicks "Tint Color" button
function editTintColor() {
    createAlert (
        "Edit Tint Color",
        "Edit Main Accent Color",
        "editTintColorUI",
        null
    )
}

// Function called when user clicks any "cancel" button
function cancelChanges() {
    config = backupConfig
    renderSileoDepiction(config)
    hideAlert()
}

// Function called by buttons that toggle dark mode on/off
function toggleDarkMode(element) {
    var darkModeStatus = getCookie("enableDarkMode")
    if (darkModeStatus) {
        element.innerText = "Dark Mode"
        setCookie("enableDarkMode",false)
    } else {
        element.innerText = "Light Mode"
        setCookie("enableDarkMode",true)
    }
    refreshDarkMode()
}

// Function called when user clicks "Toggle Edit UI"
function toggleEditUI(element) {
    if (element.innerText == "Edit Mode") {
        element.style.backgroundImage = "url('img/previewMode.svg')"
        element.innerText = "Preview Mode"
    } else {
        element.style.backgroundImage = "url('img/editMode.svg')"
        element.innerText = "Edit Mode"
    }
    document.getElementsByTagName("body")[0].classList.toggle("hideEditUI")
}