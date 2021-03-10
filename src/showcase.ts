import fetch from 'node-fetch';
import { DateTime } from 'luxon';

const query = `query ProjectsByUser($username: String!) {
  showcase {
    projects(where: { user: $username }, orderBy: NEWEST, take: 1) {
      createdAt
    }
  }
}`;

export async function getLastProjectCreated(username: string): Promise<DateTime | null> {
  const request = await fetch('https://graph.codeday.org/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { username } }),
  });
  const result = await request.json();

  const latestProject = result?.data?.showcase?.projects[0] || null;
  return latestProject ? DateTime.fromISO(latestProject.createdAt) : null;
}
