import { LogEnitity, LogSeveritylevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEnitity(
        LogSeveritylevel.low,
        `Service ${url} is working fine`
      );
      await this.logRepository.saveLog(log);
      this.successCallback();
      return true;
    } catch (error) {
      const log = new LogEnitity(
        LogSeveritylevel.high,
        `Service ${url} is not working. ${error}`
      );
      await this.logRepository.saveLog(log);
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
