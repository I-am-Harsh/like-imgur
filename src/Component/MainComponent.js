import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import ProfileComponent from './ProfileComponent';
import CommentComponent from './CommentComponent';


class MainComponent extends Component{
    constructor(props){
        const cookies = new Cookies();
        var isLoggedIn = false;
        var username = '';
        var email = '';
        if(cookies.get("isLoggedIn") === 'true'){
            isLoggedIn = true;
            username = cookies.get('username');
            email = cookies.get('email')
        }
        else{
            if(cookies.get('isLoggedIn') === undefined || cookies.get('isLoggedIn') === 'false'){
                if(cookies.get('username') !==  undefined){
                    username = cookies.get('username')
                    email = cookies.get('email')
                    console.log("Email from else : ", email)
                }
            }
        }

        super(props);
        this.state = {
            isLoggedIn : isLoggedIn,
            username : username,
            nsfw : false,
            newImageProfile : undefined,
            newImageHome : undefined,
            email : email
        }
    }


    // login
    login = async (e) => {
        e.preventDefault();
        var creds = new FormData(e.target);
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        await axios.post("http://" + window.location.hostname + ":9001/users/login", creds, config)
        .then(result => {
            if(result.data.success === true){
                let date = new Date();
                date.setTime(date.getTime() + (6000*10000000000000));
                const cookie = new Cookies();
                cookie.set('username',result.data.username, { path : '/'})
                cookie.set('isLoggedIn', true, { path : '/', expires : date})
                cookie.set('email', result.data.email, { path : '/' })
                this.setState({
                    isLoggedIn : true,
                    username : result.data.username
                })                
            }
            else if(result.data.success === false){
                alert("The id or password did not match");
                
            }
            else if(result.data.success === undefined){
                alert("The user does not exist");
            }
            else{
                console.log(result.data);
            }
        })
    }

    // create a user
     signup = async (e) =>{
        e.preventDefault();
        var creds = new FormData(e.target);
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        await axios.post("http://" + window.location.hostname + ":9001/users/signup", creds, config)
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
                    const cookie = new Cookies();
                    let date = new Date();
                    date.setTime(date.getTime() + (6000*10000000000000));
                    cookie.remove('username');
                    cookie.remove('isLoggedIn');
                    cookie.remove('email');
                    cookie.set('username',result.data.username, { path : '/'})
                    cookie.set('isLoggedIn', true, { path : '/', expires : date})
                    cookie.set('email', result.data.email, { path : '/' })
                }
            }
            else{
                console.log(result.data)
                alert('There was an error please try again');
            }
        })
    }

    // logout
    logout = () => {
        const cookies = new Cookies();
        this.setState({
            isLoggedIn : false
        }, cookies.remove('isLoggedIn'));
    }

    //upload image
    uploadImage = async (form, config) =>{
        await axios.post("http://" + window.location.hostname + ":9001/image", form, config)
        .then((result) => {
            if(result.data.success){
                var url = window.location.pathname;
                if(url === '/profile'){
                    this.setState({
                        newImageProfile : result
                    })
                }
                else if(url === '/'){   
                    this.setState({
                        newImageHome : result
                    })
                }
                console.log("Main state after upload image : ",this.state);
                return true;
            }
            else{
                console.log(result.data)
                return false;
            }
        })
    }

    // nsfw toggle
    nsfwToggle = () => {
        this.setState({
            nsfw : !this.state.nsfw
        })
    }

    
    
    render(){
        return(
            <div className='container-fluid'>
                <BrowserRouter>
                    <HeaderComponent  isLoggedIn = {this.state.isLoggedIn} 
                        username = {this.state.username} 
                        logout = {this.logout}
                        uploadImage = {this.uploadImage}
                        nsfwToggle = {this.nsfwToggle}
                        nsfw = {this.state.nsfw}
                    />
                    <div className='container-fluid mt-3'>
                        <Switch>
                            <Route exact path ='/' component = { props => 
                                <HomeComponent {...props} nsfw = {this.state.nsfw} 
                                    newImage = {this.state.newImageHome} 
                                    username = {this.state.username}
                                    isLoggedIn = {this.props.isLoggedIn}
                                />
                            }/>
                            <Route exact path ='/login' component = { props => 
                                <LoginComponent {...props} login = {this.login} 
                                    signup = {this.signup}
                                    email = {this.state.email}
                                    redirect = {this.state.isLoggedIn} 
                                />
                            }/>
                            <Route exact path = '/profile' 
                                component = {props => 
                                    <ProfileComponent {...props} 
                                    username = {this.state.username} 
                                    isLoggedIn = {this.state.isLoggedIn}
                                    />}
                            />
                            <Route exact path ='/signup' component = {props => 
                                <LoginComponent {...props} login = {this.login} 
                                    signup = {this.signup} redirect = {this.state.isLoggedIn} />
                            }/>
                            <Route path='/post/*' component = { props =>
                                <CommentComponent {...props} 
                                    username = {this.state.username}
                                    isLoggedIn = {this.state.isLoggedIn}
                                />
                            }/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}


export default MainComponent;