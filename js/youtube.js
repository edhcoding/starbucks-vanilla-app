var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  // player라는 아이디 값을 가지고 있는 <div id="player"></div> 요소를 참조하는 변수
  new YT.Player("player", {
    videoId: "An6LvWQuj_8", // 최초 재생할 유튜브 영상 ID
    playerVars: {
      autoplay: true,
      loop: true,
      playlist: "An6LvWQuj_8", // 반복 재생할 유튜브 영상 ID 목록 (loop를 true로 설정했다면 무조건 필수)
    },
    events: {
      // 영상이 준비되었을 때
      onReady: (e) => {
        e.target.mute(); // 음소거
      },
    },
  });
}
