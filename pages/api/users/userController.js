import User from "../../../db/models/User";
import bcrypt from "bcrypt";
import Controller, { baseController } from "../baseController";
import mongoose from "mongoose";
import crud from "../../../db/crud";
import * as fakeUsers from "../../../faker/user.json";
import auth from "../../../middlewares/routeAccess";
export default new (class UserContorller extends Controller {
  async sendAllUsers(req, res, next) {
    const users = await crud.find(User);
    res.status(200).send(users.length > 0 ? users : { msg: `no user found` });
  }
  async userRegister(req, res, next) {
    if (await crud.findOne(User, { email: req.body.email })) {
      throw new Error("duplicated user");
    }
    delete req.body.role;
    let newUser = await crud.create(User, {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const response = this.addJwt({ ...newUser, password: null });
    return res.status(200).json(response);
  }
  async updateUser(req, res, next) {
    const newUser = await crud.updateOne(
      User,
      { _id: req.query.userId },
      {
        ...req.body,
        role: req.user.role,
        password: bcrypt.hashSync(req.body.password, 10),
      }
    );
    if (!newUser) throw new Error("no user found to update");
    return res.status(200).json(auth().resImmuner(newUser, null, "password"));
  }
  async returnUser(req, res, next) {
    if (!mongoose.isValidObjectId(req.query.userId))
      return res.status(400).json({ msg: "invalid user id" });
    const user = baseController.reJSON(await User.findById(req.query.userId));
    res
      .status(user ? 200 : 404)
      .json(user ? { ...user, password: null } : { msg: "USER NOT FOUND" });
  }
  async userLogginHandler(req, res, next) {
    let user = await crud.findOne(User, { email: req.body.email });
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
      return res.status(403).json({ msg: "invalid credentials" });
    user = this.addJwt(user);
    res.status(200).json(this.secureObject(user, null, "password"));
  }
  async deleteUser(req, res, next) {
    if (!mongoose.isValidObjectId(req.query.userId))
      return res.status(400).json({ msg: "invalid object id" });
    const deletedUser = await crud.deleteOne(User, { _id: req.query.userId });
    res.status(200).json({
      msg: deletedUser ? "OK" : "USER NOT FOUND",
      data: deletedUser
        ? this.secureObject(deletedUser, null, "password")
        : null,
    });
  }
  async seedFakeUsers(req, res, next) {
    const result = fakeUsers.map(
      async (fakeUser) =>
        await crud.create(User, {
          ...fakeUser,
          password: bcrypt.hashSync(fakeUser.password, 10),
        })
    );
    Promise.allSettled(result).then((data) =>
      res.status(200).json(this.secureArray(data, null, "value.password"))
    );
  }
  async unSeedFakeUsers(req, res, next) {
    const result = fakeUsers.map(
      async (fakeUser) => await crud.deleteOne(User, fakeUser._id)
    );
    Promise.allSettled(result).then((data) =>
      res.status(200).json(this.secureArray(data, null, "value.password"))
    );
  }
})();
