import React from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css";

const Auth = () => {
  const navigate = useNavigate();
  // const { isAuth } = useGetUserInfo();
  // signin Function
  const SignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
    // console.log(result);
  };
  // if (isAuth) {
  //   return <Navigate to="/expense-tracker" />;
  // }
  return (
    <div className="login-page">
      <p>Expense Tracker App</p> <br />
      {/* <p>SignIn With Google to Continue</p> */}
      <button className="login-with-google-btn" onClick={SignInWithGoogle}>
        SignIn with Google
      </button>
    </div>
  );
};

export default Auth;
