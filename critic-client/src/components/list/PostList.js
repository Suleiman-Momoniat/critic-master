import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


//Redux stuff
import {connect} from 'react-redux';
import { postList, clearErrors} from '../../redux/actions/dataActions';

const styles = theme => ({
    //...theme,
    submitButton: {
        position: 'relative',
        float: "right",
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
});

const dummyObject = {
        
    userHandle: 'user',
    movieList: [{
        "imageUrl": "/aPZOt9BR3gnk1RyX924ySq81S4P.jpg",
        "genre_ids": {
            "0": "35",
            "1": "10402",
            "2": "10749",
            "3": "10751"
        },
        "backdrop_path": "/rvsPkUYhWZkAKMb2fnWHw5pNAjZ.jpg",
        "original_language": "en",
        "description": "Matchmaker, Dolly Levi takes a trip to Yonkers, New York to see the well-known unmarried half-a-millionaire, Horace Vandergelder. While there, she convinces him, his two stock clerks and his niece and her beau to go to New York City.",
        "name": "Hello, Dolly!",
        "id": "14030",
        "vote_average": "7",
        "release_date": "1969-12-12"
    },
    {
        "imageUrl": "/bHHt3HIr7MpYiRSw1XNxZm3B3cn.jpg",
        "name": "Hello Again",
        "release_date": "2017-11-08",
        "original_language": "en",
        "id": "446289",
        "backdrop_path": "/4w7BJ1r8ovi1PAoFrpfIJYhfacm.jpg",
        "description": "Ten lost souls slip in and out of one another's arms in a daisy-chained musical exploration of love's bittersweet embrace. A film adaptation of Michael John LaChiusa's celebrated musical, originally based on Arthur Schnitzler's play, La Ronde.",
        "genre_ids": {
            "0": "18",
            "1": "10402",
            "2": "10749"
        },
        "vote_average": "5.4"
    },
    {
        "imageUrl": "/bHHt3HIr7MpYiRSw1XNxZm3B3cn.jpg",
        "name": "Hello Again",
        "release_date": "2017-11-08",
        "original_language": "en",
        "id": "446289",
        "backdrop_path": "/4w7BJ1r8ovi1PAoFrpfIJYhfacm.jpg",
        "description": "Ten lost souls slip in and out of one another's arms in a daisy-chained musical exploration of love's bittersweet embrace. A film adaptation of Michael John LaChiusa's celebrated musical, originally based on Arthur Schnitzler's play, La Ronde.",
        "genre_ids": {
            "0": "18",
            "1": "10402",
            "2": "10749"
        },
        "vote_average": "5.4"
    },
    {
        "original_language": "en",
        "backdrop_path": "/v2QVQs3ndYs8945dqDzglatCB6Y.jpg",
        "vote_average": "5.5",
        "description": "Lucy Chadman (Shelley Long) chokes to death and is resurrected by her loopy sister Zelda (Judith Ivey) on the one year anniversary of her death. Lucy, of course, does not believe she has actually been dead and thinks it is an elaborate hoax until she goes to her apartment and discovers her husband (Corbin Bernsen) married to her gold digging best friend, Kim (Sela Ward).",
        "imageUrl": "/uwBdAVvrk8iLB30cqu4Z1LXBm4T.jpg",
        "release_date": "1987-11-06",
        "genre_ids": {
            "0": "35",
            "1": "18",
            "2": "14",
            "3": "878",
            "4": "10749"
        },
        "id": "35151",
        "name": "Hello Again",
        "title": "Hello"
    },
    {
        "imageUrl": "/bHHt3HIr7MpYiRSw1XNxZm3B3cn.jpg",
        "name": "Hello Again",
        "release_date": "2017-11-08",
        "original_language": "en",
        "id": "446289",
        "backdrop_path": "/4w7BJ1r8ovi1PAoFrpfIJYhfacm.jpg",
        "description": "Ten lost souls slip in and out of one another's arms in a daisy-chained musical exploration of love's bittersweet embrace. A film adaptation of Michael John LaChiusa's celebrated musical, originally based on Arthur Schnitzler's play, La Ronde.",
        "genre_ids": {
            "0": "18",
            "1": "10402",
            "2": "10749"
        },
        "vote_average": "5.4"
    },
    {
        "imageUrl": "/bHHt3HIr7MpYiRSw1XNxZm3B3cn.jpg",
        "name": "Hello Again",
        "release_date": "2017-11-08",
        "original_language": "en",
        "id": "446289",
        "backdrop_path": "/4w7BJ1r8ovi1PAoFrpfIJYhfacm.jpg",
        "description": "Ten lost souls slip in and out of one another's arms in a daisy-chained musical exploration of love's bittersweet embrace. A film adaptation of Michael John LaChiusa's celebrated musical, originally based on Arthur Schnitzler's play, La Ronde.",
        "genre_ids": {
            "0": "18",
            "1": "10402",
            "2": "10749"
        },
        "vote_average": "5.4"
    },
    {
        "imageUrl": "/bHHt3HIr7MpYiRSw1XNxZm3B3cn.jpg",
        "name": "Hello Again",
        "release_date": "2017-11-08",
        "original_language": "en",
        "id": "446289",
        "backdrop_path": "/4w7BJ1r8ovi1PAoFrpfIJYhfacm.jpg",
        "description": "Ten lost souls slip in and out of one another's arms in a daisy-chained musical exploration of love's bittersweet embrace. A film adaptation of Michael John LaChiusa's celebrated musical, originally based on Arthur Schnitzler's play, La Ronde.",
        "genre_ids": {
            "0": "18",
            "1": "10402",
            "2": "10749"
        },
        "vote_average": "5.4"
    },
    ],
    createdAt: "2021-07-20T01:35:09.125Z",
    likeCount: 0,
    commentCount: 0 
};

class PostList extends Component {
    
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({
                body: '',
                open:false, 
                errors:{}
            });
        }
    }
    handleOpen = () => {
        this.setState({open:true});
    }
    handleClose = () => {
        this.setState({open:false, errors:{}});
        this.props.clearErrors();
    }
    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postList(dummyObject);    
    }
    render(){
        const {errors} = this.state;
        const {classes, UI: {loading}} = this.props;
        return (
            <Fragment>
                <MyButton tip="Post a List" onClick={this.handleOpen}>
                    <AddIcon/>
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>
                        Post a new list
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            name="title"
                            type="text"
                            label="Title"
                            placeholder="Top Movies"
                            //NOT SURE ABOUT THIS BELOW
                            error={errors.body ? true: false}
                            helperText={errors.body}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}>
                                Submit
                               {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>) }
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }

}

PostList.propTypes = ({
    postList: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
});

const mapStateToProps = (state) =>({
    UI: state.UI
});

export default connect(mapStateToProps, {postList, clearErrors})(withStyles(styles)(PostList));
