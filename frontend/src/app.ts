
import Container from './components/container/container';

// console.log("hi");
// console.log("tmp");
// const ttt = document.createElement("div");
// ttt.innerText = "투두두";
// ttt.className = "ttt";
// const tmp = document.getElementsByTagName("body")[0];
// tmp.appendChild(ttt);

const app = document.getElementById('app');
const container = new Container();

app?.appendChild(container.render());
