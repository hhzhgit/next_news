import _ from "lodash";
import httpMock from "node-mocks-http";
const _callMids = Symbol();
import logIfDev from "../miscellaneous/logIfDev";
import { getCookie } from "cookies-next";
export class PageController {
  async callMids(options, ...mids) {
    let req = httpMock.createRequest(options);
    let res = httpMock.createResponse();
    await this[_callMids](req, res, null, ...mids);
    return {
      data: res._getJSONData(),
      statusCode: res._getStatusCode(),
    };
  }
  async [_callMids](req, res, index, ...mids) {
    index = index || 0;
    if (index <= mids.length - 1)
      await mids[index](req, res, () =>
        this[_callMids](req, res, ++index, ...mids)
      );
  }
  createProps(revalidate, ...objs) {
    const propsObj = objs.reduce(
      (aObj, cObj) =>
        typeof cObj == "object" ? _.merge(aObj, { props: cObj }) : aObj,
      { props: null }
    );
    return revalidate ? { ...propsObj, revalidate } : propsObj;
  }
  generateStaticPaths(fallback, paths) {
    const modifiedPaths = paths.map((path) => ({
      params: Object.fromEntries(new URLSearchParams(path)),
    }));
    return () => {
      return {
        paths: modifiedPaths,
        fallback: fallback || false,
      };
    };
  }
  logIfDev = logIfDev;
  propsGenerator(revalidate, ...objs) {
    return async (context) => {
      try {
        let user = getCookie("user", { req: context.req, res: context.res });
        if (user) user = JSON.parse(user);
        const props = {};
        for (const obj of objs) {
          const {
            url,
            propsKey,
            body,
            method,
            mids,
            query,
            userAccess,
            redirect,
          } = obj;
          if (userAccess) {
            props.userAccess = userAccess;
            props.redirect = redirect;
          } else {
            const { data, statusCode } = await this.callMids(
              {
                url: typeof url == "function" ? url(context) : url,
                body,
                method,
                query,
                headers: { authorization: `Bearer ${user?.jwt}` },
              },
              ...mids
            );
            if (statusCode > 399)
              throw new Error(data.msg || "Sorry An Error Happend :(");
            Object.assign(props, { [propsKey]: data });
          }
        }
        this.logIfDev(props, "props");
        return this.createProps(revalidate, props);
      } catch (e) {
        this.logIfDev(e.stack, "pageController error");
        return {
          props: { error: e.stack },
        };
      }
    };
  }
}
export default new PageController();
