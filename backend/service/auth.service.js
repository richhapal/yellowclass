const { UserModel } = require("../models/user.models");
const bcrypt = require("bcrypt");
class UserService {
     findUserById = async (id) => {
          const userRegistered = await UserModel.findOne({ _id: id });
          return userRegistered;
     };

     isEmailAlreadyRegistered = async (email) => {
          const userRegistered = await UserModel.findOne({ email });
          return userRegistered == null ? false : userRegistered;
     };

     save = async function (doc) {
          const result = await doc.save();
          return result;
     };

     createUser = async (data) => {
          const isEmailRegistered = await this.isEmailAlreadyRegistered(data.email);
          // if isEmailRegistered is false then we can say user is not created yet

          // console.log("isEmail", isEmailRegistered);
          if (!isEmailRegistered) {
               const hashpassword = await bcrypt.hash(data.password, 10);
               const user = new UserModel({ ...data, password: hashpassword });
               const newUser = await this.save(user);
               return newUser;
          } else {
               return { message: "User is Already Registered with Email" };
          }
     };

     login = async (data) => {
          let findUser = await this.isEmailAlreadyRegistered(data.email);
          if (findUser) {
               let comparePassword = await bcrypt.compare(data.password, findUser.password);
               let result = comparePassword ? findUser : { message: "Invalid Password" };
               return result;
          } else {
               return { message: "User Not Found" };
          }
     };

     isNumberTaken = async function (data) {
          let findContact = await this.findUserById(data.id);
          let findNumber = findContact.contacts.find((value) => value.contact === data.contact);
          // console.log("number", findNumber);
          return findNumber ? false : true;
     };

     pushDataIntoArray = async (data) => {
          let updateContact = await UserModel.findOneAndUpdate({ _id: data.id }, { $addToSet: { contacts: data.body } }, { new: true });
          return updateContact;
     };
     updateDataIntoArray = async (data) => {
          // console.log("udate", data);
          let updateContact = await UserModel.findOne({
               _id: data.id,
               contacts: {
                    $elemMatch: {
                         _id: data.body.contactId,
                    },
               },
          });

          // console.log("updateContact", updateContact);

          // let updates = await UserModel.updateOne(
          //      { $and: [{ _id: data.id }, { contacts: { $elemMatch: { _id: data.body.id } } }] },
          //      { $set: { "contacts.$": data.body } },
          //      { new: true }
          // );

          // console.log(updates);
          // return updates;

          // console.log("find", await UserModel.findOne({ contacts: { $elemMatch: { _id: data.body.id } } }));

          let { contactId, contact, name } = data.body;
          let userContact = await this.findUserById(data.id);
          // console.log("userContact", userContact);
          userContact.contacts.map((value) => {
               if (value._id.toString() === contactId) {
                    contact ? (value.contact = contact) : (value.contact = value.contact);
                    name ? (value.name = name) : (value.name = value.name);
               }
          });

          await userContact.save();

          return userContact;
     };

     deleteDataIntoArray = async (data) => {
          const user = await UserModel.findOneAndUpdate({ _id: data.id }, { $pull: { contacts: { _id: data.body.contactId } } }, { new: true });
          return user;
     };
}

module.exports = UserService;
