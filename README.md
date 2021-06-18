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

이미지 여러개
예상 work flow:

### 셋업
1. 스키마에서 resources 만들기
2. 댓글 처럼 Post 랑 연결하기 
3. id : 파일 이름
4. postID : 연결된 게시물 ID
5. order : 이미지 뿌릴 순서
6. file: Storage.get(filename)

### 만들기
1. 이미지 업로드시 files state에 저장
2. 섭밋시 files 하나하나 storage에 업로드
3. files 하나 돌때마다 resources에 게시글과 연동해서 추가
4. 3번 과정시 순서에 따라 order 업데이트

### 불러오기
1. 게시글 클릭시 연동되있는 resources list 가져오기
2. resources에 있는 모든 이미지 불러오기
3. 이미지들을 order에 맞게 정렬
4. 화면에 뿌려주기


# 업데이트 기록
## 6.18
Link와 라우터로 Post 컴포넌트 리팩토링<br>
Post 컴포넌트 이미지 버그 수정<br>
createPost 리팩토링<br>

multiple 이미지 working on<br>
스키마 업데이트<br>
createPost 업데이트<br>
post 하는중<br>

page 버그 발견<br>
minor bug fix<br>

## 6.17
pagination 구현<br>
게시물 개수 트랙킹<br>
한번에 50개 불러와서 10개씩 짤라 보여줌<br>
게시물 넘버 구현<br>
fetch sort 구현<br>
current page에 따라 불러오는 post 다르게 하기<br>
nextToken Pagination 시 포스트 fetch가 순서대로 안됌<br>

구현 완료 workflow:
1. 각 게시물에 카운트를 하나씩 올려서 저장 마지막거 +1이 다음 게시물 카운트 즉 총 게시물 갯수
2. 테이블 항목 수 가져와서 리스트 no 제대로 뿌려주기
3. 포스트 날짜별로 정렬 한뒤 limit 만큼 가져오기
4. 숫자 버튼 클릭시 fetchContentList() 호출 (nextToken으로 페이지네이션 됨)
5. current_page 하나 늘리기
6. 다음/이전 버튼 클릭시 current_page 알맞게 갱신 및 fetch 또 호출



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