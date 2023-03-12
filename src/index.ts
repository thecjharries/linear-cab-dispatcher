import {LinearClient} from '@linear/sdk';
import {env} from 'process';

// Api key authentication
const linearClient = new LinearClient({
  apiKey: env.LINEAR_API_KEY,
});

linearClient
  .team(env.TEAM_ID as string)
  .then(team => {
    return team.issues();
  })
  .then(issues => {
    console.log(issues);
  })
  .catch(err => {
    console.log(err);
  });
