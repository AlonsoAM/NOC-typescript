import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEnitity, LogSeveritylevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  // TODO: attachemets
  attachments?: Attachments[];
}

// TODO: Attachement
interface Attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private trasnporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sendInformation = await this.trasnporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      // console.log(sendInformation);
      const log = new LogEnitity({
        level: LogSeveritylevel.low,
        message: `Email sent to ${to}`,
        origin: "EmailService",
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEnitity({
        level: LogSeveritylevel.high,
        message: `Email not sent to ${to}`,
        origin: "EmailService",
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }

  async sendEmailWithfilesystemLogs(to: string | string[]) {
    const subject = "Logs de NOC APP";
    const htmlBody = `
      <h1>Logs de NOC APP</h1>
      <p>Buen día, aquí estan los logs del sistema.</p>
      <p>Ver los adjuntos</p>
    `;
    const attachments = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
