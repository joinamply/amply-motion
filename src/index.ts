import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import { setElementTimeline } from './timeline-config';
import { getAttributeAsBoolean, getAttributeAsFloat, getAttributeAsString } from './utils';

/* ====================
Initialization
==================== */
(window as any).gsap = gsap;
(window as any).ScrollTrigger = ScrollTrigger;
(window as any).SplitType = SplitType;
// Register GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ====================
Naming
==================== */
const GROUP = 'am-group';
const ELEMENT = 'am-element';
const ELEMENT_ORDER = 'am-element-order';
// Variables
const MARKERS = "am-markers";
const SCROLL_START = "am-scroll-start";
const SCROLL_END = "am-scroll-end";
const DELAY = "am-delay";
const DURATION = "am-duration";
const REPEAT = "am-repeat";
const REPEAT_DELAY = "am-repeat-delay";
const STAGGER_AMOUNT = "am-stagger-amount";
const STAGGER_FROM = "am-stagger-from";
const YOYO = "am-yoyo";
const EASE = "am-ease";
const SCRUB = "am-scrub";
const TOGGLE_ACTIONS = "am-toggle-actions";
// Custom
const TIMELINE_POSITION = "am-timeline-position";
const AM_TWEEN = "am-tween";
const SPLIT_INTO = "am-split-into";
// Counter
const COUNT_TO = "am-count-to";
const COUNT_STEPS = "am-count-steps";
const SEPARATOR = "am-separator";
// Typewriter
const WORDS = "am-words";
// Marquee
const DIRECTION = "am-direction";

// Properties
const DISPLAY = "am-display";
const MARGIN_LEFT = "am-margin-left";
const MARGIN_RIGHT = "am-margin-right";
const MARGIN_TOP = "am-margin-top";
const MARGIN_BOTTOM = "am-margin-bottom";
const PADDING_LEFT = "am-padding-left";
const PADDING_RIGHT = "am-padding-right";
const PADDING_TOP = "am-padding-top";
const PADDING_BOTTOM = "am-padding-bottom";
const WIDTH = "am-width";
const HEIGHT = "am-height";
const LEFT = "am-left";
const RIGHT = "am-right";
const TOP = "am-top";
const BOTTOM = "am-bottom";
const COLOR = "am-color";
const BACKGROUND_COLOR = "am-background-color";
const BORDER_RADIUS = "am-border-radius";
const BORDER_TOP_LEFT_RADIUS = "am-border-top-left-radius";
const BORDER_TOP_RIGHT_RADIUS = "am-border-top-right-radius";
const BORDER_BOTTOM_LEFT_RADIUS = "am-border-bottom-left-radius";
const BORDER_BOTTOM_RIGHT_RADIUS = "am-border-bottom-right-radius";
const BORDER_WIDTH = "am-border-width";
const BORDER_TOP_WIDTH = "am-border-top-width";
const BORDER_RIGHT_WIDTH = "am-border-right-width";
const BORDER_BOTTOM_WIDTH = "am-border-bottom-width";
const BORDER_LEFT_WIDTH = "am-border-left-width";
const BORDER_COLOR = "am-border-color";
const BORDER_TOP_COLOR = "am-border-top-color";
const BORDER_RIGHT_COLOR = "am-border-right-color";
const BORDER_BOTTOM_COLOR = "am-border-bottom-color";
const BORDER_LEFT_COLOR = "am-border-left-color";
const OPACITY = "am-opacity";
const POSITION_X = "am-position-x";
const POSITION_Y = "am-position-y";
const POSITION_Z = "am-position-z";
const ROTATION_X = "am-rotation-x";
const ROTATION_Y = "am-rotation-y";
const ROTATION_Z = "am-rotation-z";
const SCALE = "am-scale";
const BRIGHTNESS = "am-brightness";

/* ====================
Interfaces
==================== */
interface VariableProperty {
    value: any;
    valueType: 'string' | 'number' | 'boolean';
    gsapName: string;
}
interface VariablesProperties {
    [key: string]: VariableProperty;
}
interface Config { [key: string]: any; }

