# Study Note
- 프로젝트를 통해 학습한 내용 기록

## 주요 구현
### vanillajs-movie-app [🔗](https://vanilla-movie-app.vercel.app/#/)
- JS -> TS 마이그레이션
- OpenAI API 이용해 챗봇 구현 (파인 튜닝 메시지 커스텀 - 사용자 경험 향상)
- class 기반 컴포넌트 시스템 구현 (재사용 가능한 컴포넌트 구조 설계)
- 상태 관리(store) 패턴 구현
- Hash 기반 라우팅 시스템 구현 (popstate 이벤트 활용)
- 동적 컴포넌트 렌더링
- 실시간 이미지 리사이징 활용
- 스켈레톤 UI 로딩 구현
- 에러 처리, 메시지 출력
- 404 Status 대응 페이지 구현
- vercel serverless function 이해
- -> serverless function을 이용해 API 호출 시 apikey 안보이도록 테스트

### apple-ipad-app [🔗](https://transcendent-naiad-733465.netlify.app)
- 반응형 이해 @media
- 웹 접근성 향상 (배경 이미지 + 대체 택스트) (text-indent: -9999px)
- visibility VS display 애니메이션 적용 차이점 이해 [🔗](https://edongdong.tistory.com/357)
- 드롭다운, 검색창 애니메이션 CSS + JS 구현
![화면 기록 2025-02-14 오후 2 44 58](https://github.com/user-attachments/assets/cc61be6a-5a93-4cef-a08c-141e216d3ff1)
- Sprite Image를 이용한 애니메이션 구현 (animation, 길이가 긴 @keyframes코드 JS 구현)
- IntersectionObserver API 이용해 스크롤 기반 애니메이션 구현
- video (JS제어 + mask-image 사용해 사용자 경험향상)
- asterisk 각주 사용법 이해 (sup)
- 아코디언 애니메이션 구현 (CSS + JS)

### starvucks-vanilla-app [🔗](https://flamboyant-lumiere-482a1e.netlify.app/)
- 스크롤 기반 애니메이션 구현 (CSS + JS)
- 3D 애니메이션 효과 (backface-visibility, perspective, rotate) [🔗](https://edongdong.tistory.com/352)
- 페이지 상동 이동 구현 (window.scrollTo())
- 랜덤 딜레이 애니메이션 구현 (Math.random())
