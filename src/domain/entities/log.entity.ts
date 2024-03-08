export enum LogSeveritylevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOoptions {
  level: LogSeveritylevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEnitity {
  public level: LogSeveritylevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOoptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEnitity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    const log = new LogEnitity({
      message,
      level,
      createdAt,
      origin,
    });
    return log;
  };
}
