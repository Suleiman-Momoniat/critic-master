import React, { Component } from 'react';
import withStyles  from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
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
import {connect} from 'react-redux';
import {likeList, unlikeList} from '../../redux/actions/dataActions';

//Icons
import ChatIcon from '@material-ui/icons/Chat';

import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = {
    card: {
      //position: 'relative',
      // display: 'flex',
      // marginBottom: 20,
      overflow: 'scroll',
      //width: '40'
      margin: '20px 40px',
      padding: '30px',
    },
    media:{
        // minWidth: 100,
        // minHeight: 100,
        // maxWidth: 100,
        // maxHeight: 100
        width: 100,
        height: 100,
        paddingTop: '56.25%', // 16:9
      // minHeight: 50,
      // minWidth: 100,
      // maxHeight: 60,
      textAlign: 'center'
        

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
    body:{
      backgroundColor: 'lightgray',
    },
    listTitle: {

    }
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
    
    render(){
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
          authenticated, credentials : { handle }
        }
    } = this.props;

    

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteList listId={listId}/>
    ) : null

    let listOfImages = [];
    const baseUrl = 'https://image.tmdb.org/t/p/w500/';
    movieList.forEach((movie)=>{
      listOfImages.push(<CardMedia
          className={classes.media}
          image={movie.imageUrl ? baseUrl + movie.imageUrl : baseUrl +movie.poster_path}
          title={movie.title}
        />);

    });
  
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img src={userImage} alt='Profile Picture' width='60'/>
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
          <IconButton aria-label="add to favorites">
          </IconButton>
          <IconButton aria-label="share">
          </IconButton>
          <LikeButton listId={listId}/>
          <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
          <MyButton tip="comments">
            <ChatIcon color='primary'/>
          </MyButton>
          <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
          <ListDialog listId={listId} userHandle={userHandle} openDialog={this.props.openDialog}/>
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
