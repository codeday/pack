/* eslint-disable node/no-process-env */
import { config } from 'dotenv';

config();

export default {
  auth0: {
    domain: <string>process.env.AUTH0_DOMAIN,
    clientId: <string>process.env.AUTH0_CLIENT_ID,
    clientSecret: <string>process.env.AUTH0_CLIENT_SECRET,
  },
  github: {
    schoolId: <string>process.env.GITHUB_SCHOOL_ID,
    secretKey: <string>process.env.GITHUB_SECRET_KEY,
  },
  app: {
    port: Number.parseInt(process.env.PORT || '3000', 10) || 3000,
    secret: <string>process.env.APP_SECRET,
    url: <string>process.env.APP_URL || `https://localhost:${Number.parseInt(process.env.PORT || '3000', 10) || 3000}`,
  },
};
