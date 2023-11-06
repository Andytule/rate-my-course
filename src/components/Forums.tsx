import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, List, Container, Box, Typography } from "@mui/material";
import ThreadItem from "./ThreadItem";
import { Thread } from "../types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forums: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeSort, setActiveSort] = useState("newest");

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    } else {
      fetch("http://localhost:80/api/getThreads.php")
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 1) {
            const threadHierarchy = buildHierarchy(data.data);
            const sortedThreads = [...threadHierarchy].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setThreads(sortedThreads);
            setActiveSort("newest");
          } else {
            console.error("Error fetching forum threads:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching forum threads:", error);
        });
    }
  }, [navigate]);

  const buildHierarchy = (
    data: Thread[],
    parent_id: number | null = null
  ): Thread[] => {
    return data
      .filter((thread) => thread.parent_id === parent_id)
      .map((thread) => ({
        ...thread,
        responses: buildHierarchy(data, thread.id),
      }));
  };

  const sortNewest = () => {
    const sortedThreads = [...threads].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setThreads(sortedThreads);
    setActiveSort("newest");
  };

  const sortOldest = () => {
    const sortedThreads = [...threads].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setThreads(sortedThreads);
    setActiveSort("oldest");
  };

  const showToast = (message: string, type: "success" | "error") => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      type,
    });
  };

  const handleDeleteThread = (deletedThreadId: number) => {
    const updatedThreads = threads.filter(
      (thread) => thread.id !== deletedThreadId
    );
    setThreads(updatedThreads);
  };

  useEffect(() => {
    if (pathname === "/forums/thread-created") {
      showToast("Thread created successfully!", "success");
    } else if (pathname === "/forums/thread-updated") {
      showToast("Thread updated successfully!", "success");
    }
  }, [pathname]);

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
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            onDelete={handleDeleteThread}
          />
        ))}
      </List>
      <ToastContainer />
    </Container>
  );
};

export default Forums;
