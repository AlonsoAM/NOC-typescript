export enum LogSeveritylevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEnitity {
  public level: LogSeveritylevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogSeveritylevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogEnitity => {
    const { message, level, createdAt } = JSON.parse(json);
    const log = new LogEnitity(level, message);
    log.createdAt = new Date(createdAt);
    return log;
  };
}
