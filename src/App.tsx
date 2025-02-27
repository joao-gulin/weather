import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Main from "./pages/Main"
import { ThemeProvider } from "./context/theme-provider";
import { Layout } from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CityPage } from "./pages/CityPage";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Toaster } from "sonner";

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
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="/city/:cityName" element={<CityPage/>} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
      <SpeedInsights />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
