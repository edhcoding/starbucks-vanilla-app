import { Component } from "../core/donghyeok";

export default class FruitItem extends Component {
  constructor(payload) {
    super({
      tagName: "li",
      props: payload.props,
    }); // 부모 클래스의 생성자 호출
  }

  render() {
    this.el.innerHTML = /* html */ `
      <span>${this.props.name}</span>
      <span>${this.props.price}</span>
    `;

    this.el.addEventListener("click", () => {
      console.log(this.props.name, this.props.price);
    });
  }
}