/* ====================
Variables & Properties
==================== */
// Variables
const variablesSettings = document.querySelector('[am-settings="variables"]')!;
let variables: VariablesProperties = {
    // Gsap
    'am-markers': { value: getAttributeAsBoolean(variablesSettings, MARKERS, false), valueType: 'boolean', gsapName: 'markers' },
    'am-scroll-start': { value: getAttributeAsString(variablesSettings, SCROLL_START, "top 20%"), valueType: 'string', gsapName: 'start' },
    'am-scroll-end': { value: getAttributeAsString(variablesSettings, SCROLL_END, "bottom 20%"), valueType: 'string', gsapName: 'end' },
    'am-delay': { value: getAttributeAsFloat(variablesSettings, DELAY, 0), valueType: 'number', gsapName: 'delay' },
    'am-duration': { value: getAttributeAsFloat(variablesSettings, DURATION, 1), valueType: 'number', gsapName: 'duration' },
    'am-repeat': { value: getAttributeAsFloat(variablesSettings, REPEAT, 0), valueType: 'number', gsapName: 'repeat' },
    'am-repeat-delay': { value: getAttributeAsFloat(variablesSettings, REPEAT_DELAY, 0), valueType: 'number', gsapName: 'repeatDelay' },
    'am-stagger-amount': { value: getAttributeAsFloat(variablesSettings, STAGGER_AMOUNT, 0.1), valueType: 'number', gsapName: 'stagger' },
    'am-stagger-from': { value: getAttributeAsString(variablesSettings, STAGGER_FROM, "center"), valueType: 'string', gsapName: 'from' },
    'am-yoyo': { value: getAttributeAsBoolean(variablesSettings, YOYO, false), valueType: 'boolean', gsapName: 'yoyo' },
    'am-ease': { value: getAttributeAsString(variablesSettings, EASE, "power1.inOut"), valueType: 'string', gsapName: 'ease' },
    'am-scrub': { value: getAttributeAsBoolean(variablesSettings, SCRUB, false), valueType: 'boolean', gsapName: 'scrub' },
    'am-toggle-actions': { value: getAttributeAsString(variablesSettings, TOGGLE_ACTIONS, "play none none reset"), valueType: 'string', gsapName: 'toggleActions' },
    // Custom
    'am-timeline-position': { value: getAttributeAsString(variablesSettings, TIMELINE_POSITION, "<"), valueType: 'number', gsapName: '' },    
    'am-tween': { value: getAttributeAsString(variablesSettings, AM_TWEEN, "from"), valueType: 'string', gsapName: '' },
    'am-split-into': { value: getAttributeAsString(variablesSettings, SPLIT_INTO, "none"), valueType: 'string', gsapName: ''},
    // Counter
    'am-count-to': { value: getAttributeAsFloat(variablesSettings, COUNT_TO, 0), valueType: 'number', gsapName: 'end' },
    'am-count-steps': { value: getAttributeAsFloat(variablesSettings, COUNT_STEPS, 1), valueType: 'number', gsapName: 'increment' },
    'am-separator': { value: getAttributeAsString(variablesSettings, SEPARATOR, ","), valueType: 'string', gsapName: 'separator' },
    // Typewriter
    'am-words': { value: getAttributeAsString(variablesSettings, WORDS, "word 1, word 2, word 3"), valueType: 'string', gsapName: 'typewriter-words' },
    // Marquee
    'am-direction': { value: getAttributeAsString(variablesSettings, DIRECTION, "left"), valueType: 'string', gsapName: 'direction' },
};
// Properties
const propertiesSettings = document.querySelector('[am-settings="properties"]')!;
let properties: VariablesProperties = {
    'am-display': { value: getAttributeAsString(propertiesSettings, DISPLAY, "block"), valueType: 'string', gsapName: 'display' },
    'am-margin-left': { value: getAttributeAsString(propertiesSettings, MARGIN_LEFT, "0rem"), valueType: 'string', gsapName: 'marginLeft' },
    'am-margin-rigth': { value: getAttributeAsString(propertiesSettings, MARGIN_RIGHT, "0rem"), valueType: 'string', gsapName: 'marginRight' },
    'am-margin-top': { value: getAttributeAsString(propertiesSettings, MARGIN_TOP, "0rem"), valueType: 'string', gsapName: 'marginTop' },
    'am-margin-bottom': { value: getAttributeAsString(propertiesSettings, MARGIN_BOTTOM, "0rem"), valueType: 'string', gsapName: 'marginBottom' },
    'am-padding-left': { value: getAttributeAsString(propertiesSettings, PADDING_LEFT, "0rem"), valueType: 'string', gsapName: 'paddingLeft' },
    'am-padding-right': { value: getAttributeAsString(propertiesSettings, PADDING_RIGHT, "0rem"), valueType: 'string', gsapName: 'paddingRight' },
    'am-padding-top': { value: getAttributeAsString(propertiesSettings, PADDING_TOP, "0rem"), valueType: 'string', gsapName: 'paddingTop' },
    'am-padding-bottom': { value: getAttributeAsString(propertiesSettings, PADDING_BOTTOM, "0rem"), valueType: 'string', gsapName: 'paddingBottom' },
    'am-width': { value: getAttributeAsString(propertiesSettings, WIDTH, "auto"), valueType: 'string', gsapName: 'width' },
    'am-height': { value: getAttributeAsString(propertiesSettings, HEIGHT, "auto"), valueType: 'string', gsapName: 'height' },
    'am-left': { value: getAttributeAsString(propertiesSettings, LEFT, "auto"), valueType: 'string', gsapName: 'left' },
    'am-right': { value: getAttributeAsString(propertiesSettings, RIGHT, "auto"), valueType: 'string', gsapName: 'right' },
    'am-top': { value: getAttributeAsString(propertiesSettings, TOP, "auto"), valueType: 'string', gsapName: 'top' },
    'am-bottom': { value: getAttributeAsString(propertiesSettings, BOTTOM, "auto"), valueType: 'string', gsapName: 'bottom' },
    'am-color': { value: getAttributeAsString(propertiesSettings, COLOR, "#000000"), valueType: 'string', gsapName: 'color' },
    'am-background-color': { value: getAttributeAsString(propertiesSettings, BACKGROUND_COLOR, "#000000"), valueType: 'string', gsapName: 'backgroundColor' },
    'am-border-radius': { value: getAttributeAsString(propertiesSettings, BORDER_RADIUS, "0rem"), valueType: 'string', gsapName: 'borderRadius' },
    'am-border-top-left-radius': { value: getAttributeAsString(propertiesSettings, BORDER_TOP_LEFT_RADIUS, "0rem"), valueType: 'string', gsapName: 'borderTopLeftRadius' },
    'am-border-top-right-radius': { value: getAttributeAsString(propertiesSettings, BORDER_TOP_RIGHT_RADIUS, "0rem"), valueType: 'string', gsapName: 'borderTopRightRadius' },
    'am-border-bottom-left-radius': { value: getAttributeAsString(propertiesSettings, BORDER_BOTTOM_LEFT_RADIUS, "0rem"), valueType: 'string', gsapName: 'borderBottomLeftRadius' },
    'am-border-bottom-right-radius': { value: getAttributeAsString(propertiesSettings, BORDER_BOTTOM_RIGHT_RADIUS, "0rem"), valueType: 'string', gsapName: 'borderBottomRightRadius' },
    'am-border-width': { value: getAttributeAsString(propertiesSettings, BORDER_WIDTH, "0rem"), valueType: 'string', gsapName: 'borderWidth' },
    'am-border-top-width': { value: getAttributeAsString(propertiesSettings, BORDER_TOP_WIDTH, "0rem"), valueType: 'string', gsapName: 'borderTopWidth' },
    'am-border-right-width': { value: getAttributeAsString(propertiesSettings, BORDER_RIGHT_WIDTH, "0rem"), valueType: 'string', gsapName: 'borderRightWidth' },
    'am-border-bottom-width': { value: getAttributeAsString(propertiesSettings, BORDER_BOTTOM_WIDTH, "0rem"), valueType: 'string', gsapName: 'borderBottomWidth' },
    'am-border-left-width': { value: getAttributeAsString(propertiesSettings, BORDER_LEFT_WIDTH, "0rem"), valueType: 'string', gsapName: 'borderLeftWidth' },
    'am-border-color': { value: getAttributeAsString(propertiesSettings, BORDER_COLOR, "#000000"), valueType: 'string', gsapName: 'borderColor' },
    'am-border-top-color': { value: getAttributeAsString(propertiesSettings, BORDER_TOP_COLOR, "#000000"), valueType: 'string', gsapName: 'borderTopColor' },
    'am-border-right-color': { value: getAttributeAsString(propertiesSettings, BORDER_RIGHT_COLOR, "#000000"), valueType: 'string', gsapName: 'borderRightColor' },
    'am-border-bottom-color': { value: getAttributeAsString(propertiesSettings, BORDER_BOTTOM_COLOR, "#000000"), valueType: 'string', gsapName: 'borderBottomColor' },
    'am-border-left-color': { value: getAttributeAsString(propertiesSettings, BORDER_LEFT_COLOR, "#000000"), valueType: 'string', gsapName: 'borderLeftColor' },
    'am-opacity': { value: getAttributeAsString(propertiesSettings, OPACITY, "1"), valueType: 'string', gsapName: 'opacity' },
    "am-position-x": { value: getAttributeAsString(propertiesSettings, POSITION_X, "0rem"), valueType: 'string', gsapName: 'x' },
    'am-position-y': { value: getAttributeAsString(propertiesSettings, POSITION_Y, "0rem"), valueType: 'string', gsapName: 'y' },
    'am-position-z': { value: getAttributeAsString(propertiesSettings, POSITION_Z, "0rem"), valueType: 'string', gsapName: 'z' },
    'am-rotation-x': { value: getAttributeAsString(propertiesSettings, ROTATION_X, "0"), valueType: 'string', gsapName: 'rotationX' },
    'am-rotation-y': { value: getAttributeAsString(propertiesSettings, ROTATION_Y, "0"), valueType: 'string', gsapName: 'rotationY' },
    'am-rotation-z': { value: getAttributeAsString(propertiesSettings, ROTATION_Z, "0"), valueType: 'string', gsapName: 'rotationZ' },
    'am-scale': { value: getAttributeAsString(propertiesSettings, SCALE, "1"), valueType: 'string', gsapName: 'scale' },
    'am-brightness': { value: getAttributeAsString(propertiesSettings, BRIGHTNESS, "1"), valueType: 'string', gsapName: 'brightness' },
};

