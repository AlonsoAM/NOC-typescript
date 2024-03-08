import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemlogReporitory = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server started...");
    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000/";
      new CheckService(
        fileSystemlogReporitory,
        () => console.log(`Service ${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
      // new CheckService().execute("http://localhost:3000/");
    });
  }
}
