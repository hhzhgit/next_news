import dbconnect from "../db/connectdb";
export default async function dbConnectMid(req, res, next) {
  await dbconnect();
  const { skip, limit, sort, populate, fields, _new = true } = req.query;
  req.dbFields = fields ? JSON.parse(fields) : null;
  req.dbFilters = {
    skip,
    limit,
    sort: sort ? JSON.parse(sort) : null,
    populate: populate ? JSON.parse(populate) : null,
    new: _new,
  };
  await next();
}
