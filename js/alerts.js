// Function to display errors in alert window
var errorsArray = []
function displayError(error) {
    errorsArray.push(error)
    document.getElementById("alertErrors").innerHTML = ""
    for (i=0; i<errorsArray.length; i++) {
        var errorDiv = document.createElement("div")
        errorDiv.className = "alertError"
        errorDiv.innerText = errorsArray[i]
        document.getElementById("alertErrors").appendChild(errorDiv)
    }
}

// Function to hide alert 
function hideAlert() {
    document.getElementById("alertButtonContainer").style.display = "none"
    document.getElementById("alertWindow").classList.remove("switchAlertPage")
    document.getElementById("alertErrors").innerHTML = ""
    // Bring back Welcome UI
    createAlert(
        "Welcome",
        "Sileo Depiction Generator",
        "welcomeMessage",
        null
    )
}

// Hide old alert content
function clearAlertContent() {
    let hiddenIDs = [
        "welcomeMessage",
        "editTabsUI",
        "editBannerUI",
        "editTintColorUI",
        "addViewUI",
        "editDepictionHeaderView",
        "editDepictionSubheaderView",
        "editDepictionLabelView",
        "editDepictionMarkdownView",
        "editDepictionImageView",
        "editDepictionScreenshotsView",
        "editDepictionTableTextView",
        "editDepictionTableButtonView",
        "editDepictionSpacerView"
    ]
    // Hide Old Content in Alert
    for (i=0; i<hiddenIDs.length; i++) {
        document.getElementById(hiddenIDs[i]).style.display = "none"
    }
    // Unfocus focussed content
    var focusedElements = document.getElementsByClassName("focused")
    for (i=0; i<focusedElements.length; i++) {
        focusedElements[i].classList.remove("focused")
    }
    // Hide Focus Window
    document.getElementById("previewElementFocuser").style.display = "none"
}

// Function to "scroll" to second alert
function switchAlertPage(headerString, subheaderString, contentType, saveEvent) {
    // Update Alert
    document.getElementById("alertWindow").classList.add("switchAlertPage")
    createAlert(headerString,subheaderString,contentType,saveEvent)
}

// Function to create an alert
function createAlert(headerString,subheaderString,contentType,saveEvent) {
    // Backup Config
    backupConfig = config
    // Hide old content
    clearAlertContent()
    // Update Alert
    document.getElementById("alertHeader").innerText = headerString
    document.getElementById("alertSubheader").innerText = subheaderString
    if (saveEvent != null) {
        document.getElementById("alertButtonContainer").style.display = "block"
        document.getElementById("saveButton").setAttribute("onClick",saveEvent)
    }
    if (contentType == "editTabUI") {
        // Show correct content
        document.getElementById("editTabsUI").style.display = "block"
        // Create Tab List
        updateTabEditUI()
    } else if (contentType == "editImageUI") {
        // Set Placeholder of banner URL text field
        if (config.headerImage) {
            document.getElementById("bannerUrlField").setAttribute("placeholder",config.headerImage)
        }
        // Show correct content
        document.getElementById("editBannerUI").style.display = "block"
    } else {
        document.getElementById(contentType).style.display = "block"
    }
}