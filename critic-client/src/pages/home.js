import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import List from '../components/List';

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
            <Grid container spacing={10}>
                <Grid item sm={9} xs={10}>
                    {recentListsMarkup}
                </Grid>
                <Grid item sm={1} xs={10}>
                    <p>hello</p>
                </Grid>
            </Grid> 
        );
    }
}

export default home
