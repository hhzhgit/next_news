import * as jwt from "jsonwebtoken";
import autoBind from "auto-bind";
import nextConnect from "next-connect";
import { userSchema } from "../../validations/user";
export default class Controller {
  constructor() {
    autoBind(this);
    this.router = () =>
      nextConnect({
        onError: (err, req, res, next) => {
          console.log("↓=============================↓");
          console.log("Generic middleware Error Handler=>");
          console.log(err.stack);
          console.log("↑=============================↑");
          if (err.stack.includes("ValidationError")) err.code = 400;
          res.status(err.code || 500).json({
            msg:
              process.env.NODE_ENV == "development"
                ? err.stack
                : err.stack.split(`\n`)[0] || "error happend",
          });
        },
        onNoMatch: (req, res) =>
          res
            .status(404)
            .json({ msg: `method ${req.method} was not found for this route` }),
      });
  }
  /**
   * add jwt returens object with same data and encoded data
   * @param {obejct} data
   * @returns {obejct}
   */
  addJwt(data) {
    !process.env.JWT_SECRECT_KEY && console.log(`consider adding some jwt`);
    return {
      ...data,
      jwt: jwt.sign(
        JSON.stringify(data),
        process.env.JWT_SECRECT_KEY || "someSecretKey"
      ),
    };
  }
  /**
   * return JSON.parse(JSON.stringify(data));
   * @param {any} data
   * @returns {any}
   */
  reJSON(data) {
    return JSON.parse(JSON.stringify(data));
  }
  /**
   * return clone object with replacing object values with secured text
   * @param {object} object
   * @param {String} securedText
   * @param  {...any} rest
   * @returns {object}
   */
  secureObject(object = {}, securedText, ...rest) {
    const cloneObj = JSON.parse(JSON.stringify(object));
    for (let key of rest) {
      key.split(".").reduce((av, cv, index, array) => {
        if (index === array.length - 1 && av && av[cv])
          return (av[cv] = securedText || "secured");
        return av && av[cv] ? av[cv] : null;
      }, cloneObj);
    }
    return cloneObj;
  }
  /**
   * to secure an array of objects
   * @param {Array.<object>} array
   * @param {String} securedText
   * @param  {String} rest
   * @returns {Array}
   */
  secureArray(array, securedText, ...rest) {
    if (!Array.isArray(array)) return { msg: "invalid array" };
    return array.map((obj) =>
      this.secureObject.apply(this, [obj, securedText].concat(rest))
    );
  }

  /**
   * validate user
   * @param {any} req
   * @param {any} res
   * @param {any} next
   */
  async validateUser(req, res, next) {
    await userSchema.validate(req.body);
    next();
  }
}
export const baseController = new Controller();
