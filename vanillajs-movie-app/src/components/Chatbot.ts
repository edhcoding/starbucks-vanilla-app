import { Component } from "../core/donghyeok";
import chatStore, { sendMessages } from "../store/chatbot";
import movieStore, { searchMovies } from "../store/movie";

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
              ${
                typeof msg.content === "string" // 타입 가드
                  ? // (match, ko, en) 여기에서 match - 정규표현식에 매칭된 문자열, ko - 첫 번째 캡처 그룹(정규 표현식에서 첫 번째 소괄호 부분), en - 두 번째 캡처 그룹(정규 표현식에서 두 번째 소괄호 부분)
                    /* html */ `
                ${msg.content.replace(
                  /{{(.*?)\/\/(.*?)}}/g,
                  (match, ko, en) => /* html */ `
                    <span class="movie-title" data-movie-title="${en}">${ko}</span>
                  `
                )}
              `
                  : ""
              }
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

    const movieTitleEls = this.el.querySelectorAll<HTMLElement>(".movie-title");
    movieTitleEls.forEach((movieTitleEl) => {
      movieTitleEl.addEventListener("click", () => {
        const searchInputEl =
          document.querySelector<HTMLInputElement>(".search input");

        if (!searchInputEl) return;

        // movieTitleEl 는 Element 타입임
        // dataset 속성은 HTMLElement 타입에만 존재함
        // 하지만 HTMLElement는 Element 타입의 하위 타입임
        // dataset에 movieTitle 속성이 없으면 undefined를 반환하기 때문에 없을 경우도 처리해줘야 함
        const title = movieTitleEl.dataset.movieTitle || "";
        searchInputEl.value = title;
        movieStore.state.searchText = title;
        searchMovies(1);
      });
    });
  }
}

/**
 * /{{(.*?)\/\/(.*?)}}/g
 * 
 * 패턴 구조
- {{ : 시작 구분자로 중괄호 두 개를 사용
- (.*?) : 첫 번째 캡처 그룹 - 한국어 영화 제목
- // : 구분자로 슬래시 두 개 사용
- (.*?) : 두 번째 캡처 그룹 - 영어 영화 제목
- }} : 끝 구분자로 중괄호 두 개를 사용
- g : 전역 플래그 (문자열 전체에서 모든 매칭을 찾음)
  * 세부 설명:
- .*? : 임의의 문자(.)를 0개 이상(0개 이상 매칭) 찾되, 최소한으로 매칭(게으른 매칭, ?)
- () : 캡처 그룹을 만들어 나중에 참조할 수 있게 함
 */
