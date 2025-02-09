// 배지 효과 JS
const badgeEl = document.querySelector("header .badges");

window.addEventListener(
  "scroll",
  _.throttle(function () {
    if (window.scrollY > 500) {
      // 배지 숨기기
      // gsap.to(요소, 지속시간, 옵션)
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: "none",
      });
      // 페이지 상단 이동 버튼 보이기
      gsap.to("#to-top", 0.2, {
        x: 0,
      });
    } else {
      // 배지 보이기
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
      // 페이지 상단 이동 버튼 숨김
      gsap.to("#to-top", 0.2, {
        x: 100,
      });
    }
  }, 300)
);

// 페이지 상단 이동 효과 JS
const toTopEl = document.querySelector("#to-top");
toTopEl.addEventListener("click", () => {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

// Fade In 효과 JS
const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach((fadeEl, idx) => {
  gsap.to(fadeEl, 1, {
    delay: 0.7 * (idx + 1),
    opacity: 1,
  });
});

// 공지사항 수직 슬라이드 효과 JS
// new Swiper(슬라이드 요소, 옵션) - notice-line 안에 있는 swiper-container를 슬라이드 하겠다는 뜻
new Swiper(".notice-line .swiper-container", {
  direction: "vertical",
  autoplay: true,
  loop: true,
});

// 프로모션 슬라이드 효과 JS
new Swiper(".promotion .swiper-container", {
  // direction: "horizontal", // 기본값
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".promotion .swiper-pagination", // 페이지 번호 요소 선택자
    clickable: true,
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
});

const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");
let isHidePromotion = false;

promotionToggleBtn.addEventListener("click", () => {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    promotionEl.classList.add("hide");
  } else {
    promotionEl.classList.remove("hide");
  }
});

// youtube 이미지 플로팅 효과 JS
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션)
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1, // 무한 반복
    yoyo: true, // 왕복 반복 - 다시 뒤로 재생
    // gsap easing 속성
    ease: Power1.easeInOut, // ease 함수 - 타이밍 함수
    delay: random(0, delay),
  });
}

floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

// 스크롤 효과 JS
const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach((spyEl, idx) => {
  // Scene메서드는 특정한 요소를 감시하는 옵션을 지정해주는 메서드임
  // setClassToggle메서드는 특정 요소에 클래스를 추가하거나 제거하는 메서드임
  // addTo메서드는 특정 요소에 특정 효과를 적용하는 메서드임, 컨트롤러라는 개념의 내용을 추가하기위함
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐의 여부를 감시할 요소 지정
    // 뷰포트 제일위를 0, 아래를 1로 뒀을때
    triggerHook: 0.8, // 보여짐의 여부를 감시할 요소의 몇% 지점에 감시할지 지정
    // 결론: 뷰포트의 0.8지점에 걸리면 트리거 활성화
  })
    .setClassToggle(spyEl, "show") // 첫 번째 인수는 어떠한 클래스를 토글 할 요소, 두 번째 인수는 토글할 클래스 이름 지정
    .addTo(new ScrollMagic.Controller()); // ScrollMagic에서 기본적으로 추가한 옵션들을 내부의 컨트롤러의 내용을 할당해서 실제로 동작할 수 있는 구조를 만들어 주는 용도로 사용, 컨트롤러 객체 지정
});

// AWARDS 슬라이드 효과 JS
new Swiper(".awards .swiper-container", {
  autoplay: true,
  loop: true,
  slidesPerView: 5,
  spaceBetween: 30,
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
});
