import { JiraHttp, setBaseUrl } from '../http/jira';

export interface CreateJiraIssueOptions {
  baseUrl: string;
  projectKey: string;
  issueType: string;
  summary: string;
  description: string;
  username: string;
  token: string;
  labels?: string[];
}

export async function createJiraIssue(
  options: CreateJiraIssueOptions,
): Promise<string> {
  setBaseUrl(options.baseUrl);
  const api = new JiraHttp();
  const res = await api.postJson<{ key: string }>('rest/api/2/issue', {
    username: options.username,
    password: options.token,
    body: {
      fields: {
        project: { key: options.projectKey },
        issuetype: { name: options.issueType },
        summary: options.summary,
        description: options.description,
        labels: options.labels,
      },
    },
  });
  return res.body.key;
}
