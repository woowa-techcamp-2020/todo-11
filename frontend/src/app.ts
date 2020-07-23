import Container from "./components/container/container";
import EventBus from "./eventBus";

import WtcDialog from "./components/common/WtcDialog";
import LoginDialog from "./components/LoginDialog";
import EditDialog from "./components/EditDialog";

// console.log("hi");
// console.log("tmp");
// const ttt = document.createElement("div");
// ttt.innerText = "투두두";
// ttt.className = "ttt";
// const tmp = document.getElementsByTagName("body")[0];
// tmp.appendChild(ttt);

const app = document.getElementById("app");

const container = new Container();
setTimeout(() => app?.appendChild(container.render()), 0);
