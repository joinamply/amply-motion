export function getAttributeAsFloat(element: Element, attribute: string, defaultValue: number = 0): number {
    return parseFloat(element.getAttribute(attribute) as string) || defaultValue;
}

export function getAttributeAsString(element: Element, attribute: string, defaultValue: string = ''): string {
    return element.getAttribute(attribute) as string || defaultValue;
}

export function getAttributeAsBoolean(element: Element, attribute: string, defaultValue: boolean = false): boolean {
    return element.hasAttribute(attribute) ? element.getAttribute(attribute) === 'true' : defaultValue;
}

export function parseBoolean(value: string | boolean): boolean {
    // check if it is boolean and return the actual value
    if (typeof value === 'boolean') {
        return value;
    }
    // check if it is string and return the boolean value
    const lowerCaseValue = value.toLowerCase();
    return lowerCaseValue === 'true';
}
