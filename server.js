const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
}); 
app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id' : 1,
        'image' : 'https://placeimg.com/64/64/any',
        'name' : '이하늘',
        'birthday' : '950120',
        'gender' :  '남자',
        'job' : '학생'
      },
      {
      
        'id' : 2,
        'image' : 'https://placeimg.com/64/64/any',
        'name' : '이하나',
        'birthday' : '123456',
        'gender' :  '남자',
        'job' : '개발자'
      },
      {
        'id' : 3,
        'image' : 'https://placeimg.com/64/64/any',
        'name' : '이상덕',
        'birthday' : '555487',
        'gender' :  '남자',
        'job' : '디자이너'
      }
      ]);
}); 

app.listen(port, () => console.log(`Listening on port ${port}`));