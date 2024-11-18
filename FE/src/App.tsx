import "./App.css";
import { Router } from "./Router";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./utils/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
