# 커뮤니티 인기 게시글 모음 사이트

# AWS url:
https://master.d2y0wpanbqeoy2.amplifyapp.com/

--

# 할 일:
로그인 없이 사용하기
username이 project401ho면 만들기 버튼 활성화
네비게이션 버튼 수정 및 CSS
Post css 수정
current page에 따라 불러오는 post 다르게 하기

pages에서 발견한 사실:
line-height: value;로 한글과 영/숫자의 줄맞춤 체크


# 업데이트 기록
## 6.13
컨텐츠 리스트 CSS 수정
PAGE CSS 수정 및 state 변경
createPost 수정
컨텐츠리스트 약간 수정
업로드 이름 보이기


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