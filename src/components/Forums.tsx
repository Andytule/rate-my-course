import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, Container, Box, Typography } from "@mui/material";
import PostItem from "./PostItem";
import { Post as PostType } from "../types/types";

const Forums: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [activeSort, setActiveSort] = useState("newest");

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    } else {
      fetch("http://localhost:80/api/getThreads.php")
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 1) {
            console.log(data.data);
            const postHierarchy = buildHierarchy(data.data);
            const sortedPosts = [...postHierarchy].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setPosts(sortedPosts);
            setActiveSort("newest");
          } else {
            console.error("Error fetching forum posts:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching forum posts:", error);
        });
    }
  }, [navigate]);

  const buildHierarchy = (
    data: PostType[],
    parent_id: number | null = null
  ): PostType[] => {
    return data
      .filter((post) => post.parent_id === parent_id)
      .map((post) => ({
        ...post,
        responses: buildHierarchy(data, post.id),
      }));
  };

  const sortNewest = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setPosts(sortedPosts);
    setActiveSort("newest");
  };

  const sortOldest = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setPosts(sortedPosts);
    setActiveSort("oldest");
  };

  const activeButtonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
  };

  const nonActiveButtonStyle = {
    backgroundColor: "#e0e0e0",
    color: "black",
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
        <Typography variant="h4">Forums</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            sx={
              activeSort === "newest" ? activeButtonStyle : nonActiveButtonStyle
            }
            onClick={() => sortNewest()}
          >
            Newest
          </Button>
          <Button
            variant="contained"
            sx={
              activeSort === "oldest" ? activeButtonStyle : nonActiveButtonStyle
            }
            onClick={() => sortOldest()}
          >
            Oldest
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate("/CreateThread")}
          sx={{ alignSelf: "flex-end" }}
        >
          Create Thread
        </Button>
      </Box>

      <List>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </List>
    </Container>
  );
};

export default Forums;
