import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden : {
        display : 'none'
    }
});
//import { response } from 'express';

class CustomerAdd extends React.Component{

    constructor(props){ //생산자 정의

        super(props);
        this.state ={
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false
        }
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('userName', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        //파일을 전송할땐 web header를 추가 해줘야함.
        const config ={
            header : {
                'content-type' : 'multipart/form-data' //multipart/form-data 전달하고자 하는 데이터중 파일이있다면 설정해줘야함.
            }
        }
        return post(url, formData , config);
    }

    handleFormSubmit = (e) => { //이벤트
        e.preventDefault() //데이터가 서버로 전달될떄 오류가 발생하지않도록
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : ''
        })
        
    }

    handleFilechange = (e) => {
        this.setState({
            file : e.target.files[0], //e.target 이벤트가 발생한 그 Input값 자체를 의미 한다.
            fileName : e.target.value

        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClickOpen = () => {
        this.setState({
            open : true
        })
    }
    handleClose = () => {
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false
        })
    }

    render(){
        const  { classes } = this.props;

        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFilechange} /><br></br>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br></br>
                        <TextField label="생일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br></br>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br></br>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br></br>
                    </DialogContent>
                    <DialogActions>
                        <Button valant="contained" color ="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button valant="outlined" color ="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : 
                
                <button type="submit">추가하기</button>
            </form>
            */
        )
    }
}


export default withStyles(styles)(CustomerAdd);