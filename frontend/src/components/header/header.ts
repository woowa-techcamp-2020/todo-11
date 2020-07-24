import { div, p, span, a, img } from "../common/defaultElement";
import api from "../../api";
import LoginDialog from "../LoginDialog";
import EventBus from "../../eventBus";
import utils from "../../utils";
import TodoMenu from "../menu/Menu";
import activityModel from "../../model/activityModel";
// activity관련 값을 가져온다.
// memberNo, currentColumnNo 가 필요하다.
export default class Header {
    eventBus: EventBus;
    loginDialog: LoginDialog;
    userIcon: HTMLElement;
    loginText: HTMLElement;
    menu: TodoMenu;
    constructor(eventBus: EventBus, memberNo: number, currentColumnNo: number) {
        this.eventBus = eventBus;
        const loginDialog = new LoginDialog();
        const userIcon = utils.createElement("img", {
            src: "user.svg",
        });
        const loginText = utils.createElement("p", {
            textContent: "로그인 했다 치고",
            className: "invisible",
        });

        loginDialog.handleLogin = () => {
            api.login(this.loginDialog.email, this.loginDialog.password).then(
                (res) => {
                    console.log(res);
                }
            );
        };
        loginDialog.handleSignup = () => {
            api.signup(this.loginDialog.email, this.loginDialog.password).then(
                (res) => {
                    console.log(res);
                }
            );
        };
        loginDialog.setAttribute("type", "login");
        loginDialog.setAttribute("type", "signin");
        loginDialog.type = "login";
        userIcon.addEventListener("click", () => {
            this.loginDialog.setVisible();
        });
        loginText.addEventListener("click", () => {
            userIcon.classList.remove("invisible");
            loginText.classList.add("invisible");
        });

        this.loginDialog = loginDialog;
        this.loginText = loginText;
        this.userIcon = userIcon;
        this.menu = new TodoMenu();
        this.menu.hide();
    }
    render() {
        return div(
            { className: "header" },
            span({}, "헤더입니다."),
            this.loginDialog,
            this.userIcon,
            this.loginText,
            a({ href: "#", onclick: () => this.menu.show() }, "menu"),
            this.menu
        );
    }
}
