import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import _ from "lodash";
import React, { useEffect } from "react";
// import { convertToHTML } from "draft-convert";
export default function StrToElement({ str, className = "", uniqueKey }) {
  const id = `unique${uniqueKey}`;
  useEffect(() => {
    if (typeof DOMParser !== "undefined") {
      // const htmlStr = convertToHTML({})(convertFromRaw(JSON.parse(str)));
      const htmlStr = stateToHTML(convertFromRaw(JSON.parse(str)), {
        blockStyleFn: (block) => {
          const textAlign = block.getData().get("text-align");
          if (textAlign)
            return { attributes: { className: `text-${textAlign}` } };
        },
      });
      const pre = document.querySelector(`#${id}`);
      if (pre) pre.innerHTML = htmlStr;
    }
  }, [id, str]);
  return (
    <pre id={id} className={className} style={{ whiteSpace: "initial" }}></pre>
  );
}
