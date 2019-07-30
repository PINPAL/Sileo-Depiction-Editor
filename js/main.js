var config =
{
    "class": "DepictionTabView",
    "minVersion": "0.1",
    "tabs": [
        {
            "tabname":"Tab Name",
            "views":[]
        }
    ]
}

// Variable that stores which tab the user is currently in
var currentViewingTab = 0

// Render Depiction on page load
renderSileoDepiction(config)

//Generate from Config Function
function renderSileoDepiction(config) {
    // Show Pill Selector
    document.getElementsByClassName("headerPillSelector")[0].style.visibility = "visible"
    // Set Background Color
    if (config.hasOwnProperty('backgroundColor')) {
        document.getElementsByTagName('html')[0].style.setProperty("--bg-color", config.backgroundColor)
    }
    // Set Tint Color
    if (config.hasOwnProperty('tintColor')) {
        document.getElementsByTagName('html')[0].style.setProperty("--tint-color", config.tintColor)
    }
    // Set Banner Image
    if (config.hasOwnProperty('headerImage')) {
        bannerImage.style.backgroundImage = "url(" + config.headerImage + ")"
        bannerImage.style.filter = "brightness(0.5)";
        bannerImage.style.webkitFilter = "brightness(0.5)";
    }
    // Clear Tabs
    document.getElementById("mainWrapper").innerHTML = ""
    document.getElementById("pillSelectors").innerHTML = ""
    // Generate Tabs
    for (currentTab = 0; currentTab < config.tabs.length; currentTab++) {
        // Create Pill Selectors at Top
        var pillText = document.createElement("div")
        pillText.className = "pillText"
        pillText.id = config.tabs[currentTab].tabname + "Button"
        pillText.innerText = config.tabs[currentTab].tabname
        pillText.setAttribute("onclick", "changePillSelector(this)")
        pillText.style.left = (50 / config.tabs.length) * (2 * currentTab + 1) + "%"
        document.getElementById("pillSelectors").appendChild(pillText)
        // Create Tab for Content to Go In
        var tabContent = document.createElement("div")
        tabContent.className = "tabContent"
        tabContent.id = config.tabs[currentTab].tabname + "Content"
        // Create Initial Add View Button
        var addButton = document.createElement("div")
        addButton.innerHTML = "<div></div>"
        addButton.className = "addViewButton"
        addButton.classList.add("editUI")
        addButton.setAttribute("onClick","callAddViewUI(this)")
        tabContent.appendChild(addButton)
        // Add Content Views to Tab
        for (currentViewNum = 0; currentViewNum < config.tabs[currentTab].views.length; currentViewNum++) {
            // Handle View
            var view = handleView(config.tabs[currentTab].views[currentViewNum], false)
            tabContent.appendChild(view)
            // Create Editor Add View Button
            var addButton = document.createElement("div")
            addButton.innerHTML = "<div></div>"
            addButton.className = "addViewButton"
            addButton.classList.add("editUI")
            addButton.setAttribute("onClick","callAddViewUI(this)")
            tabContent.appendChild(addButton)
        }
        // Handle Landscape Oreintation of StackViews
        var landscapeOrientationObjects = document.getElementsByClassName("landscapeOrientation")
        // Loop Every Single Landscape StackView
        for (i = 0; i < landscapeOrientationObjects.length; i++) {
            // Loop Every Child View within the StackView
            for (j = 0; j < landscapeOrientationObjects[i].childNodes.length; j++) {
                landscapeOrientationObjects[i].childNodes[j].style.display = "inline-block"
                landscapeOrientationObjects[i].childNodes[j].style.width = "50%"
            }
        }
        // Add Tab Content to MainWrapper
        document.getElementById("mainWrapper").appendChild(tabContent)
    }
    // Initial Styling of Pill Selector (Switch to the currently being viewed tab)
    changePillSelector(document.getElementsByClassName("pillText")[currentViewingTab])
}

// Update Dark Mode Button Status on page load
if (getCookie("enableDarkMode")) {
    document.getElementById("darkModeButton").innerText = "Light Mode"
}

// Function to export JSON
function downloadConfig() {
    //Export to text file
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(config))
    element.setAttribute('download', "SileoDepiction.json");
    element.click();
}

// Function to return node index within a classname
function indexInClass(node) {
    let elementsInClass = document.getElementsByClassName(node.className)
    let num = 0;
    for (var i = 0; i < elementsInClass.length; i++) {
      if (elementsInClass[i] === node) {
        return num;
      }
      num++;
    }
    return -1;
}

// Function to validate image URL
function validateImageURL(imageURL) {
    if (imageURL.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) {
        return true
    }
    return false
}


