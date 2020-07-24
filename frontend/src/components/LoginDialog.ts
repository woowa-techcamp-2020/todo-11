import WtcDialog from "./common/WtcDialog";

const hangul = {
    login: "로그인",
    signup: "회원가입",
};

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
                    <form id='form' class="body">
                        <input type="text" id="email" placeholder="Email">
                        <input type="text" id="pw" placeholder="Password">
                        <button id="submit" class="btn">로그인</button>
                    </form>
                </div>
            </wtc-dialog>
        `;
        const style = document.createElement("style");
        style.lang = "scss";
        style.innerText = `        
            .container{
                width: 500px;
                box-sizing: border-box;
                border-radius: 6px;
                background-color: white;
            }
            .header{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }
            .tab{
                color:black;
                text-align: center;
                width: 100%;
                font-size: 20px;
                padding: 20px;
            }
            .activation{
                color: white;
                background-color: black;
            }
            #login{
                border-top-left-radius: 6px;
            }
            #signup{
                border-top-right-radius: 6px;
            }
            .body{
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-content: center;
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
            input{
                width: 100%;
                font-size: 18px;
                margin-bottom: 5px;
            }
        `;
        shadow.appendChild(style);

        this.#dialog = shadow.getElementById("dialog")!!;
        const submitBtn = shadow.getElementById("submit");
        submitBtn?.addEventListener("click", () => {
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
    get form() {
        return new FormData(this.shadowRoot?.getElementById("form"));
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
                this.shadowRoot!!.getElementById("submit")!.textContent =
                    hangul[newValue];
        }
    }
}

export default LoginDialog;
