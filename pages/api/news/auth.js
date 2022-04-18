import News from "../../../db/models/News";
import { Auth } from "../../../middlewares/routeAccess";

export default new (class NewsAuth extends Auth {
  ifMadeBySameUser = [
    this.identify,
    this.authCompareID(News, "query.newsId", (doc, user) =>
      doc.author.includes(user._id)
    ),
  ];
})();
