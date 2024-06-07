import { Express } from 'express';
import { Profile } from 'passport-auth0';
import { getLastProjectCreated } from './showcase';
import { makeGithubStudentUrl } from './github';
import { getLastLabsParticipation } from './labs';

export function addRoutes(app: Express): void {
  app.get('/', async (req, res): Promise<void> => {
    if (!req.isAuthenticated() || !req.user) {
      res.redirect(302, '/login');
      return;
    }

    try {
      const { nickname } = <Profile>req.user;
      const lastProject = await getLastProjectCreated(nickname);
      const lastLabs = await getLastLabsParticipation(nickname);
      const timeSinceLastProject = Math.abs(lastProject?.diffNow().as('months') || 9999);
      const timeSinceLastLabs = Math.abs(lastLabs?.diffNow().as('months') || 9999);
      console.log(`Pack request for ${nickname}: ${timeSinceLastProject}mo project, ${timeSinceLastLabs}mo labs`);
      if (!(timeSinceLastProject <= 6.5 || timeSinceLastLabs <= 6.5)) {
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
