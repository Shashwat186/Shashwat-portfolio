import { resume } from "@/data/resume";

const DAY_IN_SECONDS = 86400;

async function queryGitHub<T>(token: string, query: string): Promise<T> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: resume.github.username } }),
    next: { revalidate: DAY_IN_SECONDS },
  });
  if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
  const { data, errors } = await response.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

// All-time, so the tree can only grow. GitHub caps each collection at one year, hence one alias per year.
// With no `to`, each collection runs for a year from `from`, or up to now for the current year.
export async function getContributionTotal(): Promise<number> {
  const { fallbackContributions } = resume.github;
  const token = process.env.GITHUB_TOKEN;
  if (!token) return fallbackContributions;

  try {
    const { user } = await queryGitHub<{ user: { createdAt: string } }>(token, "query($login: String!) { user(login: $login) { createdAt } }");
    const firstYear = new Date(user.createdAt).getUTCFullYear();
    const lastYear = new Date().getUTCFullYear();
    const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index);
    const collections = years.map((year) => `y${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z") { contributionCalendar { totalContributions } }`);
    const data = await queryGitHub<{ user: Record<string, { contributionCalendar: { totalContributions: number } }> }>(token, `query($login: String!) { user(login: $login) { ${collections.join(" ")} } }`);
    return Object.values(data.user).reduce((total, year) => total + year.contributionCalendar.totalContributions, 0);
  } catch (error) {
    console.error("Using fallback contribution total:", error);
    return fallbackContributions;
  }
}
