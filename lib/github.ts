import { GraphqlResponseError, graphql, type GraphQlQueryResponseData } from '@octokit/graphql';

import siteMetadata from '@/data/siteMetadata';
import { Repository, UserData } from '@/types/github';
import { GithubRepository } from '../types';

export async function fetchGithubRepo(repo: string): Promise<GithubRepository> {
  if (!repo) {
    throw new Error('Missing repo parameter');
  }

  if (!process.env.NEXT_PUBLIC_GITHUB_API_TOKEN) {
    throw new Error('Missing `GITHUB_API_TOKEN` env variable');
  }

  let owner = siteMetadata.socialAccounts.github;
  if (repo.includes('/')) {
    [owner, repo] = repo.split('/');
  }

  try {
    const { repository }: GraphQlQueryResponseData = await graphql(
      `
        query repository($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            stargazerCount
            description
            homepageUrl
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                node {
                  color
                  name
                }
              }
            }
            name
            nameWithOwner
            url
            forkCount
            repositoryTopics(first: 20) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      `,
      {
        owner,
        repo,
        headers: {
          authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
        },
      }
    );

    repository.languages = repository.languages.edges.map((edge) => ({
      color: edge.node.color,
      name: edge.node.name,
    }));

    repository.repositoryTopics = repository.repositoryTopics.edges.map((edge) => edge.node.topic.name);

    return repository;
  } catch (error) {
    if (error instanceof GraphqlResponseError) {
      const errorMessage = error.errors?.[0]?.message || 'Unknown GraphQL error';
      throw new Error(errorMessage);
    }

    throw new Error('Unable to fetch repo data: ' + error?.toString());
  }
}

export async function getUserData() {
  if (!process.env.NEXT_PUBLIC_GITHUB_API_TOKEN) {
    throw new Error('Missing `GITHUB_API_TOKEN` env variable');
  }

  try {
    const userResponse = await fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error(`Error fetching user data: ${userResponse.statusText}`);
    }

    const userData: UserData = await userResponse.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function getRepoData() {
  if (!process.env.NEXT_PUBLIC_GITHUB_API_TOKEN) {
    throw new Error('Missing `GITHUB_API_TOKEN` env variable');
  }

  try {
    const reposResponse = await fetch(`https://api.github.com/user/repos?per_page=200`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
      },
    });
    const reposData: Repository[] = await reposResponse.json();
    return reposData;
  } catch (error) {
    console.error('Error fetching repository data:', error);
    throw error;
  }
}
