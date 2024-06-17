import { gsap } from "gsap";
import { registerCounterEffect } from './gsap-custom-effects';
// Register Custom GSAP Effects
registerCounterEffect();

export function setElementTimeline(element, animType: string, animProperties: any = {}, animVariables: any = {}, tween: string) {
    let tl = gsap.timeline({ ease: animProperties.ease });
    switch (animType) {
        case "typewriter":
            let words = animVariables["typewriter-words"];
            let wordsArray = words.split(",");
            wordsArray.forEach(word => {
                let typewritterTl = gsap.timeline();
                typewritterTl.fromTo(element, { text: "" }, { text: word, duration: animVariables.duration, ease: animVariables.ease });
                typewritterTl.delay(animVariables.delay);
                typewritterTl.repeat(1);
                typewritterTl.repeatDelay(parseFloat(animVariables["repeatDelay"]));
                typewritterTl.yoyo(true);
                tl.add(typewritterTl);
            });
            tl.repeat(animVariables.repeat);
            break;
        case "marquee":
            let listParent = element.parentElement;
            let list = element;
            // create two clones of the list and appent it to the parent
            let listClone1 = list.cloneNode(true);
            let listClone2 = list.cloneNode(true);
            listParent.appendChild(listClone1);
            listParent.appendChild(listClone2);
            // Set the properties and variables based on the direction
            let xFrom, xTo, yFrom, yTo;
            let direction = animVariables.direction;
            console.log("direction", direction);
            switch (direction) {
                case "left":
                    xFrom = "-100%";
                    xTo = "-200%";
                    break;
                case "right":
                    xFrom = "-200%";
                    xTo = "-100%";
                    break;
                case "up":
                    yFrom = "-100%";
                    yTo = "-200%";
                    break;
                case "down":
                    yFrom = "-200%";
                    yTo = "-100%";
                    break;
            }
            // Set the initial position of the list and the clones
            gsap.set(list, { x: xFrom, y: yFrom });
            gsap.set(listClone1, { x: xFrom, y: yFrom });
            gsap.set(listClone2, { x: xFrom, y: yFrom });
            let marqueeTl = gsap.timeline();
            marqueeTl.to(list, { x: xTo, y: yTo, duration: animVariables.duration, ease: animVariables.ease });
            marqueeTl.to(listClone1, { x: xTo, y: yTo, duration: animVariables.duration, ease: animVariables.ease }, "<");
            marqueeTl.to(listClone2, { x: xTo, y: yTo, duration: animVariables.duration, ease: animVariables.ease }, "<");
            marqueeTl.repeat(animVariables.repeat);
            break;
        default:
            let finalProperties = {};
            // Combine the properties and variables
            finalProperties = { ...animProperties, ...animVariables };
            // Check for special properties
            if(finalProperties.hasOwnProperty("brightness")) {
                // Set the elemeent starting brightness
                let value = finalProperties["brightness"] / 100;
                gsap.set(element, { filter: 'brightness(1)', webkitFilter: 'brightness(1)'});
                finalProperties["filter"] = `brightness(${value})`;
                finalProperties["webkitFilter"] = `brightness(${value})`;
                delete finalProperties["brightness"];
            }
            // Configure the timeline
            tl[tween](element, finalProperties, 0);
            break;
    }

    return tl;
}