import App from "./App";
import router from "./routes";
// 경로에서 routes 폴더안에 index.js 파일을 불러오려면 기본적으로 routes/index.js 사용하는데 기본으로 index를 찾기 때문에 폴더명만 작성해도 알아서 index로 시작하는 파일찾음

const root = document.querySelector("#root");
root.append(new App().el);

router();
