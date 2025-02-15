// 장바구니 드롭다운
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", (event) => {
  event.stopPropagation();
  basketEl.classList.toggle("show"); // show 클래스가 없으면 추가, 있으면 제거 알아서 해주는 메서드
});

basketEl.addEventListener("click", (event) => event.stopPropagation());

window.addEventListener("click", () => {
  if (basketEl.classList.contains("show")) basketEl.classList.remove("show");
});

// 검색창
// search-starter를 클랙했을 때 header 영역 전체를 제어해야하기 때문에 search-starter 클릭시 header에 클래스 추가
const headerEl = document.querySelector("header");
// querySelcetorAll을 통해서 반환되는 내용이 ... (전개 연산자)를 통해 해체가 되고 해체된 내용을 대괄호로 묶어줌 - 전개 연산자를 사용하는 얕은복사
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];

// addEventListener의 두번째 인수는 이벤트 핸들러 함수이고 익명함수이기 때문에 하나의 함수만 적어도됨 소괄호 재거한 상태로 이름만 작성 - 최적화
// 소괄호를 넣어야 함수 실행하지만 없애도 addEventListener 내에서 showSearch 함수 실행시킴
searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  // html 태그
  document.documentElement.classList.add("fixed");
  headerMenuEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = `${(idx * 0.4) / headerMenuEls.length}s`;
    // `${(idx * 0.4) / headerMenuEls.length}s` === idx * 0.4 / headerMenuEls.length + "s"
  });
  searchDelayEls.forEach((el, idx) => {
    el.style.transitionDelay = `${(idx * 0.4) / searchDelayEls.length}s`;
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = `${(idx * 0.4) / headerMenuEls.length}s`;
  });
  searchDelayEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = `${(idx * 0.4) / searchDelayEls.length}s`;
  });
  // 다시 한 번 뒤집는 이유는 배열 자체를 뒤집어서 원래 배열의 순서가 바뀌기 때문에 다시 검색창이 열릴때 원래 순서대로 나오기 위해서
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

// 프레임 위치 및 속성값 JS로 제어하기
let x = 0;
let y = 0;
let frames = "";
for (let i = 0; i < 60; i += 1) {
  // frames += "0% { background-position: 0 0; }"
  // frames += `${(100 / 60 * i).toFixed(2)}% { background-position: ${x}px ${y}px; }<br />` // HTML으로 출력!
  frames += `${((100 / 60) * i).toFixed(2)}% { background-position: ${x}${
    x === 0 ? "" : "px"
  } ${y}${y === 0 ? "" : "px"}; }\n`;
  if (x <= -500) {
    x = 0;
    y -= 100;
    continue; // 현재 반복을 종료하고 다음 반복으로 넘어가기!
  }
  x -= 100;
}
// document.body.innerHTML = frames // HTML으로 출력!
console.log(frames);

// Intersection Observer API - 요소의 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach((el) => {
  io.observe(el);
});
