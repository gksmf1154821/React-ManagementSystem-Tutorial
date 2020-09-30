import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root : {
    width:'100%',
    marginTop : theme.spacing.unit*3,
    overflowX: "auto"
  },
  table: {
    minWidth : 1000
  }
})


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
]

class App extends Component {
  render(){
    const { classes } = this.props;
    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              {
                customers.map(c => {
                  return(
                    <Customer key={c.id} id={c.id} name={c.name} birthday={c.birthday} image={c.image} job={c.job} gender={c.gender}/>
                  );
                })
              }
            
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(App);
