import { gsap } from "gsap";
import { registerCounterEffect } from './gsap-custom-effects';
// Register Custom GSAP Effects
registerCounterEffect();

export function setElementTimeline(element, animType: string, elementProperties: any = {}, elementVariables: any = {}, tween: string) {
    let tl = gsap.timeline({ ease: elementProperties.ease });
    switch (animType) {
        case "typewriter":
            let words = elementVariables["typewriter-words"];
            let wordsArray = words.split(",");
            wordsArray.forEach(word => {
                let typewritterTl = gsap.timeline();
                typewritterTl.fromTo(element, { text: "" }, { text: word, duration: elementVariables.duration, ease: elementVariables.ease });
                typewritterTl.delay(elementVariables.delay);
                typewritterTl.repeat(1);
                typewritterTl.repeatDelay(parseFloat(elementVariables["repeatDelay"]));
                typewritterTl.yoyo(true);
                tl.add(typewritterTl);
            });
            tl.repeat(elementVariables.repeat);
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
            let direction = elementVariables.direction;
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
            marqueeTl.to(list, { x: xTo, y: yTo, duration: elementVariables.duration, ease: elementVariables.ease });
            marqueeTl.to(listClone1, { x: xTo, y: yTo, duration: elementVariables.duration, ease: elementVariables.ease }, "<");
            marqueeTl.to(listClone2, { x: xTo, y: yTo, duration: elementVariables.duration, ease: elementVariables.ease }, "<");
            marqueeTl.repeat(elementVariables.repeat);
            tl.add(marqueeTl);
            break;
        default:
            if (elementProperties.hasOwnProperty("target")) {
                element = elementProperties["target"];
                delete elementProperties["target"];
            }
            // Combine the properties and variables
            let finalProperties = {};
            finalProperties = { ...elementProperties, ...elementVariables };
            // Remove variables that the name starts with am-
            for (let key in finalProperties) {
                if (key.startsWith("am-")) {
                    delete finalProperties[key];
                }
            }
            // Check for special properties
            if (finalProperties.hasOwnProperty("brightness")) {
                // Set the elemeent starting brightness
                let value = finalProperties["brightness"] / 100;
                gsap.set(element, { filter: 'brightness(1)', webkitFilter: 'brightness(1)' });
                finalProperties["filter"] = `brightness(${value})`;
                finalProperties["webkitFilter"] = `brightness(${value})`;
                delete finalProperties["brightness"];
            }
            if(finalProperties.hasOwnProperty("staggerAmount")) {
                finalProperties["stagger"] = { amount: finalProperties["staggerAmount"], from: finalProperties["staggerFrom"]};
                delete finalProperties["staggerAmount"];
                delete finalProperties["staggerFrom"];
            }
            // Configure the timeline
            tl[tween](element, finalProperties, 0);
            break;
    }
    
    return tl;
}