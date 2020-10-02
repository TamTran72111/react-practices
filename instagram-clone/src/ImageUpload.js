import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import firebase from "firebase";
import { db, storage } from "./firebase";
import "./ImageUpload.css";

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        // complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((imageUrl) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption,
              imageUrl,
              username,
            });
            setImage(null);
            setCaption("");
            setProgress(0);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <Input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
