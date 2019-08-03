// Switch between tabs (in preview)
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
    currentViewingTab = indexInClass(element, document)
    // Move Pill Selector Line
    document.getElementsByClassName("pillSelectorLine")[0].style.left = element.style.left
    // Set Color of Selected Pill text 
    element.style.color = "var(--tint-color)"
    // Show Tab Content
    document.getElementById(element.id.slice(0,-6) + "Content").style.display = "block"
}

// Define Navbar Items (Improve Scrolling Animation Responsiveness)
var navbar = document.getElementsByClassName("navbar")[0]
var changedNavbarItems = document.getElementsByClassName("changedNavbarItems")[0]

// Navbar & Banner Scrolling Animation
document.getElementById("previewBox").addEventListener('scroll', function updateNavbar() {
    var scrollTop = document.getElementById("previewBox").scrollTop;
    navbar.style.opacity = scrollTop / 150
    //bannerNavItems.style.opacity = 1 - (scrollTop / 100)
    // Only show right/center navbar items after 150 pixels of scroll
    if (scrollTop > 150) {
        changedNavbarItems.style.opacity  = 1
    } else {
        changedNavbarItems.style.opacity  = 0
    }
})