import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setAuthUser } from "../../../store/slices/authUser-slice";
import { db } from "../../../Firebase-config";
import { auth, provider } from "../../../Firebase-config";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userCollectionRef = collection(db, "users");
const authCred = {
  u_id: "",
  name: "",
  email: "",
};
const notifyCred = () => toast("User not found (Invalid email or Password)");

export const loginWithGoogleFunctionality = (
  setloading,
  dispatch,
  navigate
) => {
  signInWithPopup(auth, provider).then(async (data) => {
    const usersQuery = query(
      userCollectionRef,
      where("email", "==", data.user.email)
    );
    setloading(true);

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
    console.log(authCred);
    dispatch(setAuthUser(authCred));
    navigate(`/dashboard/${data.user.uid}`);
    setloading(false);
  });
};

export const loginWithLocalCredFunctionality = async (
  email,
  password,
  setloading,
  dispatch,
  navigate
) => {
  const usersQuery = query(
    userCollectionRef,
    where("email", "==", email),
    where("password", "==", password)
  );
  setloading(true);

  const querySnapshot = await getDocs(usersQuery);
  if (!querySnapshot.empty) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        authCred.u_id = userCredentials.user.uid;
        authCred.email = userCredentials.user.email;
        authCred.name = userCredentials.user.displayName;
        console.log(authCred);
        dispatch(setAuthUser(authCred));
        navigate(`/dashboard/${userCredentials.user.uid}`);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    notifyCred();
  }
  setloading(false);
};
