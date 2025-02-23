import { Component } from "../core/donghyeok";
import messageStore from "../store/message";

export default class TextField extends Component {
  render() {
    this.el.innerHTML = /* html */ `
      <input type='text' value="${messageStore.state.message}" />
    `;

    const inputEl = this.el.querySelector("input");
    inputEl.addEventListener("input", () => {
      messageStore.state.message = inputEl.value;
    });
  }
}
