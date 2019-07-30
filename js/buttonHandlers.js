// Function called when user clicks "Add View" button
var newViewIndex
function callAddViewUI(element) {
    newViewIndex = indexInClass(element)
    createAlert(
        "Add View",
        "Add Section to " + element.parentElement.id.slice(0,-7),
        "addViewUI",
        null
    )
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

// Function called when user clicks "Add Tab" button
function editTabs() {
    createAlert (
        "Edit Tabs",
        "Create or Edit Section Tabs",
        "editTabUI",
        "saveEditTabs()"
    )
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

// Function called when user clicks "Toggle Edit UI"
function toggleEditUI() {
    document.getElementsByTagName("body")[0].classList.toggle("hideEditUI")
}