import "dotenv/config";

const serverConfig = {
  port: process.env.PORT || 4003,
  dburl: process.env.DB_URL,
  frontendpath: process.env.FRONTEND_PATH,
};

export default serverConfig;
