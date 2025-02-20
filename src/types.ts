import { GitHub } from '@actions/github/lib/utils';

export type Octokit = InstanceType<typeof GitHub>;

export interface WorkflowSummary {
  name: string;
  initiatedBy: string;
  result: 'success' | 'failure';
  jobs: Job[];
  success: string;
  failure: string;
}

export interface Job {
  name: string;
  result: JobResult;
}

export type JobResult = 'success' | 'skipped' | 'cancelled' | 'failure';

export type SummaryEmojis = {
  [key in JobResult]: string;
};
