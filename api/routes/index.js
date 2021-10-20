const memberRouter = require("./members");

const setupRoutes = (app) => {
  app.use("/members", memberRouter);
};

module.exports = { setupRoutes };
