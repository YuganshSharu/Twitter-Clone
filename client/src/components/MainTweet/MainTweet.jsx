import React, { useRef, useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ImageIcon from "@mui/icons-material/Image";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const imageFileInput = useRef(null);
  const [img, setImg] = useState(null);
  const [imgUploadProgess, setImgUploadProgess] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  const [hashtags, setHashtags] = useState([]);

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgess(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log("error", error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadedURL) => setDownloadURL(downloadedURL)
        );
      }
    );
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsAddOpen(!isAddOpen);
    console.log("toggleDropdown", isAddOpen);
  };
  const handleSubmit = async (e) => {
    try {
      const post = await axios.post("/api/tweet", {
        userId: currentUser._id,
        description: tweetText,
        ...(downloadURL && { imageUrl: downloadURL }),
      });
      // console.log("post", post);
      // console.log("download", downloadURL);
      // window.location.reload(false);
      hashtags.map(async (hashtag) => {
        await axios.post("/api/trends", {
          name: hashtag,
          tweets: [post.data._id],
        });
        // console.log("trend", trend);
      });
      // console.log("hastags", hashtags);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    const fileUpload = e.target.files[0];
    setImg(fileUpload);
    setIsAddOpen(false);
    uploadImg(fileUpload);
    console.log("file Uploaded", fileUpload);
    console.log("download URL", downloadURL);
  };
  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => {
            const text = e.target.value;
            setTweetText(text);

            const hashtagPattern = /#\w+/g;
            const foundHashtags = text.match(hashtagPattern) || [];
            setHashtags(foundHashtags);
          }}
          type="text"
          placeholder="what's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <div className="flex justify-start mt-1">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-full"
          >
            Tweet
          </button>
          <div className="relative">
            <button
              type="button"
              className="text-blue-500 mx-2 text-lg"
              id="options-menu"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={toggleDropdown}
            >
              <AddCircleIcon sx={{ fontSize: 40 }} />
            </button>
            {isAddOpen && (
              <div
                className="origin-top-right absolute left-2 mt-1 rounded-full shadow-lg bg-white ring-2 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-2 px-1" role="none">
                  <input
                    type="file"
                    onChange={handleChange}
                    ref={imageFileInput}
                    accept="image/*"
                    style={{ display: "none" }} // Make the file input element invisible
                  />
                  <button
                    className="block px-1 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      imageFileInput.current.click();
                    }}
                  >
                    <ImageIcon />
                  </button>
                </div>
              </div>
            )}
            {img &&
              (imgUploadProgess > 0 && imgUploadProgess < 100
                ? "Uploading " + imgUploadProgess + "%"
                : img.name)}
          </div>
        </div>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;
