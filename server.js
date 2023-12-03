const express = require('express')
const app = express()

// 폴더 등록 
// static 파일 : img, css, js 파일
app.use(express.static(__dirname + '/public'))

// ejs 셋팅
app.set('view engine', 'ejs')

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://admin:admin@cluster0.odkq0ir.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
  // 실제 서버 띄우라는 뜻
  // 8080포트에 띄움
  app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
  })
}).catch((err)=>{
  console.log(err)
})


// 메세지 전송
// 1. /news 접속 시 app.get() 함수 실행됨
// 2. 그 다음 콜백함수 실행됨 () ⇒ {}
app.get('/news', (요청, 응답) => {
  // 데이터 입력

  db.collection('post').insertOne({'title' : '타이틀'})
})

// 파일 전송
//__dirname : 현재 프로젝트 절대 경로 
app.get('/', (요청, 응답) => {
  응답.sendFile(__dirname + '/index.html')
})

app.get('/about', function(요청, 응답){
  응답.sendFile(__dirname + '/about.html')
})

// await : 바로 다음줄 실행하지 말고 잠깐 기다려주세요
// 처리가 오래걸리는 코드는 처리완료 기다리지 않고 바로 다음줄 실행하게됨
app.get('/list', async (요청, 응답) => {
  // await : 실행이 완료될 때 까지 기다려줌
  // await은 정해진 곳만 붙일 수 있음(promise 뱉는 곳)
  // 컬렉션의 모든 document 출력 하는 법
  let result = await db.collection('post').find().toArray()
  console.log(result)

  /*
  // await이 싫으면
  db.collection('post').find().toArray().then(()=>{
    // 윗줄이 작업이 완료가 되면 then안에 있는 코드 실행
  })
  */


  // 서버 데이터를 ejs 파일에 넣으려면
  // 1. ejs 파일로 데이터 전송
  // 2. ejs 파일 안에서 <%=데이터이름 %>

  응답.render('list.ejs' , { 글목록  : result})


})

// 현재 서버의 시간을 보내주는 기능
app.get('/time' , (요청, 응답) => {
  응답.render('time.ejs', { data : new Date()})
})
