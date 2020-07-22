import WtcDialog from "./common/WtcDialog";

const label = {
    note: "Note",
    column: "Column name",
};
const btn = {
    note: "Save note",
    column: "Update column",
};

class EditDialog extends HTMLElement {
    #dialog: WtcDialog;
    #shadow: ShadowRoot;
    #handleSubmit: Function;

    static get observedAttributes() {
        return ["type"];
    }
    constructor() {
        super();
        const shadow: ShadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadow = shadow;
        shadow.innerHTML = `
            <wtc-dialog id="dialog">
              <div class="container">
                <div class="header">
                  <div class="title">
                    <span>
                      Edit
                    </span>
                    <span id="title" class="title"> </span>
                  </div>
                  <span id="close" class="close">X</span>
                </div>
                <div class="body">
                  <label id="label" class="label" for="content"></label>
                  <textarea id="content" class="content"></textarea>
                  <button id="submit" class="btn">안녕</button>
                </div>
              </div>
            </wtc-dialog>
        `;

        const style: HTMLStyleElement = document.createElement("style");
        style.lang = "scss";
        style.textContent = `
            * {
            box-sizing: border-box;
            }
            .container {
            user-select: none;
            width: 700px;
            display: flex;
            flex-direction: column;
            background-color: white;
            }

            .header {
            padding: 20px;
            background-color: #f5f8fa;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            }

            .title {
            font-size: 22px;
            font-weight: 600;
            }

            .body {
            display: flex;
            padding: 20px;
            flex-direction: column;
            }

            .label {
            font-size: 20px;
            }

            .content {
            font-size: 18px;
            margin: 10px 0 20px;
            overflow: hidden;
            }

            .btn {
            width: fit-content;
            font-size: 20px;
            padding: 10px;
            color: white;
            background-color: #2bb24a;
            border: 1px solid #2bb24a;
            border-radius: 5px;
            }
            .btn:disabled {
            background-color: gray;
            border-color: gray;
            }

            .note {
            resize: vertical;
            }
            .column {
            resize: none;
            }
            .close {
            }
            .close:hover {
            color: red;
            }
        `;
        shadow.appendChild(style);
        this.#dialog = shadow.getElementById("dialog");
        const content: HTMLTextAreaElement = shadow.getElementById("content");
        const submit: HTMLButtonElement = shadow.getElementById("submit");
        const close: HTMLSpanElement = shadow.getElementById("close")!!;
        content.addEventListener("input", (e) => {
            if (this.content.trim().length === 0)
                submit.setAttribute("disabled", "");
            else submit.removeAttribute("disabled");
        });
        submit.addEventListener("click", () => this.#handleSubmit());
        close.addEventListener("click", () => this.setInvisible());
    }

    setVisible() {
        this.#dialog.setVisible();
    }
    setInvisible() {
        this.#dialog.setInvisible();
    }

    get title() {
        return this.#shadow.getElementById("title")!.textContent!!;
    }

    set title(title: string) {
        this.#shadow.getElementById("title")!.textContent = title;
    }

    set label(label: string) {
        this.#shadow.getElementById("label")!.textContent = label;
    }

    set submitText(text: string) {
        this.#shadow.getElementById("submit")!.textContent = text;
    }

    get content() {
        return this.#shadow.getElementById("content")!.value;
    }

    set content(content: string) {
        this.#shadow.getElementById("content")!.value = content;
    }

    set handleSubmit(fn: Function) {
        this.#handleSubmit = fn;
    }
    set type(type: string) {
        this.setAttribute("type", type);
    }

    connectedCallback() {}

    disconnectedCallback() {
        this.#shadow.getElementById("submit")!.removeAttribute("onclick");
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        if (oldValue === newValue) return;
        switch (name) {
            case "type":
                const contentEl = this.#shadow.getElementById("content");
                this.label = label[newValue];
                this.submitText = btn[newValue];
                if (newValue === "note") {
                    contentEl!.classList.remove("column");
                    contentEl!.classList.add("note");
                    contentEl!.maxLength = 500;
                    contentEl!.rows = 7;
                    this.title = "note";
                } else if (newValue === "column") {
                    contentEl!.classList.remove("note");
                    contentEl!.classList.add("column");
                    contentEl!.maxLength = 50;
                    contentEl!.rows = 1;
                }
                break;
        }
    }
}

export default EditDialog;
