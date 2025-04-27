import { useClerk } from "@clerk/clerk-expo";

/**
 * Custom hook to access authentication session details.
 *
 * This hook provides the current user, session, client, and authentication state
 */

function useAuthSession() {
  const {
    user: currentUser,
    session: currentSession,
    client,
    isSignedIn,
    loaded,
  } = useClerk();

  return {
    currentUser,
    currentSession,
    client,
    isSignedIn,
    isLoaded: loaded,
  };
}

export default useAuthSession;
