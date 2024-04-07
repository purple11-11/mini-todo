const express = require("express");
const cors = require("cors");
const PORT = 8080; // react 3000이랑 겹치지 않게만 설정
const app = express();
const { sequelize } = require("./models");
const idxRouter = require("./routes");
const userRouter = require("./routes/user");
const serverPrefix = "/api-server";

// 미들웨어(body-parser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// route 설정
app.use(serverPrefix, idxRouter); // /api-server 경로 이후로 들어오는 요청 "routes/index.js"에서 처리

app.use(serverPrefix + "/user", userRouter); // /api-server/user 경로 "routes/user.js"에서 처리

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is open");
    });
  })
  .catch((err) => {
    console.log(err);
  });
