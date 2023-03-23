// find all nessasery Element for color generator
// color preview display div
var display_color = document.getElementById('display-color');
// random color generate button
var random_colorBtn = document.getElementById('random-color-btn');
// copy button for hex and rgb code
var copy_btn = document.getElementById('copy-btn');
// hex color output field or input field
var hex_color_output = document.getElementById('input-fieldForHEX');
// rgb color output field
var rgb_color_output = document.getElementById('input-fieldForRGB');

// generate random hex color function
function generate_hex_color() {
    var red = parseInt(Math.random() * 255).toString(16).padStart(2, '0');
    var green = parseInt(Math.random() * 255).toString(16).padStart(2, '0');
    var blue = parseInt(Math.random() * 255).toString(16).padStart(2, '0');
    return `${red}${green}${blue}`;
};

// hex color to rgb convert function
function hexTo_rgb_convert(hex) {
    hex = hex.replace('#', '');
    var red = parseInt(hex.substring(0, 2), 16);
    var green = parseInt(hex.substring(2, 4), 16);
    var blue = parseInt(hex.substring(4, 6), 16);
    var rgb_color = `rgb (${red}, ${green}, ${blue})`;
    rgb_color_output.value = rgb_color;

    //  change range value when output field color code manualy change
    redRange.value = red;
    greenRange.value = green;
    blueRange.value = blue;

    // Update the 3 range p elements when output field hex color manualy change
    redCode.textContent = red;
    greenCode.textContent = green;
    blueCode.textContent = blue;
}

// random button click to genarate code
if (hex_color_output.value === "") {
    random_colorBtn.addEventListener('click', function() {
        // get the hex color code when click random btn with call generate_hex_color function
        var hex_color = "#" + generate_hex_color();
        display_color.style.backgroundColor = hex_color;
        var showCode = hex_color.substring(1, 14);
        hex_color_output.value = showCode.toUpperCase();
        //  this hex color code send to hexTo_rgb_convert function for convert rgb color
        hexTo_rgb_convert(hex_color);
    });
} else {
    // if this condition not match we call another userInputValue() function for user inputed value
    userInputValue();
};

// user inputed value function and add event for input field this function work if user manuel inputed color code
hex_color_output.addEventListener('input', function userInputValue() {
    hex_color_output.value = hex_color_output.value.toUpperCase();
    if (hex_color_output.value.length === 6) {
        const hexcolor = display_color.style.backgroundColor = "#" + hex_color_output.value;
        // send this hex code for convert rgb color and update vale for rgb output field with call this function
        hexTo_rgb_convert(hexcolor);
    } else {
        // rgb user inpute value if less then 6 work this code
        rgb_color_output.value = "",
            display_color.style.backgroundColor = "#d0fff9";
    }
});


//  radio btn listen for copy code hex or rgb detect
const hexRadioBtn = document.getElementById('hex');
const rgbRadioBtn = document.getElementById('rgb');

let selectedRadioButton = null;
hexRadioBtn.addEventListener('click', () => {
    selectedRadioButton = 'hex';
});

rgbRadioBtn.addEventListener('click', () => {
    selectedRadioButton = 'rgb';
});


// The color code is copied based on which button the user clicked, hex or RGB (self invoked function)

(function() {
    copy_btn.addEventListener('click', function() {
        if (hex_color_output.value === "") {
            copy_btn.innerText = "OOPS! code not found";
            setTimeout(() => {
                copy_btn.innerText = 'Copy to Clipboard';
            }, 2000);
        } else if (selectedRadioButton === 'hex' || selectedRadioButton === '') {
            var hexColorCopy = "#" + hex_color_output.value;
            navigator.clipboard.writeText(hexColorCopy);
            copy_btn.innerText = "HEX code copied";
            setTimeout(() => {
                copy_btn.innerText = 'Copy to Clipboard';
            }, 2000);

        } else if (selectedRadioButton === 'rgb') {
            navigator.clipboard.writeText(rgb_color_output.value);
            copy_btn.innerText = "RGB code copied";
            setTimeout(() => {
                copy_btn.innerText = 'Copy to Clipboard';
            }, 2000);

        } else {
            navigator.clipboard.writeText("Please choose your preferred color code HEX or RGB");
            copy_btn.innerText = "OOPS! code not found";
            setTimeout(() => {
                copy_btn.innerText = 'Copy to Clipboard';
            }, 2000);
        }
    })
})();

// range value listen for genarate color code

// find the  3 range input elements
const redRange = document.getElementById('color-slider-red');
const greenRange = document.getElementById('color-slider-green');
const blueRange = document.getElementById('color-slider-blue');

