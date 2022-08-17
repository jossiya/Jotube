# Jotube
<p>개인적으로 만들어보는 유튜브 클론페이지 입니다.</p>

### 💪 Skills
#### Platforms & Languages
<p>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> 
<img src="https://img.shields.io/badge/JSS-FFCA28?style=flat-square&logo=JSS&logoColor=white"/> 
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
</p>
<hr/>

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=jossiya)](https://github.com/rolety2202/github-readme-stats)

### :bowtie: node.js와 react 를 server와 client로 나누어 진행하였습니다.
<p>사용된 동영상 출쳐 : https://www.pexels.com/ko-kr/videos/</p>
<p>
전반적인 페이지를 만들 때 <b>프론트엔드 부분</b>은 리액트를 사용하고,
 <b>백엔드 부분</b>은 NodeJS와 ExpressJS를 사용합니다. <b>데이터베이스</b>는 AWS를 이용한 MYSQL을 이용해서 컨트롤 했습니다.
 <br/>
 <br/>
 기본적인 <b>로그인 기능</b>은 node.js에서 로그인 정보들은 세션에 담아 client로 넘겨 Redux Toolkit을 사용하여 store에 저장하여 로그인 유지 기능과 인증 기능을 구현하였습니다.
 <br/><br/>
 <b>JavaScript</b>로 공부를 하다가 최근 <b>React</b>를 많이 사용하고 처음 배우는 것은 어렵지만 사용할 줄 알면 많이 유용하다하여,<br/> 
  <b>연습 프로젝트</b>를 고민하던 중 yotube에 올라온 <b>클론 페이지 사이트 만들기 영상</b>을 보면서 만들게 되었고, <br/>
   처음 만든 클론 사이트는 <b>redux createStore</b>로 만들었지만 권장되지 않는 다 하여 <b>Redux Toolkit</b> 으로 새로 만들게 되었습니다.
   <br/><b>새롭게 만든 페이지는 youtube 홈페이지를 보며 지금 자신이 구현할 수 있는 기능들을  만들었습니다</b>.
   
</p>


## 전반적인 페이지 구현
#### :dizzy:랜딩 페이지
><img width="40%" src="https://user-images.githubusercontent.com/96179069/184885127-2cfea83f-6f88-45b3-bbc3-ae51daf961eb.jpg"/><br/>
>> 로그인 후<br/>
 <img width="40%" src="https://user-images.githubusercontent.com/96179069/184885761-b1f32509-d370-4e93-892d-d9347f534160.jpg"/><br/>

#### :dizzy:비디오 상세 페이지
><img width="40%" src="https://user-images.githubusercontent.com/96179069/185055201-193310d3-c638-47b9-a632-107adc35421a.jpg"/><br/>
>>:vertical_traffic_light:구독 좋아요 댓글<br/>
 <img width="40%" src="https://user-images.githubusercontent.com/96179069/185055538-ffe618c3-0433-4556-ba90-4e2c3dd69c8d.jpg"/><br/>

#### :dizzy:검색 자동 완성
<img width="40%" src="https://user-images.githubusercontent.com/96179069/184894244-32c231d1-8aff-4edd-94f8-3f947b289007.jpg"/><br/>

#### :dizzy:구독한 사람들 영상
<img width="40%" src="https://user-images.githubusercontent.com/96179069/184890116-03b16ba6-fe6d-4311-aca3-f7269fabbeaa.jpg"/><br/>

#### :dizzy:좋아요 페이지
<img width="40%" src="https://user-images.githubusercontent.com/96179069/184890348-f2ee4be7-aa94-4924-aa88-65029e56720c.jpg"/><br/>

#### :dizzy:내채널
<img width="40%" src="https://user-images.githubusercontent.com/96179069/184891038-53623f89-b331-4f8b-874c-d0a5fb955a76.jpg"/><br/>

#### :dizzy:채널 콘텐츠
  :fire: 동영상 상세 관리 및 삭제 기능과 페이지네이션 기능으로 페이지당 동영상 갯수를 설정 할 수 있습니다.
  
><img width="40%" src="https://user-images.githubusercontent.com/96179069/184891405-aebe6bbf-8ea9-4711-9a41-63fd2a8843ef.jpg"/><br/>
>>:vertical_traffic_light:업로드<br/>
:fire:<b>동영상 업로드</b>는 Dropzone을 사용하여 server로 넘겨 multer으로 서버에서 저장하게 하였고, ffmpeg을 사용하여 동영상 자동 스크린샷을 찍게 하여
이미지를 자동 저장하게 하였습니다.<br/>
  <img width="40%" src="https://user-images.githubusercontent.com/96179069/184891836-7a2d3761-0504-4593-9f8c-6c7aa54d17a9.jpg"/><br/>
>>>:vertical_traffic_light:업로드 상세페이지<br/>
   :fire: server 쪽 DB와 fs모듈로 이미지들과 vidoeData를 받아와서 기본적은 디폴트 값으로  내용들을 표시하게 하고 유저가 썸네일을 3가지중에서 고르거나 유저가 만든 이미지를 업로드 해 쓸 수 있도록 기능을 구현 하였습니다. 또한 동영상을 공개 비공개 및 아동용인지(인증에 성인 기준 로직만 넣으면) 아닌지에 따라 영상시청이 달라집니다.
   <img width="40%" src="https://user-images.githubusercontent.com/96179069/184892073-77ad34ec-f7cd-464b-bae2-6c0542da7da8.jpg"/><br/>
   
#### :dizzy:프로필 변경 페이지
:fire:Dropzone을 이용하여 업로드 및 선택 취소 가 가능하도록 기능을 구현 하였으며, 별명 변경을 할 수 있습니다.
<img width="40%" src="https://user-images.githubusercontent.com/96179069/185056270-b14293d9-c322-4634-b64a-6a04e881bd8e.jpg"/><br/>

