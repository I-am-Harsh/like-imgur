import React, {Component} from 'react';
import axios from 'axios';
import { FormGroup, Input, Button } from '@material-ui/core';
import {Card, CardImg, CardBody, CardTitle, Form } from 'reactstrap'
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';

class CommentComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : '',
            comment : ''
        }
    }
    

    async componentDidMount(){

        //receive image name
        var url = window.location.pathname;
        url = url.split('/');

        // send req
        await axios.get(`http://${window.location.hostname}:9001/post/${url[2]}`)
        .then(result => {
            if(result.data.success){
                this.setState({
                    data : result.data.result
                })
            }
            console.log(this.state.data.likes);
            console.log(this.props.username);
        })
    }

    handleComment = (event) => {
        this.setState({
            comment : event.target.value
        })
    }

    ifLiked = () => {
        var ifLiked = this.state.data.likes.indexOf(this.props.username);
        if(ifLiked === -1){
            return 0
        }
        else{
            return 1
        }
    }


    like = () => {
        if(this.props.isLoggedIn){
            var ifLiked = this.state.data.likes.indexOf(this.props.username);
            if(ifLiked === -1){
                axios.post("http://" + window.location.hostname + ":9001/image/like/" + this.state.data._id, {
                    "username" : this.props.username
                })
                .then(result => {
                    if(result.data.success){
                        var newData = this.state.data   
                        newData.likes.push(this.props.username)
                        this.setState({
                            data : newData
                        })
                        
                    }
                    else{
                        alert('There was an error please try again');
                    }
                })
            }
            else{
                axios.delete(
                    "http://" + window.location.hostname + ":9001/image/like/" + 
                    this.state.data._id + "/" + this.props.username
                )
                .then(result => {
                    if(result.data.success){
                        var newData = this.state.data
                        newData.likes.splice(ifLiked, 1);
                        console.log(newData);
                        this.setState({
                            data : newData
                        });
                    }
                    else{
                        console.log('didnt work');
                    }
                });
            }
        }
        else{
            alert('You need to login first');
        }
    }


    postComment = (event) =>{
        event.preventDefault();
        console.log(this.props);
        if(!this.props.isLoggedIn){
            alert('you must login to post a comment');
            // this.props.history.push('/login');
        }
        else{
            var url = window.location.pathname;
            url = url.split('/');
            axios.post(`http://${window.location.hostname}:9001/post/comments/${url[2]}`, {
                "comment" : this.state.comment,
                "username" : this.props.username
            })
            .then(result => {
                if(result.data.success){
                    var newData = this.state.data
                    newData.comments.push({username : this.props.username, comment : this.state.comment})
                    console.log(this.state.data.comments);
                    this.setState({
                        data : newData,
                        comment : ''
                    })
                }
            })
        }
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
                console.log(this.state.comment);
            }
        })
    }

    render(){
        
        return(
            this.state.data &&
            <div className='container-fluid top'>
                <div className='col-md-4 offset-md-4'>
                    <Card className='text-center mb-5' style={{boxShadow : "10px"}}>
                        <CardImg top src={`http://${window.location.hostname}:9001/`+this.state.data.imagePath}  width='250' loading='lazy'/>
                        <CardBody>
                            <CardTitle>
                                {this.state.data.description}
                            </CardTitle>
                            <div className='row' id='operations'>
                                <div className='col' id='like'>
                                    {this.state.data.likes.length}
                                    {
                                        this.ifLiked() ?
                                        <IconButton name='dislike' onClick = {this.like}>
                                            <FavoriteIcon name = 'liked'  fontSize='default'/>
                                        </IconButton>
                                        :
                                        <IconButton name='like' onClick={this.like}>
                                            <FavoriteBorderIcon name = 'like' fontSize='default'/>                
                                        </IconButton>      
                                    }                          
                                </div>
                                <div className='col' id='comment'>
                                    {this.state.data.comments.length}
                                    <IconButton name='comment'>
                                        <AddCommentIcon name='comment' fontSize='default'/>
                                    </IconButton>
                                </div>
                            </div>
                                {
                                    this.state.data.comments.map((comment, index) => {
                                        return(
                                            <div className = 'row mb-1' id={index}>
                                                {
                                                    this.props.username === comment.username ?
                                                    
                                                    <div className = 'col-12' style={{textAlign : "left", color:"#8BC34A"}}>
                                                        {comment.username} -- {comment.comment}
                                                    </div>   
                                                    :
                                                    <div className = 'col-12' style={{textAlign : "left"}}>
                                                        {comment.username} -- {comment.comment}
                                                    </div>
                                                    
                                                }
                                                {/* <div className ='col-12' style={{marginLeft : "0", textAlign:"left"}}>
                                                    {comment.comment}
                                                </div>                                 */}
                                            </div>
                                        );
                                    })
                                }
                        </CardBody>
                    </Card>
                    <Form onSubmit = {e => this.postComment(e)}> 
                        <FormGroup>
                            <Input type ='text' id='comment' style={{color : "white"}}
                                onChange = {(e) => this.handleComment(e)} value = {this.state.comment}
                                placeholder = 'Type your comment'
                            />
                            <Button type='submit' color='primary'>Post</Button>       
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CommentComponent;