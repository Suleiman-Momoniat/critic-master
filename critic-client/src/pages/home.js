import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';

import List from '../components/List';
import Profile from '../components/Profile';

import {connect} from 'react-redux';
import {getLists} from '../redux/actions/dataActions';

class home extends Component {
    componentDidMount(){
        this.props.getLists();
    }
    render() {
        const { lists, loading} = this.props.data;
        let recentListsMarkup = !loading ? (
            lists.map(list => <List key={list.listId} list={list} />)
        ):<p>Loading...</p>;
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentListsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid> 
        );
    }
}

home.propTypes = {
    getLists: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getLists})(home);
