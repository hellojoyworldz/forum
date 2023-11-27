const express = require('express')
const app = express()

// 폴더 등록 
// static 파일 : img, css, js 파일
app.use(express.static(__dirname + '/public'))

// 실제 서버 띄우라는 뜻
// 8080포트에 띄움
app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})

// 메세지 전송
// 1. /news 접속 시 app.get() 함수 실행됨
// 2. 그 다음 콜백함수 실행됨 () ⇒ {}
app.get('/news', (요청, 응답) => {
  응답.send('오늘 비옴')
})

// 파일 전송
//__dirname : 현재 프로젝트 절대 경로 
app.get('/', (요청, 응답) => {
  응답.sendFile(__dirname + '/index.html')
})

app.get('/about', function(요청, 응답){
  응답.sendFile(__dirname + '/about.html')
})