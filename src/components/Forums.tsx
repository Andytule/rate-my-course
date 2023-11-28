import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, List, Container, Box, Typography } from "@mui/material";
import ThreadItem from "./ThreadItem";
import { Thread } from "../types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiBaseUrl from "apiConfig";
import axios from "axios";

/**
 * Forums component for displaying forum threads and managing thread sorting.
 */
const Forums: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeSort, setActiveSort] = useState("newest");

  /**
   * Fetches forum threads from the server and sets the state.
   * Redirects to the login page if the user is not authenticated.
   */
  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    } else {
      axios
        .get(`${apiBaseUrl}/getThreads.php`)
        .then((response) => {
          const startIndex = response.data.indexOf("{");
          const endIndex = response.data.lastIndexOf("}");
          const jsonString = response.data.substring(startIndex, endIndex + 1);
          const parsedData = JSON.parse(jsonString);
          if (parsedData.status === 1) {
            const threadHierarchy = buildHierarchy(parsedData.data);
            const sortedThreads = [...threadHierarchy].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setThreads(sortedThreads);
            setActiveSort("newest");
          } else {
            console.error("Error fetching forum threads:", parsedData.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching forum threads:", error);
        });
    }
  }, [navigate]);

  /**
   * Recursively builds a hierarchy of threads.
   * @param data - The array of threads.
   * @param parent_id - The ID of the parent thread.
   * @returns An array of threads with nested responses.
   */
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

  /**
   * Sorts threads by newest date.
   */
  const sortNewest = () => {
    const sortedThreads = [...threads].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setThreads(sortedThreads);
    setActiveSort("newest");
  };

  /**
   * Sorts threads by oldest date.
   */
  const sortOldest = () => {
    const sortedThreads = [...threads].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setThreads(sortedThreads);
    setActiveSort("oldest");
  };

  /**
   * Displays a toast message.
   * @param message - The message to display.
   * @param type - The type of toast (success or error).
   */
  const showToast = (message: string, type: "success" | "error") => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      type,
    });
  };

  /**
   * Handles the deletion of a thread and updates the state.
   * @param deletedThreadId - The ID of the deleted thread.
   */
  const handleDeleteThread = async (deletedThreadId: number) => {
    try {
      // Send a request to delete the thread
      await axios.post(`${apiBaseUrl}/deleteThread.php`, {
        id: deletedThreadId,
      });

      // Fetch updated threads from the server
      const response = await axios.get(`${apiBaseUrl}/getThreads.php`);
      const startIndex = response.data.indexOf("{");
      const endIndex = response.data.lastIndexOf("}");
      const jsonString = response.data.substring(startIndex, endIndex + 1);
      const parsedData = JSON.parse(jsonString);

      if (parsedData.status === 1) {
        const threadHierarchy = buildHierarchy(parsedData.data);
        const sortedThreads = [...threadHierarchy].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setThreads(sortedThreads);
      } else {
        console.error("Error fetching forum threads:", parsedData.message);
      }
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
  };

  /**
   * Displays a success or error toast based on the pathname.
   */
  useEffect(() => {
    if (pathname === "/forums/thread-created") {
      showToast("Thread created successfully!", "success");
    } else if (pathname === "/forums/thread-updated") {
      showToast("Thread updated successfully!", "success");
    }
  }, [pathname]);

  /**
   * Styles for the active and non-active sorting buttons.
   */
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
