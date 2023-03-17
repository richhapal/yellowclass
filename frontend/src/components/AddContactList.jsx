import React, { useEffect, useState } from "react";
import { addContact } from "../api";
const input = { marginRight: "10px" };

const error = {
     backgroundColor: "red",
     maxWidth: "fit-content",
     color: "white",
     margin: "0 auto",
};

const AddContactList = (props) => {
     const [name, setname] = useState("");
     const [contact, setcontact] = useState("");
     const [errorMessage, setErrorMessage] = useState(false);

     const handleAddNewContact = async () => {
          if (name && contact) {
               const newContact = await addContact({ name, contact: Number(contact) });
               // console.log("newContact", newContact);
               if (!newContact.message) {
                    props.setList({ updated: true, contacts: newContact.contacts });
                    setcontact("");
                    setname("");
               } else {
                    setErrorMessage(newContact.message);
               }
          }
     };

     useEffect(() => {
          if (errorMessage) {
               setTimeout(() => {
                    setErrorMessage(false);
               }, 3000);
          }
     }, [errorMessage]);

     return (
          <div>
               {errorMessage && <div style={error}>{errorMessage}</div>}
               <h5>Add New Contact</h5>
               <input
                    style={input}
                    value={name}
                    onChange={(e) => {
                         setname(e.target.value);
                    }}
                    type={"text"}
                    name="name"
                    required
                    placeholder="name"
               />
               <input
                    style={input}
                    type={"number"}
                    value={contact}
                    onChange={(e) => {
                         setcontact(e.target.value);
                    }}
                    minLength="10"
                    maxLength="10"
                    name="contact"
                    required
                    placeholder="contact"
               />
               <button onClick={handleAddNewContact}>Add Contact</button>
          </div>
     );
};

export default AddContactList;
