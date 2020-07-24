import ActivityList from "./activity/ActivityList";
import ActivityModel from "../../model/activityModel";

class TodoMenu extends HTMLElement {
    #shadow: ShadowRoot;
    static get observedAttributes() {
        return ["status"];
    }
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        this.#shadow = shadow;
        shadow.innerHTML = `
            <div id="container" class="container">
                <div class="header">
                    <svg id="hide" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#202020" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <polyline points="9 6 15 12 9 18" />
                    </svg>
                </div>
                <activity-list id="activityList"></activity-list>
            </div>
        `;

        const style = document.createElement("style");
        style.lang = "scss";
        style.innerText = `
            *{
                color: black;
            }
            .container{
                position: fixed;
                top: 0;
                height: 100%;
                width: 360px;
                display: flex;
                overflow-y: scroll;
                overflow-x: none;
                flex-direction: column;
                background-color: #F5F8FA;
                z-index: 1;
                transition: right 0.4s ease-in-out;
            }
            .header{
                display: flex;
                flex-direction: row;
                padding: 8px 12px;
                border-bottom: 1px dotted rgb(201, 201, 201);
            }
            :host([status="show"]) > .container{
                right: 0;
            }
            :host([status="hide"]) > .container{
                right: -360px;
            }
        `;
        shadow.appendChild(style);
        shadow
            .getElementById("hide")!
            .addEventListener("click", () => this.hide());
        this.hide();
    }
    set activityList(activityList: ActivityModel[]) {
        this.#shadow.getElementById("activityList").activityList = activityList;
    }
    show() {
        this.setAttribute("status", "show");
    }
    hide() {
        this.setAttribute("status", "hide");
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        if (oldValue === newValue) return;
    }
}

export default TodoMenu;
