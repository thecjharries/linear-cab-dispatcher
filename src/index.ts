import {Issue, LinearClient, Team} from '@linear/sdk';
import {env} from 'process';

// Api key authentication
const linearClient = new LinearClient({
  apiKey: env.LINEAR_API_KEY,
});

function drainIssues(team: Team, start?: string): Promise<Issue[]> {
  const args = start ? {after: start, first: 50} : undefined;
  return team.issues(args).then(({nodes, pageInfo}) => {
    if (pageInfo.hasNextPage) {
      return drainIssues(team, pageInfo.endCursor).then(nextNodes => {
        return nodes.concat(nextNodes);
      });
    }
    return nodes;
  });
}

linearClient
  .team(env.TEAM_ID as string)
  .then(team => {
    return drainIssues(team);
  })
  .then(issues => {
    console.log(issues.length);
  })
  .catch(err => {
    console.log(err);
  });

// linearClient
//   .issue(env.ISSUE_ID as string)
//   .then(issue => {
//     return issue.comments();
//   })
//   .then(comments => {
//     console.log(comments);
//   })
//   .catch(err => {
//     console.log(err);
//   });
