import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const createPost = async (postData) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/posts", postData);
  return response.data;
};

const PostForm = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }); 
      setTitle("");
      setBody("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, body });
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {mutation.isError && <p>Error submitting post.</p>}
      {mutation.isSuccess && <p>Post added successfully!</p>}
    </div>
  );
};

export default PostForm;
