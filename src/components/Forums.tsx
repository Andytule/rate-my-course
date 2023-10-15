import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, Container, Box, Typography } from "@mui/material";
import PostItem from "./PostItem";
import { Post as PostType } from "../types/types";

const initialPosts: PostType[] = [
  {
    id: 1,
    account: "user1@example.com",
    content:
      "This is the first parent post. It contains a long message with detailed information about a topic. This message is used for testing purposes and is quite long.",
    date: new Date("2023-10-15"),
    parentId: null,
  },
  {
    id: 2,
    account: "user2@example.com",
    content:
      "Response 1 to the first post. This response provides additional information about the topic discussed in the parent post. It's quite detailed and contains a lot of text for testing purposes.",
    date: new Date("2023-10-16"),
    parentId: 1,
  },
  {
    id: 3,
    account: "user3@example.com",
    content:
      "Response 2 to the first post. This response continues the discussion started in the parent post. It also includes detailed information and is quite long for testing purposes.",
    date: new Date("2023-10-17"),
    parentId: 1,
  },
  {
    id: 4,
    account: "user4@example.com",
    content:
      "This is the second parent post. It contains a lengthy message with extensive details on a different topic. This message is used for testing purposes and is quite long.",
    date: new Date("2023-10-18"),
    parentId: null,
  },
  {
    id: 5,
    account: "user5@example.com",
    content:
      "Response 1 to the second post. This response provides additional information about the topic discussed in the parent post. It's quite detailed and contains a lot of text for testing purposes.",
    date: new Date("2023-10-19"),
    parentId: 4,
  },
  {
    id: 6,
    account: "user6@example.com",
    content:
      "Response 2 to the second post. This response continues the discussion started in the parent post. It also includes detailed information and is quite long for testing purposes.",
    date: new Date("2023-10-20"),
    parentId: 4,
  },
  {
    id: 7,
    account: "user7@example.com",
    content:
      "This is a standalone post without responses. It's quite lengthy and covers a specific topic in detail. This message is used for testing purposes and is quite long.",
    date: new Date("2023-10-21"),
    parentId: null,
  },
];

const Forums: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>(initialPosts);

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

  const buildHierarchy = (
    data: PostType[],
    parentId: number | null = null
  ): PostType[] => {
    return data
      .filter((post) => post.parentId === parentId)
      .map((post) => ({
        ...post,
        responses: buildHierarchy(data, post.id),
      }));
  };

  const postHierarchy = buildHierarchy(posts);

  return (
    <Container>
      <Box
        sx={{
          mt: 4,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Forums</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/create-thread")}
          sx={{ alignSelf: "flex-end" }}
        >
          Create Thread
        </Button>
      </Box>

      <List>
        {postHierarchy.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </List>
    </Container>
  );
};

export default Forums;
