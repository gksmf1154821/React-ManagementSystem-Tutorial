const fs = require('fs'); //파일에 접근할수있는 라이브러리 

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const data = fs.readFileSync('./database.json'); //database.json 파일 data변수에 넣음.
const conf = JSON.parse(data); //JSON.parse 함수를 통해 JSON 포멧 파싱해 가져옴.
const mysql = require('mysql'); // mysql라이브러리 호출.

const connection = mysql.createConnection({ //mysql 연결
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});

connection.connect();

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
}); 
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
}); 

app.listen(port, () => console.log(`Listening on port ${port}`));