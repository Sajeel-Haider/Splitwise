import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, provider } from "../../../Firebase-config";
import { db } from "../../../Firebase-config";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

import { setAuthUser } from "../../../store/slices/authUser-slice";
import "react-toastify/dist/ReactToastify.css";

const authCred = {
  u_id: "",
  name: "",
  email: "",
};
const userCollectionRef = collection(db, "users");
const notifySignup = () => toast("User already exists login to continue");
const notifyPassLen = () =>
  toast("Password length must be of 8 characters atleast");
const notifyEmailTag = () => toast("Email tag missing");
export const signupWithGoogleFunctionality = async (
  setloading,
  dispatch,
  navigate
) => {
  setloading(true);
  signInWithPopup(auth, provider).then(async (data) => {
    const usersQuery = query(
      userCollectionRef,
      where("email", "==", data.user.email)
    );

    const querySnapshot = await getDocs(usersQuery);

    if (querySnapshot.empty) {
      await addDoc(userCollectionRef, {
        u_id: data.user.uid,
        name: data.user.displayName,
        email: data.user.email,
        password: "",
      });
    }
    authCred.u_id = data.user.uid;
    authCred.email = data.user.email;
    authCred.name = data.user.displayName;
    dispatch(setAuthUser(authCred));
    setloading(false);
    navigate(`/dashboard/${data.user.uid}`);
  });
};
export const signupWithLocalCredFunctionality = async (
  setloading,
  dispatch,
  navigate,
  email,
  name,
  password
) => {
  setloading(true);

  if (!email.includes("@")) {
    notifyEmailTag();
    return;
  }

  if (password.length < 8) {
    notifyPassLen();
    return;
  }

  const usersQuery = query(userCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(usersQuery);

  if (querySnapshot.empty) {
    createUserWithEmailAndPassword(auth, email, password, name)
      .then(async (userCredentials) => {
        await updateProfile(userCredentials.user, {
          displayName: name,
        });

        await addDoc(userCollectionRef, {
          u_id: userCredentials.user.uid,
          name: name,
          email: userCredentials.user.email,
          password: password,
        });
        console.log(userCredentials);
        authCred.u_id = userCredentials.user.uid;
        authCred.email = userCredentials.user.email;
        authCred.name = userCredentials.user.displayName;

        dispatch(setAuthUser(authCred));
        navigate(`/dashboard/${userCredentials.user.uid}`);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    notifySignup();
  }
  setloading(false);
};
