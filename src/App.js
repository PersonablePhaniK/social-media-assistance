import React, { useState } from "react";

import axios from "axios";

import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${message}`);

    axios
      .post(`https://graph.facebook.com/${process.env.REACT_APP_PAGE_ID}/feed?`, {
        message: message,
        access_token: process.env.REACT_APP_ACCESS_TOKEN
      })
      .then(
        (res) => {
          const result = res.data;
          console.log("Results: ", result);
          alert("Success!");
        },
        (error) => {
          console.log(error);
          console.log('Failed to publish the post');
        }
      );
  };

  const onChangeHandle = (e) =>{
    

    let files = e.target.files;

    let fileReader = new FileReader();
    const file = files[0];

    fileReader.onload= async (e)=>{
      const photoData = new Blob([fileReader.result],{type: 'image/jpg'});
      const formData = new FormData();

      formData.append('access_token', process.env.REACT_APP_ACCESS_TOKEN);
      formData.append('source', photoData);
      formData.append('message', 'Image uploaded');

      let response = await fetch(`https://graph.facebook.com/${process.env.REACT_APP_PAGE_ID}/photos`,{
        body: formData,
        method: 'post'
      });
      response = await response.json();
      console.log(response);


      console.warn('image data', e.target.result)
    }

    fileReader.readAsArrayBuffer(file);



  }

  return (
    <>
      <div className="container">
        <h2>Facebook Post</h2>
        <p>Submit a Post on your facebook page:</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Post:</label>
            <textarea
              className="form-control"
              rows="5"
              id="comment"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>

      <div  className="container">
        <h1>Image Upload</h1>
        <input type="file" name="file" onChange={e => onChangeHandle(e)} />
      </div>
    </>
  );
};

export default App;
