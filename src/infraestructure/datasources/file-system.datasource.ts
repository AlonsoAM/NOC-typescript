import fs from "fs";

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEnitity, LogSeveritylevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource extends LogDatasource {
  private readonly logPath: string = "/logs";
  private readonly allLogsPath: string = "/logs/logs-all.log";
  private readonly mediumLogsPath: string = "/logs/logs-medium.log";
  private readonly highLogsPath: string = "/logs/logs-high.log";

  constructor() {
    super();
    this.createLogFiles();
  }

  private createLogFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (logPath) => {
        if (!fs.existsSync(logPath)) {
          fs.writeFileSync(logPath, "");
        }
      }
    );
  };

  public async saveLog(log: LogEnitity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (log.level === LogSeveritylevel.low) return;

    if (log.level === LogSeveritylevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogsFromFile = (logPath: string): LogEnitity[] => {
    const content = fs.readFileSync(logPath, "utf-8");
    const logsAsJson = content.split("\n").map(LogEnitity.fromJson);
    // const logsAsJson = content
    //   .split("\n")
    //   .map((log) => LogEnitity.fromJson(log));
    return logsAsJson;
  };

  public async getLogs(severityLevel: LogSeveritylevel): Promise<LogEnitity[]> {
    switch (severityLevel) {
      case LogSeveritylevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeveritylevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeveritylevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error("Invalid severity level");
    }
  }
}
