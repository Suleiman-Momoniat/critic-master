// import React, { Component } from 'react';
// const React, { Component }  = require('react');
const axios = require("axios");
const api_key='efe3d1c418342122bfb294bd355b5f96';

axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=hello&page=1&include_adult=false`)
.then(res => {
    const listOfMovies = res.data.results;
        console.log('list: ', listOfMovies);
})
.catch(err=>console.log(err));

function Api(query) {

    axios.post(`api.themoviedb.org`, {
        'query': query,
        'api_key': 'efe3d1c418342122bfb294bd355b5f96',
        'language': 'en-US',
        'include_adult': 'false',
        //'sort': 'stars',
        //'order': 'desc',
        'page': '1',
        //'per_page': '25'
    })
    .then(res => {
        const listOfMovies = res.data.results;
        console.log('list: ', listOfMovies);
    })
    .catch(err=>console.log(err));

    //static final HttpClient _httpClient = HttpClient();
    // let endpoint = 'api.themoviedb.org';
  
    // //static Future<List<Repo>> getRepositoriesWithSearchQuery(String query) async {
    // let getRepositoriesWithSearchQuery = async (query) => {
    //     let uri = Uri.https(_url, '/3/search/movie', {
    //       'query': query,
    //       'api_key': 'efe3d1c418342122bfb294bd355b5f96',
    //       'language': 'en-US',
    //       'include_adult': 'false',
    //       //'sort': 'stars',
    //       //'order': 'desc',
    //       'page': '1',
    //       //'per_page': '25'
    //     });
  
    //     let jsonResponse = await _getJson(uri);
    //     console.log(jsonResponse['results']);
    //     if (jsonResponse === null) {
    //       return null;
    //     }
    //     if (jsonResponse['errors'] !== null) {
    //       return null;
    //     }
    //     if (jsonResponse['results'] === null) {
    //       return List();
    //     }
  
    //     //return Repo.mapJSONStringToList(jsonResponse['items']);
    //     //print(jsonResponse);
    //     //return Movie.mapJSONStringToList(jsonResponse['results']);
    //     return jsonResponse;
    // }
  
    //   async function _getJson(uri){
    //     try {
    //       let httpRequest = await _httpClient.getUrl(uri);
    //       let httpResponse = await httpRequest.close();
    //       if (httpResponse.statusCode !== HttpStatus.OK) {
    //         return null;
    //       }
  
    //       let responseBody = await httpResponse.transform(utf8.decoder).join();
    //       return json.decode(responseBody);
    //     } catch(err){
    //         console.log(err); 
    //       };
    //   }
    }