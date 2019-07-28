// Function called when user picks a view to add
function addView(type) {
    // Insert new view
    config.tabs[currentViewingTab].views.splice(
        newViewIndex, // Insert at index (variable is global from when user clicked "add new view" button)
        0, // Delete 0 items
        {"class":type} // Object to be inserted (type is passed when user chooses which view to add)
    )
    switchAlertPage(
        "Edit View",
        "Customize View Content",
        "edit" + type,
        ""
    )
}