const UserService = require("../service/auth.service");
const UserServiceInstance = new UserService();
const addNewContact = async (req, res) => {
     try {
          const id = req.params.userId;
          let findNumber = await UserServiceInstance.isNumberTaken({ id, contact: req.body.contact });
          //return false if findNumber exists
          if (!findNumber) {
               return res.json({ message: "Number Already Exists" });
          }
          const newUser = await UserServiceInstance.pushDataIntoArray({ id, body: req.body });
          res.json(newUser);
     } catch (e) {
          // console.log(e);
          res.json(e);
     }
};

const updateContact = async (req, res) => {
     try {
          const id = req.params.userId;
          const updateUser = await UserServiceInstance.updateDataIntoArray({ id, body: req.body });
          res.json(updateUser);
     } catch (error) {
          res.json(error);
     }
};

const deleteContact = async (req, res) => {
     try {
          const id = req.params.userId;
          const deleteContactList = await UserServiceInstance.deleteDataIntoArray({ id, body: req.body });
          // console.log("delete Conattact", deleteContactList);
          res.json(deleteContactList);
     } catch (error) {
          res.json(error);
     }
};

module.exports = { addNewContact, updateContact, deleteContact };
