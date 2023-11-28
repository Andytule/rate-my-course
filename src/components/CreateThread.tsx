import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  TextareaAutosize,
  Button,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import apiBaseUrl from "apiConfig";

/**
 * CreateThread component for creating or editing forum threads.
 */
const CreateThread: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const parentId = state ? state.parentId : null;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [threadData, setThreadData] = useState({
    content: "",
    parent_id: parentId,
  });
  const isReply = parentId !== null;

  /**
   * Handles the change event of the textarea, updating the content in the state.
   * @param e - The change event.
   */
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (isEditMode) {
      setEditContent(value);
    } else {
      setThreadData((prevData) => ({
        ...prevData,
        [name!]: value,
      }));
    }
  };

  /**
   * Displays a success toast message after successfully creating or updating a thread.
   */
  const handleEditSuccessToast = () => {
    const actionMessage = isReply
      ? "replied to"
      : isEditMode
      ? "updated"
      : "created";
    toast.success(`Thread ${actionMessage} successfully!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    navigate("/forums");
  };

  /**
   * Displays an error toast message if there is an issue creating or updating a thread.
   * @param errorMessage - The error message to display.
   */
  const handleEditErrorToast = (errorMessage: string) => {
    toast.error(`Error: ${errorMessage}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  };

  /**
   * Handles the form submission, creating or updating the thread accordingly.
   * @param e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditMode) {
      if (!threadData.content) {
        toast.error("Please fill in the content field.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        return;
      }

      const body = {
        content: threadData.content,
        parent_id: threadData.parent_id,
        account: sessionStorage.getItem("id"),
      };

      try {
        const response = await axios.post(
          `${apiBaseUrl}/createThread.php`,
          body
        );

        if (response.data && response.data.status) {
          handleEditSuccessToast();
          setThreadData({
            content: "",
            parent_id: parentId,
          });
        } else {
          const errorMessage = response.data?.message || "Unknown error";
          handleEditErrorToast(errorMessage);
        }
      } catch (error) {
        if (error instanceof Error) {
          handleEditErrorToast(
            `An error occurred: ${error.message || "Unknown error"}`
          );
        } else {
          handleEditErrorToast("An error occurred: Unknown error");
        }
      }
    } else {
      const body = {
        id: state.threadId,
        content: editContent,
      };

      try {
        const response = await axios.post(`${apiBaseUrl}/editThread.php`, body);

        if (response.data && response.data.status) {
          handleEditSuccessToast();
          setIsEditMode(false);
          setEditContent("");
        } else {
          const errorMessage = response.data?.message || "Unknown error";
          handleEditErrorToast(errorMessage);
        }
      } catch (error) {
        if (error instanceof Error) {
          handleEditErrorToast(
            `An error occurred: ${error.message || "Unknown error"}`
          );
        } else {
          handleEditErrorToast("An error occurred: Unknown error");
        }
      }
    }
  };

  /**
   * Checks if the user is authenticated or if the component is in edit mode.
   * If not, redirects to the login page.
   */
  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    } else if (state && state.threadId) {
      setIsEditMode(true);

      axios
        .get(`${apiBaseUrl}/getThread.php?id=${state.threadId}`)
        .then((response) => {
          setEditContent(response.data.data.content);
        })
        .catch((error) => {
          console.error("Error fetching thread content:", error);
        });
    }
  }, [navigate, state]);

  return (
    <Container maxWidth="md">
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          {isEditMode ? "Edit Thread" : "Create Thread"}
        </Typography>
      </Box>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextareaAutosize
                name="content"
                onChange={handleTextareaChange}
                value={isEditMode ? editContent : threadData.content}
                placeholder="Thread Content"
                required
                style={{
                  width: "100%",
                  minHeight: "150px",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {isEditMode ? "Update" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateThread;
