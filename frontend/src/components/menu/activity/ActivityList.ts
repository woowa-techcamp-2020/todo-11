import ActivityModel from "../../../model/activityModel";
import ActivityItem from "./ActivityItem";
import utils from "../../../utils";

class ActivityList extends HTMLElement {
    #shadow: ShadowRoot;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        this.#shadow = shadow;
        shadow.innerHTML = `
            <div class="container">
                <div class="header">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                    Activity
                </div>
                <div id="list" class="list"></div>
            </div>
        `;
        const style = document.createElement("style");
        style.lang = "scss";
        style.innerText = `
            .container{
                display: flex;
                flex-direction: column;
            }
            .header{
                display: flex;
                padding: 8px 16px;
                font-size: 15px;
                border-bottom: 1px solid rgb(201, 201, 201);
                align-items: flex-end;
                font-weight: 600;
                line-height: 125%;
            }
            svg{
                margin-right: 3px;
            }
            .list{
                display: flex;
                flex-direction: column;
            }
        `;
        shadow.appendChild(style);
    }

    set activityList(activityList: ActivityModel[]) {
        const list = this.#shadow.getElementById("list");
        const fragment = document.createDocumentFragment();

        activityList.forEach((activity) =>
            fragment.appendChild(
                utils.createElement("activity-item", { activity: activity })
            )
        );
        list!.innerHTML = "";
        list!.appendChild(fragment);
    }
}

export default ActivityList;
