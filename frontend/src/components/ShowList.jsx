import React, { useState } from "react";
import { deleteContact, updateContact } from "../api";
import "./ShowList.css";

const List = (props) => {
     const [editName, seteditName] = useState("");
     const [editContact, seteditContact] = useState("");
     const [editId, setEditId] = useState(false);

     const handleDelete = async (e) => {
          const contactId = e.target.id;
          const deletedData = await deleteContact({ contactId });
          props.setList({ updated: true, contacts: deletedData.contacts });
     };

     const handleUpdate = async (e) => {
          const data = { contactId: e.target.id, name: editName, contact: editContact };
          const updatedContact = await updateContact(data);
          props.setList({ updated: true, contacts: updatedContact.contacts });
          setEditId(false);
     };
     return (
          <>
               {!editId && (
                    <div className="heading">
                         <p>{props.index + 1}</p>
                         <p>{props.name}</p>
                         <p>{props.contact}</p>
                         <p>
                              <button
                                   id={props._id}
                                   onClick={(e) => {
                                        setEditId(e.target.id);
                                        seteditName(props.name);
                                        seteditContact(props.contact);
                                   }}
                              >
                                   Edit
                              </button>
                              <button id={props._id} onClick={handleDelete}>
                                   Delete
                              </button>
                         </p>
                    </div>
               )}
               {editId === props._id && (
                    <div className="heading">
                         <p>{props.index + 1}</p>
                         <p>
                              <input
                                   value={editName}
                                   onChange={(e) => {
                                        seteditName(e.target.value);
                                   }}
                              />
                         </p>
                         <p>
                              <input
                                   value={editContact}
                                   onChange={(e) => {
                                        seteditContact(e.target.value);
                                   }}
                              />
                         </p>
                         <p>
                              <button id={props._id} onClick={handleUpdate}>
                                   Update
                              </button>
                              <button
                                   id={props._id}
                                   onClick={() => {
                                        setEditId(false);
                                   }}
                              >
                                   Cancel
                              </button>
                         </p>
                    </div>
               )}
          </>
     );
};

const ShowList = (props) => {
     return (
          <div>
               <div className="heading">
                    <h5>S.No</h5>
                    <h5>Name</h5>
                    <h5>Contact</h5>
                    <h5>Actions</h5>
               </div>
               {props.data.map((value, index) => (
                    <List setList={props.setList} {...value} index={index} key={value._id} />
               ))}
          </div>
     );
};

export default ShowList;
