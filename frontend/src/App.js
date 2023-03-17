import logo from "./logo.svg";
import "./App.css";
import { Main } from "./components/Main";
import { useEffect, useState } from "react";
import { Form } from "./components/Form";

const error = {
     backgroundColor: "red",
     maxWidth: "fit-content",
     color: "white",
     margin: "0 auto",
};

function App() {
     const [isLogin, setIsLogin] = useState(false);
     const [errorMessage, setErrorMessage] = useState(false);
     const [list, setList] = useState([]);

     useEffect(() => {
          if (isLogin) {
               setTimeout(() => {
                    setIsLogin(false);
               }, 300000);
          }
     }, [isLogin]);

     useEffect(() => {
          if (errorMessage) {
               setTimeout(() => {
                    setErrorMessage(false);
               }, 3000);
          }
     }, [errorMessage]);

     const handleList = (data) => {
          if (data.updated) {
               // console.log("updated", data);
               setList(data.contacts);
          }

          if (data.loginUser) {
               setIsLogin(true);
               setList(data.loginUser.contacts);
               localStorage.setItem("token", data.token.token);
               localStorage.setItem("userid", data.loginUser._id);
               return;
          }
          if (data.newUser) {
               setIsLogin(true);
               setList(data.newUser.contacts);
               localStorage.setItem("token", data.token.token);
               localStorage.setItem("userid", data.newUser._id);
               return;
          }
          if (data.message) {
               setIsLogin(data.isLoggedIn);
               setErrorMessage(data.message);
               return;
          }
     };

     return (
          <div className="App">
               <div>
                    <h3>YellowClass Assignment</h3>
               </div>
               {errorMessage && <div style={error}>{errorMessage}</div>}
               {!isLogin && <Form type="signin" setList={handleList} />}
               {!isLogin && <Form type="signup" setList={handleList} />}

               {isLogin && <Main data={list} setList={handleList} />}
          </div>
     );
}

export default App;
