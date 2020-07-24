import WtcDialog from "./common/WtcDialog";
import utils from "../utils";

const hangul = {
    card: "카드",
    column: "컬럼",
};

class DeletePopup extends HTMLElement {
    static get observedAttributes() {
        return ["type"];
    }

    #dialog: WtcDialog;
    #shadow: ShadowRoot;
    #handleConfirm: Function;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        shadow.innerHTML = `           
            <wtc-dialog id="dialog" class="clear">
                <div class="container">
                    <span id="text" class="text"></span>
                    <div class="btn-container">
                        <button id="cancel" class="btn cancel">취소</button>
                        <button id="confirm" class="btn confirm">확인</button>
                    </div>
                </div>
            <wtc-dialog>
        `;

        const style = document.createElement("style");
        style.lang = "scss";
        style.innerText = `
            
            
            .container{
                display: flex;
                border: 2px solid black;
                flex-direction: column;
                padding: 20px;
                background-color: white;
            }
            .text{
                padding: 20px;
                font-size: 22px;
            }
            .btn-container{
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
            }
            .btn{
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                box-sizing: border-box;
                border-radius: 5px;
            }
            .btn:active{
                outline: none;
            }
            .btn:focus{
                outline: none;
            }
            .btn:not(:last-child){
                margin-right: 10px;
            }
            .cancel{
                color: #4286F4;
                background-color: white;
                box-shadow: inset 0 0 0 1px #7b99ca;
            }
            .cancel:hover{
                background-color: #ebebeb;
            }
            .cancel:active{
                background-color: #d4d4d4;
            }
            .confirm{
                color: white;
                background-color: #4286F4;
            }
            .confirm:hover{
                background-color: #90b4ee;
            }
            .confirm:active{
                background-color: #2c69cc;
            }
        `;
        shadow.appendChild(style);

        this.#shadow = shadow;
        this.#dialog = shadow.getElementById("dialog");
        shadow
            .getElementById("confirm")
            ?.addEventListener("click", () => this.#handleConfirm());

        shadow
            .getElementById("cancel")
            ?.addEventListener("click", () => this.setInvisible());
    }

    setVisible() {
        this.#dialog.setVisible();
    }
    setInvisible() {
        this.#dialog.setInvisible();
    }

    set text(text: string) {
        this.#shadow.getElementById("text")!.textContent = text;
    }

    set type(type: string) {
        this.setAttribute("type", type);
    }

    set handleConfirm(fn: Function) {
        this.#handleConfirm = fn;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        switch (name) {
            case "type":
                this.text = `선택하신 ${hangul[newValue]}${
                    utils.hasFinalConsonant(hangul[newValue]) ? "을" : "를"
                } 삭제하시겠습니까?`;
                break;
        }
    }
}

export default DeletePopup;
