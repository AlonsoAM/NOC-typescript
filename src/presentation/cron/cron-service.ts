import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  static createJob(cronTime: CronTime, ontick: OnTick): CronJob {
    const job = new CronJob(cronTime, ontick);

    job.start();

    return job;
  }
}