/* ====================
Animation Settings
==================== */
function setElementSettings(element: Element, animation: String) {
    // Config function
    return (animProperties: Config = {}, animVariables: Config = {}, animOptions: Config = {}) => {
        // Create the config object
        let attributesList;
        // If animation is none get the attributes from the element
        if (animation === "none") {
            attributesList = element.attributes;
        }
        // If not get the attributes from the settings element
        else {
            let settingsEl = document.querySelector(`[am-settings="${animation}"]`)!;
            // Check if the settings element exists
            if (!settingsEl) {
                console.log(`Settings element not found for animation: ${animation}`);
                return;
            }
            attributesList = settingsEl.attributes;
            // Now grab the attributes from the element 
            let elementAttributes = element.attributes;
            // Now do a check and override the one from the settings to the one from the element
            for (let attribute of elementAttributes) {
                if (attributesList.hasOwnProperty(attribute.name)) {
                    attributesList[attribute.name].value = attribute.value;
                }
            }
        }
        // Loop through the attributes and get the values
        for (let attribute of attributesList) {
            if (attribute.name.startsWith("am-")) {
                if (properties.hasOwnProperty(attribute.name)) {
                    animProperties[properties[attribute.name].gsapName] = attribute.value;
                }
                else if (variables.hasOwnProperty(attribute.name)) {
                    if (variables[attribute.name].gsapName != ''){
                        animVariables[variables[attribute.name].gsapName] = attribute.value;
                    }   
                    // Those are variables not related to the timeline
                    else {
                        animOptions[attribute.name] = attribute.value;
                    }                     
                }
            }
        }

        // Check if the element has the basic variables and if doesn't apply the default values
        if (!animVariables.hasOwnProperty('duration')) { animVariables['duration'] = variables[DURATION].value; }
        if (!animVariables.hasOwnProperty('delay')) { animVariables['delay'] = variables[DELAY].value; }
        if (!animVariables.hasOwnProperty('ease')) { animVariables['ease'] = variables[EASE].value; }

        // Check for basic options that are not part of the variables
        if (!animOptions.hasOwnProperty(TIMELINE_POSITION)) { animOptions[TIMELINE_POSITION] = variables[TIMELINE_POSITION].value; }
        if (!animOptions.hasOwnProperty(AM_TWEEN)) { animOptions[AM_TWEEN] = variables[AM_TWEEN].value; }
    }
}

