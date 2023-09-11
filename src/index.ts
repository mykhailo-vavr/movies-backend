import { app } from '@/app';
import '@/database';
import { ConfigKeysEnum, getConfig } from './utils';

const port = getConfig(ConfigKeysEnum.APP_PORT) || 8080;
app.listen(port, () => {
  console.info(`Server run on port ${port}`);
});
