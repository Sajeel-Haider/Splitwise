import { Routes, Route } from "react-router";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Signup } from "./components/Auth/SignUp/Signup";
import { UserDashboard } from "./components/Dashboard/UserDashboard";
import { PrivateRoute } from "./PrivateRoute";
import Login from "./components/Auth/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path=":id" element={<UserDashboard />}></Route>
        </Route>
        <Route path="/" element={<Header />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
