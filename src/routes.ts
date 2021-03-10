import { Express } from 'express';
import { Profile } from 'passport-auth0';
import { getLastProjectCreated } from './showcase';
import { makeGithubStudentUrl } from './github';

export function addRoutes(app: Express): void {
  app.get('/', async (req, res): Promise<void> => {
    if (!req.isAuthenticated() || !req.user) {
      res.redirect(302, '/login');
      return;
    }

    try {
      const { nickname } = <Profile>req.user;
      const lastProject = await getLastProjectCreated(nickname);
      const timeSinceLastProject = lastProject?.diffNow().as('months');
      if (!timeSinceLastProject || (-1 * timeSinceLastProject) > 6.5) {
        res.redirect(302, 'https://www.codeday.org/help/article/6out0c4pmf2oP9Iy1nR1i4');
        return;
      }

      const studentUrl = await makeGithubStudentUrl(nickname);
      if (studentUrl && studentUrl.startsWith('http')) {
        res.redirect(studentUrl);
        return;
      }
    } catch (ex) {}

    res.send(`Something went wrong and we couldn't generate your Github Student Pack URL.`);
  });
}
