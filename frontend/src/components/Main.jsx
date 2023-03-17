import React from "react";
import ShowList from "../components/ShowList";
import AddContactList from "../components/AddContactList";

export const Main = (props) => {
     return (
          <>
               <div>
                    <AddContactList setList={props.setList} />
                    <ShowList data={props.data} setList={props.setList} />
               </div>
          </>
     );
};
