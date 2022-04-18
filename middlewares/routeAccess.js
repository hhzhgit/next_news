import jwt from "jsonwebtoken";
import _ from "lodash";
import crud from "../db/crud";
export const ADMIN_ROLE = "admin";
export const SUPER_ADMIN_ROLE = "super admin";
export const USER_ROLE = "user";
export class Auth {
  ADMIN_ROLE = ADMIN_ROLE;
  SUPER_ADMIN_ROLE = SUPER_ADMIN_ROLE;
  USER_ROLE = USER_ROLE;
  authenticate = (accessRole) => async (req, res, next) => {
    const role = req.user && req.user.role;
    switch (accessRole) {
      case this.SUPER_ADMIN_ROLE:
        if (role == this.SUPER_ADMIN_ROLE) return next();
        return this.blockRoute(res);
      case this.ADMIN_ROLE:
        if (role == this.SUPER_ADMIN_ROLE || role == this.ADMIN_ROLE)
          return next();
        return this.blockRoute(res);
      case this.USER_ROLE:
        if (
          role == this.SUPER_ADMIN_ROLE ||
          role == this.ADMIN_ROLE ||
          role == this.USER_ROLE
        )
          return next();
        return this.blockRoute(res);
      default:
        return this.blockRoute(res);
    }
  };
  identify = async (req, res, next) => {
    const authorization = req.headers && req.headers.authorization;
    if (!authorization) return await next();
    await new Promise((resolve, reject) => {
      jwt.verify(
        authorization.substr(7),
        process.env.JWT_SECRECT_KEY || "someSecretKey",
        (err, decode) => {
          if (err) return reject(err);
          req.user = decode;
          resolve(next());
        }
      );
    }).catch((err) => res.status(403).json(err));
  };
  blockRoute(res, msg = "access banned", code = 403) {
    res.status(code).json({ msg });
  }
  objGetAllPathesOfKey(obj, key, prev) {
    const result = [];
    for (const k in obj) {
      let path = (prev || "") + (prev ? "." : "") + k;
      k == key && result.push(path);
      typeof obj[k] == "object" &&
        result.push(...this.objGetAllPathesOfKey(obj[k], key, path));
    }
    return result;
  }
  updateObjByKey(obj, key, updater) {
    const allPathes = this.objGetAllPathesOfKey(obj, key);
    return allPathes.reduce(
      (av, path) => _.update(av, path, (value) => updater(value)),
      obj
    );
  }
  resImmuner = (data, updater, ...fields) => {
    const auth = new Auth();
    return fields.reduce((obj, field) => {
      const pathes = auth.objGetAllPathesOfKey(data, field);
      return pathes.reduce(
        (av, cv) =>
          _.update(
            av,
            cv,
            updater ||
              function () {
                return "secured";
              }
          ),
        obj
      );
    }, _.cloneDeep(data));
  };
  reqImmuner = (reqObj, ...fields) => {
    const auth = new Auth();
    return [
      auth.identify,
      async (req, res, next) => {
        if (req.user && req.user.role == this.SUPER_ADMIN_ROLE) return;
        fields.forEach((field) => {
          for (const key in field) {
            auth.updateObjByKey(req[reqObj], key, (value) => {
              if (typeof field[key] === "function") return field[key](value);
              if (typeof value === "object")
                return { ...value, select: field[key] };
              return value;
            });
          }
        });
        next();
      },
    ];
  };
  authCompareID = (model, queryId, conditionCB) => async (req, res, next) => {
    const user = req.user || {};
    if (!user) return this.blockRoute(res);
    const doc = await crud.findOne(model, {
      _id: _.get(req, queryId),
    });
    if (!doc) return res.status(400).json({ msg: "Record Not Found" });
    switch (user.role) {
      case this.SUPER_ADMIN_ROLE:
        return next();
      case this.ADMIN_ROLE:
        if (conditionCB(doc, user)) return next();
        return this.blockRoute(res);
      case this.USER_ROLE:
        if (conditionCB(doc, user)) return next();
        return this.blockRoute(res);
      default:
        return this.blockRoute(res);
    }
  };
}
const auth = (accessRole = null) => {
  const auth = new Auth();
  if (accessRole) return [auth.identify, auth.authenticate(accessRole)];
  return auth;
};
export default auth;
