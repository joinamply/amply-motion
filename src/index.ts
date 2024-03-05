import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { TextPlugin } from "gsap/TextPlugin";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function getAttributeAsFloat(element: Element, attribute: string, defaultValue: number = 0): number {
    return parseFloat(element.getAttribute(attribute) as string) || defaultValue;
}

function getAttributeAsString(element: Element, attribute: string, defaultValue: string = ''): string {
    return element.getAttribute(attribute) as string || defaultValue;
}

function createAnimationConfig(el: Element, settingsEl: Element) {
    // Get defaults for values
    let x = getAttributeAsString(settingsEl, "default-pos-x", "0rem");
    let y = getAttributeAsString(settingsEl, "default-pos-y", "0rem");
    let rotationX = getAttributeAsFloat(settingsEl, "default-rot-x", 90);
    let rotationY = getAttributeAsFloat(settingsEl, "default-rot-y", 90);
    let scale = getAttributeAsString(settingsEl, "default-scale");
    // Get defaults for timeline values
    let duration = getAttributeAsFloat(settingsEl, "default-duration", 1);
    let ease = getAttributeAsString(settingsEl, "default-ease", "expo.out");
    let stagger = getAttributeAsFloat(settingsEl, "default-stagger", 0.1);
    let direction = getAttributeAsString(settingsEl, "default-direction", "up");
    // Check if element has values and if not, use the defaults
    let delay = getAttributeAsFloat(el, 'delay');
    let opacity = getAttributeAsFloat(el, 'opacity');
    if (el.hasAttribute("duration")) { duration = getAttributeAsFloat(el, "duration"); }
    if (el.hasAttribute("ease")) { ease = getAttributeAsString(el, "ease"); }
    if (el.hasAttribute("stagger")) { stagger = getAttributeAsFloat(el, "stagger"); }
    if (el.hasAttribute("direction")) { direction = getAttributeAsString(el, "direction"); }
    if (el.hasAttribute("pos-x")) { x = getAttributeAsString(el, "pos-x"); }
    if (el.hasAttribute("pos-y")) { y = getAttributeAsString(el, "pos-y"); }
    if (el.hasAttribute("rot-x")) { rotationX = getAttributeAsFloat(el, "rot-x"); }
    if (el.hasAttribute("rot-y")) { rotationY = getAttributeAsFloat(el, "rot-y"); }
    if (el.hasAttribute("scale")) { scale = getAttributeAsString(el, "scale"); }
    // Update the position vector
    x = updatePosVector(direction, x, y).posX;
    y = updatePosVector(direction, x, y).posY;
    // Update the rotation vector
    rotationX = updateRotVector(direction, rotationX, rotationY).rotX;
    rotationY = updateRotVector(direction, rotationX, rotationY).rotY;

    return { duration, ease, stagger, direction, delay, opacity, x, y, rotationX, rotationY, scale };
}

function getElementoToAnimate(element) {
    let elToAnimate;
    let splitType: SplitType;
    if (element.hasAttribute("split-into")) {
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
        }
        return elToAnimate;
    }
    else {
        return element;
    }
}

function updatePosVector(direction, x, y) {
    if (direction === "up" || direction === "down") { x = "0rem"; }
    if (direction === "left" || direction === "right") { y = "0rem"; }
    if (direction === "right") { x = "-" + x; }
    if (direction === "down") { y = "-" + y; }
    return { posX: x, posY: y };
}

function updateRotVector(direction, rotationX, rotationY) {
    if (direction === "left" || direction === "right") { rotationX = 0; }
    if (direction === "up" || direction === "down") { rotationY = 0; }
    if (direction === "down") { rotationX = rotationX * -1; }
    if (direction === "left") { rotationY = rotationY * -1; }
    return { rotX: rotationX, rotY: rotationY };
}

