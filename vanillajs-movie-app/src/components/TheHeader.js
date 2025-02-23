import { Component } from "../core/donghyeok";

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: "header",
    });
  }

  render() {
    // 주소창에 해쉬 기호가 있는 경우에는 다른 페이지가 아닌 현재 페이지를 의미함
    // #의 내용이 바뀔때마다 윈도우 객체의 popstate 이벤트가 발생하고 현재 주소를 확인하면서 어떤 페이지를 보여줘야하는지 결정함
    this.el.innerHTML = /* html */ `
      <a href="#/">Main!</a>
      <a href="#/about">About!</a>
    `;
  }
}
