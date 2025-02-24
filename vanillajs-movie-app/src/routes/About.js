import { Component } from "../core/donghyeok";
import aboutStore from "../store/about";

export default class About extends Component {
  render() {
    const { photo, name, email, github, blog } = aboutStore.state;

    this.el.classList.add("container", "about");
    this.el.innerHTML = /* html */ `
      <div
        style="background-image: url(${photo})" 
        class="photo"></div>
      <p class="name">${name}</p>
      <!-- target 속성에는 여러개가 있음 - _blank , _self , _parent , _top
      _blank : 새로운 창에서 열기
      _self : 현재 창에서 열기
      _parent : 부모 창에서 열기
      _top : 최상위 창에서 열기 -->
      <p>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_blank">
          ${email}
        </a>
      </p>
      <p><a href="${github}" target="_blank">GitHub</a></p>
      <p><a href="${blog}" target="_blank">Blog</a></p>
    `;
  }
}
