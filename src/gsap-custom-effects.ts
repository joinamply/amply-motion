import { gsap } from "gsap";

export function registerCounterEffect() {
    gsap.registerEffect({
        name: "counter",
        extendTimeline: true,
        defaults: {
            end: 0,
            duration: 1,
            separator: ",",
            ease: "power1",
            increment: 1,
        },
        effect: (targets, config) => {
            let tl = gsap.timeline()
            let num = targets[0].innerText.replace(/\,/g, '')
            targets[0].innerText = num

            tl.to(targets, {
                duration: config.duration,
                innerText: config.end,
                //snap:{innerText:config.increment},
                modifiers: {
                    innerText: function (innerText) {
                        return gsap.utils.snap(config.increment, innerText).toString().replace(/\B(?=(\d{3})+(?!\d))/g, config.separator);
                    }
                },
                ease: config.ease
            }, 0)

            return tl;
        }
    });
}