import { Store } from "../core/donghyeok";

// 이러한 interface 내용을 충분히 손으로 작성 가능하지만 자동으로 만들어졌으면 좋겠음
// https://transform.tools/ => Json => to TypeScript
// 1. 그냥 복붙하면 안되고 객체를 복사한 다음
// 2. 콘솔창을 키고 JSON.stringify(복사한객체)
// 3. 문자열이 나오는데 앞뒤에있는 따옴표를 제외한 객체 부분만 복사해서 사이트에 붙여넣기
// 4. 복사해서 사용하기
interface State {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo: "https://heropy.blog/css/images/logo.png",
  name: "HEROPY / ParkYoungWoong",
  email: "thesecon@gmail.com",
  blog: "https://heropy.blog",
  github: "https://github.com/ParkYoungWoong",
  repository: "https://github.com/ParkYoungWoong/vanillajs-movie-app",
});
