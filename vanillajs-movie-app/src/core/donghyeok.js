// 컴포넌트 생성 클래스
// 라우터 클래스
// 컴포넌트 간 데이터 통신 클래스

///// Component /////
export class Component {
  constructor(payload = {}) {
    const { tagName = "div", state = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.render();
  }

  render() {
    // ...
  }
}
