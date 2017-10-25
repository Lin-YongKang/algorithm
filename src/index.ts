require("sexy-require");
require("$sequelize");

import express = require("express");
import router = require("$router");
import bodyParser = require("body-parser");
import errorhandler = require("errorhandler");
import morgan = require("morgan");
import favicon = require("serve-favicon");
import path = require("path");
import timeout = require("connect-timeout");

const app = express();
const STATIC = path.join(__dirname, "../static");

app.set("views", STATIC);
app.engine(".html", require("ejs").__express);
app.set("view engine", "html");

app.use(timeout("30s"));
app.use(morgan("combined"));
app.use(favicon(path.join(STATIC, "./image/favicon.ico")));
app.use("/static", express.static(STATIC));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.use(errorhandler());

const server = app.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
