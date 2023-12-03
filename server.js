const express = require('express')
const app = express()

// 폴더 등록 
app.use(express.static(__dirname + '/public'))

// ejs 셋팅
app.set('view engine', 'ejs')

// 유저가 데이터를 보내면 꺼내 쓰는 코드
app.use(express.json())
app.use(express.urlencoded({extended:true})) 

// DB Connect
const { MongoClient } = require('mongodb')
let db
const url = 'mongodb+srv://admin:admin@cluster0.odkq0ir.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
  app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
  })
}).catch((err)=>{
  console.log(err)
})


app.get('/news', (요청, 응답) => {
  db.collection('post').insertOne({'title' : '타이틀'})
})

app.get('/', (요청, 응답) => {
  응답.sendFile(__dirname + '/index.html')
})

app.get('/list', async (요청, 응답) => {
  let result = await db.collection('post').find().toArray()
  응답.render('list.ejs' , { 글목록  : result})
})

/*
  [코드 혼자 잘 짜는 법]
  1. 기능이 어떤식으로 동작하는지 한글로 정리
  2. 한글을 코드로 번역

  [글 작성]
  1. 유저가 글 작성 페이지어서 글을 써서 서버에 전송 (write.ejs)
  2. 서버가 중간에서 작성한 글을 검사
  3. 이상이 없으면 작성한 글을 DB에 저장해주기
*/
app.get('/write', (요청, 응답) => {
  응답.render('write.ejs')
})

app.post('/add', (요청, 응답) => {
  console.log(요청.body) // 유저가 보낸 데이터

  응답.send('전송완료');
  db.collection('post').insertOne({title : 요청.body.title , content: 요청.body.content})
})
