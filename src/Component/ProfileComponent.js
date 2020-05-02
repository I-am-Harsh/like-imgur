import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';
import axios from 'axios';



class ProfileComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : '',
            dropdownOpen : false
        }
    }
    
    async componentDidMount(){
        console.log("Profile is logged in : ", this.props.isLoggedIn)
        if(!this.props.isLoggedIn){
            alert('You need to login to access this page')
            this.props.history.push("/login")
        }
        else{
            await axios.get("http://" + window.location.hostname + ":9001/image/" + this.props.username)
            .then((result) => {
                this.setState({
                    data : result.data
                })
            })
            console.log("state data after intial load : ",this.state.data);
            // if(this.props.newImage !== undefined){
            //     var newData = [...this.state.data]
            //     console.log(this.props.newImage.data);
            //     newData.unshift(this.props.newImage.data)
            //     console.log(this.props.newData);
            //     this.setState({
            //         data : newData
            //     })
            //     console.log("Final new data : ", this.state.data);
            // }
        }
    }

    toggle = (e) => {
        console.log(e);
        this.setState({
            dropdownOpen : !this.state.dropdownOpen
        })
    }

    deletePost = async (id, index) => {
        console.log(id);
        axios.delete("http://" + window.location.hostname + `:9001/image/${id}`)
        .then(result => {
            if(result.data.success === true){
                alert('Post deleted')
                var newData = [...this.state.data];
                newData.splice(index,1)
                this.setState({
                    data : newData
                })
            }
            else{
                console.log("rip"); 
            }
        })
        .catch(err => console.log(err));

    }
    
    render(){
        if(this.state.data.length){
            return(
                <div className='container-fluid top'>
                    {
                        this.state.data.map((image,index) => 
                            <div key={index} className='col-md-4 offset-md-4'>
                                <Card className='dark text-center mb-5' >
                                    <CardImg top src={`http://localhost:9001/${image.imagePath}`} width="500">
                                    </CardImg>
                                    <CardBody>
                                        <CardTitle>
                                            <b>{image.description}</b>
                                        </CardTitle>
                                        <div style = {{textAlign : "right"}}>
                                            <Button outline onClick={() => this.deletePost(image._id, index)}>Delete</Button>
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