import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';

const customers=[
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
  'name' : '조창호',
  'birthday' : '123456',
  'gender' :  '남자',
  'job' : '개발자'
},
{
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '조성훈',
  'birthday' : '555487',
  'gender' :  '남자',
  'job' : '디자이너'
}
]

class App extends Component {
  render(){
    return(
      <div>
        {
          customers.map(c => {
            return(
              <Customer key={c.id} id={c.id} name={c.name} birthday={c.birthday} image={c.image} job={c.job} gender={c.gender}/>
            );
          })
        }
      </div>
    )
  }
}

export default App;
