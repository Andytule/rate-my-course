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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Interface for form data
interface FormData {
  satisfaction: string;
  improvements: string;
  comments: string;
  anonymous: boolean;
}

/**
 * Surveys component for collecting feedback through a form.
 */
const Surveys: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    satisfaction: "",
    improvements: "",
    comments: "",
    anonymous: false,
  });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  // Handle change in select input
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  // Handle change in textarea input
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  // Handle change in checkbox input
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Define required fields for the form
    const requiredFields = ["satisfaction", "improvements"];
    // Find missing required fields
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    // If there are missing fields, display an error toast and return
    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      toast.error("Please fill in all required fields.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      return;
    }

    setInvalidFields([]);

    // Prepare the request body
    const body = {
      satisfaction: formData.satisfaction,
      improvements: formData.improvements,
      comments: formData.comments,
      anonymous: formData.anonymous,
      user_id: sessionStorage.getItem("id"),
    };

    try {
      // Send a POST request to the server to add the survey response
      const response = await axios.post(
        "http://localhost:80/api/addSurveyResponse.php",
        body
      );

      if (response.data && response.data.status) {
        // Display a success toast and reset the form data
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
        // Display an error toast with the server response message
        const errorMessage = response.data?.message || "Unknown error";
        toast.error(`Error: ${errorMessage}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } catch (error) {
      // Handle errors during the request and display an error toast
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

  // Check if the user is authenticated, otherwise, redirect to the home page
  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Box mt={4} textAlign="center">
        {/* Typography for the section heading */}
        <Typography variant="h4" gutterBottom>
          Surveys
        </Typography>

        {/* Paper component for styling the form */}
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          {/* Form for collecting survey responses */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* FormControl for the satisfaction rating */}
                <FormControl fullWidth>
                  {/* InputLabel for the satisfaction rating */}
                  <InputLabel
                    id="satisfaction-label"
                    className={
                      invalidFields.includes("satisfaction") ? "invalid" : ""
                    }
                  >
                    How satisfied are you with our web app overall?
                  </InputLabel>

                  {/* Select input for the satisfaction rating */}
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
                {/* TextareaAutosize for providing improvement suggestions */}
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
                {/* TextareaAutosize for additional comments or suggestions */}
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
                {/* FormControlLabel for the anonymous checkbox */}
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
                {/* Button for submitting the survey response */}
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
