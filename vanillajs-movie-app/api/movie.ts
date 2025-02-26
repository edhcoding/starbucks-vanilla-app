// node-fetch 버전을 2로 설치함 - vercel의 서버리스 함수를 통해서 commonjs를 지원해야하기 때문에 ESM 방식만 지원하는 최신 버전 3 버전을 쓸 수 없음

// api/movie.js는 프론트엔드 코드가 아니라 vercel에서 실행되는 서버리스 함수이기 때문에 결국에는 서버 코드임
// 그러므로 결국에 node-fetch 라는 패키지를 설치해서 프론트엔드 JS 코드에서 사용할 수 있었던 fetch 함수를 별도의 패키지로 가지고와서 사용하고 있음
import fetch from "node-fetch"; // yarn add -D @types/node-fetch
import { VercelRequest, VercelResponse } from "@vercel/node";

const { APIKEY } = process.env;

// request에 정확히 어떤 내용이 들어가는지 모름
// 왜냐하면 이 내용은 vercel에서 서비스 차원에서 제공하고 있는 매개변수 이기 때문임
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://omdbapi.com?apikey=${APIKEY}&i=${id}&plot=full`
    : `https://omdbapi.com?apikey=${APIKEY}&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json);
}

// !!!!!!!!!!!!!!!!!!!!!!!
// vercel 서버리스 함수를 사용하려면 package.json에서 type을 module로 설정해야함
// !!!!!!!!!!!!!!!!!!!!!!!
