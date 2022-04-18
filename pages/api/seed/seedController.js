import crud from "../../../db/crud";
import Controller from "../baseController";
import fakes from "../../../faker/db.json";
import User from "../../../db/models/User";
import News from "../../../db/models/News";
import Comment from "../../../db/models/Comment";
import bcrypt from "bcrypt";
export default new (class seedContoller extends Controller {
  async seedFake(req, res, next) {
    let result = [];
    const models = [User, News, Comment];
    for (const key of models) {
      const {
        collection: { collectionName },
      } = key;
      const insertedItems = fakes[collectionName].map(
        async (item) =>
          await crud.create(
            key,
            collectionName == "users"
              ? { ...item, password: bcrypt.hashSync(item.password, 10) }
              : item
          )
      );
      result.push(Promise.allSettled(insertedItems));
    }
    res.status(200).json(await Promise.allSettled(result));
  }
  async deleteFakes(req, res, next) {
    let result = [];
    const models = [User, News, Comment];
    for (const key of models) {
      const {
        collection: { collectionName },
      } = key;
      const insertedItems = fakes[collectionName].map(
        async (item) => await crud.deleteOne(key, item._id)
      );
      result.push(Promise.allSettled(insertedItems));
    }
    res.status(200).json(await Promise.allSettled(result));
  }
})();
