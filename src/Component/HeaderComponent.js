import React, {Component, useState} from 'react';
import {Nav, Navbar, NavItem} from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class HeaderComponent extends Component{
    // constructor(props){
    //     super(props);
    // }
    
    render(){
        return(            
            <Navbar color='dark' light style={{color:'white'}} fixed='top'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' style={{color:'white'}} to = {'/'}>Imgur App</Link>
                    <Nav>
                        <NavItem>
                            <Link className='nav-link' to = {'/'}>
                                Home
                            </Link>
                        </NavItem>
                        {
                            this.props.isLoggedIn &&
                            <NavItem>
                                <Link className='nav-link' to = {'/profile'}>Profile</Link>
                            </NavItem>
                        }
                        {   
                            this.props.isLoggedIn &&
                            <NavItem>
                                <Post/>
                            </NavItem>
                        }                        
                            {
                                this.props.isLoggedIn ? 
                                <NavItem>
                                    <input type='button' className='nav-link button-link' onClick={this.props.logout} 
                                        value = 'Logout'
                                    />
                                </NavItem>
                                : 
                                <React.Fragment>
                                    <NavItem>
                                        <Link className='nav-link' 
                                            to = {{pathname : "/login", state: {signup : false}}}
                                        >
                                            Login
                                        </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className='nav-link' 
                                            to = {{pathname : '/login', state : {signup : true}}}>
                                            Signup
                                        </Link>
                                    </NavItem>
                                </React.Fragment>
                            }
                    </Nav>
                </div>
            </Navbar>
        );
    }
}

const Post = () => {
    const [modal, setModal  ] = useState(false);
    const [desc, setDesc] = useState("");
    const toggle = () => setModal(!modal);

    const uploadImage = async (e) =>{
        e.preventDefault();
        var form = new FormData(e.target);
        for (var key of form.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        await axios.post(`http://localhost:9000/upload`, form, config)
        .then((result) => {
            const src = result;
            console.log("this is src : ", src);
        })
        
    }
    
    return (    
        <div>
            <input type='button' className='nav-link button-link' onClick={toggle} value = 'Post'/>
            <Modal isOpen={modal} toggle={toggle} backdrop='static'>
                <ModalHeader toggle={toggle} style={{backgroundColor : "#2e3035"}}>Add an Expense</ModalHeader>
                <ModalBody style={{backgroundColor : "#2e3035"}}>
                    <Form onSubmit={e => uploadImage(e)}>
                        <FormGroup>
                            <Label for='desc'>
                                Description
                            </Label>
                            <Input type='text' name='desc' className='dark' required >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='image'>
                                Choose Image
                            </Label>
                            <Input type = 'file' name='image' className='dark'></Input>
                        </FormGroup>
                        <ModalFooter>
                            <Button type='submit' color="success" >Add</Button>
                            <Button color="danger" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default HeaderComponent;

