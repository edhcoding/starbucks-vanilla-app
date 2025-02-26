///// Component /////
interface ComponentPayload {
  tagName?: string;
  props?: {
    // 인덱싱 가능 타입
    [key: string]: unknown;
  };
  state?: {
    [key: string]: unknown;
  };
}

export class Component {
  public el;
  public props;
  public state;

  constructor(payload: ComponentPayload = {}) {
    const {
      tagName = "div", // 최상위 요소의 태그 이름
      props = {},
      state = {},
    } = payload;
    this.el = document.createElement(tagName); // 컴포넌트의 최상위 요소
    this.props = props; // 컴포넌트가 사용될 때 부모 컴포넌트에서 받는 데이터
    this.state = state; // 컴포넌트 안에서 사용할 데이터
    this.render();
  }
  render() {
    // 컴포넌트를 렌더링하는 함수
    // ...
  }
}

///// Router /////
interface Route {
  path: string;
  component: typeof Component;
}

type Routes = Route[];

// 페이지 렌더링!
function routeRender(routes: Routes) {
  // 접속할 때 해시 모드가 아니면(해시가 없으면) /#/로 리다이렉트!
  if (!location.hash) history.replaceState(null, "", "/#/"); // (상태, 제목, 주소)

  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?"); // 물음표를 기준으로 해시 정보와 쿼리스트링을 구분

  // 1) 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
  interface Query {
    [key: string]: string;
  }

  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {} as Query);
  history.replaceState(query, ""); // (상태, 제목)

  // 2) 현재 라우트 정보를 찾아서 렌더링!
  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );
  if (routerView) {
    routerView.innerHTML = "";
    // if문 조건에 currentRoute 부분도 넣게 되는경우 예상치 못한 오류가 발생할 수 있기 때문에 && 연산자를 이용
    currentRoute && routerView.append(new currentRoute.component().el);
  }

  // 3) 화면 출력 후 스크롤 위치 복구!
  window.scrollTo(0, 0);
}

export function createRouter(routes: Routes) {
  // 원하는(필요한) 곳에서 호출할 수 있도록 함수 데이터를 반환!
  return function () {
    window.addEventListener("popstate", () => routeRender(routes));
    routeRender(routes);
  };
}

///// Store /////
interface StoreObservers {
  [key: string]: SubscribeCallback[];
}

interface SubscribeCallback {
  // 호출 시그니처
  (arg: unknown): void;
}

// Store 클래스는 상태를 관리하는데 인수로 다양한 데이터가 들어오기 때문에 타입을 정의하기 어려움 - 제네릭 타입을 이용해 타입을 정의
export class Store<S> {
  // 상태(데이터), 어디서든 접근 가능하게 하기 위해 public 접근 제어자 사용
  // 빈 객체 데이터에는 타입을 정의할 수 없기 때문에 타입 단언을 사용해 제네릭 타입을 이용해 타입 정의
  public state = {} as S;
  // Store 바깥쪽에서 사용하지 않고 내부에서만 사용하므로 private 접근 제어자 사용
  private observers = {} as StoreObservers;

  constructor(state: S) {
    for (const key in state) {
      // 각 상태에 대한 변경 감시(Setter) 설정!
      Object.defineProperty(this.state, key, {
        // Getter
        get: () => state[key],
        // Setter
        set: (val) => {
          state[key] = val;

          // 호출할 콜백이 있는 경우!
          if (Array.isArray(this.observers[key]))
            // observers 속성에 대괄호 표기법 사용해 데이터의 속성을 인덱싱하고 있는데 observers는 객체 데이터이면서 인덱싱 가능해야함
            this.observers[key].forEach((observer) => observer(val));
        },
      });
    }
  }

  // 상태 변경 구독!
  subscribe(key: string, cb: SubscribeCallback) {
    Array.isArray(this.observers[key]) // 이미 등록된 콜백이 있는지 확인!
      ? this.observers[key].push(cb) // 있으면 새로운 콜백 밀어넣기!
      : (this.observers[key] = [cb]); // 없으면 콜백 배열로 할당!

    // 예시)
    // observers = {
    //   구독할상태이름: [실행할콜백1, 실행할콜백2]
    //   movies: [cb, cb, cb],
    //   message: [cb]
    // }
  }
}
