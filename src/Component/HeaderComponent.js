import React, {Component, useState} from 'react';
import {Nav, Navbar, NavItem} from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { Collapse, NavbarToggler} from 'reactstrap';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed : false,
            width : window.innerWidth
        }
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
      };

    toggleNavbar = () =>{
        this.setState({
            collapsed : !this.state.collapsed
        })
    }

    logoutClick = () => {
        this.props.logout() 
        this.toggleNavbar()
    }

    nsfwClick = () => {
        this.props.nsfwToggle()
        this.toggleNavbar()
    }
    
    render(){
        const width = this.state.width
        var mobile;
        if(width <= 500){
            mobile = true
        }
        else{
            mobile = false
        }


        // for pc
        if(!mobile){
            return(            
                <Navbar color='dark mb-5' light style={{color:'white'}} fixed='top' expand='md'>
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
                                    <Post username = {this.props.username}
                                    uploadImage = {this.props.uploadImage}/>
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

        // for mobile
        return(
            <div>
                <Navbar color="dark" dark fixed='top'>
                    <Link className='navbar-brand' style={{color:'white'}} to = {'/'}>Imgur App</Link>
                    <input type='text' className='dark' style={{width : "150px"}} placeholder='Search..'></input>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <Link className='nav-link' to = {'/'} onClick={this.toggleNavbar}>
                                    Home
                                </Link>
                            </NavItem>
                            {
                                this.props.isLoggedIn &&
                                <NavItem>
                                    <Link className='nav-link' to = {'/profile'} onClick={this.toggleNavbar}>
                                        Profile
                                    </Link>
                                </NavItem>
                            }
                            {   
                                this.props.isLoggedIn &&
                                <NavItem>
                                    <Post username = {this.props.username} 
                                    uploadImage = {this.props.uploadImage} 
                                    toggleNavbar = {this.toggleNavbar}/>
                                </NavItem>
                            }                        
                            {
                                this.props.isLoggedIn ? 
                                <NavItem>
                                    <input type='button' className='nav-link button-link' 
                                        onClick={this.logoutClick} 
                                        value = 'Logout'
                                    />  
                                </NavItem>
                                : 
                                <React.Fragment>
                                    <NavItem>
                                        <Link className='nav-link' 
                                            to = {{pathname : "/login", state: {signup : false}}} 
                                            onClick={this.toggleNavbar}
                                        >
                                            Login
                                        </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className='nav-link' 
                                            to = {{pathname : '/login', state : {signup : true}}}
                                            onClick={this.toggleNavbar}
                                        >
                                            Signup
                                        </Link>
                                    </NavItem>
                                </React.Fragment>   
                            }
                            {
                                this.props.nsfw ?
                                <NavItem>
                                    <input type='button' className='nav-link button-link' 
                                        onClick={this.nsfwClick}
                                        value = 'NSFW On'/>  
                                </NavItem>
                                :
                                <NavItem>
                                    <input type='button' className='nav-link button-link' 
                                        onClick={this.nsfwClick}
                                        value = 'NSFW Off'/>  
                                </NavItem>
                                
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const Post = (props) => {
    const [modal, setModal  ] = useState(false);
    const toggle = () => setModal(!modal);
    const upload = async (e) =>{
        e.preventDefault();
        var form = new FormData(e.target);
        for (var key of form.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        const success = props.uploadImage(form, config)
        if(success){
            toggle();
            props.toggleNavbar();
        }
        else{
            alert('Error');
        }
        
    }
    
    return (    
        <div>
            <input type='button' className='nav-link button-link' onClick={toggle} value = 'Post'/>
            <Modal isOpen={modal} toggle={toggle} backdrop='static'>
                <ModalHeader toggle={toggle} style={{backgroundColor : "#2e3035"}}>Add an Expense</ModalHeader>
                <ModalBody style={{backgroundColor : "#2e3035"}}>
                    <Form onSubmit={e => upload(e)}>
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
                            <Input type = 'file' name='image' required></Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" name='nsfw' defaultChecked={false} />{' '}
                                NSFW
                            </Label>
                        </FormGroup>
                        <Input type = 'text' hidden name='username' defaultValue = {props.username}></Input>
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

