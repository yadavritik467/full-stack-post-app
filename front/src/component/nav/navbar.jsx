import React, { useState } from "react";
import Login from "./login";
import Sign from "./sign";
import { useAuth } from "../../context/auth";
const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [login, setLogin] = useState(false);
  const [sign, setSign] = useState(false);

  const logout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("userID");
    alert("Logout Successfully");
  };
  return (
    <div
    className="nav"
      style={{
        
      }}
    >
      {}
      {auth.token === "" ? (
        <>
          <Login
            login={login}
            setLogin={setLogin}
            sign={sign}
            setSign={setSign}
          />
          <Sign
            login={login}
            setLogin={setLogin}
            sign={sign}
            setSign={setSign}
          />
        </>
      ) : (
        <>
          <button onClick={logout} style={{width:"fit-content"}}>logout</button> <br /> {" "}
          <p> name : <b>{auth.user.name}</b></p>
        </>
      )}
    </div>
  );
};

export default Navbar;
