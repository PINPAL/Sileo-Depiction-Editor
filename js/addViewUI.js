// Function called when user picks a view to add
function addView(type) {
    let typeName = type.replace(/(Depiction)|(View)/g,"")
    if (typeName == "Separator") {
        saveNewView("DepictionSeparatorView")
    } else {
        switchAlertPage(
            "Edit " + typeName,
            "Customize " + typeName + " Content",
            "edit" + type,
            "saveNewView('" + type + "')"
        )
    }
}

// Configure Markdown View Editor
var simplemde = new SimpleMDE({
    status: ["lines", "words"],
    hideIcons: ["guide","fullscreen","side-by-side"],
    element: document.getElementById("markdownTextField")
})

// Function called when user saves changes on addNewViewUI
function saveNewView(type) {
    let view = {"class":type}
    let editUI = document.getElementById("edit" + type)
    // Handle View
    switch (type) {

        case "DepictionHeaderView":
            // Title
            var title = "Heading Title"
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
            var title = "Subheading Title"
            if (editUI.getElementsByClassName("titleField")[0].value != "") {
                title = editUI.getElementsByClassName("titleField")[0].value
            }
            view.title = title
            // Set other properties
            view.useMargins = editUI.getElementsByClassName("useMargins")[0].checked
            view.useBoldText = editUI.getElementsByClassName("useBoldText")[0].checked
            break;
        
        case "DepictionLabelView":
            // Title
            var text = "Label Text"
            if (editUI.getElementsByClassName("textField")[0].value != "") {
                text = editUI.getElementsByClassName("textField")[0].value
            }
            view.text = text
            // Set other properties
            view.alignment = editUI.getElementsByClassName("alignment")[0].value
            view.useMargins = editUI.getElementsByClassName("useMargins")[0].checked
            view.usePadding = editUI.getElementsByClassName("usePadding")[0].checked
            view.fontWeight = editUI.getElementsByClassName("fontWeight")[0].value
            view.fontSize = editUI.getElementsByClassName("fontSize")[0].value
            // Font color
            if (editUI.getElementsByClassName("fontColor")[0].value != "") {
                view.textColor = editUI.getElementsByClassName("fontColor")[0].value
            }
            break;
        
        case "DepictionMarkdownView":
            view.markdown = simplemde.value()
            break;

        case "DepictionImageView":
            // Set Image URL
            var imageURL = editUI.getElementsByClassName("urlField")[0].value
            if (imageURL != "") {
                if (validateImageURL(imageURL)) {
                    view.URL = imageURL
                } else {
                    displayError("Invalid Image URL!")
                }
            } else {
                displayError("Image URL cannot be blank!")
            }
            // Set other properties
            view.width = editUI.getElementsByClassName("widthSlider")[0].value
            view.height = editUI.getElementsByClassName("widthSlider")[0].value
            view.cornerRadius = editUI.getElementsByClassName("cornerRadiusSlider")[0].value
            view.alignment = editUI.getElementsByClassName("alignment")[0].value
            break;
        
        case "DepictionTableTextView":
            // Set Title
            var title = "Table Title"
            if (editUI.getElementsByClassName("titleField")[0].value != "") {
                title = editUI.getElementsByClassName("titleField")[0].value
            }
            view.title = title
            // Set Text
            var text = "Table Text"
            if (editUI.getElementsByClassName("textField")[0].value != "") {
                text = editUI.getElementsByClassName("textField")[0].value
            }
            view.text = text
            break;

        case "DepictionTableButtonView":
            // Set Action URL
            var buttonURL = editUI.getElementsByClassName("textField")[0].value
            if (buttonURL != "") {
                    view.action = buttonURL
            } else {
                displayError("Action URL cannot be blank!")
            }
            // Set Text
            var title = "Button Text"
            if (editUI.getElementsByClassName("textField")[0].value != "") {
                title = editUI.getElementsByClassName("textField")[0].value
            }
            view.title = title
            // Set other properties
            view.yPadding = editUI.getElementsByClassName("yPadding")[0].value
            // Tint color
            if (editUI.getElementsByClassName("tableTintColorPicker")[0].value != "") {
                view.tintColor = editUI.getElementsByClassName("tableTintColorPicker")[0].value
            }
            break;

        case "DepictionSeparatorView":
            break;

        case "DepictionSpacerView":
            view.spacing = editUI.getElementsByClassName("spacing")[0].value
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