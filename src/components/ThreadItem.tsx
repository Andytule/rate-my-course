import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  Avatar,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import { useNavigate } from "react-router-dom";
import { Thread } from "../types/types";
import axios from "axios";
import { toast } from "react-toastify";
import apiBaseUrl from "apiConfig";

/**
 * Represents a single thread item.
 *
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {Thread} props.thread - The thread to be displayed.
 * @param {Function} [props.onDelete] - Callback function for deleting a thread.
 *
 * @returns {JSX.Element} The rendered JSX element for the ThreadItem.
 */
const ThreadItem: React.FC<{
  thread: Thread;
  onDelete?: (deletedThreadId: number) => void;
}> = ({ thread, onDelete }) => {
  const [isParent] = useState(thread.parent_id === null);
  const [marginValue] = useState(isParent ? 2 : 1);
  const paddingValue = "0 24px";
  const navigate = useNavigate();
  const currentUserId = sessionStorage.getItem("id");
  const isUserLoggedIn = currentUserId !== null;

  /**
   * Handles the click event for replying to the thread.
   */
  const handleReplyClick = () => {
    navigate("/CreateThread", { state: { parentId: thread.id } });
  };

  /**
   * Handles the click event for editing the thread.
   */
  const handleEditClick = () => {
    if (
      isUserLoggedIn &&
      currentUserId !== null &&
      parseInt(currentUserId) === thread.account
    ) {
      navigate("/CreateThread", { state: { threadId: thread.id } });
    }
  };

  // State for storing threads
  const [threads, setThreads] = useState<Thread[]>([]);

  /**
   * Handles the confirmation and deletion of the thread.
   * Deletes the thread and its responses recursively.
   */
  const handleConfirmDelete = async () => {
    const deleteThreadAndResponses = async (threadToDelete: Thread) => {
      if (threadToDelete.responses && threadToDelete.responses.length > 0) {
        for (const response of threadToDelete.responses) {
          await deleteThreadAndResponses(response);
        }
      }

      try {
        const response = await axios.post(`${apiBaseUrl}/deleteThread.php`, {
          id: threadToDelete.id,
        });

        if (response.data && response.data.status) {
          if (onDelete) {
            onDelete(threadToDelete.id);
          }
        } else {
          const errorMessage = response.data?.message || "Unknown error";
          toast.error(`Error: ${errorMessage}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(
            `An error occurred: ${error.message || "Unknown error"}`,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
            }
          );
        } else {
          toast.error("An error occurred: Unknown error", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
        }
      }
    };

    await deleteThreadAndResponses(thread);
    toast.success("Thread(s) deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Format the date from the thread
  const formattedDate = new Date(thread.date);

  return (
    <Card
      variant="outlined"
      style={{
        backgroundColor: isParent ? "#1976d2" : "white",
        color: isParent ? "white" : "black",
        padding: paddingValue,
      }}
      sx={{
        marginBottom: marginValue,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box display="flex" alignItems="center">
              <Avatar>
                <PersonIcon />
              </Avatar>
              <Typography variant="h6" sx={{ marginLeft: 2 }}>
                {thread.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                textAlign: "right",
                marginRight: 0,
              }}
              variant="body2"
            >
              {formattedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Typography variant="body2" sx={{ margin: 0 }}>
          {thread.content}
        </Typography>
      </CardContent>
      {thread.responses && thread.responses.length > 0 && (
        <List>
          {thread.responses.map((response) => (
            <ThreadItem key={response.id} thread={response} />
          ))}
        </List>
      )}
      <CardContent sx={{ padding: 0 }}>
        <Box display="flex" justifyContent="space-between">
          <Box></Box>
          <Box>
            <IconButton onClick={handleReplyClick}>
              <ReplyIcon sx={{ color: isParent ? "white" : "inherit" }} />
            </IconButton>
            {isUserLoggedIn &&
              currentUserId !== null &&
              parseInt(currentUserId) === thread.account && (
                <IconButton onClick={handleEditClick}>
                  <EditIcon sx={{ color: isParent ? "white" : "inherit" }} />
                </IconButton>
              )}
            {isUserLoggedIn &&
              currentUserId !== null &&
              parseInt(currentUserId) === thread.account && (
                <IconButton onClick={handleConfirmDelete}>
                  <DeleteIcon sx={{ color: isParent ? "white" : "inherit" }} />
                </IconButton>
              )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ThreadItem;
