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
import SearchBar from './SearchBar';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';


const api_key='efe3d1c418342122bfb294bd355b5f96';

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
    },
    searchMovieTile: {
        display: 'flex',
        // float: 'left',
    },
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
        errors: {},
        searchTerm: "",
        theMovieFilter: "",
        filterAll: false,
        isLoading: true,
        searchError: "No Movies Found",
        searchResults: [],
        listBeingCreated: []
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
    
    filterBySearchTerm=(search)=>{
        this.setState({
            theLocationFilter: search,
        })
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`)
            // .then(res => {
            //     const listOfMovies = res.data.results;
            //     console.log('list: ', listOfMovies);
            // })
            // .catch(err=>console.log(err))
        .then(newsearchResults=>{
            console.log(this.state.searchResults);
            const listOfMovies = newsearchResults.data.results;
            this.setState({
                searchResults: listOfMovies
            });
            console.log('list: ', listOfMovies);
        if(listOfMovies.length>0){
        this.setState({
            searchTerm: search,
            filterAll: false,
            searchResults: listOfMovies,
            isLoading: false
        });
        console.log(this.state.searchResults);
        }
        else{
        this.setState({
            theMovieFilter: search,
            filterAll: false,
            isLoading: false,
            searchError: "No Movies Found"
        })
        }
        })
        }
    doingASearch=async (event)=>{
        this.setState({
        [event.target.name]: event.target.value
    })
    }
    submitSearch= async (event)=>{
        event.preventDefault();
        this.filterBySearchTerm(this.state.searchTerm)
        this.setState({
            searchTerm: ""
        })
    }
    clearInput = () =>{
        this.setState({
            searchTerm:"",
            searchResults:[]
        })
    }
    pushToList = (movie) =>{
        //console.log('clicked'); 
        console.log(`${movie}`);
        //console.log(index);
        this.setState(prevState => ({
            listBeingCreated: [...prevState.listBeingCreated, movie]
        }));
        console.log(`State: ${this.state.listBeingCreated}`);
    }
    handleSubmit = (event) => {
        console.log(dummyObject);
        event.preventDefault();
        
        const ObjectToSubmit = {
            movieList: this.state.listBeingCreated,
            userHandle: 'user',
            createdAt: new Date(),
            likeCount: 0,
            commentCount: 0 
         };
         console.log(`Submitting: ${ObjectToSubmit}`);
         console.log(ObjectToSubmit);
        this.props.postList(ObjectToSubmit);    
    }
    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     const ObjectToSubmit = {
    //         ...this.state.listBeingCreated,
    //         createdAt: new Date(),
    //         likeCount: 0,
    //         commentCount: 0 
    //      }
    //     this.props.postList(ObjectToSubmit);    
    // }
    render(){
        const {errors} = this.state;
        const {classes, UI: {loading}} = this.props;
        let itemsInList = this.state.listBeingCreated.length > 0 ?  this.state.listBeingCreated.map((item, index) => {
            //console.log(item);
                        return (<div>
                <p># {index+1}</p>
                <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="Movie Poster" width="100px"/>
                {item.title} 
            </div>   )    
        }):(
            null
        ); 
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
                        Create a New List
                    </DialogTitle>
                    <DialogContent>
                    {/* onSubmit={this.handleSubmit} */}
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            name="title"
                            type="text"
                            label="Give your list a title"
                            placeholder="Top Movies"
                            //NOT SURE ABOUT THIS BELOW
                            // error={errors.body ? true: false}
                            // helperText={errors.body}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                            />
                            
            <label htmlFor="searchTerm">
                {/* <TextField id="standard-basic" label="Movie" variant="standard" /> */}
                {
                    this.state.listBeingCreated.length > 0 ? (
                        <div>
                           {itemsInList} 
                        </div>
                    ) : (
                        null
                    )
                }
                <input type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.doingASearch} placeholder="Movie" />
                <button onClick={this.submitSearch}>Search</button>

                <div className="searchIcon">
                {this.state.searchResults.length === 0 ? (
                    <SearchIcon />
                ) : (
                    <CloseIcon id="clearBtn" onClick={this.clearInput} />
                )}
                </div>
                {/* <input type="submit" value="submit"/> */}
                {this.state.searchResults.length > 0 ? this.state.searchResults.map(movie => (
                    // <ul key={movie.title}>
                        <div className={classes.searchMovieTile} onClick={()=> this.pushToList(movie)} >
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="Movie Poster" width="100px"/>
                            {movie.title}
                        </div>
                    // </ul>
                ))
            
                :
                    null
                }
                {/* {this.state.searchResults.forEach((searchResult)=>{
                    searchResult.onClick = this.pushToList(searchResult);
                })} */}
            </label>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                className={classes.submitButton}
                disabled={loading}>
                    Submit
                {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>) }
            </Button>
            
                            {/* <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}>
                                Submit
                               {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>) }
                            </Button> */}
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
