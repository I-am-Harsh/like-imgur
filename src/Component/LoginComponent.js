import React, { Component } from 'react';
// import axios from 'axios';
import {Input, Form, Button, FormGroup} from 'reactstrap';

class LoginComponent extends Component{
    constructor(props){
        super(props);
        // this.state = {
        //     signup : false,
        // }
    }

    componentDidMount(){
        this.redirect();
    }

    redirect = () => {
        if(this.props.redirect){
            this.props.history.push(`/`)
        }
        // console.log("redirects")
    }

    render(){
        var signup;
        if(this.props.location.state === undefined){
            signup = false
        }
        else{
            signup = this.props.location.state.signup
        }
        
        const loginRender = 
            <div className='container-fluid'>
                <Form onSubmit={e => this.props.login(e)}>
                    <FormGroup>
                        <Input name='email' type='email' placeholder='Enter your email' required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input name = 'password' type='password' placeholder='Enter your password' required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Button type='submit'>Login</Button>
                    </FormGroup>
                </Form>
                {/* <Button onClick={this.change}>Signup</Button> */}
            </div>
        
        const signupRender = 
            <div className='container-fluid'>
                <Form onSubmit={e => this.props.signup(e)}>
                    <FormGroup>
                        <Input name='email' type='email' placeholder='Enter your email' required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input name='userName' type='text' placeholder='Enter your username' required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input name='fullName' type='text' placeholder='Enter your full name' required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input name='password' type='password' placeholder='Enter password' required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Button type='submit'>Create User</Button>
                    </FormGroup>
                </Form>
                {/* <Button type='button' outline onClick={this.change}>Login</Button> */}
            </div>

        var render;

        if(signup){
            render = signupRender;
        }
        else{
            render = loginRender;
        }
        return(
            <div>
                {render}
            </div>
        );
    }
}

export default LoginComponent;

