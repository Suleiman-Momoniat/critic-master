import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';

import List from '../components/list/List';
import Profile from '../components/profile/Profile';
import ListSkeleton from '../util/ListSkeleton';

import {connect} from 'react-redux';
import {getLists} from '../redux/actions/dataActions';

class profile extends Component {
    componentDidMount(){
        this.props.getLists();
    }
    render() {
        const { lists, loading} = this.props.data;
        let recentListsMarkup = !loading ? (
            lists.map(list => <List key={list.listId} list={list} />)
        ):(
            <ListSkeleton/>
            );
        return (
            <Profile />
            // <Grid container spacing={16}>
            //     <Grid item sm={7} xs={12}>
            //         {recentListsMarkup}
            //     </Grid>
            //     <Grid item sm={1} xs={12}>
                    
            //     </Grid>
            //     <Grid item sm={4} xs={12}>
            //         <Profile />
            //     </Grid>
            // </Grid> 
        );
    }
}

profile.propTypes = {
    getLists: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getLists})(profile);
