const utils = {
    createElement(elm: string, attrs: object = {}) {
        const element = document.createElement(elm);
        this.setParams(element, attrs);
        return element;
    },

    setParams(elm: HTMLElement, attrs: object) {
        for (const attr in attrs) {
            elm[attr] = attrs[attr];
        }
    },

    hasFinalConsonant(word: string) {
        if (typeof word !== "string") return null;
        const last = word[word.length - 1].charCodeAt(0);
        return (last - 0xac00) % 28 !== 0;
    },
};

export default utils;
