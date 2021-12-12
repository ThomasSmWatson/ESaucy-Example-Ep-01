import container from "./configuration/console/inversify.config";
import app from "./application/console/app";
import { TYPES } from "./types";

app().then(() => console.log("application finished running"));
