import { Component } from "../core/donghyeok";

interface State {
  // Component 클래스에서 state의 타입을 인덱싱 가능한 타입으로 만들어줬기 때문에 State interface도 인덱싱 가능한 타입으로 만들어줘야함
  // 만들어 줬는데도 타입 에러나옴 - 속성 'state'은(는) 이니셜라이저가 없고 생성자에 할당되어 있지 않습니다. (데이터가 초기화 되어 있지 않아서 타입 추론이 안되서 타입 에러 나옴)
  // 그래서 원래 public state:State; 변경후 public state = {} as State; 로 변경해줬지만 이 코드는 정상 작동 못함
  [key: string]: unknown;
  menus: {
    name: string;
    href: string;
  }[];
}

export default class TheHeader extends Component {
  // 이렇게 작성하면 당장의 에러는 해결하겠지만 정상 작동안함
  // public state = {} as State;
  // super 함수를 통해 state라는 속성으로 하나의 객체 데이터를 전달해주고 있는데
  // 이렇게 받은 객체 데이터를 부모 클래스인 Component에서 초기화를 하고 있음
  // Component의 payload가 state를 받아서 this 키워드로 접근할 수 있는 state 내부 속성에 할당하고 있음 이후 this.render() 메서드를 호출해서 렌더링을 하고 있음
  // this.render()라는 메서드를 실행하고 있기 때문에 별도의 constructor 함수를 실행하지 않더라도 render 함수가 동작하고 있던거임
  // 대표적으로 Headline 컴포넌트를 보면 constructor 함수를 생략하고 render 함수만 등록해도 내용이 잘 동작됐던 것은 constructor 내부에서 this.render()를 호출하고 있었기 때문임
  // super 함수로 전달되는 state의 menus는 최초 화면을 렌더링할 때는 잘 동작이 될 수 있다는거임
  // 그런데 우리는 이 render라는 함수를 또 언제 시작하냐면 window.addEventListener를 통해서 popstate 이벤트를 추가를 한 주소 부분의 해시 값이 변경되면 결국 페이지가 변경될 때마다 this.render()라는 내부 메서드를 실행시킴
  // 그럼 이때 실행되는 this.render 같은 경우에는 더 이상 super함수에서 전달하는 state 부분의 내용을 사용하는게 아니고 class body에서 만들어진 public state = {} as State; 이 state를 사용하게 됨
  // 이 state 는 빈 객체로 초기화 되어져 있기 때문에 결국 페이지가 바뀔때는 render 함수 내부에 들어있는 this.state.menus 부분에 배열 데이터가 아닌 undefined 데이터가 들어가게 됨
  // 그래서 타입 에러가 발생하는 것임

  // 간단한 해결 방법은 상속하고 있는 state의 menus 속성의 값을 복사해서 public state = {} as State;의 빈 객체 내부에 넣어주는 방법임
  // 하지만 같은 내용의 menus를 class body부분과 상속하는 super 함수 내부에서 동일하게 쓰면 같은 코드가 반복되기 때문에 좋은 방식은 아니게 됨

  // 그럼 좋은 방법은?
  // public state; 로 초기화하지 않으면 JS에서 정상작동 했던 것처럼 단순하게 최초 렌더링에서도 사용하고 Header 컴포넌트의 this.render가 페이지가 바뀔때마다 동작할때도 따로 선언된 값이 없기 때문에 컴포넌트에서 상속받은 state 내용을 그대로 사용 가능함
  // public state: State; 하지만 이렇게 작성하면 처음이랑 똑같은 할당한 데이터가 없다고 나오고 나는 할당을 안하고 싶어하니까 이럴때는 타입 단언을 사용하면 됨
  // 명확한 타입 단언 ! - 타입을 지정하는 콜론 기호 앞에 느낌표를 붙여줌
  // 이 state 속성은 초기화 데이터가 존재하지 않지만 할당 단언을 했기 때문에 마지 어떤 데이터가 할당이 된 것처럼 이 state 속성을 선언했다고 하는거임
  public state!: State;

  constructor() {
    super({
      tagName: "header",
      state: {
        menus: [
          {
            name: "Search",
            href: "#/",
          },
          {
            name: "Movie",
            href: "#/movie?id=tt4520988",
          },
          {
            name: "About",
            href: "#/about",
          },
        ],
      },
    });
    window.addEventListener("popstate", () => this.render());
  }

  render() {
    this.el.innerHTML = /* html */ `
      <a
        href="#/"
        class="logo">
        <span>OMDbAPI</span>.COM
      </a>
      <nav>
        <ul>
          ${this.state.menus
            .map((menu) => {
              const href = menu.href.split("?")[0];
              const hash = location.hash.split("?")[0];
              const isActive = href === hash;
              return /* html */ `
              <li>
                <a
                  class="${isActive ? "active" : ""}"
                  href="${menu.href}">
                  ${menu.name}
                </a>
              </li>`;
            })
            .join("")}
        </ul>
      </nav>
      <a href="#/about" class="user">
        <img src="https://heropy.blog/css/images/logo.png" alt="User" />
      </a>
    `;
  }
}
