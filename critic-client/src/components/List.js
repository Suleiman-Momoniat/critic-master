import React, { Component } from 'react'
import withStyles  from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteList from './DeleteList';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Redux
import {connect} from 'react-redux';
import {likeList, unlikeList} from '../redux/actions/dataActions';

//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { color } from '@material-ui/system';

const styles = {
    card: {
      //position: 'relative',
      display: 'flex',
      marginBottom: 20,
      overflow: 'scroll',
      //width: '40'
    },
    image:{
        minWidth: 100,

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    // root: {
    //   maxWidth: 345,
    // },
    listItems:{
      display:'inline-flex',
      overflow:'scroll',
    },
    media: {
      // height: 0,
      paddingTop: '56.25%', // 16:9
      minHeight: 100,
      minWidth: 100
    },
    // expand: {
    //   transform: 'rotate(0deg)',
    //   marginLeft: 'auto',
    //   transition: theme.transitions.create('transform', {
    //     duration: theme.transitions.duration.shortest,
    //   }),
    // },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
}

// const useStyles = makeStyles((theme) => ({
//   card: {
//     display: 'flex',
//     marginBottom: 20,
//     overflow: 'scroll',
//     },
//     image:{
//         minWidth: 100,

//     },
//     content: {
//         padding: 25,
//         objectFit: 'cover'
//     },
//     root: {
//       maxWidth: 345,
//     },
//     listItems:{
//       display:'inline-flex',
//       overflow:'scroll',
//     },
//     media: {
//       // height: 0,
//       paddingTop: '56.25%', // 16:9
//       minHeight: 100,
//       minWidth: 100
//     },
//     expand: {
//       transform: 'rotate(0deg)',
//       marginLeft: 'auto',
//       transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//       }),
//     },
//     expandOpen: {
//       transform: 'rotate(180deg)',
//     },
//     avatar: {
//       backgroundColor: red[500],
//     },
//   }));

  class List extends Component{
    likedList = () => {
      if(this.props.user.likes && this.props.user.likes.find((like) => like.listId === this.props.list.listId)){
        return true;
      } else return false;
    }

    likeList = () => {
      this.props.likeList(this.props.list.listId);
    }

    unlikeList = () => {
      this.props.unlikeList(this.props.list.listId);
    }
    render(){
    

    dayjs.extend(relativeTime);
    //const classes = useStyles();
    //const [expanded, setExpanded] = React.useState(false);
  
    // const handleExpandClick = () => {
    //   setExpanded(!expanded);
    // };

    
    const {
      classes,
      list: {
        movieList, 
        createdAt, 
        userImage, 
        userHandle, 
        listId, 
        likeCount, 
        commentCount
      },
      user: {
        authenticated, credentials : { handle }
      }
  } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to='/login'>
          <FavoriteBorder color="primary"/>
        </Link>
      </MyButton>
    ) : (
      this.likedList() ? (
        <MyButton tip="Unlike" onClick={this.unlikeList}>
          <FavoriteIcon color="primary"/>
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={this.likeList}>
          <FavoriteBorder color="primary"/>
        </MyButton>
      )
    );

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteList listId={listId}/>
    ) : null

    let listOfImages = [];
    const baseUrl = 'https://image.tmdb.org/t/p/w500/';
    movieList.forEach((movie)=>{
      listOfImages.push(<CardMedia
          className={classes.media}
          image={baseUrl + movie.imageUrl}
          title={movie.title}
        />);

    });
  
    return (
      <Card className={classes.root}>
        {deleteButton}
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              M
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
        
        <div className={classes.listItems}>
        {listOfImages}
        </div>
        <CardContent>
        <Typography variant="body3" color="textPrimary" component="p">
            Top Movies
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
          </IconButton>
          <IconButton aria-label="share">
          </IconButton>
          {likeButton}
          <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
          <MyButton tip="comments">
            <ChatIcon color='primary'/>
          </MyButton>
          <span>{commentCount} Comments</span>
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
    classes: PropTypes.object.isRequired
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
