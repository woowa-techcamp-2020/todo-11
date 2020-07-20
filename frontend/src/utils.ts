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
};

export default utils;
