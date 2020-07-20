import WtcDialog from "../common/WtcDialog";

const label = {
  note: "Note",
  column: "Column name",
};
const btn = {
  note: "Save note",
  column: "Update column",
};

class EditDialog extends HTMLElement {
  dialogEl: WtcDialog;
  titleEl: HTMLSpanElement;
  labelEl: HTMLLabelElement;
  contentEl: HTMLTextAreaElement;
  submitEl: HTMLButtonElement;
  constructor() {
    super();
    const shadow: ShadowRoot = this.attachShadow({ mode: "closed" });
    const dialog: WtcDialog = document.createElement("wtc-dialog");
    this.dialogEl = dialog;
    shadow.appendChild(dialog);

    dialog.innerHTML = `
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
    `;
    this.titleEl = shadow.getElementById("title")!!;
    this.labelEl = shadow.getElementById("label");
    this.contentEl = shadow.getElementById("content")!!;
    this.submitEl = shadow.getElementById("submit")!!;

    this.contentEl.addEventListener("input", () => {
      if (this.content.length === 0) this.submitEl.setAttribute("disabled", "");
      else this.submitEl.removeAttribute("disabled");
    });
    const close = shadow.getElementById("close")!!;
    close.addEventListener("click", () => this.setInvisible());

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
  }

  setVisible() {
    this.dialogEl.setVisible();
  }
  setInvisible() {
    this.dialogEl.setInvisible();
  }

  get title() {
    return this.titleEl.textContent!!;
  }

  set title(title: string) {
    this.titleEl.textContent = title;
  }

  get content() {
    return this.contentEl.value;
  }

  set content(content: string) {
    this.contentEl.value = content;
  }

  set type(type: string) {
    this.labelEl.textContent = label[type];
    this.submitEl.textContent = btn[type];
    if (type === "note") {
      this.contentEl.maxLength = 500;
      this.contentEl.rows = 7;
      this.contentEl.classList.remove("column");
      this.contentEl.classList.add("note");
    } else if (type === "column") {
      this.contentEl.classList.remove("note");
      this.contentEl.classList.add("column");
      this.contentEl.maxLength = 50;
      this.contentEl.rows = 1;
    }
  }

  set handleSubmit(event: Event) {
    this.submitEl.onclick = event;
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.submitEl.removeAttribute("onclick");
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    console.log(`${name} : ${oldValue} => ${newValue}`);
  }
}

export default EditDialog;
