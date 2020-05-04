import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle} from 'reactstrap';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';



class HomeComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : ''
        }
    }

    // getting data when load 
    async componentDidMount(){
        await axios.get("http://" + window.location.hostname + ":9001/image")
        .then((result) => {
            this.setState({
                data : result.data
            })
        })
        .catch(err => console.log(err));
    }

    // posting a like/dislike
    

    // check if liked
    ifLiked = (image) => {
        var ifLiked;
        if(image.likes.indexOf(this.props.username) > -1){
            // return the user has liked image
            ifLiked = 1
        }
        else{
            // not yet liked
            ifLiked = 0
        }
        return ifLiked;
    }

    // open post
    openPost = (image) => {
        console.log("lmao");
        this.props.history.push(`/post/${image._id}`)
    }


    // posting comment 
    comment = (image, index, e) => {
        var data = new FormData(e.target);
        for (var key of data.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        axios.post("url", data)
        .then(result => console.log(result))

    }

    // like image
    like = (image, index) => {
        console.log(this.props);
        if(this.props.isLoggedIn){
            var ifLiked = this.state.data[index].likes.indexOf(this.props.username);
            if(ifLiked === -1){
                axios.post("http://" + window.location.hostname + ":9001/image/like/" + image._id, {
                    "username" : this.props.username
                })
                .then(result => {
                    if(result.data.success){
                        var newData = [...this.state.data]
                        newData[index].likes.push(this.props.username)
                        this.setState({
                            data : newData
                        })
                        
                    }
                    else{
                        console.log(result.data.err);
                        alert('There was an error please try again');
                    }
                })
            }
            else{
                axios.delete(
                    "http://" + window.location.hostname + ":9001/image/like/" + 
                    image._id + "/" + this.props.username
                )
                .then(result => {
                    if(result.data.success){
                        var newData = [...this.state.data]
                        newData[index].likes.splice(ifLiked, 1);
                        console.log(newData);
                        this.setState({
                            data : newData
                        });
                    }
                    else{
                        console.log('didnt work');
                        console.log(result.data.err);
                    }
                });
            }
        }
        else{
            alert('You need to login first');
        }
    }

    lol = () => {
        console.log("worked");
    }

    render(){
        if(this.state.data.length !== 0){
            return(
                <div className='container-fluid top'>
                    {
                        this.state.data.map((image,index) =>
                        this.props.nsfw ?
                        // nsfw render ----------- add comment and like
                            <div key={index} className='col-md-4 offset-md-4'>
                                <Card className='text-center mb-5' style={{boxShadow : "10px"}}>
                                    <CardImg top src={`http://${window.location.hostname}:9001/${image.imagePath}`} width='250' loading='lazy' 
                                        onClick={() => this.openPost(image)}
                                    />
                                    <CardBody>
                                    <CardTitle>
                                        {image.description}
                                    </CardTitle>
                                        <div className='row' id='operations'>
                                            <div className='col' id='like'>
                                                {image.likes.length}
                                                {
                                                    this.ifLiked(image) ? 
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
                                                {image.comments.length}
                                                <IconButton name='comment' onClick={() => this.openPost(image)}>
                                                    <AddCommentIcon name='comment' fontSize='default'/>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            :
                            // non nsfw render 
                            !image.nsfw &&
                            <div key={index} className='col-md-4 offset-md-4'>
                                <Card className='text-center mb-5' style={{boxShadow : "10px"}} >
                                    <CardImg top src={`http://${window.location.hostname}:9001/${image.imagePath}`}  width='250' loading='lazy'
                                    onClick={() => this.openPost(image)} >
                                    </CardImg>
                                    <CardBody>
                                        <CardTitle>
                                            {image.description}
                                        </CardTitle>
                                        <div className='row' id='operations'>
                                            <div className='col' id='like'>
                                                {image.likes.length}
                                                {
                                                    this.ifLiked(image) ? 
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
                                                {image.comments.length}
                                                <IconButton name='comment' onClick={() => this.openPost(image)}>
                                                    <AddCommentIcon name='comment' fontSize='default'/>
                                                </IconButton>
                                            </div>
                                        </div>
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
                <div className='container-fluid top'>
                    There are no posts to be shown.
                </div>
            );
        }
    }
}


export default HomeComponent;