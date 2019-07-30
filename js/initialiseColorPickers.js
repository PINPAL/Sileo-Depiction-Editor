// Initialise Color Picker on Sidebar
var tintColorPicker = new CP(document.getElementById("editTintColorUI"))
document.getElementById("editTintColorUI").value = "#2cb1be"
// Update Color Picker when color Changes
tintColorPicker.on("drag", function(color) {
    document.getElementById("editTintColorUI").getElementsByTagName("input")[0].value = '#' + color;
    document.getElementsByClassName("colorPreview")[0].style.backgroundColor = '#' + color;
    document.getElementsByTagName('html')[0].style.setProperty("--tint-color", '#' + color)
    config.tintColor = '#' + color
});

// Initialise Color Picker on Label UI font color
var fontColorPicker = new CP(document.getElementsByClassName("fontColor")[0])
// Update Color Picker when color Changes
fontColorPicker.on("drag", function(color) {
    document.getElementsByClassName("fontColor")[0].value = "#" + color
    document.getElementsByClassName("fontColor")[0].style.color = "#" + color
});
// Initialise Color Picker on Label UI font color
var tableTintColorPicker = new CP(document.getElementsByClassName("tableTintColorPicker")[0])
// Update Color Picker when color Changes
tableTintColorPicker.on("drag", function(color) {
    document.getElementsByClassName("tableTintColorPicker")[0].value = "#" + color
    document.getElementsByClassName("tableTintColorPicker")[0].style.color = "#" + color
});