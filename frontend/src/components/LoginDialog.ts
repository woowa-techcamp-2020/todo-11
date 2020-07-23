import WtcDialog from "./common/WtcDialog";

class LoginDialog extends HTMLElement {
    #dialog: WtcDialog;
    #handleSignup: Function;
    #handleLogin: Function;
    static get observedAttributes() {
        return ["type"];
    }
    constructor() {
        super();
        const shadow: ShadowRoot = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
            <wtc-dialog id="dialog">
                <div class="container">
                    <div class="header" type="login">
                        <div id="login" class="tab activation">
                            로그인
                        </div>
                        <div id="signup" class="tab">
                            회원가입
                        </div>
                    </div>
                    <div class="body">
                        <div class="input-container">
                            <label for="email">아디</label>
                            <input type="text" name="" id="email">
                        </div>
                        <div class="input-container">
                            <label for="pw">비번</label>
                            <input type="text" name="" id="pw">
                        </div>
                        <button id="submit" class="btn">클릭</button>
                    </div>
                </div>
            </wtc-dialog>
        `;
        const style = document.createElement("style");
        style.lang = "scss";
        style.innerText = `        
            .container{
                width: 600px;
                box-sizing: border-box;
                border: 1px solid black;
                background-color: white;
            }
            .header{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }
            .tab{
                text-align: center;
                width: 100%;
                font-size: 20px;
                padding: 20px;
                background-color: gray;
            }
            .activation{
                background-color: rgb(219, 255, 166);
            }
            .body{
                padding: 20px;
                display: flex;
                flex-direction: column;
            }
            .input-container{
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            .btn {
                width: 30%;
                margin: auto;
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
            label{
                width: 15%;
                font-size: 20px;
            }
            input{
                width: 100%;
                font-size: 18px;
            }
        `;
        shadow.appendChild(style);

        this.#dialog = shadow.getElementById("dialog")!!;
        const submitBtn = shadow.getElementById("submit");
        submitBtn?.addEventListener("click", () => {
            console.log("hi");
            if (this.type === "login") this.handleLogin();
            else if (this.type === "signup") this.handleSignup();
        });

        const login = shadow.getElementById("login");
        const signup = shadow.getElementById("signup");
        login!.addEventListener("click", () =>
            this.setAttribute("type", "login")
        );
        signup!.addEventListener("click", () =>
            this.setAttribute("type", "signup")
        );
    }
    setVisible() {
        this.#dialog.setVisible();
    }
    setInvisible() {
        this.#dialog.setInvisible();
    }
    get email() {
        return this.shadowRoot.getElementById("email").value;
    }
    get password() {
        return this.shadowRoot.getElementById("pw").value;
    }
    get handleLogin() {
        return this.#handleLogin;
    }
    get handleSignup() {
        return this.#handleSignup;
    }
    set handleLogin(fn: Function) {
        this.#handleLogin = fn;
    }
    set handleSignup(fn: Function) {
        this.#handleSignup = fn;
    }
    get type() {
        return this.getAttribute("type")!!;
    }
    set type(type: string) {
        this.setAttribute("type", type);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        switch (name) {
            case "type":
                this.shadowRoot!!.getElementById(oldValue)?.classList.remove(
                    "activation"
                );
                this.shadowRoot!!.getElementById(newValue)?.classList.add(
                    "activation"
                );
                break;
        }
    }
}

export default LoginDialog;
