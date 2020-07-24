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
    menuIcon: HTMLElement;
    loginText: HTMLElement;
    menu: TodoMenu;
    activityList: ActivityModel[];
    constructor(eventBus: EventBus, memberNo: number, currentColumnNo: number) {
        this.activityList = [];
        eventBus.add("addActivity", (activity: activityModel) => {
            this.activityList.push(activity);
            this.menu.activityList = this.activityList;
        });
        this.eventBus = eventBus;
        const loginDialog = new LoginDialog();
        this.menu = new TodoMenu();
        const userIcon = utils.createElement("img", {
            src: "user.svg",
        });
        const menuIcon = utils.createElement("img", {
            src: "menu.svg",
        });
        const loginText = utils.createElement("p", {
            textContent: "로그인 했다 치고",
            className: "invisible",
        });

        loginDialog.handleLogin = async () => {
            const result = await api
                .login(this.loginDialog.email, this.loginDialog.password)
                .then((res) => {
                    if (res.status === 201) {
                        this.loginDialog.setInvisible();
                        return res.json();
                    } else {
                        return null;
                    }
                });

            if (!!result) {
                this.eventBus.emit("getEntireData", result);
            }
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
        userIcon.className = "icon";
        menuIcon.className = "icon";

        menuIcon.addEventListener("click", () => this.menu.show());
        this.userIcon = userIcon;
        this.menuIcon = menuIcon;

        this.menu.hide();
    }
    render() {
        return div(
            { className: "header" },
            span({}, "todo"),
            div(
                { className: "icon-container" },
                this.userIcon,
                this.loginText,
                this.menuIcon,
                this.loginDialog,
                this.menu
            )
        );
    }
}
