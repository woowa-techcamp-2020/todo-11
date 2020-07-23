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
                  <span id="close" class="close">x</span>
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
            padding: 22px;
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
            padding: 22px;
            flex-direction: column;
            }

            .label {
            font-size: 20px;
            font-weight: 600;
            }

            .content {
                border: 2px solid #5175bd;
                border-radius: 5px;
                padding: 12px;
            font-size: 18px;
            margin: 10px 0 20px;
            overflow: hidden;
            }
            .content:focus{
                outline: none;
                box-shadow: 0 0 2px 3px #91A7D0;
                
            }

            .btn {
            width: fit-content;
            font-size: 20px;
            padding: 10px;
            font-weight: 550;
            color: white;
            background-color: #2bb24a;
            border: none;
            border-radius: 5px;
            }
            .btn:focus{
                outline: none;
            }
            .btn:hover{
                background-color: #4dc569;
            }
            .btn:active{
                background-color: #079c2a;
            }

            .btn:disabled {
            background-color: gray;
            }

            .note {
            resize: vertical;
            }
            .column {
            resize: none;
            }
            .close {
                color: rgb(104, 100, 100);
                font-size: 22px;
                font-weight: 900;
            }
            .close:hover {
            color: #5175bd;
            }
            .close:active{
                color: #234996;
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
