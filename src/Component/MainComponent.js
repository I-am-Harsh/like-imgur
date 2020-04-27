import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import ProfileComponent from './ProfileComponent';


class MainComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn : true,
            username : 'asd',
            nsfw : false
        }
    }

    // login
    login = async (e) => {
        e.preventDefault();
        var creds = new FormData(e.target);
        for (var key of creds.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        await axios.post(`http://localhost:9000/users/login`, creds, config)
        .then(result => {
            if(result.data.success === true){
                console.log("User logged in");
                this.setState({
                    isLoggedIn : true,
                    username : result.data.username
                })
                console.log("State after login : ", this.state.isLoggedIn);

            }
            else if(result.data.success === false){
                console.log("The id or password did not match");
            }
            else if(result.data.success === undefined){
                alert("The user does not exist");
            }
            else{
                console.log(result)
            }
        })
    }

    // create a user
     signup = async (e) =>{
        e.preventDefault();
        var creds = new FormData(e.target);
        for (var key of creds.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        await axios.post(`http://localhost:9000/users/signup`, creds, config)
        .then(result => {
            if(result.data.success === true){
                if(result.data.message !== ''){
                    alert(result.data.message);
                }
                else{
                    alert('User created');
                    this.setState({
                        isLoggedIn : true,
                        username : result.data.username
                    })
                    console.log(this.state);
                }
            }
            else{
                console.log(result)
                alert('There was an error please try again');
            }
        })
    }

    // logout
    logout = () => {
        console.log("gg");
        this.setState({
            isLoggedIn : false
        })
    }

    //upload image
    uploadImage = async (form, config) =>{
        await axios.post(`http://localhost:9000/upload`, form, config)
        .then((result) => {
            if(result.data.success){
                return true;
            }
            else{
                return false;
            }
        })
        
    }

    nsfwToggle = () => {
        this.setState({
            nsfw : !this.state.nsfw
        })
    }
    
    render(){
        return(
            <div className='container-fluid'>
                <BrowserRouter>
                    <HeaderComponent isLoggedIn = {this.state.isLoggedIn} 
                        username = {this.state.username} 
                        logout = {this.logout}
                        uploadImage = {this.uploadImage}
                        nsfwToggle = {this.nsfwToggle}
                        nsfw = {this.state.nsfw} />
                    <div className='container-fluid mt-3'>
                        <Switch>
                            <Route exact path ='/' component = { props => 
                                <HomeComponent {...props} nsfw = {this.state.nsfw}/>
                            }/>
                            <Route exact path ='/login' component = { props => 
                                <LoginComponent {...props} login = {this.login} 
                                    signup = {this.signup} redirect = {this.state.isLoggedIn} />
                            }/>
                            <Route exact path = '/profile' 
                                component = {props => 
                                    <ProfileComponent {...props} 
                                    username = {this.state.username} 
                                    isLoggedIn = {this.state.isLoggedIn}/>}
                            />
                            <Route exact path ='/signup' component = {props => 
                                <LoginComponent {...props} login = {this.login} 
                                    signup = {this.signup} redirect = {this.state.isLoggedIn} />
                            }/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}


export default MainComponent;