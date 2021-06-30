# 커뮤니티 인기 게시글 모음 사이트

# AWS url:
https://master.d2y0wpanbqeoy2.amplifyapp.com/

--

# 금주의 할 일:
6/30: 공지 & 중복 추천 방지
7/1: 댓글 신고 기능 및 블라인드 / 삭제 기능
7/2: 게시글 만들때 p태그 삽입 기능
7/3: 게시물 css 수정 (헤더, 업로더 등등)
7/4: 게시물 만들기 CSS 


## 게시물 리스트:
익명 게시판<br>
게시물 조회수 보이기<br>

## 게시물:
댓글 신고 기능 <br>
댓글 비추천 일정 수 이상일시 블라인드/삭제 기능<br>
Post css 수정<br>
p태그 삽입기능<br>



# 업데이트 기록
## 6.30
공지 기능<br>
1. id를 announcement로 한다
2. 첫 게시글 로드시 상태가 비어있다면 공지와 49개의 리스트 불러오기
3. ContentsList에서 item의 타입에 따라 클래스 지정
4. announcement 클래스의 css 및 기타 내용 수정
5. createPost에서 공지 토글 활성화시에는 announcement를 업데이트 함

스키마에 리스트 추가해서 게시글 중복 추천 방지함 <br>
좋아요 및 싫어요 상태 체크후 비주얼에이드 넣어줌 <br>
비로그인시 추천 기능 블록 <br>

## 6.29
CSS 수정 <br>
플래닝 <br>

## 6.28
업로드 페이지에 공지 토글 생성함 <br>
공지 토글이 거짓일때 일반 업로드 기능 구현<br>


## 6.27
베댓 별 로켓 색깔 상이 및 상단 비치<br>
text-shadow를 사용한 로켓 테두리 불가 <br>


## 6.26
댓글 시간 표기 수정 <br>
베댓 기능 만드는 중 <br>

## 6.25
댓글 ui 수정 <br>
댓글 밑에 게시글 리스트 보이기 <br>
리스트 클릭시 이미지 중복 렌더링 버그 근본 픽스 <br>
리스트 클릭시 scroll to top 기능 추가 <br>
댓글 textarea focus outline 삭제 <br>
Post 댓글 css 수정

## 6.24
마이페이지 유저 ID 보여주기<br>
Post 닉네임 유저 닉네임으로 고정<br>
댓글 작성/ 추천 기능 리팩토링 중<br>
댓글 작성시에 이미지 두번 렌더링 되던 버그 해결<br>

## 6.23
마이페이지 수정 완료<br>
마이페이지:<br>
로그인일시 유저이름과 패스워드 텍스트 필드만<br>
가입하기: <br>
1. 가입하기 클릭시 이메일 필드 추가
2. 가입하기 버튼 기능 바꿔주기<br>

게시물 리스트에 게시물 좋아요 수 표시 <br>
추천 비추천 버튼 <br>
1. 마우스 호버시 커서 변경
2. 클릭시 숫자 반영
3. 효율성 리팩토링 필요할듯
4. 업데이트 코멘트 비동기 처리 핸들링


## 6.22
post 댓글 css 수정<br>
댓글과 포스트 스키마 수정<br>
좋아요 싫어요 기능 추가<br>
(아직 중복 투표가 가능함 해결책 필요)<br>

## 6.21
포스트 CSS 수정<br>
포스트 key 관련 수정<br>
localstorage & user 버그 픽스<br>
네비게이션 페이지 CSS 수정<br>

## 6.20
post에서 새로고침 해도 정상 로드 됨<br>
url에서 바로 갈수있음 (공유 기능 가능)<br>
다이렉트 랜딩시 댓글 못달던 버그수정<br>
creatpost 보안 이슈가 있긴 한데 일단 보류 <br>


## 6.19
post router 리로드시에 App 컴포넌트에 있는 selected_post 가 undefined여서<br>
props가 빈걸로 들어옴 어떻게 수정할지 생각해야함<br>


post컴포넌트를 router로 구현하니 리로드 버그가 생김<br>
createPost 시 resource 생성<br>
이미지 여러장 불러오기 구현<br>

### multiple image workflow:
### 만들기
1. 이미지 업로드시 files state에 저장
2. 섭밋시 files 하나하나 storage에 업로드
3. 업로드된 file의 url을 resource 객체에 저장
4. resource 객체 하나하나 graphql에 postID와 연동해서 저장

### 불러오기
1. props.post 에 있는 resources list 가져오기
2. order별로 소팅후 각각의 url에 맞게 img 태그 imagelist에 push
3. imagelist 반환


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