// find the color code display p elements who show updated code 
const redCode = document.getElementById('red_color_code');
const greenCode = document.getElementById('green_color_code');
const blueCode = document.getElementById('blue_color_code');


// Add event listeners to the 3 range inputs and put a function all range updateColor()
redRange.addEventListener('input', updateColor);
greenRange.addEventListener('input', updateColor);
blueRange.addEventListener('input', updateColor);

// this function generate rgb color code base in range input
function updateColor() {
    // Get the current values of the 3 range inputs
    const redValue = redRange.value;
    const greenValue = greenRange.value;
    const blueValue = blueRange.value;

    // Update the color code display p elements live 
    redCode.textContent = redValue;
    greenCode.textContent = greenValue;
    blueCode.textContent = blueValue;

    const rgbCode = `rgb (${redValue}, ${greenValue}, ${blueValue})`;
    //  send this rgb color output field 
    rgb_color_output.value = rgbCode;
    display_color.style.backgroundColor = rgbCode;

    // From here we send rgb code  for convert RGB  to hex code as a rgbToHex() function argument
    const hexCode = rgbToHex(`${redValue},${greenValue},${blueValue}`);
    // From here the range generated hex color code show output field updates
    hex_color_output.value = hexCode;
}

//   range generate rgb code convert to hex color code
function rgbToHex(rgb) {
    const [r, g, b] = rgb.split(',');
    const hexR = parseInt(r).toString(16).padStart(2, '0');
    const hexG = parseInt(g).toString(16).padStart(2, '0');
    const hexB = parseInt(b).toString(16).padStart(2, '0');
    return hexR + hexG + hexB;
}

// preset color and custom color plate section start here
// 18 preset color list here this color we manualy write
const presetColor18 = ['E9A178', '4E6E81', 'F7C8E0', '00005C', 'A459D1', 'E90064', '16FF00', 'BDCDD6', '00E7FF', '30E3DF', 'E14D2A', '00425A', 'FEDEFF', 'FFD4D4', 'FF8B13', 'C85C8E', 'CEEDC7', 'FF597B'];

// find parent div for preset color child
const parentDiv = document.getElementById('preset-color-list_wrapper');

// Create 18 child div elements and append to parent div
for (let i = 0; i < 18; i++) {
    const childElement = document.createElement('div');
    parentDiv.appendChild(childElement);
    childElement.classList.add('preset-color-list');
    childElement.style.backgroundColor = '#' + presetColor18[i];

    // add tooltip text when hovering over child element
    childElement.setAttribute('title', 'Click to copy code');
    // add event listener for copy code
    childElement.addEventListener('click', () => {
        navigator.clipboard.writeText(presetColor18[i]);
        childElement.setAttribute('title', 'Code Copied!');
        setTimeout(() => {
            childElement.setAttribute('title', 'Click to copy code');
        }, 2000);
    });
}

// click save btn to create custom color plate 
const save_btn = document.getElementById('save-btn');
const parentDiv_customColor = document.getElementById('custom-color-list_wrapper');

// generated child div background color stored here for we checking duplicate color next.
const existingColors = [];

// save btn click to start create child div color plate
save_btn.addEventListener('click', () => {
    const hexinputFieldvalue = document.getElementById('input-fieldForHEX').value;
    if (hexinputFieldvalue === "" || hexinputFieldvalue.length < 6) {
        // not create child div
    }else{
    //  not allowed existing color child div create
    if (existingColors.includes(hexinputFieldvalue)) {
        alert('This color is already saved!');
        return;
    }
    //  if allright top all condition then when click save btn create color plate child div
    var childElement_customColor = document.createElement('div');
    parentDiv_customColor.appendChild(childElement_customColor);
    childElement_customColor.classList.add('custom-color-list');
    childElement_customColor.style.backgroundColor = '#' + hexinputFieldvalue;
    childElement_customColor.setAttribute('title', 'Click to copy code');

//  click to copy custom color child div color code
    childElement_customColor.addEventListener('click', () => {
        navigator.clipboard.writeText(hexinputFieldvalue);
        childElement_customColor.setAttribute('title', 'Code Copied!');
        setTimeout(() => {
            childElement_customColor.setAttribute('title', 'Click to copy code');
        }, 2000);
    });
    // double click to remove color plate
    childElement_customColor.addEventListener('dblclick', () => {
        parentDiv_customColor.removeChild(childElement_customColor);

    });

    existingColors.push(hexinputFieldvalue);
}});




















