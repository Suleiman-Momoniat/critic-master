import React from 'react';
import axios from 'axios';

const api_key='efe3d1c418342122bfb294bd355b5f96';

export default class SearchBar extends React.Component{
    state={
        searchTerm: "",
        theMovieFilter: "",
        filterAll: false,
        isLoading: true,
        searchError: "No Movies Found",
        searchMovie: null,
    }
    filterBySearchTerm=(search)=>{
        this.setState({
            theLocationFilter: search,
        })
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=hello&page=1&include_adult=false`)
            // .then(res => {
            //     const listOfMovies = res.data.results;
            //     console.log('list: ', listOfMovies);
            // })
            // .catch(err=>console.log(err))
        .then(movieList=>{
            //console.log(movieList);
            const listOfMovies = movieList.data.results;
            console.log('list: ', listOfMovies);
        if(movieList.data.results.length>0){
        this.setState({
            searchTerm: search,
            filterAll: false,
            searchMovie: movieList.data.results,
            isLoading: false
        });
        console.log(this.state.searchMovie);
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
    render(){
        return(
            <form onSubmit={this.submitSearch}>
            <label htmlFor="searchTerm">
                <strong>Search Movie Title: </strong>
                <input type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.doingASearch} placeholder="Movie"/>
                {/* <input type="submit" value="submit"/> */}
                {this.state.searchMovie ? this.state.searchMovie.map(movie => (
                    <ul key={movie.title}>
                        <li>{movie.title}</li>
                    </ul>
                ))
            
                :
                    null
                }
                <button onClick={this.submitSearch}>Search</button>
            </label>
            </form>
        )
        }
    }