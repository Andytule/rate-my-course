import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography, Box } from "@mui/material";

const CreateThread = () => {
  const navigate = useNavigate();
  const [threadContent, setThreadContent] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

  const handleCreateThread = () => {
    console.log("Creating Thread:", threadContent);
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
          value={threadContent}
          onChange={(e) => setThreadContent(e.target.value)}
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
