// Function called when user picks a view to add
function addView(type) {
    let typeName = type.replace(/(Depiction)|(View)/g,"")
    switchAlertPage(
        "Edit " + typeName,
        "Customize " + typeName + " Content",
        "edit" + type,
        "saveNewView('" + type + "')"
    )
}

// Function called when user saves changes on addNewViewUI
function saveNewView(type) {
    let view = {"class":type}
    let editUI = document.getElementById("edit" + type)
    // Handle View
    switch (type) {
        case "DepictionHeaderView":
            // Title
            var title = "Heading Text"
            if (editUI.getElementsByClassName("titleField")[0].value != "") {
                title = editUI.getElementsByClassName("titleField")[0].value
            }
            view.title = title
            // Set other properties
            view.useMargins = editUI.getElementsByClassName("useMargins")[0].checked
            view.useBoldText = editUI.getElementsByClassName("useBoldText")[0].checked
            view.alignment = editUI.getElementsByClassName("alignment")[0].value
            break;
        case "DepictionSubheaderView":
                // Title
                var title = "Subheading Text"
                if (editUI.getElementsByClassName("titleField")[0].value != "") {
                    title = editUI.getElementsByClassName("titleField")[0].value
                }
                view.title = title
                // Set other properties
                view.useMargins = editUI.getElementsByClassName("useMargins")[0].checked
                view.useBoldText = editUI.getElementsByClassName("useBoldText")[0].checked
                break;
        default:
            throw("View is not yet supported")
    }

    // Insert new view
    config.tabs[currentViewingTab].views.splice(
        newViewIndex, // Insert at index (variable is global from when user clicked "add new view" button)
        0, // Delete 0 items
        view // Object to be inserted
    )
    // Re-render Preview
    renderSileoDepiction(config)
    // Hide popup
    hideAlert()
}