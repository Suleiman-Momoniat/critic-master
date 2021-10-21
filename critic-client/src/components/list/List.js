import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteList from './DeleteList';
import ListDialog from './ListDialog';
import LikeButton from './LikeButton';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Redux
import { connect } from 'react-redux';
import { likeList, unlikeList } from '../../redux/actions/dataActions';

//Icons
import ChatIcon from '@material-ui/icons/Chat';

import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import './List.scss';

const styles = {
  card: {
    margin: '20px 40px',
    padding: '30px',
    overflowY: 'scroll',
    backgroundColor: '#bbbbbb'
  },
  listItems: {
    height: '300px',
    overflowY: 'auto',
    whiteSpace: 'nowrap',
    objectFit: 'cover',
  },
  media: {
    width: '300px',
    height: '300px',
    paddingTop: '56.25%',
    textAlign: 'center',

  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  body: {
    backgroundColor: 'lightgray',
  },
  interaction_buttons: {
    position: 'relative',
    width: '100%',
    margin: 'auto',
    textAlign: 'center'
  }
}

class List extends Component {

  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      list: {
        movieList,
        createdAt,
        userImage,
        userHandle,
        listId,
        likeCount,
        commentCount,
        listTitle,
        listDescription
      },
      user: {
        authenticated, credentials: { handle }
      }
    } = this.props;

    
    const genres = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Science Fiction',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western',
      };
  

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteList listId={listId} />
    ) : null

    let listOfImages = [];
    const baseUrl = 'https://image.tmdb.org/t/p/w500/';
    movieList.forEach((movie, index, arr) => {
      listOfImages.push(
        <div>
          <div className="movie_card" id="bright">
            <div className="info_section">
              <div className="movie_header">
                <img className="locandina" src={movie.imageUrl ? baseUrl + movie.imageUrl : baseUrl + movie.poster_path} alt={movie.title} />
                <h1>{movie.title}</h1>
                <h4>{movie.release_date}</h4>
                {/* <span class="minutes">117 min</span>  */}
                <p class="type">{Object.values(movie.genre_ids)
                  .map((genre_id)=>{
                    return genres[genre_id];
                  })
                  .join()}
                </p>
              </div>
              <div className="movie_desc">
                <p className="text">
                  {movie.overview}
                </p>
                <hr />
                <p className="text">Rank {arr.length - index}</p>
                <hr />
                <p className="text">Rating: {movie.vote_average} / 10</p>
              </div>
              {/* <div className="movie_social">
      <ul>
        <li><i className="material-icons">Rank {arr.length - index}</i></li>
         {/* <li><i class="material-icons"></i></li> 
        <li><i class="material-icons">Rating: {movie.vote_average} / 10</i></li>
      </ul>
    </div> */}
            </div>
            <div className="blur_back" style={{ background: `url(${movie.backdrop_path ? baseUrl + movie.backdrop_path : baseUrl + movie.imageUrl})` }} ></div>
          </div>
        </div>
      );

    });

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img src={userImage} alt='Profile Picture' width='60' />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
            </IconButton>
          }
          title={<Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>}

          subheader={dayjs(createdAt).fromNow()}
        />
        <div className='listTitle'>
          <Typography variant="h6" color="textPrimary" component="p">
            {listTitle || "Top Movies"}
          </Typography>
        </div>
        <hr />

        {deleteButton}

        <div className={classes.listItems}>
          {listOfImages}
        </div>
        <hr />
        <CardContent>

          <Typography variant="body2" color="textSecondary" component="p">
            {listDescription || "List Description"}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
          </IconButton> */}
          {/* <IconButton aria-label="share">
          </IconButton> */}
          <div className={classes.interaction_buttons}>
            <LikeButton listId={listId} />
            <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
              <ListDialog listId={listId} userHandle={userHandle} openDialog={this.props.openDialog} tip="comments"/>
            <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
          </div>
        </CardActions>
      </Card>
    );
  }
}

List.propTypes = {
  likeList: PropTypes.func.isRequired,
  unlikeList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeList,
  unlikeList
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(List));

// export class List extends Component {

//     render() {

//         const { classes, 
//             list : {movieList, 
//                 createdAt, 
//                 userImage, 
//                 userHandle, 
//                 listId, 
//                 likeCount, 
//                 commentCount} 
//             } = this.props;

//         return (
//             <Card className={classes.card}>
//                 <CardContent className={classes.content}>
//                     <Typography 
//                     variant="h5" 
//                     component={Link} 
//                     to={`/users/${userHandle}`}
//                     color="primary"
//                     >
//                         {userHandle}
//                     </Typography>

//                     <Typography 
//                     variant="body2" 
//                     color="textSecondary"
//                     >
//                         {createdAt}
//                     </Typography>


//                     <CardMedia
//                         image={userImage}
//                         title="Profile Image"
//                         className={classes.image}
//                         />


//                     {/* <Typography variant="body1">{movieList.toString()}</Typography> */}


//                 </CardContent>
//                 <CardMedia
//                 image={userImage}
//                 title="Profile Image"
//                 className={classes.image}
//                 />

// <CardMedia
//                 image={userImage}
//                 title="Profile Image"
//                 className={classes.image}
//                 />

// <CardMedia
//                 image={userImage}
//                 title="Profile Image"
//                 className={classes.image}
//                 />

//             </Card>
//         )
//     }
// }

// export default withStyles(useStyles)(List);
