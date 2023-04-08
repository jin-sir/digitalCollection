const { getErr } = require("./getSendResult");
module.exports = (err, req, resp, next) => {
  if (err) {
    console.log(err)
    const errObj = err instanceof Error ? err.message : err;
    resp.status(500).send(getErr(errObj));
  } else {
    next();
  }
};
