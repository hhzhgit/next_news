export default async function logger(req, res, next) {
  process.env.ENABLE_REQ_LOGGER && console.log("============================");
  process.env.ENABLE_REQ_LOGGER && console.log("Request method=>", req.method);
  process.env.ENABLE_REQ_LOGGER && console.log("Request body=>", req.body);
  process.env.ENABLE_REQ_LOGGER && console.log("Request query=>", req.query);
  process.env.ENABLE_REQ_LOGGER &&
    console.log("Request headers=>", req.headers);
  process.env.ENABLE_REQ_LOGGER &&
    console.log("Request dbFields=>", req.dbFields);
  process.env.ENABLE_REQ_LOGGER &&
    console.log("Request dbFilters=>", req.dbFilters);
  process.env.ENABLE_REQ_LOGGER && console.log("============================");
  await next();
}
