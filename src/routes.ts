import { Express } from 'express';
import { Profile } from 'passport-auth0';
import { makeGithubStudentUrl } from './github';

export function addRoutes(app: Express): void {
  app.get('/', async (req, res): Promise<void> => {
    if (!req.isAuthenticated() || !req.user) {
      res.redirect(302, '/login');
      return;
    }

    try {
      const { nickname } = <Profile>req.user;
      const studentUrl = await makeGithubStudentUrl(nickname);
      if (studentUrl && studentUrl.startsWith('http')) {
        res.redirect(studentUrl);
        return;
      }
    } catch (ex) {}

    res.send(`Something went wrong and we couldn't generate your Github Student Pack URL.`);
  });
}
