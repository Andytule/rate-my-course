import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Surveys: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    satisfaction: "",
    improvements: "",
    comments: "",
    anonymous: false,
  });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = ["satisfaction", "improvements"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      toast.error("Please fill in all required fields.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      return;
    }

    setInvalidFields([]);

    const body = {
      satisfaction: formData.satisfaction,
      improvements: formData.improvements,
      comments: formData.comments,
      anonymous: formData.anonymous,
      user_id: sessionStorage.getItem("id"),
    };

    try {
      const response = await axios.post(
        "http://localhost:80/api/addSurveyResponse.php",
        body
      );

      if (response.data && response.data.status) {
        toast.success("Survey response submitted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        setFormData({
          satisfaction: "",
          improvements: "",
          comments: "",
          anonymous: false,
        });
      } else {
        const errorMessage = response.data?.message || "Unknown error";
        toast.error(`Error: ${errorMessage}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`An error occurred: ${error.message || "Unknown error"}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      } else {
        toast.error("An error occurred: Unknown error", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Surveys
        </Typography>
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel
                    id="satisfaction-label"
                    className={
                      invalidFields.includes("satisfaction") ? "invalid" : ""
                    }
                  >
                    How satisfied are you with our web app overall?
                  </InputLabel>
                  <Select
                    labelId="satisfaction-label"
                    name="satisfaction"
                    onChange={handleSelectChange}
                    value={formData.satisfaction}
                    required
                    label="Satisfaction"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="5">Very Satisfied</MenuItem>
                    <MenuItem value="4">Satisfied</MenuItem>
                    <MenuItem value="3">Neutral</MenuItem>
                    <MenuItem value="2">Dissatisfied</MenuItem>
                    <MenuItem value="1">Very Dissatisfied</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextareaAutosize
                  name="improvements"
                  onChange={handleTextareaChange}
                  value={formData.improvements}
                  placeholder="What can we do to improve?"
                  className={
                    invalidFields.includes("improvements") ? "invalid" : ""
                  }
                  style={{
                    width: "100%",
                    minHeight: "150px",
                    padding: "8px",
                    boxSizing: "border-box",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextareaAutosize
                  name="comments"
                  onChange={handleTextareaChange}
                  value={formData.comments}
                  placeholder="Additional Comments or Suggestions"
                  style={{
                    width: "100%",
                    minHeight: "150px",
                    padding: "8px",
                    boxSizing: "border-box",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="anonymous"
                      onChange={handleCheckboxChange}
                      checked={formData.anonymous}
                    />
                  }
                  label={
                    <Typography variant="body1">
                      Provide feedback anonymously
                    </Typography>
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Surveys;
