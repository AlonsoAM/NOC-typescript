import { envs } from "./config/plugins/env.plugin";
import { Server } from "./presentation/server";
import "dotenv/config";

const main = () => {
  Server.start();
  // console.log(envs);
};

(async () => {
  main();
})();
