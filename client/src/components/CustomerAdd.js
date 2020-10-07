import React from 'react';
import { post } from 'axios';
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
            fileName : ''
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
            })
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : ''
        })
        window.location.reload();
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

    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFilechange} /><br></br>
                이름 :  <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br></br>
                생년원일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br></br>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br></br>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br></br>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}


export default CustomerAdd;