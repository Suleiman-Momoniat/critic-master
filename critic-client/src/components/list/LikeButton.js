import React, { Component } from 'react'
import MyButton from '../../util/MyButton';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

//Redux
import {connect} from 'react-redux';
import {likeList, unlikeList} from '../../redux/actions/dataActions';



export class LikeButton extends Component {
  likedList = () => {
    if(this.props.user.likes && this.props.user.likes.find((like) => like.listId === this.props.listId)){
      return true;
    } else return false;
  };

  likeList = () => {
    this.props.likeList(this.props.listId);
  };

  unlikeList = () => {
    this.props.unlikeList(this.props.listId);
  };
    render() {
      const {  authenticated } = this.props.user;
      const likeButton = !authenticated ? (
        <Link to='/login'>
          <MyButton tip="Like">
              <FavoriteBorder color="primary"/>
            
          </MyButton>
        </Link>
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
        return  likeButton; 
    }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  listId: PropTypes.string.isRequired,
  likeList: PropTypes.func.isRequired,
  unlikeList: PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
  user: state.user
});

const mapActionsToProps = {
  likeList, 
  unlikeList
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
