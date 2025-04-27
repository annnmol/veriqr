import NetworkService from "@mobile/services/api/network-service";
import { useQuery } from "@tanstack/react-query";

export const useGitHubUser = (username: string) => {
  return useQuery({
    queryKey: ["github", "users", username],
    queryFn: () => NetworkService.githubUserById({ id: username }),
    _optimisticResults: "optimistic",
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
};
