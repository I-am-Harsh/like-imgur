import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import axios from 'axios';

class HomeComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : ''
        }
    }
    async componentDidMount(){
        await axios.get("http://" + window.location.hostname + ":9000/upload")
        .then((result) => {
            this.setState({
                data : result.data
            })
            console.log(this.state.data);
        })
        .catch(err => console.log(err));
    }

    render(){
        // console.log(this.state.data.length);
        // console.log(this.state.data);
        console.log(this.props.nsfw);
        if(this.state.data.length !== 0){
            return(
                <div className='container-fluid top'>
                    {
                        this.state.data.map((image,index) =>
                        this.props.nsfw ?
                            <div key={index} className='col-md-4 offset-md-4'>
                                <Card className='text-center mb-5' style={{boxShadow : "10px"}}>
                                    <CardImg top src={`http://localhost:9000/${image.imagePath}`}  width='250' >
                                    </CardImg>
                                    <CardBody>
                                        <CardTitle>
                                            {image.description}
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            </div>
                            :
                            !image.nsfw &&
                            <div key={index} className='col-md-4 offset-md-4'>
                                <Card className='text-center mb-5' style={{boxShadow : "10px"}}>
                                    <CardImg top src={`http://localhost:9000/${image.imagePath}`}  width='250' >
                                    </CardImg>
                                    <CardBody>
                                        <CardTitle>
                                            {image.description}
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
                <div className='container-fluid top'>
                    There are no posts to be shown.
                </div>
            );
        }
    }
}


export default HomeComponent;