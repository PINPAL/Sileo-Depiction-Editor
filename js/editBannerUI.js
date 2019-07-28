
// Function called when user clicks "Save Changes" in editBannerUI
function saveBanner() {
    // Reset Alert Errors
    errorsArray = []
    // If not blank
    if (document.getElementById("bannerUrlField").value != "") {
        // URL validation
        if (validateImageURL(document.getElementById("bannerUrlField").value)) {
            // Overrite config with new header image
            config.headerImage = document.getElementById("bannerUrlField").value
            // Re-render Preview
            renderSileoDepiction(config)
            // Hide popup
            hideAlert()
        } else {
            displayError("Invalid Image URL!")
        } 
    } else {
        displayError("Image URL cannot be blank!")
    }
}