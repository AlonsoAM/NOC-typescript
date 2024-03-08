import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEnitity, LogSeveritylevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEnitity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeveritylevel): Promise<LogEnitity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
