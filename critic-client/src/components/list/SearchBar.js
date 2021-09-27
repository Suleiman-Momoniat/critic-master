import React from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import { yellow } from '@material-ui/core/colors';



const api_key='efe3d1c418342122bfb294bd355b5f96';

const styles = theme => ({
    searchMovieTile: {
        display: 'flex',
        // float: 'left',
    }
});

class SearchBar extends React.Component{
    state={
        searchTerm: "",
        theMovieFilter: "",
        filterAll: false,
        isLoading: true,
        searchError: "No Movies Found",
        searchResults: [],
        listBeingCreated: []
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
    render(){
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
        return(
            <form onSubmit={this.submitSearch}>
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
            </form>
        )
        }
    }

SearchBar.propTypes = ({
    UI: PropTypes.object.isRequired
});

const mapStateToProps = (state) =>({
    UI: state.UI
});

export default connect(mapStateToProps)(withStyles(styles)(SearchBar));
