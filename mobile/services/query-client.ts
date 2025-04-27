import NetInfo from "@react-native-community/netinfo";
import { onlineManager, QueryClient } from "@tanstack/react-query";

// Set up the online manager to track network connectivity
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected); // Update online status based on network connectivity
  });
});

// Create a QueryClient instance with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed queries once
      staleTime: 1000 * 60 * 2, // Data is considered fresh for 2 minutes
      refetchOnReconnect: true, // Refetch queries when the app reconnects to the network
    },
  },
});