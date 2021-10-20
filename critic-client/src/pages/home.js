import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { PropTypes } from 'prop-types';

import List from '../components/list/List';
import Profile from '../components/profile/Profile';
import ListSkeleton from '../util/ListSkeleton';

import {connect} from 'react-redux';
import {getLists} from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    home: {
        backgroundColor: '#121212'
    }
});

class home extends Component {
    componentDidMount(){
        this.props.getLists();
    }
    render() {
        const { classes } = this.props;
        const { lists, loading} = this.props.data;
        let recentListsMarkup = !loading ? (
            lists.map(list => <List key={list.listId} list={list} />)
        ):(
            <ListSkeleton/>
            );
        return (
            <div className={classes.home}>
                {recentListsMarkup}
            </div>
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

export default connect(mapStateToProps, {getLists})(withStyles(styles)(home));

// export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));