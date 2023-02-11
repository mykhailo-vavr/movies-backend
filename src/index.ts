import server from '@/server';
import '@/database';
import { ConfigKeysEnum, getConfig } from './utils';

// TODO:
//  - Logging with Winston
//  - Validation of request body
//  - Update security
//  - Performance optimization
//  - Add health check
//  - Add seeds
//  - Add linter for commit messages

const port = getConfig(ConfigKeysEnum.PORT) || 8080;
server.listen(port, () => {
  console.info(`Server run on port ${port}`);
});
