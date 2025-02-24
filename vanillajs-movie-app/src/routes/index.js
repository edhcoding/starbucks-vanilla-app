import { createRouter } from "../core/donghyeok";
import Home from "./Home";
import Movie from "./Movie";
import About from "./About";
import NotFound from "./NotFound";

export default createRouter([
  { path: "#/", component: Home },
  { path: "#/movie", component: Movie },
  { path: "#/about", component: About },
  // 정규 표현식에서
  // . 은 임의의 한 문자와 일치할 수 있음 (모든 문자 일치 가능)
  // 딱 한글자만 일치하면 안되기 때문에
  // {0, } 0개 이상 모두 일치하겠다
  // 결국 .{0,} 이렇게 작성하면 되지만 * 로 축약 가능
  // 임의의 모든 문자를 다 일치시키겠다는 의미를 가짐
  { path: ".*", component: NotFound },
]);
