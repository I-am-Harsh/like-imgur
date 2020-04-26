import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import axios from 'axios';



class ProfileComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : ''
        }
    }
    async componentDidMount(){
        if(!this.props.isLoggedIn){
            alert('You need to login to access this page    ')
            this.props.history.push("/login")
        }
        else{
            var url = window.location.href
            url = url.split('paste/');
            await axios.get("http://" + window.location.hostname + ":9000/upload/" + this.props.username)
            .then((result) => {
                console.log(result);
                this.setState({
                    data : result.data
                })
            })
            console.log(this.state.data);
        }
    }
    
    render(){
        if(this.state.data.length){
            return(
                <div className='container-fluid'>
                    {
                        this.state.data.map((image,index) => 
                            <div key={index} className='col-md-4 offset-md-4'>
                                <Card className='dark text-center mb-5' >
                                    <CardImg top src={`http://localhost:9000/${image.imagePath}`} width="500">
                                    </CardImg>
                                    <CardBody>
                                        <CardTitle>
                                            <b>{image.description}</b>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    }
                </div>
            );
        }
        else{
            return(
                <div>
                    Hi <b>{this.props.username}</b> !
                    You have no Posts
                    <div>
                        Press the post button to post something
                    </div>
                </div>
            );
        }
    }
    
}

export default ProfileComponent;