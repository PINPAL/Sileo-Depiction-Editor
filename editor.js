config =
    {
        "class": "DepictionTabView",
        "minVersion": "0.1",
        "tabs": [
            {
                "tabname":"Tab Name",
                "views":[
                    {"class":"DepictionSubheaderView","useBoldText":true,"title":"Test DepictionSubheaderView"},
                    {"class":"DepictionTableTextView","title":"Testing","text":"DepictionTableTextView"}
                ]
            }
        ]
    }

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
        addButton.className = "addViewButton"
        addButton.classList.add("editUI")
        addButton.setAttribute("onClick","callAddViewUI(this)")
        tabContent.appendChild(addButton)
        // Add Content Views to Tab
        for (currentViewNum = 0; currentViewNum < config.tabs[currentTab].views.length; currentViewNum++) {
            var view = handleView(config.tabs[currentTab].views[currentViewNum], false)
            tabContent.appendChild(view)
            // Create Editor Add View Button
            var addButton = document.createElement("div")
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
        // Initial Styling of Pill Selector (Page Load)
        document.getElementsByClassName("pillText")[0].style.color = "var(--tint-color)"
        document.getElementsByClassName("pillSelectorLine")[0].style.left = (50 / config.tabs.length) + "%"
        // Initial Display of Main Content
        document.getElementsByClassName("tabContent")[0].style.display = "block"
    }
}

// Initialise Color Picker on Sidebar
var tintColorPicker = new CP(document.getElementById("sidebarColorPicker"))
document.getElementById("sidebarColorPicker").value = "#2cb1be"
// Update Color Picker when color Changes
tintColorPicker.on("drag", function(color) {
    document.getElementById("sidebarColorPicker").getElementsByTagName("input")[0].value = '#' + color;
    document.getElementsByClassName("colorPreview")[0].style.backgroundColor = '#' + color;
    document.getElementsByTagName('html')[0].style.setProperty("--tint-color", '#' + color)
    config.tintColor = '#' + color
});

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


// Function called when user clicks "Add View" button
var newViewIndex
function callAddViewUI(element) {
    newViewIndex = indexInClass(element)
    createAlert(
        "Add View",
        "Add Section to " + element.parentElement.id.slice(0,-7),
        "addViewUI",
        ""
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

// Function called when user clicks "Toggle Edit UI"
function toggleEditUI() {
    document.getElementsByTagName("body")[0].classList.toggle("hideEditUI")
}

// Switch between tabs (in preview)
var currentViewingTab = 0
function changePillSelector(element) {
    // Reset color of all Pill Texts
    pillTexts = document.getElementsByClassName("pillText")
    for (i=0; i<pillTexts.length; i++) {
        pillTexts[i].style.color = "var(--medium-text-color)"
    }
    // Hide all Tab Content
    tabContents = document.getElementsByClassName("tabContent")
    for (i=0; i<tabContents.length; i++) {
        tabContents[i].style.display = "none"
    }
    // Set currentTab
    currentViewingTab = indexInClass(element)
    // Move Pill Selector Line
    document.getElementsByClassName("pillSelectorLine")[0].style.left = element.style.left
    // Set Color of Selected Pill text 
    element.style.color = "var(--tint-color)"
    // Show Tab Content
    document.getElementById(element.id.slice(0,-6) + "Content").style.display = "block"
}
