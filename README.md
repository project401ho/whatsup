# 커뮤니티 인기 게시글 모음 사이트

# AWS url:
https://master.d2y0wpanbqeoy2.amplifyapp.com/

--

# 할 일:
## 게시물 리스트:
익명 게시판<br>
공지<br>
게시물 조회수 보이기<br>
네비게이션 CSS<br>


## 게시물:
Post css 수정<br>
게시물 좋아요 기능<br>
댓글 좋아요 기능<br>

## Pagination

current page에 따라 불러오는 post 다르게 하기<br>
nextToken Pagination 시 포스트 fetch가 순서대로 안됌<br>
예상 workflow:
1. 포스트 테이블 길이 확보 (이걸로 페이지 버튼 갯수 정하기)
2. 테이블 항목 수 가져와서 리스트 no 제대로 뿌려주기
3. 포스트 날짜별로 정렬 한뒤 limit 만큼 가져오기
4. 숫자 버튼 클릭시 fetchContentList() 호출 (nextToken으로 페이지네이션 됨)
5. current_page 하나 늘리기
6. 다음/이전 버튼 클릭시 current_page 알맞게 갱신 및 fetch 또 호출

# 업데이트 기록
## 6.17
가입 하기 버튼 및 기능 구현 <br>
이메일 자동 컨펌<br>
이메일 중복 체크 불가 (유저풀을 다시 만들어야 함)<br>
없는 유저 입력시 알림창<br>
가입시 바로 로그인 진행<br>
있는 유저이름으로 가입 시도시 알림창 및 에러 띄우기<br>


## 6.16
GraphQL createAt 별로 소팅 하는 다큐먼트 <br>
https://docs.amplify.aws/guides/api-graphql/query-with-sorting/q/platform/js#implementation <br>
nextToken이용한 페이지네이션 구현<br>


게시글 이미지 사이즈 퍼센트로 바꿈
로그인 안할시 댓글 작성 불가
비로그인이 댓글 보기만 가능

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