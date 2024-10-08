import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../../redux/userSlice";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [img, setImg] = useState(null);
  const [imgUploadProgess, setImgUploadProgess] = useState(null);

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
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const updatedProfile = await axios.put(
              `/api/users/${currentUser._id}`,
              {
                profilePicture: downloadURL,
              }
            );
            dispatch(changeProfile(downloadURL));
          } catch (error) {
            console.log("error", error);
          }
        });
      }
    );
  };

  const handleDelete = async () => {
    if (currentUser && currentUser._id) {
      // console.log("user", currentUser);
      const deleteUser = await axios.delete(`/api/users/${currentUser._id}`);
      // console.log("delete user", deleteUser);
    }
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-slate-800/50 flex items-center justify-center">
      <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button
          className="absolute top-2 right-3 cursor-pointer font-bold"
          onClick={() => setOpen(false)}
        >
          X
        </button>
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <p>Choose a new profile picture</p>
        {imgUploadProgess > 0 ? (
          "Uploading " + imgUploadProgess + "%"
        ) : (
          <input
            type="file"
            className="bg-transparent border-slate-500 rounded p-2"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <p>Delete Account</p>
        <button
          className="bg-red-500 text-white py-2 rounded-full"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
