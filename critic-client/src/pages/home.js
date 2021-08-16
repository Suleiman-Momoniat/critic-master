import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import List from '../components/List';
import Profile from '../components/Profile';

class home extends Component {
    state = {
        lists: null
    }
    componentDidMount(){
        axios.get('/lists')
        .then(res =>{
            this.setState({
                lists: res.data
            })
        })
        .catch(err=>{
            console.error(err);
        })
    }
    render() {
        let recentListsMarkup = this.state.lists ? (
            this.state.lists.map(list => <List key={list.listId} list={list} />)
        ):(<p>Loading...</p>);
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

export default home
