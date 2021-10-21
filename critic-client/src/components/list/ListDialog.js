import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm';
//MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography  from '@material-ui/core/Typography';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';


//Redux stuff
import { connect } from 'react-redux';
import {getList, clearErrors} from '../../redux/actions/dataActions';
import  LikeButton  from './LikeButton';

const styles = theme => ({
    //...theme,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
    profileImage:{
        maxWidth:200,
        maxHeight: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '50%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

class ListDialog extends Component{
    state = {
        open: false,
        oldPath: '',
        newPath:''
    }
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, listId } = this.props;
        const newPath = `/users/${userHandle}/list/${listId}`;

        if(oldPath === newPath) oldPath=`/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({open: true, oldPath, newPath});
        this.props.getList(this.props.listId);
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({open: false});
        this.props.clearErrors();
    }
    render(){
        const {classes, 
            list: {
                listId, 
                listTitle,
                //movieList, 
                createdAt, 
                likeCount, 
                commentCount, 
                comments,
                userImage, 
                userHandle
            }, UI: {
                loading
            }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        )
        :
        (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>

                <Grid item sm={7}>
                    <Typography 
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                    >
                      @{userHandle}  
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography
                        variant="body2"
                        color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body1">
                            {listTitle}
                        </Typography>
                        <LikeButton listId={listId}/>
                        <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
                        <MyButton tip="comments">
                            <ChatIcon color='primary'/>
                        </MyButton>
                        <span>{commentCount} {commentCount===1 ? 'Comment':'Comments'}</span>
                </Grid>
                <hr className={classes.visibleSeparator}/>
                <CommentForm listId={listId}/>
                <Comments comments={comments}/>
            </Grid>

                        

        )

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="comments">
                    <ChatIcon  color="primary"/>
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
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }

}

ListDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    listId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    list: state.data.list,
    UI: state.UI
})

const mapActionsToProps = {
    getList,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ListDialog));