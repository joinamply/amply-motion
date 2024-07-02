import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { RoughEase } from "gsap/EasePack";

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
// Variables - Group
const GROUP = 'am-group';
const GROUP_READY = 'am-group-ready';
const MARKERS = "am-markers";
const SCROLL_START = "am-scroll-start";
const SCROLL_END = "am-scroll-end";
const TOGGLE_ACTIONS = "am-toggle-actions";
const TRIGGER = "am-trigger";
const GROUP_TRIGGER = "am-group-trigger";
const GROUP_TARGET = "am-group-target";
const PLAY_BREAKPOINT = "am-play-breakpoint";
const STOP_BREAKPOINT = "am-stop-breakpoint";
// Variables - Element
const ELEMENT = 'am-element';
const ELEMENT_READY = 'am-element-ready';
const ELEMENT_ORDER = 'am-element-order';
const DELAY = "am-delay";
const DURATION = "am-duration";
const STAGGER_AMOUNT = "am-stagger-amount";
const STAGGER_FROM = "am-stagger-from";
const EASE = "am-ease";
const SCRUB = "am-scrub";
const TIMELINE_POSITION = "am-timeline-position";
const TWEEN = "am-tween";
const SPLIT_INTO = "am-split-into";
const VAR_TARGET = "am-var-target";
// Variables - Global
const REPEAT = "am-repeat";
const REPEAT_DELAY = "am-repeat-delay";
const YOYO = "am-yoyo";
const HOVER_PAUSE = "am-hover-pause";
// Counter
const COUNT_TO = "am-count-to";
const COUNT_START = "am-count-start";
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
const SCALE_X = "am-scale-x";
const SCALE_Y = "am-scale-y";
const SCALE_Z = "am-scale-z";
const SKEW_X = "am-skew-x";
const SKEW_Y = "am-skew-y";
const BRIGHTNESS = "am-brightness";

