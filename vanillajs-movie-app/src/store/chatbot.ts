import { Store } from "../core/donghyeok";

interface State {
  chatText: string;
  messages: Message[];
  loading: boolean;
}

interface Message {
  role: "assistant" | "user";
  content: string;
}

// role - assistant(챗봇), user(사용자)
const defaultMessages: Message[] = [
  {
    role: "assistant",
    content: "좋아하는 영화 장르나 제목을 알려주세요.",
  },
];

const store = new Store<State>({
  // 사용자가 입력하는
  chatText: "",
  // 대화한 내용이 담겨있는 배열
  messages: defaultMessages,
  // 로딩 상태
  loading: false,
});

export default store;

// 사용자가 입력한 메시지 전송 함수
export const sendMessages = async () => {
  // 예외 처리
  if (!store.state.chatText.trim()) return;
  if (store.state.loading) return;

  store.state.loading = true;
  // 메시지를 배열의 다음 객체로 추가하면 되니까 push()로 시작하면 안됨 - push()메서드를 사용하면 messages 배열이 바뀌는지 바뀌지 않는지 데이터 변경을 감지하지 못함
  // 따라서 push 메서드 보다는 할당 연산자를 사용해서 구현하는게 더 좋음
  store.state.messages = [
    ...store.state.messages,
    { role: "user", content: store.state.chatText },
  ];

  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({
        messages: store.state.messages, // 대화 내역
      }),
    });
    // 챗봇의 메시지가 담긴 데이터를 받아옴
    const message = await res.json();

    // 기존의 메시지 배열에 챗봇의 메시지 추가
    store.state.messages = [...store.state.messages, message];

    store.state.chatText = "";
  } catch (error) {
    console.log("sendMessages function error: ", error);
  } finally {
    store.state.loading = false;
  }
};

// 대화 내역 초기화 함수
export const resetMessages = () => {
  store.state.messages = defaultMessages;
};
