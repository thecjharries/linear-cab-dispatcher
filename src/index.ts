import {LinearClient} from '@linear/sdk';
import {env} from 'process';

// Api key authentication
const linearClient = new LinearClient({
  apiKey: env.LINEAR_API_KEY,
});

linearClient.viewer.then(me => {
  return me.assignedIssues().then(myIssues => {
    if (myIssues.nodes.length) {
      myIssues.nodes.map(issue =>
        console.log(`${me.displayName} has issue: ${issue.title}`)
      );
    } else {
      console.log(`${me.displayName} has no issues`);
    }
  });
});
