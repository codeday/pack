import fetch from 'node-fetch';
import { DateTime } from 'luxon';

const query = `query ParticipationQuery ($username: String!) {
  labs {
    employmentRecords(username: $username) {
      end
    }
	}
} 
`;

export async function getLastLabsParticipation(username: string): Promise<DateTime | null> {
  const request = await fetch('https://graph.codeday.org/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { username } }),
  });
  const result = await request.json();

  const latestParticipation = result?.data?.labs?.employmentRecords?.[0] || null;
  return latestParticipation ? DateTime.fromISO(latestParticipation.end) : null;
}
