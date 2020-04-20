import React, {Component} from 'react';
import {Nav, Navbar, NavItem} from 'reactstrap';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component{
    // constructor(props){
    //     super(props);
    // }
    
    render(){
        return(            
            <Navbar color='dark' light style={{color:'white'}}>
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
                                this.props.isLoggedIn ? 
                                <NavItem>
                                    <input type='button' className='nav-link logout-button' onClick={this.props.logout} 
                                        style={{
                                            backgroundColor : "transparent",
                                            color : "#007bff",
                                            border : "none",  
                                        }}
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
                                            to = {{pathname : '/login', state : {signup : true}}}
                                        >
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


export default HeaderComponent;

