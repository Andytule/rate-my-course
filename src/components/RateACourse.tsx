import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import apiBaseUrl from "apiConfig";
import { toast as toastify } from "react-toastify";
type ToastType = typeof toastify;

/**
 * Labels for the different rating values.
 * @type {Object.<number, string>}
 */
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

/**
 * Functional component for rating a course.
 * @component
 */
const RateACourse = () => {
  /**
   * Hook to navigate between pages.
   * @type {function}
   */
  const navigate = useNavigate();

  /**
   * State to manage the hovered rating, form details, and rating labels.
   * @type {Object}
   * @property {string} courseName - The name of the course.
   * @property {string} courseCode - The code of the course.
   * @property {string} term - The term of the course.
   * @property {string} level - The level of the course.
   * @property {number | null} rating - The rating given to the course.
   * @property {string} schoolName - The name of the school.
   * @property {string} comments - Comments about the course.
   * @property {string} tipsAndTricks - Tips and tricks for the course.
   */
  const [hover, setHover] = React.useState(-1);
  const [details, setDetails] = useState({
    courseName: "",
    courseCode: "",
    term: "",
    level: "",
    rating: null as number | null,
    schoolName: "",
    comments: "",
    tipsAndTricks: "",
  });

  /**
   * Ensure the user is logged in; otherwise, redirect to the homepage.
   * @function
   * @name useEffect
   */
  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/rate-my-course");
    }
  }, [navigate]);

  /**
   * Validate whether all required form fields are filled.
   * @function
   * @name isFormValid
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  const isFormValid = () => {
    return (
      details.courseName &&
      details.courseCode &&
      details.term &&
      details.level &&
      details.rating !== null &&
      details.schoolName &&
      details.comments &&
      details.tipsAndTricks
    );
  };

  /**
   * Displays an error notification using the toast library.
   * @param {string} message - The error message to be displayed.
   */
  const notifyError = (message: string) =>
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });

  /**
   * Submit the course rating when the form is valid.
   * Display a success toast when the review is submitted successfully.
   * Display an error toast when the form is not valid.
   * Reset form details after successful submission.
   * @function
   * @name addCourseRating
   */
  const addCourseRating = () => {
    if (isFormValid()) {
      const body = {
        ...details,
        creator_id: sessionStorage.getItem("id"),
      };

      axios
        .post(`${apiBaseUrl}/addReview.php`, body)
        .then((res) => handleReviewResponse(res.data))
        .catch((error) =>
          notifyError(`An error occurred: ${error.message || "Unknown error"}`)
        );
    } else {
      toast.error("Please fill in all required fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const handleReviewResponse = (responseData: string) => {
    const startIndex = responseData.indexOf("{");

    if (startIndex !== -1) {
      const jsonString = responseData.substring(startIndex);

      try {
        const parsedData = JSON.parse(jsonString);
        if (parsedData.status) {
          toastify.success("Review submitted successfully!", {
            position: toastify.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          setDetails({
            courseName: "",
            courseCode: "",
            term: "",
            level: "",
            rating: null,
            schoolName: "",
            comments: "",
            tipsAndTricks: "",
          });
        } else {
          (toastify.error as ToastType)("Invalid Review Submission");
        }
      } catch (error) {
        (toastify.error as ToastType)(
          `An error occurred: ${(error as Error).message || "Unknown error"}`
        );
      }
    } else {
      // If '{' character is not found, handle it as an error
      toastify.error("Invalid server response format", {
        position: toastify.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  /**
   * Handle form submission.
   * @function
   * @name submitHandler
   * @param {Object} e - The form event.
   */
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    addCourseRating();
  };

  /**
   * Render the RateACourse component.
   * @function
   * @name render
   * @returns {ReactElement} - JSX element representing the RateACourse component.
   */
  return (
    <Container>
      <Box mt={2} textAlign="center">
        <Grid container justifyContent="center">
          <Typography
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
              fontFamily: "Roboto",
              fontWeight: 400,
              fontSize: "1.5rem",
            }}
            variant="h5"
          >
            Enter Course Feedback
          </Typography>
        </Grid>

        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <form onSubmit={submitHandler}>
            <Grid
              alignItems="center"
              container
              justifyContent="center"
              columnSpacing={4}
            >
              <Grid
                container
                direction="column"
                item
                justifyContent="center"
                xs={4}
              >
                <TextField
                  label="Course Name"
                  margin="normal"
                  variant="outlined"
                  value={details.courseName}
                  onChange={(e) =>
                    setDetails({ ...details, courseName: e.target.value })
                  }
                />
                <TextField
                  label="Course Code"
                  margin="normal"
                  variant="outlined"
                  value={details.courseCode}
                  onChange={(e) =>
                    setDetails({ ...details, courseCode: e.target.value })
                  }
                />
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Term
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={details.term}
                    onChange={(e) =>
                      setDetails({ ...details, term: e.target.value })
                    }
                    label="Term"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Winter 2022"}>Winter 2022</MenuItem>
                    <MenuItem value={"Spring 2022"}>Spring 2022</MenuItem>
                    <MenuItem value={"Summer 2022"}>Summer 2022</MenuItem>
                    <MenuItem value={"Fall 2022"}>Fall 2022</MenuItem>
                    <MenuItem value={"Winter 2023"}>Winter 2023</MenuItem>
                    <MenuItem value={"Spring 2023"}>Spring 2023</MenuItem>
                    <MenuItem value={"Summer 2023"}>Summer 2023</MenuItem>
                    <MenuItem value={"Fall 2023"}>Fall 2023</MenuItem>
                    <MenuItem value={"Winter 2024"}>Winter 2024</MenuItem>
                    <MenuItem value={"Spring 2024"}>Spring 2024</MenuItem>
                    <MenuItem value={"Summer 2024"}>Summer 2024</MenuItem>
                    <MenuItem value={"Fall 2024"}>Fall 2024</MenuItem>
                    <MenuItem value={"Winter 2025"}>Winter 2025</MenuItem>
                    <MenuItem value={"Spring 2025"}>Spring 2025</MenuItem>
                    <MenuItem value={"Summer 2025"}>Summer 2025</MenuItem>
                    <MenuItem value={"Fall 2025"}>Fall 2025</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Level
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={details.level}
                    onChange={(e) =>
                      setDetails({ ...details, level: e.target.value })
                    }
                    label="Level"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"College"}>College</MenuItem>
                    <MenuItem value={"University"}>University</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="hover-feedback"
                    value={details.rating}
                    precision={0.5}
                    getLabelText={(value: number) =>
                      `${value} Star${value !== 1 ? "s" : ""}, ${
                        labels[value as keyof typeof labels]
                      }`
                    }
                    onChange={(e, newValue) =>
                      setDetails({ ...details, rating: newValue })
                    }
                    onChangeActive={(event, newHover) => {
                      setHover(newHover as number);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {details.rating !== null && (
                    <Box sx={{ ml: 2 }}>
                      {
                        labels[
                          hover !== -1
                            ? (hover as keyof typeof labels)
                            : (details.rating as keyof typeof labels)
                        ]
                      }
                    </Box>
                  )}
                </Box>
                <TextField
                  label="School Name"
                  margin="normal"
                  variant="outlined"
                  value={details.schoolName}
                  onChange={(e) =>
                    setDetails({ ...details, schoolName: e.target.value })
                  }
                />
              </Grid>
              <Grid
                container
                direction="column"
                item
                justifyContent="center"
                xs={4}
              >
                <TextField
                  label="Comments"
                  id="standard-multiline-static"
                  margin="normal"
                  variant="outlined"
                  value={details.comments}
                  multiline
                  rows={5}
                  onChange={(e) =>
                    setDetails({ ...details, comments: e.target.value })
                  }
                />
                <TextField
                  label="Tips & Tricks"
                  id="standard-multiline-static"
                  margin="normal"
                  variant="outlined"
                  value={details.tipsAndTricks}
                  multiline
                  rows={5}
                  onChange={(e) =>
                    setDetails({ ...details, tipsAndTricks: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <br></br>
              <Button color="primary" variant="contained" type="submit">
                Submit Feedback
              </Button>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RateACourse;
