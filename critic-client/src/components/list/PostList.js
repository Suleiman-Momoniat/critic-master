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

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

//Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';



//Redux stuff
import { connect } from 'react-redux';
import { postList, clearErrors } from '../../redux/actions/dataActions';
import SearchBar from './SearchBar';
import axios from 'axios';


const api_key = 'efe3d1c418342122bfb294bd355b5f96';

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

class PostList extends Component {

    state = {
        open: false,
        body: "",
        errors: {},
        searchTerm: "",
        theMovieFilter: "",
        filterAll: false,
        isLoading: true,
        searchError: "No Movies Found",
        searchResults: [],
        listBeingCreated: [],
        listDescription: "",
        listTitle: ""
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        };
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '',
                open: false,
                errors: {}
            });
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false, errors: {} });
        this.props.clearErrors();
    }
    handleChange = (event) => {
        console.log('event.target.name', event.target.id)
        this.setState({ [event.target.id]: event.target.value })
    }

    filterBySearchTerm = (search) => {
        this.setState({
            theLocationFilter: search,
        })
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`)
            // .then(res => {
            //     const listOfMovies = res.data.results;
            //     console.log('list: ', listOfMovies);
            // })
            // .catch(err=>console.log(err))
            .then(newsearchResults => {
                console.log(this.state.searchResults);
                const listOfMovies = newsearchResults.data.results;
                this.setState({
                    searchResults: listOfMovies
                });
                console.log('list: ', listOfMovies);
                if (listOfMovies.length > 0) {
                    this.setState({
                        searchTerm: search,
                        filterAll: false,
                        searchResults: listOfMovies,
                        isLoading: false
                    });
                    // console.log(this.state.searchResults);
                }
                else {
                    this.setState({
                        theMovieFilter: search,
                        filterAll: false,
                        isLoading: false,
                        searchError: "No Movies Found"
                    })
                }
            })
    }
    doingASearch = async (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitSearch = async (event) => {
        event.preventDefault();
        this.filterBySearchTerm(this.state.searchTerm)
        this.setState({
            searchTerm: ""
        })
    }
    clearInput = () => {
        this.setState({
            searchTerm: "",
            searchResults: []
        })
    }
    pushToList = (movie) => {
        //Making sure no duplicate movies added
        console.log(this.state.listBeingCreated.some(m => m.title === movie.title));
        if (this.state.listBeingCreated.some(m => m.title === movie.title) === false) {
            this.setState(prevState => ({
                listBeingCreated: [...prevState.listBeingCreated, movie]
            }));
            console.log(`State: ${this.state.listBeingCreated}`);
            this.setState(prevState => ({
                searchResults: [],
                searchTerm: ""
            }));
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const ObjectToSubmit = {
            movieList: this.state.listBeingCreated,
            listTitle: this.state.listTitle,
            listDescription: this.state.listDescription,
            userHandle: 'user',
            createdAt: new Date(),
            likeCount: 0,
            commentCount: 0
        };
        console.log(`Submitting: ${ObjectToSubmit}`);
        console.log(ObjectToSubmit);
        this.props.postList(ObjectToSubmit);
        this.setState({
            listBeingCreated: [],
        })
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        let itemsInList = this.state.listBeingCreated.length > 0 ? this.state.listBeingCreated.map((item, index) => {
            //console.log(item);
            return (<div>
                <p># {index + 1}</p>
                <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="Movie Poster" width="100px" />
                {item.title}
            </div>)
        }) : (
            null
        );
        return (
            <Fragment>
                <MyButton tip="Post a List" onClick={this.handleOpen}>
                    <AddIcon />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>
                        Create a New List
                    </DialogTitle>
                    <DialogContent>
                        {/* onSubmit={this.handleSubmit} */}
                        {/* <form> */}
                            <Input
                                id="listTitle"
                                name="listTitle"
                                type="text"
                                label="Give your list a title"
                                placeholder="List Name"
                                onChange={this.handleChange}

                                //NOT SURE ABOUT THIS BELOW
                                // error={errors.body ? true: false}
                                // helperText={errors.body}
                                className={classes.textField}
                                fullWidth
                            />

                            <Input
                                    id="listDescription"
                                    fullWidth
                                    placeholder="Description"
                                    value={this.state.listDescription}
                                    onChange={this.handleChange}
                                    multiline
                                    rows={4}
                                />
                            <label htmlFor="searchTerm">
                                {/* Showing the list */}
                                {
                                    this.state.listBeingCreated.length > 0 ? (
                                        <div>
                                            {itemsInList}
                                        </div>
                                    ) : (
                                        null
                                    )
                                }

                                

                                <form onSubmit={this.submitSearch}>
                                <Input
                                    id="searchTerm"
                                    fullWidth
                                    placeholder="Search for movie to add..."
                                    // onSubmit={this.submitSearch}
                                    // onInput={this.submitSearch}
                                    value={this.state.searchTerm}
                                    onChange={this.handleChange}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton onClick={this.submitSearch}>
                                                {this.state.searchResults.length === 0 ? (
                                                    <SearchIcon />
                                                ) : (
                                                    <CloseIcon id="clearBtn" onClick={this.clearInput} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    } 
                                />
                                </form>



                                {this.state.searchResults.length > 0 ? this.state.searchResults.map(movie => (
                                    <div className={classes.searchMovieTile} onClick={() => this.pushToList(movie)} >
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="Movie Poster" width="100px" />
                                        {movie.title}
                                    </div>
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
                                disabled={loading}
                                onClick={this.handleSubmit}
                                >
                                Submit
                                {loading && (<CircularProgress size={30} className={classes.progressSpinner} />)}
                            </Button>
                        {/* </form> */}
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

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postList, clearErrors })(withStyles(styles)(PostList));
