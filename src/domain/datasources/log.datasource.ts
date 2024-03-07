import { LogEnitity, LogSeveritylevel } from "../entities/log.entity";

export abstract class LogDatasource {
  abstract saveLog(log: LogEnitity): Promise<void>;
  abstract getLogs(severityLevel: LogSeveritylevel): Promise<LogEnitity[]>;
}
