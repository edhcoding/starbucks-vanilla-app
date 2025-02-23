import { Component } from "../core/donghyeok";

export default class About extends Component {
  render() {
    const { a, b, c } = history.state;

    this.el.innerHTML = /* html */ `
      <h1>About Page!</h1>
      <h2>a: ${a}</h2>
      <h2>b: ${b}</h2>
      <h2>c: ${c}</h2>
    `;
  }
}
