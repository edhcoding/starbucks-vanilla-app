import { Component } from "./core/donghyeok";

export default class App extends Component {
  // constructor, super 함수 모두 내용이 비어져 있으면 생략 가능
  // constructor() {
  //   // super 함수 - 부모 클래스의 생성자 호출 실행 (Component라는 이미 만들어진 클래스가 super 내부에서 실행됨)
  //   super 함수 역할
  //   1. 자식 클래스 내에서 부모클래스의 생성자 역할
  //   2. 자식 클래스에서 부모 클래스의 메소드 접근 역할
  //   super();
  // }

  constructor() {
    super({
      state: {
        fruits: [
          {
            name: "apple",
            price: 1000,
          },
          {
            name: "banana",
            price: 2000,
          },
          {
            name: "orange",
            price: 3000,
          },
        ],
      },
    });
  }

  render() {
    console.log(this.state.fruits);

    this.el.innerHTML = /* html */ `
      <h1>Fruits</h1>
      <ul>
        ${this.state.fruits
          .filter((fruit) => fruit.price < 3000)
          .map((fruit) => `<li>${fruit.name}</li>`)
          .join("")}
        <!-- li 태그는 백틱 기호를 사용해서 문자데이터 이므로 join 메서드로 합쳐줌  -->
      </ul>
    `;
  }
}
