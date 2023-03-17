const backendApi = "https://yellowclass-production.up.railway.app";

const authApi = async (data, type) => {
     const url = `${backendApi}/v1/auth/${type}`;
     let body = { ...data };
     const response = await fetch(url, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          withCredentials: true,
     });
     const result = await response.json();
     //  console.log("authapi", result);
     return result;
};

const newContact = async (data) => {
     const token = localStorage.getItem("token");
     const url = `${backendApi}/v1/contact/add/${localStorage.getItem("userid")}`;
     const response = await fetch(url, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
               Authorization: token,
          },
          body: JSON.stringify(data),
     });
     const result = await response.json();

     return result;
};

const deleteCont = async (data) => {
     const token = localStorage.getItem("token");
     const url = `${backendApi}/v1/contact/delete/${localStorage.getItem("userid")}`;
     const response = await fetch(url, {
          method: "DELETE",
          headers: {
               "Content-Type": "application/json",
               Authorization: token,
          },
          body: JSON.stringify(data),
     });
     const result = await response.json();
     return result;
};

const updateCont = async (data) => {
     const token = localStorage.getItem("token");
     const url = `${backendApi}/v1/contact/update/${localStorage.getItem("userid")}`;
     const response = await fetch(url, {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json",
               Authorization: token,
          },
          body: JSON.stringify(data),
     });
     const result = await response.json();
     return result;
};

export const signin = async (data) => {
     const signindata = await authApi(data, "signin");
     return signindata;
};
export const signup = async (data) => {
     const signupdata = await authApi(data, "signup");
     return signupdata;
};

export const addContact = async (data) => {
     const addUserContact = await newContact(data);
     return addUserContact;
};

export const deleteContact = async (data) => {
     const deleteUserContact = await deleteCont(data);
     return deleteUserContact;
};

export const updateContact = async (data) => {
     const deleteUserContact = await updateCont(data);
     return deleteUserContact;
};
