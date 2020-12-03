import fetch from 'node-fetch';
import config from './config';

const GITHUB_BASE = `https://education.github.com/student/verify/generate`;

function makeGithubRequestUrl(studentId: string): string {
  const params = {
    school_id: config.github.schoolId,
    student_id: studentId,
    secret_key: config.github.secretKey,
  };

  const query = Object.entries(params).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
  return `${GITHUB_BASE}?${query}`;
}

export async function makeGithubStudentUrl(studentId: string): Promise<string> {
  const result = await fetch(makeGithubRequestUrl(studentId), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return (await result.json()).url;
}
