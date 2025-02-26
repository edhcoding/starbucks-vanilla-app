import { Store } from "../core/donghyeok";

export interface SimpleMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface DetailedMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface State {
  searchText: string;
  page: number;
  // movie는 상세 영화 정보, movies는 영화 목록 정보이기 때문에 데이터 타입을 any로 하면 안되고 지정해줘야 함
  movie: DetailedMovie;
  movies: SimpleMovie[];
  pageMax: number;
  loading: boolean;
  message: string;
}

// const { APIKEY } = process.env;

const store = new Store<State>({
  searchText: "",
  page: 1,
  // 빈 객체 데이터에는 타입 추론을 통해 빈 객체로 할당되기 때문에 타입을 명시적으로 할당해줘야함
  movie: {} as DetailedMovie,
  // 빈 배열이 할당 되어 있으니까 타입 추론을 통해서 배열의 아이템은 존재하지 않는다고 판단해서 타입을 추론해서 빈 배열로 할당하는데 아래 코드에서 빈 배열에 내용을 할당하니까 에러가 나옴
  movies: [],
  pageMax: 1,
  loading: false,
  message: "Search for the movie title!",
});

export default store;

export const searchMovies = async (page: number) => {
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
    // const res = await fetch(
    //   `https://www.omdbapi.com?apikey=${APIKEY}&s=${store.state.searchText}&page=${page}`
    // );
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({
        title: store.state.searchText,
        page,
      }),
    });
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

export const getMovieDetails = async (id: string) => {
  try {
    // plot 파라미터에는 short, full이 있는데 더 자세한 정보를 보기 위해 full로 설정
    // const res = await fetch(
    //   `https://omdbapi.com?apikey=${APIKEY}&i=${id}&plot=full`
    // );
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails function error: ", error);
  }
};
