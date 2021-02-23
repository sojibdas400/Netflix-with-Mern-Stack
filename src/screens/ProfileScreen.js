import React from "react";
import { useSelector } from "react-redux";
import { selectUser, userSlice } from "../features/userSlice";
import { auth } from "../firebase";
import Nav from "../Nav";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <Nav />
      <div class="profileScreen__body">
        <h1>Edit Profile</h1>
        <div class="profileScreen__info">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt=""
          />

          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div class="profileScreen__plans">
              <button
                onClick={() => auth.signOut()}
                class="profileScreen__signout"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
