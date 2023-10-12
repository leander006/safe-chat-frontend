import React, { useCallback, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../utils/service";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GetUser } from "../context/UserProvider";

function Setting() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [profile, setProfile] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [password, setPassword] = useState("");
  const { config, user, setUser } = GetUser();
  const navigate = useNavigate();

  const previewFile = useCallback((file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }, []);
  const handleFileInputChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      previewFile(file);
      setSelectedImg(file);
      setFileInputState(e.target.value);
    },
    [selectedImg]
  );

  const handleImage = useCallback((e) => {
    e.preventDefault();
    if (!selectedImg) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };

    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  }, []);

  const uploadImage = useCallback(async (base64EncodedImage) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/user/upload`,
        { data: base64EncodedImage },
        config
      );
      console.log("data", data);
      setFileInputState("");
      setPreviewSource("");
      setProfile(data);
      setLoading(false);
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/user/update/` + user._id,
        {
          username: username,
          bio: bio,
          profile: profile,
          password: password,
        },
        config
      );
      toast.success("Updated your user profile");
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
    } catch (error) {
      if (error?.response) {
      }
      console.log(error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex pt-9">
        <div className="flex flex-col md:m-auto w-screen h-[calc(100vh-2.3rem)] md:pt-16 lg:w-[60%] md:w-[75%] md:h-[calc(100vh-2.7rem)] overflow-y-scroll">
          <div className="flex justify-between p-4 ">
            <div className="flex items-center space-x-5">
              <i
                className="fa-solid fa-2xl fa-xmark cursor-pointer text-white"
                onClick={() => navigate("/")}
              ></i>
              <h1 className="font-bold text-xl text-white">Edit profile</h1>
            </div>
            <div>
              <i
                className="fa-solid fa-2xl cursor-pointer fa-check text-[#8aaaeb]"
                onClick={handleSubmit}
              ></i>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            {!loading ? (
              <img
                className="image h-16 w-16 rounded-full "
                src={
                  previewSource
                    ? previewSource
                    : profile?.url
                    ? profile?.url
                    : user?.profile?.url
                }
                alt="edit"
              />
            ) : (
              <SpinnerCircular
                size="90"
                className=" w-full flex items-center  md:h-56 h-28  flex-col  mx-auto"
                thickness="100"
                speed="600"
                color="white"
                secondaryColor="black"
              />
            )}

            {!selectedImg && (
              <label
                className="text-[#8aaaeb] cursor-pointer hover:text-[#6795f1]"
                htmlFor="forFile"
              >
                Change Profile
              </label>
            )}
            <input
              type="file"
              id="forFile"
              accept="image/png , image/jpg, image/jpeg"
              style={{ display: "none" }}
              value={fileInputState}
              onChange={handleFileInputChange}
              name="file"
              required
            />
          </div>
          {selectedImg && !profile && (
            <div className="flex justify-center">
              <h1
                className="bg-blue-600 active:bg-blue-400 cursor-pointer mt-2 text-white p-1 rounded"
                onClick={handleImage}
              >
                Upload image
              </h1>
            </div>
          )}
          <div className="bottom">
            <div className="p-2">
              <h1 className="text-[#8aaaeb] ">Username</h1>
              <input
                className="text-white bg-[#4229cb]  border-b w-full mt-2 outline-none"
                placeholder={user?.username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              ></input>
            </div>

            <div className="p-2">
              <h1 className="text-white ">Password</h1>
              <input
                className="text-white bg-[#4229cb] ] border-b w-full mt-2 outline-none"
                placeholder={"*****"}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
              ></input>
            </div>

            <div className="p-2">
              <h1 className="text-white ">Bio</h1>
              <textarea
                className="border-b w-full text-white bg-[#4229cb] mt-2 outline-none"
                placeholder={user?.bio}
                onChange={(e) => setBio(e.target.value)}
                type="text"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
