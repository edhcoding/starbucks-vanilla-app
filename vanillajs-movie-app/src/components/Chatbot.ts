import { Component } from "../core/donghyeok";
import chatStore, { sendMessages } from "../store/chatbot";

export default class Chatbot extends Component {
  constructor() {
    // messages, loading 상태에 따라서 다시 렌더링 해주는 코드 작성해줘야 함
    super();
    chatStore.subscribe("messages", () => this.render());
    chatStore.subscribe("loading", () => this.render());
  }

  render() {
    this.el.classList.add("chatbot");

    this.el.innerHTML = /* html */ `
      <div class="chats">
        <ul>
          ${chatStore.state.messages
            .map(
              (msg) => /* html */ `
            <li class="${msg.role}">
              ${
                msg.role === "assistant"
                  ? /* html */ `
                <div class="photo">
                  <span class="material-symbols-outlined">smart_toy</span>
                </div>
              `
                  : ""
              }
              ${msg.content}
            </li>
          `
            )
            .join("")}
            ${
              chatStore.state.loading
                ? /* html */ `
              <li class="assistant">
                <div class="photo">
                  <span class="material-symbols-outlined">smart_toy</span>
                </div>
                <div class="the-loader"></div>
              </li>
              `
                : ""
            }
        </ul>
        <div class="input">
          <input type="text" />
          <button class="btn btn-primary">
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
      <div class="btn btn-circle chat-starter">
        <span class="material-symbols-outlined icon--open">chat</span>
        <span class="material-symbols-outlined icon--close">close</span>
      </div>
    `;

    const inputEl = this.el.querySelector("input");
    inputEl?.addEventListener("input", () => {
      chatStore.state.chatText = inputEl.value;
    });
    inputEl?.addEventListener("keydown", (event: Event) => {
      if (event instanceof KeyboardEvent && event.key === "Enter") {
        sendMessages();
      }
    });

    const btnEl = this.el.querySelector(".input .btn");
    btnEl?.addEventListener("click", () => {
      sendMessages();
    });

    const chatStarterEl = this.el.querySelector(".chat-starter");
    chatStarterEl?.addEventListener("click", (event: Event) => {
      event.stopPropagation();
      this.el.classList.toggle("chatbot--on");

      // window 이벤트 핸들러를 익명함수로 정의하면 함수 내부에서 변수를 참조할 수 없음 -> 변수 생성
      const offChats = () => this.el.classList.remove("chatbot--on");

      if (this.el.classList.contains("chatbot--on")) {
        // window 객체에 클릭 이벤트를 추가한다는것은 chatbot 컴포넌트가 없는 페이지로 이동했을때도 계속 이벤트 핸들러가 메모리 상에 남아있는 상태가 됨
        // 이러한 상태를 방지하기 위해서는 chatbot을 끈 후에 window 객체에 추가한 이벤트 핸들러를 제거해야함
        window.addEventListener("click", offChats);
        // inputEl?.focus(); 이렇게만 작성하면 focus 이벤트 발생하지 않음 => css로 이벤트 지속시간을 추가했기 때문에 0.3s 그만큼 0.3s 뒤에 이벤트 발생하도록 만들어줘야함
        setTimeout(() => {
          inputEl?.focus();
        }, 300);
      } else {
        window.removeEventListener("click", offChats);
      }
    });

    const chatsEl = this.el.querySelector(".chats");
    chatsEl?.addEventListener("click", (event: Event) => {
      event.stopPropagation();
    });
  }
}
