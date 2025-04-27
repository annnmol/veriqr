import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { queryClient } from "@mobile/services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface IGlobalContext {
  authUser?: any | undefined;
  // handleAuthChange: (data: IData) => void;
}

export const GlobalContext = createContext({
  authUser: undefined,
  // handleAuthChange: (data: IData) => undefined,
} as IGlobalContext);

const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  // const [authUser, setAuthUser] = useState(parsedItem);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({}), []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache}>
        <QueryClientProvider client={queryClient}>
          <GlobalContext.Provider value={contextValue}>
            {children}
          </GlobalContext.Provider>
        </QueryClientProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
};

export default GlobalContextProvider;
