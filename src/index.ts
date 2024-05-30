import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import { setElementTimeline } from './animations';
import { checkAnimType } from './animations';

/* ====================
Initialization
==================== */
(window as any).gsap = gsap;
(window as any).ScrollTrigger = ScrollTrigger;
(window as any).SplitType = SplitType;
// Register GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ====================
Functions
==================== */
function getAttributeAsFloat(element: Element, attribute: string, defaultValue: number = 0): number {
    return parseFloat(element.getAttribute(attribute) as string) || defaultValue;
}

function getAttributeAsString(element: Element, attribute: string, defaultValue: string = ''): string {
    return element.getAttribute(attribute) as string || defaultValue;
}

function getAttributeAsBoolean(element: Element, attribute: string, defaultValue: boolean = false): boolean {
    return element.hasAttribute(attribute) || defaultValue;
}

/* ====================
Animation Settings
==================== */
function createAnimationConfig(el: Element, settingsEl: Element) {
    const attributes = {
        "duration": { defaultValue: 1, type: 'float' },
        "delay": { defaultValue: 0, type: 'float' },
        "ease": { defaultValue: 'none', type: 'string' },
        "stagger-amount": { defaultValue: 0, type: 'float' },
        "stagger-from": { defaultValue: 'start', type: 'string' },
        "direction": { defaultValue: 'up', type: 'string' },
        "opacity": { defaultValue: 1, type: 'float' },
        "position-x": { defaultValue: '0rem', type: 'string' },
        "position-y": { defaultValue: '0rem', type: 'string' },
        "position-z": { defaultValue: '0rem', type: 'float' },
        "rotation-x": { defaultValue: 0, type: 'float' },
        "rotation-y": { defaultValue: 0, type: 'float' },
        "rotation-z": { defaultValue: 0, type: 'float' },
        "scale": { defaultValue: 1, type: 'float' },
        "color": { defaultValue: '#000000', type: 'string' },
        "brightness-from": { defaultValue: '1', type: 'string' },
        "brightness-to": { defaultValue: '10', type: 'string' },
        "yoyo": { defaultValue: false, type: 'boolean' },
        "repeat": { defaultValue: 0, type: 'float' },
        "repeat-delay": { defaultValue: 0, type: 'float' },
        "split-into": { defaultValue: '', type: 'string' },
        "timeline-position": { defaultValue: '<', type: 'string' },
        "count-to": { defaultValue: 0, type: 'float' },
        "count-steps": { defaultValue: 1, type: 'float' },
        "separator": { defaultValue: ',', type: 'string' },
        "words": { defaultValue: '', type: 'string' },
    };
    // Create the config object
    interface Config { [key: string]: any; }
    let config: Config = {};

    for (let attr in attributes) {
        let value;
        switch (attributes[attr].type) {
            case 'float':
                value = el.hasAttribute(attr) ? getAttributeAsFloat(el, attr) :
                    settingsEl.hasAttribute(attr) ? getAttributeAsFloat(settingsEl, attr) :
                        attributes[attr].defaultValue;
                break;
            case 'string':
                value = el.hasAttribute(attr) ? getAttributeAsString(el, attr) :
                    settingsEl.hasAttribute(attr) ? getAttributeAsString(settingsEl, attr) :
                        attributes[attr].defaultValue;
                break;
            case 'boolean':
                value = el.hasAttribute(attr) ? getAttributeAsBoolean(el, attr) :
                    settingsEl.hasAttribute(attr) ? getAttributeAsBoolean(settingsEl, attr) :
                        attributes[attr].defaultValue;
                break;
        }
        config[attr] = value;
    }
    // Use the animType to update the position and rotation vectors
    let animType = el.getAttribute("am-group-el")!;
    config["position-x"] = updatePosVector(animType, config["direction"], config["position-x"], config["position-y"]).posX;
    config["position-y"] = updatePosVector(animType, config["direction"], config["position-x"], config["position-y"]).posY;
    config["rotation-x"] = updateRotVector(animType, config["direction"], config["rotation-x"], config["rotation-y"]).rotX;
    config["rotation-y"] = updateRotVector(animType, config["direction"], config["rotation-x"], config["rotation-y"]).rotY;
    // If the element doesn't has the split into attr, add it if the default value
    if (!el.hasAttribute("split-into")) {
        el.setAttribute("split-into", config["split-into"]);
    }

    return config;
}

function updatePosVector(animType, direction, x, y) {
    if (direction === "up" || direction === "down") { x = "0rem"; }
    if (direction === "left" || direction === "right") { y = "0rem"; }
    if (animType.includes("-from")) {
        if (direction === "right") { x = "-" + x; }
        if (direction === "down") { y = "-" + y; }
    }
    else {
        if (direction === "left") { x = "-" + x; }
        if (direction === "up") { y = "-" + y; }
    }

    return { posX: x, posY: y };
}