function createAnimationFunction(properties: string[], method: 'from' | 'to') {
    return (timeline: gsap.core.Timeline, elToAnimate: Element, config: any) => {
        const animationProperties: any = {};
        properties.forEach(property => {
            if (config[property] !== undefined) {
                animationProperties[property] = config[property];
            }
        });
        animationProperties.duration = config.duration;
        animationProperties.ease = config.ease;
        animationProperties.delay = config.delay;
        animationProperties.stagger = config.stagger;
        timeline[method](elToAnimate, animationProperties, 0);
    };
}

const animationConfig = {
    'fade-in': createAnimationFunction(['opacity'], 'from'),
    'fade-out': createAnimationFunction(['opacity'], 'to'),
    'grow-in': createAnimationFunction(['scale', 'opacity'], 'from'),
    'grow-out': createAnimationFunction(['scale', 'opacity'], 'to'),
    'shrink-in': createAnimationFunction(['scale', 'opacity'], 'from'),
    'shrink-out': createAnimationFunction(['scale', 'opacity'], 'to'),
    'slide-in': createAnimationFunction(['x', 'y', 'opacity'], 'from'),
    'slide-out': createAnimationFunction(['x', 'y', 'opacity'], 'to'),
    'flip-in': createAnimationFunction(['rotationX', 'rotationY', 'opacity'], 'from'),
    'flip-out': createAnimationFunction(['rotationX', 'rotationY', 'opacity'], 'to'),
    'text-fade-in': createAnimationFunction(['opacity'], 'from'),
    'text-fade-out': createAnimationFunction(['opacity'], 'to'),
    'text-grow-in': createAnimationFunction(['scale', 'opacity'], 'from'),
    'text-grow-out': createAnimationFunction(['scale', 'opacity'], 'to'),
    'text-shrink-in': createAnimationFunction(['scale', 'opacity'], 'from'),
    'text-shrink-out': createAnimationFunction(['scale', 'opacity'], 'to'),
    'text-slide-in': createAnimationFunction(['x', 'y', 'opacity'], 'from'),
    'text-slide-out': createAnimationFunction(['x', 'y', 'opacity'], 'to'),
    'text-flip-in': createAnimationFunction(['rotationX', 'rotationY', 'opacity'], 'from'),
    'text-flip-out': createAnimationFunction(['rotationX', 'rotationY', 'opacity'], 'to'),
};

function createScrollTrigger(triggerElement, start, end, scrub, timeline) {

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: triggerElement,
            start: start,
            end: end,
            scrub: scrub !== false ? scrub : false,
            onEnter: () => { scrub !== false ? null : tl.play(); }
        }
    });

    tl.add(timeline);
}

let animationGroups = document.querySelectorAll("[anim-group]");

animationGroups.forEach((group, groupIndex) => {
    let timeline = gsap.timeline();
    let groupElements = group.querySelectorAll("[anim-group-el]");
    let start = group.getAttribute("start") || "top 80%";
    let end = group.getAttribute("end") || "bottom 20%";
    let scrub;
    if (group.hasAttribute("scrub")) {
        if (group.getAttribute("scrub") === "true") { scrub = true; }
        else {
            scrub = parseFloat(group.getAttribute("scrub") as string);
        }
    }
    groupElements.forEach((el, elIndex) => {
        // Check if the element has an id applied and if not, apply one
        if (!el.hasAttribute("id")) { el.setAttribute("id", `group-${groupIndex}-el-${elIndex}`); }
        // Get default values from the settings element
        let animType = el.getAttribute("anim-group-el")!;
        let settingsEl = document.querySelector(`[anim-settings="${animType}"]`)!;
        let config = createAnimationConfig(el, settingsEl);
        let elToAnimate = getElementoToAnimate(el);
        if (animationConfig[animType]) {
            animationConfig[animType](timeline, elToAnimate, config);
        }
        createScrollTrigger(group, start, end, scrub, timeline);
    });

    // Reset the group opacity back to 1
    const groupElement = group as HTMLElement;
    groupElement.style.opacity = "1";
});