import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemlogReporitory = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // Mandar email
    // new SendEmailLogs(emailService, fileSystemlogReporitory).execute(
    //   "alonso.amoreno@live.com"
    // );
    // emailService.sendEmailWithfilesystemLogs("alonso.amoreno@live.com");

    // Servicio de CRON
    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "http://www.google.com/";
    //   new CheckService(
    //     fileSystemlogReporitory,
    //     () => console.log(`Service ${url} is OK`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3000/");
    // });
  }
}
