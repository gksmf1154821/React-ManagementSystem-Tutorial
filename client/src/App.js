import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({ /* style 명시  */
  root : {
    width:'100%',
    marginTop : theme.spacing.unit*3,
    overflowX: "auto"
  },
  table: {
    minWidth : 1000
  },
  progress:{
    margin: theme.spacing.unit * 2
  }
})

/*
 React 실행 순서

 1) constructor()

 2)componentWillMount()

 3)render() -> 실제 컴포넌트를 뷰에 보여줌.

 4)componentDidMount()

 props or state => shouldComponentUpdate()  --> props 와 state 가 변경이되면 shouldComponentUpdate()를 실행하게되서 2)번을 다시실행행되 컴포넌트를 다시 화면에 생성.
*/


class App extends Component {

  state = {
    customers : "",
    completed : 0
  }

  componentDidMount(){ /*API 비동기적으로 호출. */
  this.timer = setInterval(this.progress, 20);
  this.callApi()
    .then(res => this.setState({customers : res}))
    .catch(err => console.log(err));
  }

  callApi = async () => { /*API 에서 response 값을 받아옴. */
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({ completed : completed >= 100 ? 0 : completed +1});
    //if(completed == 100) console.log("Done");
    //console.log(completed);
  }

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
                this.state.customers ? this.state.customers.map(c => {
                  return(
                    <Customer key={c.id} id={c.id} name={c.name} birthday={c.birthday} image={c.image} job={c.job} gender={c.gender}/>
                  ); 
                }) :
                <TableRow>
                    <TableCell colspan="6" align="center">
                      <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                    </TableCell>
                </TableRow>
              }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(App);