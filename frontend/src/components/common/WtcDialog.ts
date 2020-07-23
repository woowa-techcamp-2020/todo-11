class WtcDialog extends HTMLElement {
    constructor() {
        super();
        const shadow: ShadowRoot = this.attachShadow({ mode: "closed" });
        shadow.innerHTML = `
        <div class="dialog-wrapper">
            <slot class="dialog-container"></slot>
        </div>
    `;

        this.addEventListener("click", (e) => {
            const top = e.composedPath()[0];
            if (top === this) {
                this.setInvisible();
            }
        });

        const style: HTMLStyleElement = document.createElement("style");
        style.lang = "scss";
        style.textContent = `
        .dialog-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
        }
        .dialog-container {
            display: block;
        }
        :host(.clear) .dialog-wrapper{
            background-color: rgba(0,0,0,0);
        }
        :host(.invisible){
            display:none;
        }
    `;
        shadow.appendChild(style);
    }

    setClear() {
        this.classList.add("clear");
    }

    setVisible() {
        this.classList.remove("invisible");
    }
    setInvisible() {
        this.classList.add("invisible");
    }

    connectedCallback() {
        this.setInvisible();
    }
}

export default WtcDialog;
