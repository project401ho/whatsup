# 커뮤니티 인기 게시글 모음 사이트

# AWS url:
https://master.d2y0wpanbqeoy2.amplifyapp.com/

--

# 할 일:
## 리스트:
익명 게시판<br>
공지<br>
게시물 조회수 보이기<br>
게시물 수 만큼 페이지 계산 및 보이기<br>
current page에 따라 불러오는 post 다르게 하기<br>
(게스트 어카운트) 로그인 없이 사용하기<br>
username이 project401ho면 만들기 버튼 활성화<br>
네비게이션 버튼 수정 및 CSS<br>

## 게시물:
Post css 수정<br>
게시물 좋아요 기능<br>
댓글 좋아요 기능<br>


# 업데이트 기록
## 6.16
Auth 관련 교육 영상 <br>
https://www.youtube.com/watch?v=lMOVP1Y8vOc<br>


Custom Log in and Log out <br>
로그인 여부 확인에 따라서 네비게이션 버튼 용도 달라짐 <br>
[새로운 디자인 패턴(?)] <br>
new User state 만듬 <br>
router를 이용한 컴포넌트 전환<br>
(Router, Route, Switch & Link & useHistory)<br>
Function 컴포넌트 이용<br>
관리자 계정일때 create 모드로 바꾸는 버튼 생성<br>


## 6.15
fontawesome 리액트 api 설정<br>
네비게이션 버튼 스타일 수정<br>
<br>
button type => <br>
1. submit => form 전송 기능<br>
2. reset => form 내용 초기화<br>
3. button => 자바스크립트 이벤트<br>
<br>
input type="button" => 디자인 제약이 있음<br>
<br>
자바스크립트 이벤트는 가급적 "<"button">"을 쓰자<br>


## 6.14
컨텐츠 리스트 CSS 수정<br>
PAGE CSS 수정 및 state 변경<br>
createPost 수정<br>
컨텐츠리스트 약간 수정<br>
업로더 이름 보이기<br>
(!) pages에서 발견한 사실 (!):<br>
line-height: value;로 한글과 영/숫자의 줄맞춤 체크<br>

## 6.13
실시간 댓글 반영 및 중복되지 않는 댓글 ID 생성<br>
do while로 중복 방지 함<br>
shouldComponentUpdate로 약간의 최적화 <br>
댓글 섭밋시 state 초기화 추가 <br>


## 6.12
댓글 불러오기 <br>
depth가 2여서 여태껏 안됐었음<br>
해결방안: <br>
1. amplify codegen configure
2. Enter maximum statement depth 에 원하는 깊이 설정
3. amplify codegen
<br><br>
https://stackoverflow.com/questions/63716173/one-to-many-relationship-not-showing-in-the-object-amplify-schema-definition



--
# READ ME 작성요령
https://lsh424.tistory.com/37<br>