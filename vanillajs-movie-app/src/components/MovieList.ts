import { Component } from "../core/donghyeok";
import movieStore from "../store/movie";
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  constructor() {
    super();
    movieStore.subscribe("movies", () => this.render());
    movieStore.subscribe("loading", () => this.render());
    movieStore.subscribe("message", () => this.render());
  }

  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html */ `
      ${
        movieStore.state.message
          ? `<div class='message'>${movieStore.state.message}</div>`
          : `<div class='movies'></div>`
      }
      <div class='the-loader hide'></div>
    `;

    const moviesEl = this.el.querySelector(".movies");
    // append에는 배열 못넣음
    moviesEl?.append(
      ...movieStore.state.movies.map(
        (movie) =>
          new MovieItem({
            movie,
          }).el
      )
    );

    const loaderEl = this.el.querySelector(".the-loader"); // 아래에서 발생하는 loaderEl의 오류때문에 as HTMLDivElement 이와같은 타입 단언을 사용하게 되면 the-loader의 스펠링이 틀려도 타입 오류가 안나오게됨
    movieStore.state.loading
      ? loaderEl?.classList.remove("hide")
      : loaderEl?.classList.add("hide");
  }
}
