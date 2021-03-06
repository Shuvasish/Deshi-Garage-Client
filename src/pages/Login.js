import React, { useContext, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../App";
import { useHistory, useLocation } from "react-router-dom";
//scroll top
import ScrollTop from "../components/ScrollTop";

//firebase
import firebase from "firebase/app";
import "firebase/auth";
import FirebaseConfig from "../components/Firebase/Firebase.Config";

//animation
import { motion } from "framer-motion";
import { pageAnimation, slider, fade, sliderContainer } from "../animation";

// Initialize Firebase
firebase.initializeApp(FirebaseConfig);

function Login(props) {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  //this.state
  const [loginInfo, setLoginInfo] = useState({
    successMessage: "",
    failureMessage: "",
  });

  //firebase provider
  const provider = new firebase.auth.GoogleAuthProvider();

  const login = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const { displayName, photoURL, email } = user;
        setLoginInfo({
          successMessage: "Successfully Logged In.",
          failureMessage: "",
        });
        setUser({
          displayName,
          photoURL,
          email,
        });
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setLoginInfo({ failureMessage: errorMessage });
      });
  };
  const loginAsAdmin = () => {
    setUser({
      displayName: "Super Admin",
      photoURL:
        "https://cdn.pixabay.com/photo/2018/12/23/09/54/mario-3890808__340.jpg",
      email: "admin@deshi.com",
    });
    history.replace(from);
  };
  const loginAsUser = () => {
    setUser({
      displayName: "Super User",
      photoURL:
        "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
      email: "user@deshi.com",
    });
    history.replace(from);
  };

  return (
    <StyledLogin
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ background: "#fff" }}
    >
      <motion.div variants={sliderContainer}>
        <Frame1 variants={slider}></Frame1>
        <Frame2 variants={slider}></Frame2>
        <Frame3 variants={slider}></Frame3>
        <Frame4 variants={slider}></Frame4>
      </motion.div>
      <motion.button variants={fade} onClick={login}>
        Sign In With Google
      </motion.button>
      <p className="fail">{loginInfo.failureMessage}</p>
      <motion.h2 variants={fade} className="text-secondary">
        OR
      </motion.h2>
      <motion.button className="guest" variants={fade} onClick={loginAsAdmin}>
        ByPass as Admin
      </motion.button>
      <motion.button className="guest" variants={fade} onClick={loginAsUser}>
        ByPass as User
      </motion.button>
      <ScrollTop />
    </StyledLogin>
  );
}

const StyledLogin = styled(motion.div)`
  min-height: 91vh;
  padding: 6rem 12rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  button {
    padding: 1.5rem 3rem;
    font-size: 2rem;
    width: 25rem;
    display: block;
    border: none;
    background: var(--secondary);
    color: var(--text-white);
    border: 3px solid var(--primary);
    /* text-transform: uppercase; */
    transition: all 0.5s ease-out;
    &:hover {
      background: var(--primary);
    }
  }
  .guest {
    background: white;
    color: var(--secondary);
    width: 25rem;
    margin-top: 1rem;
  }
  .fail {
    color: #ff3333;
  }
  @media (max-width: 500px) {
    padding: 2rem 2rem;
    button {
      font-size: 1.4rem;
    }
  }
`;
//FRAME ANIMATION
const Frame1 = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 10%;
  width: 100%;
  height: 100vh;
  background: #fffebf;
  z-index: 2;
`;
const Frame2 = styled(Frame1)`
  background: #ff8efb;
`;
const Frame3 = styled(Frame1)`
  background: #8ed2ff;
`;
const Frame4 = styled(Frame1)`
  background: #8effa0;
`;
export default Login;
