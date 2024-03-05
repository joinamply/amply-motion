import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
        let animType = el.getAttribute("anim-group-el");
        let settingsEl = document.querySelector(`[anim-settings="${animType}"]`)!;
        let duration = parseFloat(settingsEl.getAttribute("default-duration") as string) || 1;
        let ease = settingsEl.getAttribute("default-ease") as string || "expo.out";
        let posVector = ["0rem", "0rem"];
        posVector[0] = settingsEl.getAttribute("default-pos-x") as string;
        posVector[1] = settingsEl.getAttribute("default-pos-y") as string;
        let rotVector = [0, 0];
        rotVector[0] = parseFloat(settingsEl.getAttribute("default-rot-x") as string) || 90;
        rotVector[1] = parseFloat(settingsEl.getAttribute("default-rot-y") as string) || 90;
        let scale = settingsEl.getAttribute("default-scale") as string;
        // Get value from the element if it exists, otherwise use the default
        let stagger = parseFloat(el.getAttribute("stagger") as string) || 0;
        let direction = (el.getAttribute("direction") as string) || "up";
        let delay = parseFloat(el.getAttribute('delay') as string) || 0;
        // Values that can be overriden by the element
        let opacity = parseFloat(el.getAttribute('opacity') as string) || 0;
        if (el.hasAttribute("duration")) { duration = parseFloat(el.getAttribute("duration") as string); }
        if (el.hasAttribute("ease")) { ease = el.getAttribute("ease") as string; }
        // Get the element to animate
        let elToAnimate = getElementoToAnimate(el);

        switch (animType) {
            // Fades
            case "fade-in":
                timeline.from(elToAnimate, { opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            case "fade-out":
                timeline.to(elToAnimate, { opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            // Grows
            case "grow-in":
                timeline.from(elToAnimate, { scale: scale, opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            case "grow-out":
                timeline.to(elToAnimate, { scale: scale, opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            // Shrinks
            case "shrink-in":
                timeline.from(elToAnimate, { scale: scale, opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            case "shrink-out":
                timeline.to(elToAnimate, { scale: scale, opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            // Slides
            case "slide-in":
                posVector = updatePosVector(direction, posVector);
                timeline.from(elToAnimate, { x: posVector[0], y: posVector[1], opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            case "slide-out":
                posVector = updatePosVector(direction, posVector);
                timeline.to(elToAnimate, { x: posVector[0], y: posVector[1], opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            // Flips
            case "flip-in":
                rotVector = updateRotVector(direction, rotVector);
                timeline.from(elToAnimate, { rotationX: rotVector[0], rotationY: rotVector[1], opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            case "flip-out":
                rotVector = updateRotVector(direction, rotVector);
                timeline.to(elToAnimate, { rotationX: rotVector[0], rotationY: rotVector[1], opacity: opacity, duration: duration, ease: ease, delay: delay, stagger: stagger }, 0);
                break;
            // Text Fades
            case "text-fade-in":
                timeline.from(elToAnimate, { opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            case "text-fade-out":
                timeline.to(elToAnimate, { opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            // Text Grows
            case "text-grow-in":
                timeline.from(elToAnimate, { scale: scale, opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            case "text-grow-out":
                timeline.to(elToAnimate, { scale: scale, opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            // Text Shrinks
            case "text-shrink-in":
                timeline.from(elToAnimate, { scale: scale, opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            case "text-shrink-out":
                timeline.to(elToAnimate, { scale: scale, opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            // Text Slides
            case "text-slide-in":
                posVector = updatePosVector(direction, posVector);
                timeline.from(elToAnimate, { x: posVector[0], y: posVector[1], opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            case "text-slide-out":
                posVector = updatePosVector(direction, posVector);
                timeline.to(elToAnimate, { x: posVector[0], y: posVector[1], opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            // Text Flips
            case "text-flip-in":
                rotVector = updateRotVector(direction, rotVector);
                timeline.from(elToAnimate, { rotationX: rotVector[0], rotationY: rotVector[1], opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            case "text-flip-out":
                rotVector = updateRotVector(direction, rotVector);
                timeline.to(elToAnimate, { rotationX: rotVector[0], rotationY: rotVector[1], opacity: opacity, duration: duration, stagger: stagger, ease: ease, delay: delay }, 0);
                break;
            // case "text-replace":
            //     let defaultText = settingsEl.getAttribute("default-text") as string;
            //     let newText = el.getAttribute("new-text") as string || defaultText;
            //     timeline.to(el, { text: newText, ease: ease, delay: delay }, 0);
            //     break;
        }

        createScrollTrigger(group, start, end, scrub, timeline);
    });
});

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

function updatePosVector(direction, posVector: Array<string>) {
    if (direction === "up" || direction === "down") { posVector[0] = "0rem"; }
    if (direction === "left" || direction === "right") { posVector[1] = "0rem"; }
    if (direction === "right") { posVector[0] = "-" + posVector[0]; }
    if (direction === "down") { posVector[1] = "-" + posVector[1]; }
    return posVector;
}

// A function to update Position and Rotation that receives a param that must be Move or Rotate
function updateRotVector(direction, rotVector: Array<number>) {
    if (direction === "left" || direction === "right") { rotVector[0] = 0; }
    if (direction === "up" || direction === "down") { rotVector[1] = 0; }
    if (direction === "down") { rotVector[0] = rotVector[0] * -1; }
    if (direction === "left") { rotVector[1] = rotVector[1] * -1; }
    return rotVector;
}

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