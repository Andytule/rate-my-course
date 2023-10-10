import React, { useEffect, useState, SyntheticEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import Snackbar from "@mui/material/Snackbar";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Container } from "@mui/material";
import { Paper } from "@mui/material";

interface Details {
  courseName: string;
  courseCode: string;
  term: string;
  level: string;
  rating: number;
  schoolName: string;
  comments: string;
  tipsAndTricks: string;
}

type RatingValue = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

const labels: Record<RatingValue, string> = {
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

function getLabelText(value: RatingValue) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const EditACourse: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hover, setHover] = useState<number>(-1);
  const [details, setDetails] = useState<Details>({
    courseName: "",
    courseCode: "",
    term: "Fall 2022", // Set initial value for term
    level: "College", // Set initial value for level
    rating: 0,
    schoolName: "",
    comments: "",
    tipsAndTricks: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [selected, setSelected] = useState<number>(-1);

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (location.state?.course_name === undefined) {
      navigate("/ViewRatings");
    } else {
      setDetails({
        courseName: location.state.course_name,
        courseCode: location.state.course_code,
        term: location.state.term,
        level: location.state.level,
        rating: location.state.rating / 2,
        schoolName: location.state.school_name,
        comments: location.state.comments,
        tipsAndTricks: location.state.tips_and_tricks,
      });
      setSelected(parseInt(location.state.id));
    }
  }, [location, navigate, selected]);

  const updateCourseRating = () => {
    if (
      details.courseName &&
      details.courseCode &&
      details.term &&
      details.level &&
      details.schoolName &&
      details.comments &&
      details.tipsAndTricks
    ) {
      const editingCourse = {
        ...details,
        id: selected,
      };
      axios
        .delete(`http://localhost:80/api/deleteRating.php/${selected}`)
        .then((res) => {
          if (res.data.status) {
            const body = {
              ...editingCourse,
              creator_id: sessionStorage.getItem("id"),
            };
            axios
              .post("http://localhost:80/api/addReview.php", body)
              .then((res) => {
                if (res.data.status) {
                  setDetails({
                    courseName: "",
                    courseCode: "",
                    term: "Fall 2022",
                    level: "College",
                    rating: 0,
                    schoolName: "",
                    comments: "",
                    tipsAndTricks: "",
                  });
                  navigate("/ViewRatings");
                } else {
                  setMessage("Failed to delete Rating");
                  setOpen(true);
                }
              });
          } else {
            setMessage("Failed to delete Rating");
            setOpen(true);
          }
        });
    } else {
      setMessage("Invalid Feedback input");
    }
    setOpen(true);
  };

  const handleCloseSnackbar = (
    event: SyntheticEvent<Element, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    updateCourseRating();
  };

  return (
    <Container maxWidth="lg">
      <Box mt={2} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Edit A Course
        </Typography>

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
                  <InputLabel id="demo-simple-select-outlined-label">
                    Term
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={details.term}
                    onChange={(e) =>
                      setDetails({ ...details, term: e.target.value })
                    }
                    label="Term"
                    sx={{ textAlign: "left" }}
                  >
                    <MenuItem value="Fall 2022">Fall 2022</MenuItem>
                    <MenuItem value="Winter 2023">Winter 2023</MenuItem>
                    <MenuItem value="Spring 2023">Spring 2023</MenuItem>
                    <MenuItem value="Summer 2023">Summer 2023</MenuItem>
                    {/* Add more terms as needed */}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Level
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={details.level}
                    onChange={(e) =>
                      setDetails({ ...details, level: e.target.value })
                    }
                    label="Level"
                    sx={{ textAlign: "left" }}
                  >
                    <MenuItem value="College">College</MenuItem>
                    <MenuItem value="University">University</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    {/* Add more level options as needed */}
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
                      getLabelText(value as RatingValue)
                    }
                    onChange={(e, newValue) =>
                      setDetails({ ...details, rating: newValue ?? 0 })
                    }
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {details.rating !== null && (
                    <Box sx={{ ml: 2 }}>
                      {
                        labels[
                          (hover !== -1 ? hover : details.rating) as RatingValue
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
                Edit Feedback
              </Button>
            </Grid>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={(event, reason) =>
                handleCloseSnackbar(
                  event as React.SyntheticEvent<Element, Event>,
                  reason as SnackbarCloseReason
                )
              }
              message={message}
            />
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditACourse;
