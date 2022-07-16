import ActionsClient from './actionsClient';
import { WorkflowSummary } from './types';

export default class WorkflowSummariser {
  private readonly actionsClient: ActionsClient;

  constructor(actionsClient: ActionsClient) {
    this.actionsClient = actionsClient;
  }

  async summariseWorkflow(
    workflowName: string,
    runId: number,
    actor: string,
    runName: string,
  ): Promise<WorkflowSummary> {
    const jobs = await this.actionsClient.getCompletedJobs(runId);

    const wasSuccessful = jobs
      .map(({ result }) => result !== 'failure')
      .reduce((workflowResult, jobResult) => workflowResult && jobResult, true);

    return {
      name: runName + workflowName,
      initiatedBy: actor,
      result: wasSuccessful ? 'success' : 'failure',
      jobs,
    };
  }
}
