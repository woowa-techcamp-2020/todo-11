import ActivityModel from "../../../model/activityModel";

class ActivityItem extends HTMLElement {
    #shadow: ShadowRoot;

    static get observedAttributes() {
        return ["type"];
    }

    constructor() {
        super();
        const shadow: ShadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadow = shadow;
        shadow.innerHTML = `
            <div class="container">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-point" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9C27B0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="12" cy="12" r="4" />
                </svg>
                <div class="text-container">
                    <span id="activity" class="activity">
                        <span id="email" class="bold link"></span>
                        <span id="action"></span>
                        <span id="content" class="bold link"></span>
                        <span id="from" class="bold"></span>
                        <span id="to" class="bold"></span>
                    </span>
                    <span id="time" class="time">여기에 시간</span>
                </div>
            </div>
        `;

        const style = document.createElement("style");
        style.lang = "scss";
        style.innerText = `
            .container{
                padding: 16px;
                display: flex;
                flex-direction: row;
                background-color: white;
                height:100%;
                border-bottom: 1px solid rgb(201, 201, 201);
            }
            svg{
                padding-right: 8px;
            }
            .text-container{
                font-size: 14px;
                display: flex;
                flex-direction: column;
                align-content: flex-start;
            }
            .activity{
                line-height: 125%;
            }
            span{
                padding: 0;
            }
            #email::before{
                content: '@';
            }
            #action::after{
                content:'ed'
            }
            #from[status="show"]::before{
                font-weight: 400;
                content: 'from ';
            }
            #to[status="show"]::before{
                font-weight: 400;
                content:'to '
            }
            .bold{
                font-weight: 650;
            }
            .link{
                color: rgb(68, 68, 216);
            }
            .time{
                color: #6a737d;
            }`;
        shadow.appendChild(style);
    }
    set activity(activity: ActivityModel) {
        this.#shadow.getElementById("email")!.textContent = activity.email;
        this.#shadow.getElementById("action")!.textContent = activity.action;
        this.#shadow.getElementById("content")!.textContent = activity.content;
        const from = this.#shadow.getElementById("from");
        from!.textContent = activity.fromColumnTitle;
        from!.setAttribute(
            "status",
            activity.fromColumnTitle ? "show" : "hide"
        );
        const to = this.#shadow.getElementById("to");
        to!.textContent = activity.toColumnTitle;
        to!.setAttribute("status", activity.fromColumnTitle ? "show" : "hide");
        this.#shadow.getElementById("time")!.textContent = activity.createdAt;
    }
}

export default ActivityItem;