/* ====================
Get the element to animate
==================== */
function getElementoToAnimate(element) {
    let elementToAnimate;
    let splitType: SplitType;
    let splitInto = element.getAttribute(SPLIT_INTO);
    // If split into doesn't exists return the element
    if (!splitInto) { return element; }
    // If it does return based on the value
    switch (splitInto) {
        case "lines":
            splitType = new SplitType(`#${element.getAttribute("id")}`, { types: "lines", tagName: 'span' });
            elementToAnimate = splitType.lines;
            break;
        case "words":
            splitType = new SplitType(`#${element.getAttribute("id")}`, { types: "words", tagName: 'span' });
            elementToAnimate = splitType.words;
            break;
        case "letters":
            splitType = new SplitType(`#${element.getAttribute("id")}`, { types: "words,chars", tagName: 'span' });
            elementToAnimate = splitType.chars;
            break;
        case "elements":
            elementToAnimate = Array.from(element.children);
            break;
    }

    return elementToAnimate;
}

/* ====================
Start the animations
==================== */
let groups = document.querySelectorAll(`[${GROUP}]`);

groups.forEach((group, groupIndex) => {
    let triggerType = group.getAttribute(GROUP) || "scroll";
    let elements: Element[] = Array.from(group.querySelectorAll(`[${ELEMENT}]`));

    // Group Variables
    let groupRepeat = group.getAttribute(REPEAT) ? getAttributeAsFloat(group, REPEAT) : variables[REPEAT].value;
    let groupRepeatDelay = group.getAttribute(REPEAT_DELAY) ? getAttributeAsFloat(group, REPEAT_DELAY) : variables[REPEAT_DELAY].value;
    let groupYoyo = group.getAttribute(YOYO) ? getAttributeAsBoolean(group, YOYO) : variables[YOYO].value;
    let groupStart = group.getAttribute(SCROLL_START) ? getAttributeAsString(group, SCROLL_START) : variables[SCROLL_START].value;
    let groupEnd = group.getAttribute(SCROLL_END) ? getAttributeAsString(group, SCROLL_END) : variables[SCROLL_END].value;
    let groupMarkers = group.getAttribute(MARKERS) ? getAttributeAsBoolean(group, MARKERS) : variables[MARKERS].value;
    let groupToggleActions = group.getAttribute(TOGGLE_ACTIONS) ? getAttributeAsString(group, TOGGLE_ACTIONS) : variables[TOGGLE_ACTIONS].value;

    // Creates the group timeline
    let groupTl = gsap.timeline({ repeat: groupRepeat, repeatDelay: groupRepeatDelay, yoyo: groupYoyo });

    // Sort the elements by their order attribute
    elements = Array.from(elements).sort((a, b) => {
        let aOrder = parseFloat(a.getAttribute(ELEMENT_ORDER) || "0");
        let bOrder = parseFloat(b.getAttribute(ELEMENT_ORDER) || "0");
        return aOrder - bOrder;
    });

    // Loop through the elements and create the animations
    elements.forEach((element, elementIndex) => {
        let elementTl = gsap.timeline();
        // Check if the element has an id applied and if not, apply one
        if (!element.hasAttribute("id")) { element.setAttribute("id", `group-${groupIndex}-el-${elementIndex}`); }
        // Get the type of animation and...
        let animType = getAttributeAsString(element, ELEMENT, "none");
        let animProperties = {};
        let animVariables = {};
        let animOptions = {};
        setElementSettings(element, animType)(animProperties, animVariables, animOptions);
        let elementToAnimate = getElementoToAnimate(element);
        // Create the timeline
        elementTl = setElementTimeline(elementToAnimate, animType, animProperties, animVariables, animOptions[AM_TWEEN]);
        // Add the timeline to the group timeline
        groupTl.add(elementTl, animOptions[TIMELINE_POSITION]);
    });

    switch (triggerType) {
        case "hover-in":
            groupTl.pause();
            group.addEventListener("mouseenter", () => { groupTl.play(); });
            break;
        case "hover-in-out":
            groupTl.pause();
            group.addEventListener("mouseenter", () => { groupTl.play(); });
            group.addEventListener("mouseleave", () => { groupTl.reverse(); });
            break;
        case "click":
            groupTl.pause();
            group.addEventListener("click", () => { groupTl.play(); });
            break;
        default:
            let scrub;
            if (group.hasAttribute(SCRUB)) {
                if (group.getAttribute(SCRUB) === "true") { scrub = true; }
                else { scrub = parseFloat(group.getAttribute(SCRUB) as string); }
            }
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: group,
                    start: groupStart,
                    end: groupEnd,
                    markers: groupMarkers,
                    scrub: scrub,
                    toggleActions: scrub !== false ? groupToggleActions : "play none none reverse"
                }
            });
            tl.add(groupTl);
            break;
    }
    // Reset the group opacity back to 1
    gsap.set(group, { opacity: 1 });
});

/* ====================
Refresh ScrollTrigger when page height change
==================== */
let lastPageHeight = document.documentElement.scrollHeight;
const checkPageHeight = () => {
    const currentPageHeight = document.documentElement.scrollHeight;
    if (lastPageHeight !== currentPageHeight) {
        ScrollTrigger.refresh();
    }
    lastPageHeight = currentPageHeight;
};
const intervalId = setInterval(checkPageHeight, 1000); // check every second