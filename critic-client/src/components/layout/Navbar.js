import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes  from 'prop-types';
import MyButton from '../../util/MyButton';
import PostList from '../list/PostList';
import Notifications from './Notifications';

// Material UI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Tooltip } from '@material-ui/core';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/Person';





class Navbar extends Component {
    render() {
        const {authenticated} = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? 
                    (
                        <Fragment>
                            <PostList />
                            <Link to='/'>
                                <MyButton tip="Home">
                                    <HomeIcon/>
                                </MyButton>
                            </Link>   
                            <Link to='/profile'>
                                <MyButton tip="Profile">
                                    <ProfileIcon/>
                                </MyButton>
                            </Link>  

                            <Notifications/>
                        </Fragment>
                    )
                    :
                    (
                        <Fragment>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/" >Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                        </Fragment>

                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
