import { Component } from "../core/donghyeok";
import movieStore, { searchMovies } from "../store/movie";

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });

    movieStore.subscribe("pageMax", () => {
      const { page, pageMax } = movieStore.state;

      // if else 문 삼항 연산자로 간소화
      page < pageMax
        ? this.el.classList.remove("hide")
        : this.el.classList.add("hide");
    });
  }

  render() {
    this.el.classList.add("btn", "view-more", "hide");
    this.el.textContent = "View more...";

    this.el.addEventListener("click", async () => {
      this.el.classList.add("hide");
      await searchMovies(movieStore.state.page + 1);
    });
  }
}
