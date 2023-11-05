import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Container, TextField, Typography, Box } from "@mui/material";
import axios from "axios";

const CreateThread = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const parentId = state ? state.parentId : null;
  const [postData, setPostData] = useState({
    content: "",
    parent_id: parentId,
  });

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

  const handleCreateThread = () => {
    if (postData.content) {
      const body = {
        ...postData,
        account: sessionStorage.getItem("id"),
      };
      axios
        .post("http://localhost:80/api/createThread.php", body)
        .then((response) => {
          if (response.data.status) {
            console.log("Thread created successfully:", response.data.message);
            navigate("/Forums");
          } else {
            console.error("Error creating thread:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error creating thread:", error);
        });
    } else {
      console.error("Content is required for creating a thread.");
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, content: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: 4 }}>
        Create Thread
      </Typography>
      <Box mt={2}>
        <TextField
          multiline
          rows={4}
          fullWidth
          label="Thread Content"
          variant="outlined"
          value={postData.content}
          onChange={handleContentChange}
        />
      </Box>
      <Box
        mt={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateThread}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CreateThread;
