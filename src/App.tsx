import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Main from "./pages/Main"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
