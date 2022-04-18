const logIfDev = (content, title = "logIfDev logger") => {
  if (process.env.NODE_ENV == "development") {
    console.log(`↓========${title}=========↓`);
    console.log(content);
    console.log(`↑========${title}=========↑`);
  }
};
export default logIfDev;
