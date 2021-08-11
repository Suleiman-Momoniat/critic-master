const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbAuth");

const {db} = require("./util/admin");


const {
  getAllLists,
  postOneList,
  getList,
  commentOnList,
  likeList,
  unlikeList,
  deleteList,
}= require("./handlers/lists");

const {signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require("./handlers/users");

// List routes
app.get("/lists", getAllLists);
app.post("/list", FBAuth, postOneList);
app.get("/list/:listId", getList);

app.delete("/list/:listId", FBAuth, deleteList);

app.get("/list/:listId/like", FBAuth, likeList);
app.get("/list/:listId/unlike", FBAuth, unlikeList);

app.post("/list/:listId/comment", FBAuth, commentOnList );


// Users route
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);
app.post("/notifications", markNotificationsRead);


exports.api = functions.region("us-central1").https.onRequest(app);

exports.createNotificationOnLike = functions
    .region("us-central1")
    .firestore.document("likes/{id}")
    .onCreate((snapshot) => {
      return db
          .doc(`/lists/${snapshot.data().listId}`)
          .get()
          .then((doc) => {
            if (
              doc.exists&&
              doc.data().userHandle !== snapshot.data().userHandle
            ) {
              return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: "like",
                read: false,
                listId: doc.id,
              });
            }
          })
          .catch((err) => console.error(err));
    });
exports.deleteNotificationOnUnLike = functions
    .region("us-central1")
    .firestore.document("likes/{id}")
    .onDelete((snapshot) => {
      return db
          .doc(`/notifications/${snapshot.id}`)
          .delete()
          .catch((err) => {
            console.error(err);
            return;
          });
    });
exports.createNotificationOnComment = functions
    .region("us-central1")
    .firestore.document("comments/{id}")
    .onCreate((snapshot) => {
      return db
          .doc(`/lists/${snapshot.data().listId}`)
          .get()
          .then((doc) => {
            if (
              doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
            ) {
              return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: "comment",
                read: false,
                listId: doc.id,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            return;
          });
    });

exports.onUserImageChange = functions
    .region("us-central1")
    .firestore.document("/users/{userId}")
    .onUpdate((change) => {
      if (change.before.data().imageUrl !== change.after.data().imageUrl) {
        const batch = db.batch();
        return db
            .collection("lists")
            .where("userHandle", "==", change.before.data().handle)
            .get()
            .then((data) => {
              data.forEach((doc) => {
                const list = db.doc(`/lists/${doc.id}`);
                batch.update(list, {userImage: change.after.data().imageUrl});
              });
              return batch.commit();
            });
      } else return true;
    });

exports.onlistDelete = functions
    .region("us-central1")
    .firestore.document("/lists/{listId}")
    .onDelete((snapshot, context) => {
      const listId = context.params.listId;
      const batch = db.batch();
      return db
          .collection("comments")
          .where("listId", "==", listId)
          .get()
          .then((data) => {
            data.forEach((doc) => {
              batch.delete(db.doc(`/comments/${doc.id}`));
            });
            return db
                .collection("likes")
                .where("listId", "==", listId)
                .get();
          })
          .then((data) => {
            data.forEach((doc) => {
              batch.delete(db.doc(`/likes/${doc.id}`));
            });
            return db
                .collection("notifications")
                .where("listId", "==", listId)
                .get();
          })
          .then((data) => {
            data.forEach((doc) => {
              batch.delete(db.doc(`/notifications/${doc.id}`));
            });
            return batch.commit();
          })
          .catch((err) => console.error(err));
    });
