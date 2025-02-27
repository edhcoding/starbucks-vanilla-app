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
      // 한글 입력의 경우 이벤트가 2번 발생할 수 있음, CJK 문자는 브라우저가 분석하는 과정이 추가로 들어가기 때문에 이벤트가 2번 발생할 수 있음
      // isComposing 을 사용해서 분석하고 있는지 없는지 확인해서 이벤트 처리 횟수를 줄여줄 수 있음
      if (
        event instanceof KeyboardEvent &&
        event.key === "Enter" &&
        !event.isComposing
      ) {
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

    // 메시지 작성할때마다 최하단에 스크롤 이동
    const messageListEl = this.el.querySelector(".chats ul");
    // scrollTo(x, y)
    // scrollHeight - 스크롤 바 전체 높이
    messageListEl?.scrollTo(0, messageListEl.scrollHeight || 0);

    // 메시지 작성 후 다시 리렌더링 된 후 다시 포커스 해주기
    inputEl?.focus();
  }
}
