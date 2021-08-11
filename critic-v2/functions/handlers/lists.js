const {db} = require("../util/admin");

exports.getAllLists = (req, res)=>{
  db
      .collection("lists")
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        const lists = [];
        data.forEach((doc) => {
          lists.push({
            listId: doc.id,
            movieList: doc.data().movieList,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
            commentCount: doc.data().commentCount,
            likeCount: doc.data().likeCount,
            type: doc.data().type,
            userImage: doc.data().userImage,
          });
        });
        return res.json(lists);
      })
      .catch((e) => console.log(e));
};

exports.postOneList = (req, res)=>{
  // ADDED ON OWN
  if (req.body.movieList === {}) {
    return res.status(400).json({error: "Must not be empty"});
  }

  const newList = {
    movieList: req.body.movieList,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
    type: "movie",
  };
  db
      .collection("lists")
      .add(newList)
      .then((doc)=>{
        const resList = newList;
        resList.listId = doc.id;
        res.json(resList);
      })
      .catch((e)=>{
        res.status(500).json({error: "Something went wrong"});
        console.log(e);
      });
};

// Fetch one list
exports.getList = (req, res) =>{
  let listData;
  db.doc(`/lists/${req.params.listId}`).get()
      .then((doc)=>{
        if (!doc.exists) {
          return res.status(404).json({error: "List not found"});
        }
        listData = doc.data();
        listData.listId = doc.id;
        return db
            .collection("comments")
            .orderBy("createdAt", "desc")
            .where("listId", "==", req.params.listId)
            .get();
      })
      .then((data) =>{
        listData.comments = [];
        data.forEach((doc) =>{
          listData.comments.push(doc.data());
        });
        return res.json(listData);
      })
      .catch((err) =>{
        console.error(err);
        res.status(500).json({error: err.code});
      });
};

// comment on a list
exports.commentOnList = (req, res)=>{
  if (req.body.body.trim() === "") {
    return res.status(400).json({comment: "Must not be empty"});
  }
  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    listId: req.params.listId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
  };

  db.doc(`/lists/${req.params.listId}`).get()
      .then((doc)=>{
        if (!doc.exists) {
          return res.status(400).json({error: "List not found"});
        }
        return doc.ref.update({commentCount: doc.data().commentCount + 1});
      })
      .then(()=>{
        return db.collection("comments").add(newComment);
      })
      .then(()=>{
        res.json(newComment);
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).json({error: "Something went wrong"});
      });
};

// Like a list
exports.likeList = (req, res)=>{
  const likeDocument = db.collection("likes")
      .where("userHandle", "==", req.user.handle)
      .where("listId", "==", req.params.listId)
      .limit(1);
  const listDocument = db.doc(`/lists/${req.params.listId}`);

  let listData = {};

  listDocument.get()
      .then((doc) =>{
        if (doc.exists) {
          listData = doc.data();
          listData.listId = doc.id;
          return likeDocument.get();
        } else {
          return res.status(404).json({error: "List not found"});
        }
      })
      .then((data) =>{
        if (data.empty) {
          return db.collection("likes").add({
            listId: req.params.listId,
            userHandle: req.user.handle,
          })
              .then(()=>{
                listData.likeCount++;
                return listDocument.update({likeCount: listData.likeCount});
              })
              .then(()=>{
                return res.json(listData);
              });
        } else {
          return res.status(400).json({error: "List already liked"});
        }
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).json({error: err.code});
      });
};

// unlike a list
exports.unlikeList = (req, res) =>{
  const likeDocument = db.collection("likes")
      .where("userHandle", "==", req.user.handle)
      .where("listId", "==", req.params.listId)
      .limit(1);
  const listDocument = db.doc(`/lists/${req.params.listId}`);

  let listData = {};

  listDocument.get()
      .then((doc) =>{
        if (doc.exists) {
          listData = doc.data();
          listData.listId = doc.id;
          return likeDocument.get();
        } else {
          return res.status(404).json({error: "List not found"});
        }
      })
      .then((data) =>{
        if (data.empty) {
          return res.status(400).json({error: "List not liked"});
        } else {
          return db.doc(`/likes/${data.docs[0].id}`).delete()
              .then(()=>{
                listData.likeCount--;
                return listDocument.update({likeCount: listData.likeCount});
              })
              .then(()=>{
                return res.json(listData);
              });
        }
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).json({error: err.code});
      });
};

// delete a list
exports.deleteList = (req, res) =>{
  const document = db.doc(`/lists/${req.params.listId}`);
  document.get()
      .then((doc) =>{
        if (!doc.exists) {
          return res.status(404).json({error: "List not found"});
        }
        if (doc.data().userHandle !== req.user.handle) {
          return res.status(403).json({error: "Unauthorized"});
        } else {
          return document.delete();
        }
      })
      .then(()=>{
        res.json({message: "List deleted successfully"});
      })
      .catch((err)=>{
        console.error(err);
        return res.status(500).json({error: err.code});
      });
};
