import { injectable, inject } from "inversify";
import { Application, json, urlencoded } from "express";
import * as http from "http";
import { RouteManager } from "./routeManager";
import Identifiers from "./config/identifiers";
import { ConfigParams } from "./config/configParams";
import * as bodyParser from "body-parser";
import * as fileUpload from "express-fileupload";
import { DbManager } from "./db/dbManager";
const express2 = require("express");
const httpProxy = require("http-proxy");
const cors = require("cors");
const path = require("path");
@injectable()
export class ExpressServer {
  /**
   * Reference to the HTTP Server
   */
  private httpServer: http.Server = null;

  @inject(Identifiers.RouteManager)
  private routeManager: RouteManager;

  @inject(Identifiers.ConfigParams)
  private configParams: ConfigParams;

  @inject(Identifiers.DbManager)
  private dbManager: DbManager;

  // Start the Server.
  public start = async (express: Application) => {
    this.configParams.read();
    await this.dbManager.connect();
    // support application/json type post data
    express.use(cors());
    express.use(bodyParser.json({limit: '50mb'}));
    //support application/x-www-form-urlencoded post data
    express.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
    express.use(json({limit: '50mb'}));
express.use(urlencoded({limit: '50mb'}));
    express.use(fileUpload());
    express.set("port", process.env.PORT || this.configParams.port);
    express.use(express2.static(path.join(__dirname, "public")));
    express.use(bodyParser({limit: '50mb'}))
    var proxy = httpProxy.createProxyServer({});
    express.get("/imageapi", (req, res) => {
      console.log("in testimage");
      proxy.web(req, res, { target: "http://127.0.0.1:3010" });
    });

    this.routeManager.configure(express);
    let app1 = express2();
    app1.all("*", function (req, res) {
      res.status(200).sendFile(`/`, { root: path.join(__dirname, "public/") });
    });
    // app1.use(express.json({limit: '50mb'}));
    // app1.use(express.urlencoded({limit: '50mb'}));

    this.httpServer = express.listen(express.get("port"), () => {
      let message =
        "ExpressServer:start:Express server listening on port " +
        express.get("port");
      console.log(message);
    });
  };

  public stop() {
    if (this.httpServer != null) {
      console.log("ExpressServer:stop:Terminating Test server");
      this.httpServer.close();
    }
  }
}
