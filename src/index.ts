import express from 'express';
import nocache from 'nocache';
import { registerPassport, addAuthRoutes } from './auth';
import { addRoutes } from './routes';
import config from './config';

const app = express();
app.set('etag', false);
app.use(nocache);
registerPassport(app);
addAuthRoutes(app);
addRoutes(app);

// eslint-disable-next-line no-console
app.listen(config.app.port, () => console.log(`Listening on ${config.app.url}`));
