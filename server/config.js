const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/react-app',
  port: process.env.PORT || 8000,
  serverURL: "http://localhost:8000",
};

module.exports = config;
