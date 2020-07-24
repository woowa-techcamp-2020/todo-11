const makeElement = (
    tag: string,
    text: any,
    attributes: any,
    elements?: Array<Element>
) => {
    const resultElement: any = document.createElement(tag);

    for (const attrName in attributes) {
        if (attrName === "style") {
            const styles = attributes[attrName];
            for (const key in styles) {
                resultElement.style[key] = styles[key];
            }
        } else {
            resultElement[attrName] = attributes[attrName];
        }
    }
    if (text !== undefined && text !== null) {
        resultElement.innerText = text.toString();
    }
    if (elements !== undefined) {
        elements.forEach((element) => resultElement.appendChild(element));
    }
    return resultElement;
};

const blockTagtName = [
    "address",
    "article",
    "aside",
    "blockquote",
    "details",
    "dialog",
    "dd",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "figcaption",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "ul",
];

const inlineTagName = [
    "a",
    "abbr",
    "acronym",
    "b",
    "bdo",
    "big",
    "br",
    "button",
    "cite",
    "code",
    "dfn",
    "em",
    "i",
    "img",
    "input",
    "kbd",
    "label",
    "map",
    "object",
    "output",
    "q",
    "samp",
    "script",
    "select",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "textarea",
    "time",
    "tt",
];

// blockTagtName.forEach(name =>
//     el[name] = (attributes: any, ...elements: Element[]) => makeElement(name, null, attributes, elements));

// inlineTagName.forEach(name =>
//     el[name] = (attributes: any, text: any) => makeElement(name, text, attributes));

type keyType = { [key: string]: any };
const el: keyType = {};

// block
const div = (attributes: any, ...elements: Element[]) =>
    makeElement("div", null, attributes, elements);
const p = (attributes: any, ...elements: Element[]) =>
    makeElement("p", null, attributes, elements);

// inline
const span = (attributes: any, text: any) =>
    makeElement("span", text, attributes);
const textarea = (attributes: any, text: any) =>
    makeElement("textarea", text, attributes);
const button = (attributes: any, text: any) =>
    makeElement("button", text, attributes);
const a = (attributes: any, text: any) => makeElement("a", text, attributes);
const img = (attributes: any) => makeElement("img", "", attributes);

export { div, p, span, textarea, button, a, img };
