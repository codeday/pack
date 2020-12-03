import { Express } from 'express';
import { makeGithubStudentUrl } from './github';

export function addRoutes(app: Express): void {
  app.get('/', async (req, res): Promise<void> => {
    if (!req.isAuthenticated() || !req.user) {
      res.redirect('/login');
      return;
    }

    try {
      const { nickname } = req.user;
      const studentUrl = await makeGithubStudentUrl(nickname);
      if (studentUrl && studentUrl.startsWith('http')) {
        res.redirect(studentUrl);
        return;
      }
    } catch (ex) {}

    res.send(`Something went wrong and we couldn't generate your Github Student Pack URL.`);
  });
}
