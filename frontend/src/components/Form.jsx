import React, { useState } from "react";
import { signin, signup } from "../api";
const input = { marginRight: "10px" };
export const Form = (props) => {
     const [email, setemail] = useState("");
     const [password, setpassword] = useState("");
     const [name, setname] = useState("");

     const handleForm = () => {
          const signinapi = async (data) => {
               const result = await signin(data);
               props.setList(result);
          };
          const signupapi = async (data) => {
               const result = await signup(data);
               props.setList(result);
          };
          if (props.type === "signin") {
               signinapi({ email, password });
          } else {
               signupapi({ email, password, name });
          }
          setpassword("");
          setemail("");
          setname("");
     };

     return (
          <div>
               <h2>{props.type}</h2>

               {props.type === "signup" && (
                    <input
                         style={input}
                         type={"text"}
                         name="name"
                         value={name}
                         onChange={(e) => {
                              setname(e.target.value);
                         }}
                         required
                         placeholder="name"
                    />
               )}
               <input
                    style={input}
                    type={"email"}
                    name="email"
                    value={email}
                    onChange={(e) => {
                         setemail(e.target.value);
                    }}
                    required
                    placeholder="email"
               />
               <input
                    style={input}
                    type={"password"}
                    name="contact"
                    value={password}
                    onChange={(e) => {
                         setpassword(e.target.value);
                    }}
                    required
                    placeholder="password"
               />

               <button onClick={handleForm}>{props.type}</button>
          </div>
     );
};
