// 컴포넌트 생성 클래스
// 라우터 클래스
// 컴포넌트 간 데이터 통신 클래스

///// Component /////
export class Component {
  constructor(payload = {}) {
    const { tagName = "div", state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }

  render() {
    // ...
  }
}

///// Router /////
function routeRender(routes) {
  // replaceState(상태, 제목, 주소) - 히스토리 내역에 기록을 남기지 않으면서 페이지 이동시켜줌
  if (!location.hash) history.replaceState(null, "", "/#/");

  const routerView = document.querySelector("router-view");
  // location.hash 는 주소창에 있는 #이 시작하는 모든 문자열을 반환하는데 쿼리 스트링도 포함임
  // 하지만 우리는 쿼리 스트링을 제외한 순수한 경로만 원하기 때문에 # 뒤, ? 이전의 문자열만 추출해야함
  const [hash, queryString = ""] = location.hash.split("?");

  // a=123&b=456 쿼리스트링은 key, value 형식으로 &을 기준으로 여러개가 있을 수 있음
  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});

  history.replaceState(query, ""); // 주소 부분은 생략가능

  /**
   * 정규 표현식 사용하는 방법
   * #/about과 route가 가지고 있는 path가 일치하는지 확인하는 방법
   * 정규 표현식에서는 / 슬래시를 \ escape 처리해줘야 정상 작동함
   * #/about 뒤에 또 다른 /~~ 이런 형식이 있을 수 있기 때문에 \/? 이렇게 넣어줘서 about 뒤쪽에 슬래쉬 기호가 포함이 되어져 있거나 그렇지 않은 경우 모두 포함할 수 있도록 하고 $ 기호까지 넣어 해당 내용으로 끝나는 경우만 포함할 수 있도록 함
   * /#\/about\/?/.test('hash') - 정규 표현식의 문자를 변경 할 수 있게 생성자 함수로 제작
   * return new RegExp(`${route.path}/?$`).test(hash)
   */
  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );
  routerView.innerHTML = "";
  routerView.append(new currentRoute.component().el);

  // 스크롤 최상단 이동
  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return () => {
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes); // popstate 이벤트는 처음에는 동작하지 않기 때문에 최초에 한 번 호출 해줘야함
  };
}

///// Store /////
export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      // 객체 데이터의 속성을 정의하거나 수정할 때 사용하는 메서드임
      // Object.defineProperty(객체, 속성이름, 디스크립터 속성(가장 중요))
      // 디스크립터 속성 종류 - value: 속성의 값, writable: 값 수정 가능 여부, enumerable: 속성의 열거 가능 여부, configurable: 속성 삭제 및 디스크립터 수정 가능 여부, get: getter 함수, set: setter 함수
      // 결국 여기서 Object.definePropperty를 사용하는 이유는 정의하고자 하는 각각의 데이터들의 어떠한 새로운 값이 할당될 때마다 필요한 함수를 실행 시켜주기 위함 - 데이터를 감시하도록 만들어줄 수 있음
      Object.defineProperty(this.state, key, {
        // getter 함수는 값을 읽을 때 호출되는 함수, this.state라는 객체 데이터에 지정하는 키 값을 사용할 때 동작하는 함수
        get: () => state[key],
        // setter 함수는 값을 수정할 때 호출되는 함수, this.state라는 객체 데이터에 특정 속성을 할당할 때 즉, 새롭게 지정할 때 동작하는 함수
        set: (value) => {
          state[key] = value;
          this.observers[key].forEach((observer) => observer(value));
        },
      });
    }
  }

  // 데이터 상태 변경 시 실행되는 함수
  // 콜백 함수를 배열로 저장해서 여러개의 콜백 함수를 실행 시킬 수 있도록 함 - 하나만 실행시키도록 할 경우 나중에 작성한 컴포넌트가 덮어씌워버리는 현상 생김
  subscribe(key, cb) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : (this.observers[key] = [cb]); // 콜백 함수를 하나의 배열 데이터 형식으로 저장
  }
}
