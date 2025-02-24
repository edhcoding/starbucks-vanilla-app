import { Store } from "../core/donghyeok";

const { APIKEY } = process.env;

const store = new Store({
  searchText: "",
  page: 1,
  movie: {},
  movies: [],
  pageMax: 1,
  loading: false,
  message: "Search for the movie title!",
});

export default store;

export const searchMovies = async (page) => {
  store.state.loading = true;
  store.state.page = page;

  // 검색을 통해 새로운 영화 목록을 불러오면 기존 영화 목록을 초기화
  if (page === 1) {
    store.state.movies = [];
    store.state.message = "";
  }

  try {
    // https://www.omdbapi.com/
    // OBDb API는 http로 알려주고 있어서 localhost에서 개발할때는 문제가 없지만, 나중에 실제 vercel을 통해 배포하게되면 https로 시작하게되는데
    // https => http로 더 보안이 낮은 곳으로 데이터를 요청하는 것은 브라우저마다 허용되지 않을 수 있음
    const res = await fetch(
      `https://www.omdbapi.com?apikey=${APIKEY}&s=${store.state.searchText}&page=${page}`
    );
    const { Search, totalResults, Response, Error } = await res.json();

    if (Response === "True") {
      store.state.movies = [...store.state.movies, ...Search];
      // totalResults는 문자 데이터이기 때문에 숫자로 변환
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
    }
  } catch (error) {
    console.log("searchMovies function error: ", error);
  } finally {
    store.state.loading = false;
  }
};

export const getMovieDetails = async (id) => {
  try {
    // plot 파라미터에는 short, full이 있는데 더 자세한 정보를 보기 위해 full로 설정
    const res = await fetch(
      `https://omdbapi.com?apikey=${APIKEY}&i=${id}&plot=full`
    );
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails function error: ", error);
  }
};
