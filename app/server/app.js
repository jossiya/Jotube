const express=require('express')
const app=express()
const dotenv=require('dotenv')
const config = require('./src/config/key')

//환경변수 적용
dotenv.config()

//session
const mysql = require("mysql");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

var options = {
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    key: "session_id",
    secret: "secrdsas%$#@dsad%@et",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge: 1000 * 60 * 60},
  })
);


var db = mysql.createConnection(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({} /* session store options */, db);

//라우팅 경로
const home=require('./src/routes/home')

//빌드
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

//미들웨어 등록
app.use('/uploads',express.static('uploads')) //파일 위치
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());// 바디파서 합쳐짐
app.use(express.urlencoded({extended: true}))//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포합될 경우 제대로 인식도지 않는 문제 해결


//서버 라우팅
app.use('/api',home)

module.exports=app
