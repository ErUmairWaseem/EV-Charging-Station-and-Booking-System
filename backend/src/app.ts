import diContainer from "./config/diConfig";
import * as express from "express";
import { ExpressServer } from "./expressServer";
import Identifiers from "./config/identifiers";
import * as cors from "cors";

var router = express.Router();

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "localhost:4019",
  preflightContinue: false,
};

//use cors middleware
router.use(cors(options));

//add your routes

//enable pre-flight
router.options("*", cors(options));

(async () => {
  let app: express.Application = express();
  try {
    // Create the App
    let expressServer = diContainer.get<ExpressServer>(
      Identifiers.ExpressServer
    );
    // Start the App
    await expressServer.start(app);
  } catch (e) {
    let message = "app:Error starting app";
    console.error(message);
    console.error(e);
    throw e;
  }
})();
