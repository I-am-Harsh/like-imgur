import React, {Component} from 'react';
import axios from 'axios';
import { FormGroup, Input, Button } from '@material-ui/core';
import {Card, CardImg, CardBody, CardTitle, Form, Label } from 'reactstrap'
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';

class CommentComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            image : '',
            comment : ''
        }
    }
    

    componentDidMount(){
        // if(!this.props.isLoggedIn){
        //     // alert('you need to login to comment');
        //     // redirect code here
        // }
        //receive image name
        var url = window.location.pathname;
        url = url.split('/');

        axios.get(`http://${window.location.hostname}:9001/post/${url[2]}`)
        .then(result => {
            this.setState({
                image : result.data
            })
        })
        console.log(this.state.data);
    }

    handleComment = (event) => {
        this.setState({
            comment : event.target.value
        })
    }

    postComment = (event, image) =>{
        event.preventDefault();
        var url = window.location.pathname;
        url = url.split('/');
        axios.post(`http://${window.location.hostname}:9001/post/${url[2]}`, {
            "comment" : this.state.comment
        })
        .then(result => {
            if(result.data.success){
                //add comment to the data 
            }
        })
    }

    removeComment = (image, index) => {
        var url = window.location.pathname;
        url = url.split('/');

        // chnage url for delete
        axios.post(`http://${window.location.hostname}:9001/post/${url[2]}`, {
            "comment" : this.state.comment
        })
        .then(result => {
            if(result.data.success){
                //add comment to the data 
            }
        })
    } 

    like = (image) =>{}

    render(){
        return(
            this.state.image &&
            <div className='container-fluid top'>
                <Card className='text-center mb-5' style={{boxShadow : "10px"}}>
                    <CardImg top src={`http://localhost:9001/${this.state.image.imagePath}`}  width='250' loading='lazy'>
                    </CardImg>
                    <CardBody>
                        <CardTitle>
                            {this.state.image.description}
                        </CardTitle>
                        <div className='row' id='operations'>
                            <div className='col' id='like'>
                                {this.state.image.likes.length}
                                {
                                    this.ifLiked(this.state.image) ? 
                                    <IconButton name='dislike' onClick = {() => this.like(image, index)}>
                                        <FavoriteIcon name = 'liked' fontSize='default'/>
                                    </IconButton>
                                    :
                                    <IconButton name='like' onClick = {() => this.like(image, index)}>
                                        <FavoriteBorderIcon name = 'like' fontSize='default'/>                
                                    </IconButton>    
                                }
                            </div>
                            <div className='col' id='comment'>
                                {this.state.image.comments.length}
                                <IconButton name='comment' onClick={() => this.openPost(image)}>
                                    <AddCommentIcon name='comment' fontSize='default'/>
                                </IconButton>
                            </div>
                        </div>
                    </CardBody>
                </Card>
               
                <Form onSubmit = {this.postComment}> 
                    <FormGroup>
                        <Label for = 'comment'>
                            Comment
                        </Label>
                        <Input type ='text' name='comment' style={{color : "white"}}
                            onChange = {(e) => this.handleComment(e)} value = {this.state.comment}
                            placeholder = 'Type your comment'
                        />
                        <Button tpye='submit' color='primary'>Post</Button>       
                    </FormGroup>
                </Form>
                
            </div>
        );
    }
}

export default CommentComponent;