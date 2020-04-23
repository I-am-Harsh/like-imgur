import React, {Component} from 'react';
import { Media, Card, Jumbotron, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class ProfileComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [
                {
                    path : "./FullSizeRender3.jpg",
                    desc : "description"
                },
                {
                    path : "./FullSizeRender3.jpg",
                    desc : "description"
                },
                {
                    path : "./FullSizeRender3.jpg",
                    desc : "description"
                }
            ]
        }
    }
    componentDidMount(){
        if(!this.props.isLoggedIn){
            // alert('You need to login to access this page    ')
            // this.props.history.push("/login")
        }
    }
    
    render(){
        return(
            <div className='container-fluid'>
                <div className='jumbotron'>
                    <h2>
                        Hi {this.props.username} !
                    </h2>
                    <h3>
                        You have {this.state.data.length} posts
                    </h3>
                </div>
                    {/* {
                        this.state.data.map((image, index) => 
                            <div className='text-center mb-5' key = {index}>
                                <figure>
                                    <img src={image.path} onClick={image.src} alt="lmao" height = "500" width = "500" loading='lazy'/>
                                </figure>
                                <figcaption>{image.desc}</figcaption>
                            </div>
                        )
                    } */}
                    {
                        this.state.data.map((image,index) => 
                            <div key={index}>
                                <Card className='dark text-center mb-5' >
                                    <CardImg top src={image.path} width="50%" height="50%">
                                    </CardImg>
                                    <CardBody>
                                        <CardTitle>
                                            <b>{image.desc}</b>
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
}

export default ProfileComponent;