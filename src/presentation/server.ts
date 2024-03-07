import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");
    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://www.google.com";
      new CheckService(
        () => console.log(`Service ${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
      // new CheckService().execute("http://localhost:3000/");
    });
  }
}
