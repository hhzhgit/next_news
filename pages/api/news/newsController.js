import crud from "../../../db/crud";
import News from "../../../db/models/News";
import { newsSchema } from "../../../validations/news";
import Controller from "../baseController";
import fakeNews from "../../../faker/news.json";
import auth from "../../../middlewares/routeAccess";
export default new (class NewsController extends Controller {
  async insertNews(req, res, next) {
    const imageUrl = req?.file?.path
      ? req.file.path
          .replace(/\\/g, "/")
          .replace("public/", process.env.SERVER_BASE_URL)
      : null;
    const result = await crud.create(News, { ...req.body, imageUrl });
    res.status(200).json(result);
  }
  async validateNews(req, res, next) {
    await newsSchema.validate(req.body);
    next();
  }
  async validateNewsMPForm(req, res, next) {
    if (req.body.author) req.body.author = req.body.author.split(",");
    await newsSchema.validate(req.body);
    next();
  }
  async sendAllNews(req, res, next) {
    const news = await crud.find(News, req.query, req.dbFields, req.dbFilters);
    res.status(200).json(auth().resImmuner(news, null, "password", "role"));
  }

  async sendNumOfNews(req, res, next) {
    const news = this.reJSON(await crud.find(News, req.query));
    res.status(200).json({ count: news.length });
  }
  async deleteNews(req, res, next) {
    const deletedItem = await crud.deleteOne(News, req.query.newsId);
    res
      .status(deletedItem ? 200 : 404)
      .json(
        deletedItem
          ? auth().resImmuner(deletedItem, null, "password")
          : { msg: "Record doesn't found" }
      );
  }
  async seedFakeNews(req, res, next) {
    const result = fakeNews.map(async (news) => await crud.create(News, news));
    Promise.allSettled(result).then((data) =>
      res.status(200).json(data.map((i) => i.value))
    );
  }
  async deleteFakeNews(req, res, next) {
    const result = fakeNews.map(
      async (news) => await crud.deleteOne(News, news._id)
    );
    Promise.allSettled(result).then((data) =>
      res.status(200).json(data.map((i) => i.value))
    );
  }
  async updateANews(req, res, next) {
    const imageUrl = req?.file?.path
      ? req.file.path
          .replace(/\\/g, "/")
          .replace("public/", process.env.SERVER_BASE_URL)
      : null;
    const updatedData = imageUrl ? { ...req.body, imageUrl } : req.body;
    const result = await crud.updateOne(
      News,
      { _id: req.query.newsId },
      updatedData
    );
    result
      ? res.status(200).json(result)
      : res.status(404).json({ msg: "Record doesn't found" });
  }
  async sendANews(req, res, next) {
    const result = await crud.findOne(
      News,
      { _id: req.query.newsId },
      req.dbFields,
      req.dbFilters
    );
    result
      ? res
          .status(200)
          .json(auth().resImmuner(result, null, "password", "role"))
      : res.status(404).json({ msg: "Record doesn't found" });
  }
  async sendNewsCats(req, res, next) {
    const allNews = await crud.find(News, {}, ["category"]);
    const categories = [];
    allNews.forEach(
      (news) =>
        !categories.includes(news.category) && categories.push(news.category)
    );
    res.status(200).json(categories);
  }
  searchNews = (regexOption) => async (req, res, next) => {
    const modifiedQuery = {};
    const { query } = req;
    for (const key in query) {
      modifiedQuery[key] = {
        $regex: new RegExp(query[key], regexOption || "i"),
      };
    }
    const result = await crud.find(
      News,
      modifiedQuery,
      req.dbFields,
      req.dbFilters
    );
    res.status(200).json(auth().resImmuner(result, null, "password"));
  };
})();
