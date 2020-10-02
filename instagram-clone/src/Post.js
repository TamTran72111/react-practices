import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "./firebase";
import "./Post.css";

const Post = ({ postId, user, username, caption, imageUrl }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  useEffect(() => {
    if (postId) {
      const unsubcribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
      return () => {
        unsubcribe();
      };
    }
  }, [postId]);
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src="/static/image/1.png"
          alt={username?.toUpperCase()}
        />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="post" />
      <p className="post__text">
        <strong>{username}</strong> {caption}
      </p>
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.comment}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentForm">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
