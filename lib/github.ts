import {
  type GraphQlQueryResponseData,
  GraphqlResponseError,
  graphql,
} from '@octokit/graphql';

import siteMetadata from '@/data/siteMetadata';
import type { Repository, UserData } from '@/types/github';
import type { GithubRepository } from '@/types/server';

export async function fetchGithubRepo(
  repoPath: string,
): Promise<GithubRepository> {
  if (!repoPath) {
    throw new Error('Missing repo parameter');
  }

  if (!process.env.NEXT_PUBLIC_GITHUB_API_TOKEN) {
    throw new Error('Missing `GITHUB_API_TOKEN` env variable');
  }

  let owner = siteMetadata.socialAccounts.github;
  let repoName = repoPath;

  if (repoPath.includes('/')) {
    [owner, repoName] = repoPath.split('/');
  }

  try {
    const { repository }: GraphQlQueryResponseData = await graphql(
      `
        query repository($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            stargazerCount
            description
            homepageUrl
            isPrivate
            watchers {
              totalCount
            }
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
        repo: repoName,
        headers: {
          authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
        },
      },
    );

    repository.languages = repository.languages.edges.map((edge) => ({
      color: edge.node.color,
      name: edge.node.name,
    }));

    repository.repositoryTopics = repository.repositoryTopics.edges.map(
      (edge) => edge.node.topic.name,
    );

    return {
      ...repository,
      watch: repository.watchers.totalCount,
    };
  } catch (error) {
    if (error instanceof GraphqlResponseError) {
      const errorMessage =
        error.errors?.[0]?.message || 'Unknown GraphQL error';
      throw new Error(errorMessage);
    }

    throw new Error(`Unable to fetch repo data: ${error?.toString()}`);
  }
}

// Helper function to create headers
const getHeaders = () => {
  if (!process.env.NEXT_PUBLIC_GITHUB_API_TOKEN) {
    throw new Error('Missing `GITHUB_API_TOKEN` env variable');
  }

  return {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
  };
};

export async function useUserData() {
  try {
    const userResponse: UserData = await fetch('https://api.github.com/user', {
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .catch((error) => {
        throw error;
      });

    return userResponse;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function useRepoData() {
  try {
    const reposData: Repository[] = await fetch(
      'https://api.github.com/user/repos?per_page=200',
      {
        headers: getHeaders(),
      },
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error('Error fetching repository data:', error);
        throw error;
      });

    return reposData;
  } catch (error) {
    console.error('Error fetching repository data:', error);
    throw error;
  }
}
