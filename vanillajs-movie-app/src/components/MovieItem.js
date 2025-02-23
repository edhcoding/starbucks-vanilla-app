import { Component } from "../core/donghyeok";

export default class MovieItem extends Component {
  constructor(props) {
    super({
      props,
      tagName: "a",
    });
  }

  render() {
    const { movie } = this.props;

    // setAttribute는 요소에 속성을 추가하는 메서드
    this.el.setAttribute("href", `#/movie?id=${movie.imdbID}`);
    this.el.classList.add("movie");
    // img 태그가 아니라 background-image 속성을 사용하는 이유는
    // 출력되는 포스터의 크기가 전부 다르기 때문에 img 태그로 출력하면 레이아웃이 깨질 수 있음
    this.el.style.backgroundImage = `url(${movie.Poster})`;
    this.el.innerHTML = /* html */ `
      <div class='info'>
        <div class='year'>${movie.Year}</div>
        <div class='title'>${movie.Title}</div>
      </div>
    `;
  }
}
