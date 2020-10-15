const fs = require('fs'); //파일에 접근할수있는 라이브러리 
const path = require('path');

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

const filepath = path.join(__dirname,'./upload');

const multer = require('multer'); //TODO : aws s3 사용해서 파일업로드 해보기.
//const upload = multer({dest : './upload'}) //업로드 파일 설정. *dest 는 확장자없는 파일명으로 받아온다. 

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, filepath);
    },
    filename : (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({storage : storage});

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
}); 
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
}); 

app.use('/image', express.static(filepath));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename; // 
    let name = req.body.userName;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];

    console.log('#################################');
    console.log(express.static(filepath));
    /*console.log(image);
    console.log(name);
    console.log(birthday);
    console.log(gender);
    console.log(job);*/
    //console.log(req.file);
    //console.log(filepath);
    console.log('#################################');

    connection.query(sql,params,
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?'
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })
   //console.log(err); 
});

app.listen(port, () => console.log(`Listening on port ${port}`));