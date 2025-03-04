import { QueryClientProvider } from "@tanstack/react-query";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query JSONPlaceholder App</h1>
        <PostForm />
        <PostList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
