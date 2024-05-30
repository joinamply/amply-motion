import { gsap } from "gsap";
import { registerCounterEffect } from './gsap-custom-effects';
// Register Custom GSAP Effects
registerCounterEffect();

let animTypes = ["display-none", "display-block", "display-flex", "display-grid", "display-inline", "display-inline-block", "display-inline-flex", "display-inline-grid", "fade-from", "fade-to", "grow-from", "grow-to", "shrink-from", "shrink-to", "slide-from", "slide-to", "flip-from", "flip-to", "text-fade-from", "text-fade-to", "text-grow-from", "text-grow-to", "text-shrink-from", "text-shrink-to", "text-slide-from", "text-slide-to", "text-flip-from", "text-flip-to", "any-from", "any-to", "counter", "typewriter", "text-color-from", "text-color-to", "text-brightness"];

export function checkAnimType(animType: string) {
    return animTypes.includes(animType);
}

export function setElementTimeline(element, animType: string, animConfig: any = {}) {
    let tl = gsap.timeline({ ease: animConfig.ease });
    if (animConfig)
        switch (animType) {
            case "display-none":
                tl.set(element, { display: "none" });
                break;
            case "display-block":
                tl.set(element, { display: "block" });
                break;
            case "display-flex":
                tl.set(element, { display: "flex" });
                break;
            case "display-grid":
                tl.set(element, { display: "grid" });
                break;
            case "display-inline":
                tl.set(element, { display: "inline" });
                break;
            case "display-inline-block":
                tl.set(element, { display: "inline-block" });
                break;
            case "display-inline-flex":
                tl.set(element, { display: "inline-flex" });
                break;
            case "display-inline-grid":
                tl.set(element, { display: "inline-grid" });
                break;
            case "fade-from":
                createAnimationFunction(["opacity"], "from")(tl, element, animConfig);
                break;
            case "fade-to":
                createAnimationFunction(["opacity"], "to")(tl, element, animConfig);
                break;
            case "grow-from":
                createAnimationFunction(["scale", "opacity"], "from")(tl, element, animConfig);
                break;
            case "grow-to":
                createAnimationFunction(["scale", "opacity"], "to")(tl, element, animConfig);
                break;
            case "shrink-from":
                createAnimationFunction(["scale", "opacity"], "from")(tl, element, animConfig);
                break;
            case "shrink-to":
                createAnimationFunction(["scale", "opacity"], "to")(tl, element, animConfig);
                break;
            case "slide-from":
                createAnimationFunction(["position-x", "position-y", "opacity"], "from")(tl, element, animConfig);
                break;
            case "slide-to":
                createAnimationFunction(["position-x", "position-y", "opacity"], "to")(tl, element, animConfig);
                break;
            case "flip-from":
                createAnimationFunction(["rotation-x", "rotation-y", "opacity"], "from")(tl, element, animConfig);
                break;
            case "flip-to":
                createAnimationFunction(["rotation-x", "rotation-y", "opacity"], "to")(tl, element, animConfig);
                break;
            case "text-fade-from":
                createAnimationFunction(["opacity"], "from")(tl, element, animConfig);
                break;
            case "text-fade-to":
                createAnimationFunction(["opacity"], "to")(tl, element, animConfig);
                break;
            case "text-grow-from":
                createAnimationFunction(["scale", "opacity"], "from")(tl, element, animConfig);
                break;
            case "text-grow-to":
                createAnimationFunction(["scale", "opacity"], "to")(tl, element, animConfig);
                break;
            case "text-shrink-from":
                createAnimationFunction(["scale", "opacity"], "from")(tl, element, animConfig);
                break;
            case "text-shrink-to":
                createAnimationFunction(["scale", "opacity"], "to")(tl, element, animConfig);
                break;
            case "text-slide-from":
                createAnimationFunction(["position-x", "position-y", "opacity"], "from")(tl, element, animConfig);
                break;
            case "text-slide-to":
                createAnimationFunction(["position-x", "position-y", "opacity"], "to")(tl, element, animConfig);
                break;
            case "text-flip-from":
                createAnimationFunction(["rotation-x", "rotation-y", "opacity"], "from")(tl, element, animConfig);
                break;
            case "text-flip-to":
                createAnimationFunction(["rotation-x", "rotation-y", "opacity"], "to")(tl, element, animConfig);
                break;
            case "text-color-from":
                createAnimationFunction(["color"], "from")(tl, element, animConfig);
                break;
            case "text-color-to":
                createAnimationFunction(["color"], "to")(tl, element, animConfig);
                break;
            case "text-brightness":
                animConfig.brightness = true;
                createAnimationFunction(["brightness"], "fromTo")(tl, element, animConfig);
                break;
            case "any-from":
                createAnimationFunction(["position-x", "position-y", "position-z", "rotation-x", "rotation-y", "rotation-z", "scale", "opacity"], "from")(tl, element, animConfig);
                break;
            case "any-to":
                createAnimationFunction(["position-x", "position-y", "position-z", "rotation-x", "rotation-y", "rotation-z", "scale", "opacity"], "to")(tl, element, animConfig);
                break;
            case "counter":
                createAnimationFunction(["count-to", "count-steps"], "counter")(tl, element, animConfig);
                break;
            case "typewriter":
                let words = animConfig["words"];
                let wordsArray = words.split(",");
                wordsArray.forEach(word => {
                    let temp = gsap.timeline();
                    temp.fromTo(element, { text: "" }, { text: word, duration: animConfig.duration, ease: animConfig.ease });
                    temp.delay(animConfig.delay);
                    temp.repeat(1);
                    temp.repeatDelay(animConfig["repeat-delay"]);
                    temp.yoyo(true);
                    tl.add(temp);
                });
                tl.repeat(animConfig.repeat);
                break;
            default:
                console.log("Invalid animation type");
                break;
        }

    return tl;
}
function createAnimationFunction(properties: string[], method: 'from' | 'to' | 'fromTo' | 'counter') {
    return (timeline: gsap.core.Timeline, elToAnimate: Element, config: any) => {
        const animationProperties: any = {};
        const animationPropertiesFrom: any = {};
        properties.forEach(property => {
            if (config[property] !== undefined) {
                switch (property) {
                    case "position-x":
                        animationProperties.x = config[property];
                        break;
                    case "position-y":
                        animationProperties.y = config[property];
                        break;
                    case "position-z":
                        animationProperties.z = config[property];
                        break;
                    case "rotation-x":
                        animationProperties.rotationX = config[property];
                        break;
                    case "rotation-y":
                        animationProperties.rotationY = config[property];
                        break;
                    case "rotation-z":
                        animationProperties.rotationZ = config[property];
                        break;
                    case "count-to":
                        animationProperties.end = config[property];
                        break;
                    case "count-steps":
                        animationProperties.increment = config[property];
                        animationProperties.separator = config["separator"];
                        break;
                    case "brightness":
                        animationPropertiesFrom.webkitFilter = `brightness(${config["brightness-from"]})`;
                        animationPropertiesFrom.filter = `brightness(${config["brightness-from"]})`;
                        animationProperties.webkitFilter = `brightness(${config["brightness-to"]})`;
                        animationProperties.filter = `brightness(${config["brightness-to"]})`;
                        break;
                    default:
                        animationProperties[property] = config[property];
                        break;
                }
            };
        });
        animationProperties.duration = config["duration"];
        animationProperties.ease = config["ease"];
        animationProperties.delay = config["delay"];
        animationProperties.repeat = config["repeat"];
        animationProperties.repeatDelay = config["repeat-delay"];
        animationProperties.yoyo = config["yoyo"];
        if (config["stagger-amount"] !== undefined) {
            animationProperties.stagger = { amount: config["stagger-amount"], from: config["stagger-from"] };
        }
        // Use the 'fromTo' method of the timeline
        if (method === 'fromTo') {
            timeline.fromTo(elToAnimate, animationPropertiesFrom, animationProperties, 0);
        } else {
            timeline[method](elToAnimate, animationProperties, 0);
        }
    };
}