import { gsap } from "gsap";
import { registerCounterEffect } from './gsap-custom-effects';
// Register Custom GSAP Effects
registerCounterEffect();

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
            case "fade-in":
                createAnimationFunction(["opacity"], "from")(tl, element, animConfig);
                break;
            case "fade-out":
                createAnimationFunction(["opacity"], "to")(tl, element, animConfig);
                break;
            case "grow-in":
                createAnimationFunction(["scale", "opacity"], "from")(tl, element, animConfig);
                break;
            case "grow-out":
                createAnimationFunction(["scale", "opacity"], "to")(tl, element, animConfig);
                break;
            case "shrink-in":
                createAnimationFunction(["scale", "opacity"], "from")(tl, element, animConfig);
                break;
            case "shrink-out":
                createAnimationFunction(["scale", "opacity"], "to")(tl, element, animConfig);
                break;
            case "slide-in":
                createAnimationFunction(["position-x", "position-y", "opacity"], "from")(tl, element, animConfig);
                break;
            case "slide-out":
                createAnimationFunction(["position-x", "position-y", "opacity"], "to")(tl, element, animConfig);
                break;
            case "flip-in":
                createAnimationFunction(["rotation-x", "rotation-y", "opacity"], "from")(tl, element, animConfig);
                break;
            case "flip-out":
                createAnimationFunction(["rotation-x", "rotation-y", "opacity"], "to")(tl, element, animConfig);
                break;
            case "text-fade-in":
                createAnimationFunction(["opacity"], "from")(tl, element, animConfig);
                break;
            case "text-fade-out":
                createAnimationFunction(["opacity"], "to")(tl, element, animConfig);
                break;
            case "text-grow-in":
                createAnimationFunction(["scale", "opacity"], "from")(tl, element, animConfig);
                break;
            case "text-grow-out":
                createAnimationFunction(["scale", "opacity"], "to")(tl, element, animConfig);
                break;
            case "text-shrink-in":
                createAnimationFunction(["scale", "opacity"], "from")(tl, element, animConfig);
                break;
            case "text-shrink-out":
                createAnimationFunction(["scale", "opacity"], "to")(tl, element, animConfig);
                break;
            case "text-slide-in":
                createAnimationFunction(["position-x", "position-y", "opacity"], "from")(tl, element, animConfig);
                break;
            case "text-slide-out":
                createAnimationFunction(["position-x", "position-y", "opacity"], "to")(tl, element, animConfig);
                break;
            case "text-flip-in":
                createAnimationFunction(["rotation-x", "rotation-y", "opacity"], "from")(tl, element, animConfig);
                break;
            case "text-flip-out":
                createAnimationFunction(["rotation-x", "rotation-y", "opacity"], "to")(tl, element, animConfig);
                break;
            case "custom":
                let customFunction = createAnimationFunction(["position-x", "position-y", "position-z", "rotation-x", "rotation-y", "rotation-z", "scale", "opacity"], "to")(tl, element, animConfig);
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

function createAnimationFunction(properties: string[], method: 'from' | 'to' | 'counter') {
    return (timeline: gsap.core.Timeline, elToAnimate: Element, config: any) => {
        const animationProperties: any = {};
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
        timeline[method](elToAnimate, animationProperties, 0);
    };
}