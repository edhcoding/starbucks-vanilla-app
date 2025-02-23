import { Component } from "./core/donghyeok";
import FruitItem from "./components/FruitItem";

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
    this.el.innerHTML = /* html */ `
      <h1>Fruits</h1>
      <ul></ul>
    `;

    const ulEl = this.el.querySelector("ul");
    ulEl.append(
      ...this.state.fruits.map(
        (fruit) =>
          new FruitItem({
            props: {
              name: fruit.name,
              price: fruit.price,
            },
          }).el
      )
      // 여기까지 배열데이터를 반환하게 될 텐데 append 메서드는 배열데이터를 받을 수 없음 그렇기 때문에 spread 연산자를 사용해서 배열데이터를 풀어서 넣어줌
    );
  }
}
