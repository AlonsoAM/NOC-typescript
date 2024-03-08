import { EmailService } from "../../../presentation/email/email.service";
import { LogEnitity, LogSeveritylevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const send = this.emailService.sendEmailWithfilesystemLogs(to);

      if (!send) {
        throw new Error("Error sending email");
      }

      const log = new LogEnitity({
        level: LogSeveritylevel.low,
        message: `Email sent to ${to}`,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEnitity({
        level: LogSeveritylevel.high,
        message: `${error}`,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