function updateRotVector(animType, direction, rotationX, rotationY) {
    if (direction === "left" || direction === "right") { rotationX = 0; }
    if (direction === "up" || direction === "down") { rotationY = 0; }
    if (animType.includes("-from")) {
        if (direction === "up") { rotationX = rotationX * -1; }
        if (direction === "right") { rotationY = rotationY * -1; }
    }
    else {
        if (direction === "down") { rotationX = rotationX * -1; }
        if (direction === "left") { rotationY = rotationY * -1; }
    }
    return { rotX: rotationX, rotY: rotationY };
}

function getElementoToAnimate(element) {
    let elToAnimate;
    let splitType: SplitType;
    let splitInto = element.getAttribute("split-into");
    switch (splitInto) {
        case "lines":
            splitType = new SplitType(`#${element.getAttribute("id")}`, { types: "lines,words,chars", tagName: 'span' });
            elToAnimate = splitType.lines;
            break;
        case "words":
            splitType = new SplitType(`#${element.getAttribute("id")}`, { types: "lines,words,chars", tagName: 'span' });
            elToAnimate = splitType.words;
            break;
        case "letters":
            splitType = new SplitType(`#${element.getAttribute("id")}`, { types: "lines,words,chars", tagName: 'span' });
            elToAnimate = splitType.chars;
            break;
        case "elements":
            elToAnimate = Array.from(element.children);
            break;
        default:
            elToAnimate = element;
            break;
    }
    return elToAnimate;
}

/* ====================
Groups
==================== */
let animGroups = document.querySelectorAll("[am-group]");
animGroups.forEach((group, groupIndex) => {
    let groupType = group.getAttribute("am-group") || "scroll";
    let settingsGroup = document.querySelector('[am-settings="group"]')!;
    let groupElements: Element[] = Array.from(group.querySelectorAll("[am-group-el]"));
    // Timeline properties
    let repeat = group.getAttribute("repeat") ? parseFloat(group.getAttribute("repeat") as string) :
        getAttributeAsFloat(settingsGroup, "repeat", 0);
    let repeatDelay = group.getAttribute("repeat-delay") ? parseFloat(group.getAttribute("repeat-delay") as string) :
        getAttributeAsFloat(settingsGroup, "repeat-delay", 0);
    let yoyo = group.getAttribute("yoyo") ? group.getAttribute("yoyo") === "true" :
        getAttributeAsBoolean(settingsGroup, "yoyo", false);
    // Create the timeline
    let groupTimeline = gsap.timeline({ repeat: repeat, repeatDelay: repeatDelay, yoyo: yoyo });
    // Sort the elements by their am-group-el-order attribute
    groupElements = Array.from(groupElements).sort((a, b) => {
        let aOrder = parseFloat(a.getAttribute("group-el-order") || "0");
        let bOrder = parseFloat(b.getAttribute("group-el-order") || "0");
        return aOrder - bOrder;
    });
    // Loop through the elements and create the animations
    groupElements.forEach((el, elIndex) => {
        let elTimeline = gsap.timeline();
        // Check if the element has an id applied and if not, apply one
        if (!el.hasAttribute("id")) { el.setAttribute("id", `group-${groupIndex}-el-${elIndex}`); }
        // Get default values from the settings element
        let animType = el.getAttribute("am-group-el")!;
        if (checkAnimType(animType) === false) {
            console.log(`Invalid animation type: ${animType}`);
            return;
        }
        let animSettings = document.querySelector(`[am-settings="${animType}"]`)!;
        let animConfig = createAnimationConfig(el, animSettings);
        let elToAnimate = getElementoToAnimate(el);
        // Create the timeline
        elTimeline = setElementTimeline(elToAnimate, animType, animConfig);
        // Add the timeline to the group timeline
        groupTimeline.add(elTimeline, animConfig["timeline-position"]);
    });

    switch (groupType) {
        case "hover-in":
            groupTimeline.pause();
            group.addEventListener("mouseenter", () => { groupTimeline.play(); });
            break;
        case "hover-in-out":
            groupTimeline.pause();
            group.addEventListener("mouseenter", () => { groupTimeline.play(); });
            group.addEventListener("mouseleave", () => { groupTimeline.reverse(); });
            break;
        case "click":
            groupTimeline.pause();
            group.addEventListener("click", () => { groupTimeline.play(); });
            break;
        default:
            let start = group.getAttribute("trigger-start") || getAttributeAsString(settingsGroup, "trigger-start", "top 20%");
            let end = group.getAttribute("trigger-end") || getAttributeAsString(settingsGroup, "trigger-end", "bottom 20%");
            let markers = group.getAttribute("markers") ? group.getAttribute("markers") === "true" : getAttributeAsBoolean(settingsGroup, "markers", false);
            let toggleActions = group.getAttribute("toggle-actions") || getAttributeAsString(settingsGroup, "toggle-actions", "play none none reset");
            let scrub;
            if (group.hasAttribute("scrub")) {
                if (group.getAttribute("scrub") === "true") { scrub = true; }
                else { scrub = parseFloat(group.getAttribute("scrub") as string); }
            }
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: group,
                    start: start,
                    end: end,
                    markers: markers,
                    scrub: scrub,
                    toggleActions: scrub !== false ? toggleActions : "play none none reverse"
                }
            });
            tl.add(groupTimeline);
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
// Stop checking
// clearInterval(intervalId);