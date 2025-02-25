import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Main from "./pages/Main"
import { ThemeProvider } from "./context/theme-provider";
import { Layout } from "./components/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Main />
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
