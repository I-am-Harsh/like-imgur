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
    componentDidMount(){
        if(!this.props.isLoggedIn){
            alert('You need to login to access this page    ')
            this.props.history.push("/login")
        }
        else{
            var url = window.location.href
            url = url.split('paste/');
            axios.get("http://" + window.location.hostname + ":9000/upload/" + this.props.username)
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
        if(this.state.data !== ''){
            return(
                // <div></div>
                <div className='container-fluid'>
                    <div className='jumbotron'>
                        <h2>
                            Hi {this.props.username} !
                        </h2>
                        <h3>
                            You have {this.state.data.length} posts
                        </h3>
                    </div>
                        {
                            this.state.data.map((image,index) => 
                                <div key={index}>
                                    <Card className='dark text-center mb-5' >
                                        <CardImg top src="./server/routes/upload/1587805666681FullSizeRender 2.jpg" width="50%" height="50%">
                                        </CardImg>
                                        <CardBody>
                                            <CardTitle>
                                                <b>{image.description}</b>
                                            </CardTitle>
                                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
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
                    You have no Posts
                </div>
            );
        }
    }
    
}

export default ProfileComponent;