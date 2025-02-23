import { Store } from "../core/donghyeok";

const { APIKEY } = process.env;

const store = new Store({
  searchText: "",
  page: 1,
  movies: [],
});

export default store;

export const searchMovies = async (page) => {
  // 검색을 통해 새로운 영화 목록을 불러오면 기존 영화 목록을 초기화
  if (page === 1) {
    store.state.page = 1;
    store.state.movies = [];
  }

  // https://www.omdbapi.com/
  // OBDb API는 http로 알려주고 있어서 localhost에서 개발할때는 문제가 없지만, 나중에 실제 vercel을 통해 배포하게되면 https로 시작하게되는데
  // https => http로 더 보안이 낮은 곳으로 데이터를 요청하는 것은 브라우저마다 허용되지 않을 수 있음
  const res = await fetch(
    `https://www.omdbapi.com?apikey=${APIKEY}&s=${store.state.searchText}&page=${page}`
  );
  const { Search } = await res.json();
  store.state.movies = [...store.state.movies, ...Search];
};
