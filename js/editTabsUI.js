// Function called when refreshing or making changes to tablist in EditTabUI
function updateTabEditUI() {
    // Get tab names from text fields
    editedTabs = document.getElementsByClassName("tabNameField")
    // Loop all edited tabs text fields
    for (i=0; i<editedTabs.length; i++) {
        // Set config tab name to text field value
        try {
            // Check Tabname is not blank
            if (editedTabs[i].value != "") {
                config.tabs[i].tabname = editedTabs[i].value
            }
        } catch (error) {}
    }
    // Wipe exisitng tab list
    document.getElementById("tabEditorTable").innerHTML = ""
    // Loop all existing tabs in config
    for (currentTab = 0; currentTab < config.tabs.length; currentTab++) {
        // Create Table Cell
        var tabEditorCell = document.createElement("div")
        tabEditorCell.className = "tabEditorCell"
        tabEditorCell.id = config.tabs[currentTab].tabname + "tabEditorCell"
        // Create Name Input
        var tabNameField = document.createElement("input")
        tabNameField.setAttribute("type","text")
        tabNameField.setAttribute("placeholder","Tab Name")
        tabNameField.className = "tabNameField"
        // Check Tabname is not generic
        if (config.tabs[currentTab].tabname != "Tab Name") {
            tabNameField.value = config.tabs[currentTab].tabname
        }
        tabEditorCell.appendChild(tabNameField)
        // Create Delete Button
        var deleteButton = document.createElement("div")
        deleteButton.className = "deleteField"
        deleteButton.setAttribute("onClick","deleteTab(this)")
        tabEditorCell.appendChild(deleteButton)
        // Append to editor tab list
        document.getElementById("tabEditorTable").appendChild(tabEditorCell)
    }
}

// Function called when user clicks "Delete Tab" on EditTabsUI
function deleteTab(element) {
    // Find which tab index user is deleting
    let node = element
    for (var i=0; (node=node.previousSibling); i++);
    // Delete Tab
    config.tabs.splice(i-1, 1)
    // Refresh UI
    updateTabEditUI()
}

// Function called when user clicks "Save Changes" on EditTabsUI
function saveEditTabs() {
    // Save name changes & refresh
    updateTabEditUI()
    // Re-render Preview
    renderSileoDepiction(config)
    // Hide popup
    hideAlert()
}

// Function called when user clicks "Add New Tab" on EditTabsUI
function addNewTab() {
    // Add New Tab
    config.tabs.push({"tabname":"Tab Name","views":[]})
    // Refresh UI
    updateTabEditUI()
}