/* ====================
Interfaces
==================== */
interface VariableProperty {
    value: any;
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
const settingsGroupVariables = document.querySelector('[am-settings="group-variables"]')!;
let groupVariablesReference: VariablesProperties = {
    'am-markers': { value: getAttributeAsBoolean(settingsGroupVariables, MARKERS, false), gsapName: '' },
    'am-scroll-start': { value: getAttributeAsString(settingsGroupVariables, SCROLL_START, "top 20%"), gsapName: '' },
    'am-scroll-end': { value: getAttributeAsString(settingsGroupVariables, SCROLL_END, "bottom 80%"), gsapName: '' },
    'am-toggle-actions': { value: getAttributeAsString(settingsGroupVariables, TOGGLE_ACTIONS, "play none none none"), gsapName: '' },
    'am-repeat': { value: getAttributeAsFloat(settingsGroupVariables, REPEAT, 0), gsapName: '' },
    'am-repeat-delay': { value: getAttributeAsFloat(settingsGroupVariables, REPEAT_DELAY, 0), gsapName: '' },
    'am-yoyo': { value: getAttributeAsBoolean(settingsGroupVariables, YOYO, false), gsapName: '' },
    'am-hover-pause': { value: getAttributeAsBoolean(settingsGroupVariables, HOVER_PAUSE, false), gsapName: '' },
    'am-scrub': { value: getAttributeAsBoolean(settingsGroupVariables, SCRUB, false), gsapName: '' },
    'am-group-trigger': { value: getAttributeAsString(settingsGroupVariables, GROUP_TRIGGER, "scroll"), gsapName: '' },
    'am-group-target': { value: getAttributeAsString(settingsGroupVariables, GROUP_TARGET, ""), gsapName: '' },
    'am-trigger': { value: getAttributeAsString(settingsGroupVariables, TRIGGER, "scroll"), gsapName: '' },
    'am-play-breakpoint': { value: getAttributeAsString(settingsGroupVariables, PLAY_BREAKPOINT, ""), gsapName: '' },
    'am-stop-breakpoint': { value: getAttributeAsString(settingsGroupVariables, STOP_BREAKPOINT, ""), gsapName: '' },
};
const settingsElementVariables = document.querySelector('[am-settings="element-variables"]')!;
let elementVariablesReference: VariablesProperties = {
    // Gsap
    'am-delay': { value: getAttributeAsFloat(settingsElementVariables, DELAY, 0), gsapName: 'delay' },
    'am-duration': { value: getAttributeAsFloat(settingsElementVariables, DURATION, 1), gsapName: 'duration' },
    'am-repeat': { value: getAttributeAsFloat(settingsElementVariables, REPEAT, 0), gsapName: 'repeat' },
    'am-repeat-delay': { value: getAttributeAsFloat(settingsElementVariables, REPEAT_DELAY, 0), gsapName: 'repeatDelay' },
    'am-stagger-amount': { value: getAttributeAsFloat(settingsElementVariables, STAGGER_AMOUNT, 0.1), gsapName: 'staggerAmount' },
    'am-stagger-from': { value: getAttributeAsString(settingsElementVariables, STAGGER_FROM, "center"), gsapName: 'staggerFrom' },
    'am-yoyo': { value: getAttributeAsBoolean(settingsElementVariables, YOYO, false), gsapName: 'yoyo' },
    'am-ease': { value: getAttributeAsString(settingsElementVariables, EASE, "power1.inOut"), gsapName: 'ease' },
    // Custom
    'am-element-order': { value: getAttributeAsFloat(settingsElementVariables, ELEMENT_ORDER, 0), gsapName: '' },
    'am-timeline-position': { value: getAttributeAsString(settingsElementVariables, TIMELINE_POSITION, "<"), gsapName: '' },
    'am-tween': { value: getAttributeAsString(settingsElementVariables, TWEEN, "from"), gsapName: '' },
    'am-split-into': { value: getAttributeAsString(settingsElementVariables, SPLIT_INTO, "none"), gsapName: '' },
    'am-var-target': { value: getAttributeAsString(settingsElementVariables, VAR_TARGET, ""), gsapName: '' },
    'am-hover-pause': { value: getAttributeAsBoolean(settingsGroupVariables, HOVER_PAUSE, false), gsapName: '' },
    // Counter
    'am-count-to': { value: getAttributeAsFloat(settingsElementVariables, COUNT_TO, 0), gsapName: 'end' },
    'am-count-start': { value: getAttributeAsFloat(settingsElementVariables, COUNT_START, 0), gsapName: 'countStart' },
    'am-count-steps': { value: getAttributeAsFloat(settingsElementVariables, COUNT_STEPS, 1), gsapName: 'increment' },
    'am-separator': { value: getAttributeAsString(settingsElementVariables, SEPARATOR, ","), gsapName: 'separator' },
    // Typewriter
    'am-words': { value: getAttributeAsString(settingsElementVariables, WORDS, "word 1, word 2, word 3"), gsapName: 'typewriter-words' },
    // Marquee
    'am-direction': { value: getAttributeAsString(settingsElementVariables, DIRECTION, "left"), gsapName: 'direction' },
};
// Properties
const settingsElementProperties = document.querySelector('[am-settings="element-properties"]')!;
let elementPropertiesReference: VariablesProperties = {
    'am-display': { value: getAttributeAsString(settingsElementProperties, DISPLAY, "block"), gsapName: 'display' },
    'am-margin-left': { value: getAttributeAsString(settingsElementProperties, MARGIN_LEFT, "0rem"), gsapName: 'marginLeft' },
    'am-margin-rigth': { value: getAttributeAsString(settingsElementProperties, MARGIN_RIGHT, "0rem"), gsapName: 'marginRight' },
    'am-margin-top': { value: getAttributeAsString(settingsElementProperties, MARGIN_TOP, "0rem"), gsapName: 'marginTop' },
    'am-margin-bottom': { value: getAttributeAsString(settingsElementProperties, MARGIN_BOTTOM, "0rem"), gsapName: 'marginBottom' },
    'am-padding-left': { value: getAttributeAsString(settingsElementProperties, PADDING_LEFT, "0rem"), gsapName: 'paddingLeft' },
    'am-padding-right': { value: getAttributeAsString(settingsElementProperties, PADDING_RIGHT, "0rem"), gsapName: 'paddingRight' },
    'am-padding-top': { value: getAttributeAsString(settingsElementProperties, PADDING_TOP, "0rem"), gsapName: 'paddingTop' },
    'am-padding-bottom': { value: getAttributeAsString(settingsElementProperties, PADDING_BOTTOM, "0rem"), gsapName: 'paddingBottom' },
    'am-width': { value: getAttributeAsString(settingsElementProperties, WIDTH, "auto"), gsapName: 'width' },
    'am-height': { value: getAttributeAsString(settingsElementProperties, HEIGHT, "auto"), gsapName: 'height' },
    'am-left': { value: getAttributeAsString(settingsElementProperties, LEFT, "auto"), gsapName: 'left' },
    'am-right': { value: getAttributeAsString(settingsElementProperties, RIGHT, "auto"), gsapName: 'right' },
    'am-top': { value: getAttributeAsString(settingsElementProperties, TOP, "auto"), gsapName: 'top' },
    'am-bottom': { value: getAttributeAsString(settingsElementProperties, BOTTOM, "auto"), gsapName: 'bottom' },
    'am-color': { value: getAttributeAsString(settingsElementProperties, COLOR, "#000000"), gsapName: 'color' },
    'am-background-color': { value: getAttributeAsString(settingsElementProperties, BACKGROUND_COLOR, "#000000"), gsapName: 'backgroundColor' },
    'am-border-radius': { value: getAttributeAsString(settingsElementProperties, BORDER_RADIUS, "0rem"), gsapName: 'borderRadius' },
    'am-border-top-left-radius': { value: getAttributeAsString(settingsElementProperties, BORDER_TOP_LEFT_RADIUS, "0rem"), gsapName: 'borderTopLeftRadius' },
    'am-border-top-right-radius': { value: getAttributeAsString(settingsElementProperties, BORDER_TOP_RIGHT_RADIUS, "0rem"), gsapName: 'borderTopRightRadius' },
    'am-border-bottom-left-radius': { value: getAttributeAsString(settingsElementProperties, BORDER_BOTTOM_LEFT_RADIUS, "0rem"), gsapName: 'borderBottomLeftRadius' },
    'am-border-bottom-right-radius': { value: getAttributeAsString(settingsElementProperties, BORDER_BOTTOM_RIGHT_RADIUS, "0rem"), gsapName: 'borderBottomRightRadius' },
    'am-border-width': { value: getAttributeAsString(settingsElementProperties, BORDER_WIDTH, "0rem"), gsapName: 'borderWidth' },
    'am-border-top-width': { value: getAttributeAsString(settingsElementProperties, BORDER_TOP_WIDTH, "0rem"), gsapName: 'borderTopWidth' },
    'am-border-right-width': { value: getAttributeAsString(settingsElementProperties, BORDER_RIGHT_WIDTH, "0rem"), gsapName: 'borderRightWidth' },
    'am-border-bottom-width': { value: getAttributeAsString(settingsElementProperties, BORDER_BOTTOM_WIDTH, "0rem"), gsapName: 'borderBottomWidth' },
    'am-border-left-width': { value: getAttributeAsString(settingsElementProperties, BORDER_LEFT_WIDTH, "0rem"), gsapName: 'borderLeftWidth' },
    'am-border-color': { value: getAttributeAsString(settingsElementProperties, BORDER_COLOR, "#000000"), gsapName: 'borderColor' },
    'am-border-top-color': { value: getAttributeAsString(settingsElementProperties, BORDER_TOP_COLOR, "#000000"), gsapName: 'borderTopColor' },
    'am-border-right-color': { value: getAttributeAsString(settingsElementProperties, BORDER_RIGHT_COLOR, "#000000"), gsapName: 'borderRightColor' },
    'am-border-bottom-color': { value: getAttributeAsString(settingsElementProperties, BORDER_BOTTOM_COLOR, "#000000"), gsapName: 'borderBottomColor' },
    'am-border-left-color': { value: getAttributeAsString(settingsElementProperties, BORDER_LEFT_COLOR, "#000000"), gsapName: 'borderLeftColor' },
    'am-opacity': { value: getAttributeAsString(settingsElementProperties, OPACITY, "1"), gsapName: 'opacity' },
    "am-position-x": { value: getAttributeAsString(settingsElementProperties, POSITION_X, "0rem"), gsapName: 'x' },
    'am-position-y': { value: getAttributeAsString(settingsElementProperties, POSITION_Y, "0rem"), gsapName: 'y' },
    'am-position-z': { value: getAttributeAsString(settingsElementProperties, POSITION_Z, "0rem"), gsapName: 'z' },
    'am-rotation-x': { value: getAttributeAsString(settingsElementProperties, ROTATION_X, "0"), gsapName: 'rotationX' },
    'am-rotation-y': { value: getAttributeAsString(settingsElementProperties, ROTATION_Y, "0"), gsapName: 'rotationY' },
    'am-rotation-z': { value: getAttributeAsString(settingsElementProperties, ROTATION_Z, "0"), gsapName: 'rotationZ' },
    'am-scale-x': { value: getAttributeAsString(settingsElementProperties, SCALE_X, "1"), gsapName: 'scaleX' },
    'am-scale-y': { value: getAttributeAsString(settingsElementProperties, SCALE_Y, "1"), gsapName: 'scaleY' },
    'am-scale-z': { value: getAttributeAsString(settingsElementProperties, SCALE_Z, "1"), gsapName: 'scaleZ' },
    'am-skew-x': { value: getAttributeAsString(settingsElementProperties, SKEW_X, "0"), gsapName: 'skewX' },
    'am-skew-y': { value: getAttributeAsString(settingsElementProperties, SKEW_Y, "0"), gsapName: 'skewY' },
    'am-brightness': { value: getAttributeAsString(settingsElementProperties, BRIGHTNESS, "1"), gsapName: 'brightness' },
};

/* ====================
Group Functions
==================== */
function configurateGroup(group: Element, groupName: String = "") {
    let groupVariables: Config = {};
    let attributesFromElement = Array.from(group.attributes);
    let attributesFromSettings: Array<Attr> = [];
    let attributesList: Array<Attr> = [];
    if (groupName !== "") {
        let settings = document.querySelector(`[am-group-settings="${groupName}"]`)!;
        // Check if the settings element exists
        if (settings) {
            attributesFromSettings = Array.from(settings.attributes);
        }
        // If not continue with settings from the element
        else {
            console.log(`Settings element not found for group: ${groupName} for element: ${group.id}`);
        }
    }
    // Add the attributes from the settings
    for (let attribute of attributesFromSettings) {
        if (attribute.name.startsWith("am-")) {
            attributesList.push(attribute);
        }
    }
    // Add the attributes from the element and update the ones that are already in the list
    for (let attribute of attributesFromElement) {
        if (attribute.name.startsWith("am-")) {
            if (attributesList.includes(attribute)) {
                let index = attributesList.indexOf(attribute);
                attributesList[index] = attribute;
            }
            else {
                attributesList.push(attribute);
            }
        }
    }
    // Loop through the attributes and get the values
    for (let attribute of attributesList) {
        if (groupVariablesReference.hasOwnProperty(attribute.name)) {
            groupVariables[attribute.name] = attribute.value;
        }
    }
    // Check if the group has the basic variables and if doesn't apply the default values
    if (!groupVariables.hasOwnProperty(TRIGGER)) { groupVariables[TRIGGER] = groupVariablesReference[TRIGGER].value; }
    if (!groupVariables.hasOwnProperty(MARKERS)) { groupVariables[MARKERS] = groupVariablesReference[MARKERS].value; }
    if (!groupVariables.hasOwnProperty(SCROLL_START)) { groupVariables[SCROLL_START] = groupVariablesReference[SCROLL_START].value; }
    if (!groupVariables.hasOwnProperty(SCROLL_END)) { groupVariables[SCROLL_END] = groupVariablesReference[SCROLL_END].value; }
    if (!groupVariables.hasOwnProperty(TOGGLE_ACTIONS)) { groupVariables[TOGGLE_ACTIONS] = groupVariablesReference[TOGGLE_ACTIONS].value; }
    if (!groupVariables.hasOwnProperty(REPEAT)) { groupVariables[REPEAT] = groupVariablesReference[REPEAT].value; }
    if (!groupVariables.hasOwnProperty(REPEAT_DELAY)) { groupVariables[REPEAT_DELAY] = groupVariablesReference[REPEAT_DELAY].value; }
    if (!groupVariables.hasOwnProperty(YOYO)) { groupVariables[YOYO] = groupVariablesReference[YOYO].value; }
    if (!groupVariables.hasOwnProperty(HOVER_PAUSE)) { groupVariables[HOVER_PAUSE] = groupVariablesReference[HOVER_PAUSE].value; }
    if (!groupVariables.hasOwnProperty(PLAY_BREAKPOINT)) { groupVariables[PLAY_BREAKPOINT] = groupVariablesReference[PLAY_BREAKPOINT].value; }
    if (!groupVariables.hasOwnProperty(STOP_BREAKPOINT)) { groupVariables[STOP_BREAKPOINT] = groupVariablesReference[STOP_BREAKPOINT].value; }

    return groupVariables;
}

function checkForGroupTrigger(group: Element, groupVariables: Config) {
    if (!groupVariables.hasOwnProperty(GROUP_TARGET)) {
        return [group];
    }
    else {
        // First check if target has a value and if not return the group
        if (groupVariables[GROUP_TARGET] === "") {
            return [group];
        }
        else {
            // Now check if there's a valid trigger for the same target
            let triggerName = groupVariables[GROUP_TARGET];
            let trigger = document.querySelectorAll(`[${GROUP_TRIGGER}="${triggerName}"]`);
            if (trigger.length > 0) {
                return Array.from(trigger);
            }
            else {
                return [group];
            }
        }
    }
}

/* ====================
Element Functions
==================== */
function configureElement(element: Element, animation: String) {
    let elementProperties: Config = {};
    let elementVariables: Config = {};
    let attributesFromElement = Array.from(element.attributes);
    let attributesFromSettings: Array<Attr> = [];
    let attributesList: Array<Attr> = [];
    // If element has attributes inside settings
    if (animation !== "none") {
        let settings = document.querySelector(`[am-element-settings="${animation}"]`)!;
        // Check if the settings exists
        if (settings) {
            attributesFromSettings = Array.from(settings.attributes);
        }
        // If not continue with settings from the element
        else {
            console.log(`Settings element not found for animation: ${animation} for element: ${element.id}`);
        }
    }
    // Add the attributes from the settings
    for (let attribute of attributesFromSettings) {
        if (attribute.name.startsWith("am-")) {
            attributesList.push(attribute);
        }
    }
    // Add the attributes from the element and update the ones that are already in the list
    for (let attribute of attributesFromElement) {
        if (attribute.name.startsWith("am-")) {
            if (attributesList.includes(attribute)) {
                let index = attributesList.indexOf(attribute);
                attributesList[index] = attribute;
            }
            else {
                attributesList.push(attribute);
            }
        }
    }
    // Loop through the attributes and get the values
    for (let attribute of attributesList) {
        // First check for atributtes to animate css variables
        if (attribute.name.startsWith("am-var-")) {
            let varName = attribute.name.replace("am-var-", "");
            elementProperties[varName] = attribute.value;
        }
        // Check for the Set attributes
        else if (attribute.name.startsWith("am-set-")) {
            let varName = attribute.name.replace("am-set-", "am-");
            if (elementPropertiesReference.hasOwnProperty(varName)) {
                elementProperties["am-set-" + elementPropertiesReference[varName].gsapName] = attribute.value;
            }
        }
        // Now check for the rest of the attributes
        else {
            if (elementPropertiesReference.hasOwnProperty(attribute.name)) {
                elementProperties[elementPropertiesReference[attribute.name].gsapName] = attribute.value;
            } else if (elementVariablesReference.hasOwnProperty(attribute.name)) {
                if (elementVariablesReference[attribute.name].gsapName != '') {
                    elementVariables[elementVariablesReference[attribute.name].gsapName] = attribute.value;
                }
                else {
                    elementVariables[attribute.name] = attribute.value;
                }
            }
        }
    }

    // Check if the element has the mandatory variables and if doesn't apply the default values
    if (!elementVariables.hasOwnProperty('duration')) { elementVariables['duration'] = elementVariablesReference[DURATION].value; }
    if (!elementVariables.hasOwnProperty('delay')) { elementVariables['delay'] = elementVariablesReference[DELAY].value; }
    if (!elementVariables.hasOwnProperty('ease')) { elementVariables['ease'] = elementVariablesReference[EASE].value; }
    if (!elementVariables.hasOwnProperty(TIMELINE_POSITION)) { elementVariables[TIMELINE_POSITION] = elementVariablesReference[TIMELINE_POSITION].value; }
    if (!elementVariables.hasOwnProperty(TWEEN)) { elementVariables[TWEEN] = elementVariablesReference[TWEEN].value; }
    return { elementProperties, elementVariables };
}

function getElementoToAnimate(element, elementVariables) {
    let elementToAnimate;
    let splitType: SplitType;
    let splitInto = ""
    if (elementVariables.hasOwnProperty(SPLIT_INTO)) {
        splitInto = elementVariables[SPLIT_INTO];
    }
    // If split into doesn't exists return the element
    if (splitInto == "") { return element; }
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
function initializeGroups() {
    let groups = document.querySelectorAll(`[${GROUP}]`);
    for (let groupIndex = groups.length - 1; groupIndex >= 0; groupIndex--) {
        let group = groups[groupIndex];
        if (group.hasAttribute("am-group-ready")) { return; }
        let groupName = group.getAttribute(GROUP) || "";
        let groupVariables = configurateGroup(group, groupName);
        // Creates the group timeline
        let groupTl = gsap.timeline();

        // Elements
        let elements: Element[] = Array.from(group.querySelectorAll(`[${ELEMENT}]`));
        // Sort the elements by their order attribute
        elements = Array.from(elements).sort((a, b) => {
            let aOrder = parseFloat(a.getAttribute(ELEMENT_ORDER) || elementVariablesReference[ELEMENT_ORDER].value);
            let bOrder = parseFloat(b.getAttribute(ELEMENT_ORDER) || elementVariablesReference[ELEMENT_ORDER].value);
            return aOrder - bOrder;
        });

        // Loop through the elements and create the animations
        elements.forEach((element, elementIndex) => {
            if(element.hasAttribute("am-element-ready")) { return; }
            let elementTl = gsap.timeline();
            // Check if the element has an id applied and if not, apply one
            if (!element.hasAttribute("id")) { element.setAttribute("id", `group-${groupIndex}-el-${elementIndex}`); }
            // Get the type of animation and...
            let animType = getAttributeAsString(element, ELEMENT, "none");
            // Get the element properties and variables
            let { elementProperties, elementVariables } = configureElement(element, animType);
            let elementToAnimate = getElementoToAnimate(element, elementVariables);
            // Create the timeline
            elementTl = setElementTimeline(elementToAnimate, animType, elementProperties, elementVariables, elementVariables[TWEEN]);
            // Check if screen width is above 991 pixels
            if (window.innerWidth > 991) {
                // Now if the element has the pause on hover attribute
                if (elementVariables.hasOwnProperty(HOVER_PAUSE) && elementVariables[HOVER_PAUSE] === 'true') {
                    element.addEventListener("mouseenter", () => { elementTl.pause(); });
                    element.addEventListener("mouseleave", () => { elementTl.play(); });
                }
            }
            // Add the timeline to the group timeline
            groupTl.add(elementTl, elementVariables[TIMELINE_POSITION]);
            // Set the element as ready
            element.setAttribute(ELEMENT_READY, "true");
        });

        groupTl.repeat(parseFloat(groupVariables[REPEAT]));
        groupTl.repeatDelay(parseFloat(groupVariables[REPEAT_DELAY]));
        groupTl.yoyo(groupVariables[YOYO]);

        // Set the group as ready
        group.setAttribute(GROUP_READY, "true");
        // Check if the group has a trigger
        let groupTriggers: Element[] = []; // Usando um array para armazenar os elementos
        groupTriggers = checkForGroupTrigger(group, groupVariables);

        // Match Media
        if(groupVariables[PLAY_BREAKPOINT] !== "") {
            let playMM = gsap.matchMedia();
            groupTl.pause();
            playMM.add(`(max-width: ${groupVariables[PLAY_BREAKPOINT]})`, () => {
                groupTl.play();
                createGroupTrigger(groupTl, groupVariables[TRIGGER], groupTriggers, groupVariables, group);
                return () => { 
                    groupTl.restart();
                    groupTl.pause();
                  };
            });
        }
        else {
            createGroupTrigger(groupTl, groupVariables[TRIGGER], groupTriggers, groupVariables, group);
            if(groupVariables[STOP_BREAKPOINT] !== "") {
                let stopMM = gsap.matchMedia();
                stopMM.add(`(max-width: ${groupVariables[STOP_BREAKPOINT]})`, () => {
                    groupTl.restart();
                    groupTl.pause();
                    return () => { 
                        groupTl.play();
                      };
                });
            }
        }
        // Reset the group opacity back to 1
        gsap.set(group, { opacity: 1 });
    }
}

function createGroupTrigger(groupTl, trigger, groupTriggers, groupVariables, group) {
    switch (trigger) {
        case "hover-in":
            groupTl.pause();
            for (let trigger of groupTriggers) {
                trigger.addEventListener("mouseenter", () => { groupTl.play(); });
            }
            break;
        case "hover-in-restart":
            groupTl.pause();
            for (let trigger of groupTriggers) {
                trigger.addEventListener("mouseenter", () => { groupTl.restart(); });
            }
            break;
        case "hover-in-out":
            groupTl.pause();
            for (let trigger of groupTriggers) {
                trigger.addEventListener("mouseenter", () => { groupTl.play(); });
                trigger.addEventListener("mouseleave", () => { groupTl.reverse(); });
            }
            break;
        case "click":
            groupTl.pause();
            for (let trigger of groupTriggers) {
                trigger.addEventListener("click", () => { groupTl.play(); console.log(groupVariables[REPEAT]); });
            }
        case "click-restart":
            groupTl.pause();
            for (let trigger of groupTriggers) {
                trigger.addEventListener("click", () => { groupTl.restart(); console.log(groupVariables[REPEAT]); });
            }
            break;
        case "click-toggle":
            groupTl.pause();
            // If first click timeline will play, if second click timeline will reverse
            let clickCount = 0;
            for (let trigger of groupTriggers) {
                trigger.addEventListener("click", () => {
                    clickCount++;
                    if (clickCount % 2 === 1) {
                        groupTl.play();
                    } else {
                        groupTl.reverse();
                    }
                });
            }
            break;
        default:
            let scrub;
            if (groupVariables.hasOwnProperty(SCRUB)) {
                scrub = groupVariables[SCRUB];
                if (scrub === "true") { scrub = true; }
                else { scrub = parseFloat(groupVariables[SCRUB] as string); }
            }
            let scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: groupTriggers,
                    start: groupVariables[SCROLL_START],
                    end: groupVariables[SCROLL_END],
                    markers: groupVariables[MARKERS],
                    scrub: scrub,
                    toggleActions: scrub !== false ? groupVariables[TOGGLE_ACTIONS] : "play none none reverse"
                }
            });
            // Check if screen width is above 991 pixels
            if (window.innerWidth > 991) {
                // Now if the element has the pause on hover attribute
                if (group.hasAttribute(HOVER_PAUSE) && group.getAttribute(HOVER_PAUSE) === 'true') {
                    for (let trigger of groupTriggers) {
                        trigger.addEventListener("mouseenter", () => { scrollTl.pause(); });
                        trigger.addEventListener("mouseleave", () => { scrollTl.play(); });
                    }
                }
            }
            scrollTl.add(groupTl);
            break;
    }
}

initializeGroups();

/* ====================
Refresh ScrollTrigger when page height change
==================== */
let lastPageHeight = document.documentElement.scrollHeight;

const refreshScrollTrigger = () => {
    const currentPageHeight = document.documentElement.scrollHeight;
    if (lastPageHeight !== currentPageHeight) {
        ScrollTrigger.refresh();
        initializeGroups();
        if (document.querySelector(`[${GROUP}]`)) {
            gsap.set(`[${GROUP}]`, { opacity: 1 });
        }
    }
    lastPageHeight = currentPageHeight;
};

// Listen for resize events
window.addEventListener("resize", refreshScrollTrigger);

// Observe content changes (mutations)
const observer = new MutationObserver(refreshScrollTrigger);
observer.observe(document.body, { childList: true, subtree: true, attributes: true });

// Clear interval on page unload (to prevent memory leaks)
window.addEventListener("beforeunload", () => {
    observer.disconnect();
});