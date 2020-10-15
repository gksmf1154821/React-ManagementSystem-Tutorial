import { Divider } from '@material-ui/core';
import { Class } from '@material-ui/icons';
import React from 'react';
import { Component } from 'react';
import  Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    hidden : {
        display : 'none'
    }
});

class CustomerUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            open : false,
            id : 1
        }
    }

    handleUpdate =  () => {
        
    }

    handleUpdateOpen = (id) => {
        this.setState({
            open : true,
        });
    }

    handleUpdateClose = () => {
        this.setState({
            open : false
        });
    }

    render(){
        const  { classes } = this.props;
        
        return(
            <div>
                <Button variant='contained' color='primary' onClick={(e) =>{this.handleUpdateOpen(this.props.id)}}>수정</Button>
                <Dialog open={this.state.open} onClose={this.handleUpdateClose}>
                    <DialogTitle>수정</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFilechange} /><br></br>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br></br>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br></br>
                        <TextField label="생일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br></br>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br></br>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br></br>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleUpdate}>수정</Button>
                        <Button variant="contained" color="secondary" onClick={this.handleUpdateClose}>취소</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default CustomerUpdate;