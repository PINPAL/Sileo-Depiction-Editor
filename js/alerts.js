
//Hide popup when clicking on background ONLY (prevent propagation of onClick)
document.getElementById("alertContainer").addEventListener("click", function (e) {
    e = window.event || e;
    if (this === e.target) {
        hideAlert()
    }
});

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
    document.getElementById("alertErrors").innerHTML = ""
    document.getElementsByTagName("body")[0].classList.remove("alertVisible")
    document.getElementById("editTabsUI").style.display = "none"
    document.getElementById("editBannerUI").style.display = "none"
}

// Function to create an alert
function createAlert(headerString,subheaderString,contentType,saveEvent) {
    document.getElementById("alertHeader").innerText = headerString
    document.getElementById("alertSubheader").innerText = subheaderString
    document.getElementById("alertButton").setAttribute("onClick",saveEvent)
    if (contentType == "editTabUI") {
        // Show correct content
        document.getElementById("editTabsUI").style.display = "inline"
        // Create Tab List
        updateTabEditUI()
    } else if (contentType == "editImageUI") {
        // Set Placeholder of banner URL text field
        if (config.headerImage) {
            document.getElementById("bannerUrlField").setAttribute("placeholder",config.headerImage)
        }
        // Show correct content
        document.getElementById("editBannerUI").style.display = "inline"
    } else {
        document.getElementById("alertContent").innerHTML = contentType
    }
    document.getElementsByTagName("body")[0].classList.add("alertVisible")
}