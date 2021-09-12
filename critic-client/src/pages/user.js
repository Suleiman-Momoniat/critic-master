import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import List from '../components/list/List';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';

import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
        .then(res => {
            this.setState({
                profile: res.data.user
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render() {
        const {lists, loading} = this.props.data;
        
        const listsMarkup = loading ? (
            <p> Loading data...</p>
        ) : lists === null ? (
            <p>No Lists</p>
        ) : (
            lists.map(list => <List key={list.listId} list={list} />)
        )
        return (
            <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
                {listsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile === null ? (
                        <p>Loading Profile</p>
                    ): (
                        <StaticProfile profile={this.state.profile} />
                    )
                }
            </Grid>
        </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data
});

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getUserData})(user);
