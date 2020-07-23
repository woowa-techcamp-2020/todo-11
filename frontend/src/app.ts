import Container from "./components/container/container";
import EventBus from "./eventBus";
import WtcDialog from "./components/common/WtcDialog";
import LoginDialog from "./components/LoginDialog";
import EditDialog from "./components/EditDialog";
import DeletePopup from "./components/DeletePopup";

customElements.define("wtc-dialog", WtcDialog);
customElements.define("login-dialog", LoginDialog);
customElements.define("edit-dialog", EditDialog);
customElements.define("delete-popup", DeletePopup);

const app = document.getElementById("app");

const container = new Container();

app?.appendChild(container.render());
