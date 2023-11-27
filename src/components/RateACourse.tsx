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

const RateACourse = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

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

  const addCourseRating = () => {
    if (isFormValid()) {
      const body = {
        ...details,
        creator_id: sessionStorage.getItem("id"),
      };
      axios.post("http://localhost:80/api/addReview.php", body).then((res) => {
        if (res.data.status) {
          toast.success("Review submitted successfully!", {
            position: toast.POSITION.TOP_RIGHT,
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
        }
      });
    } else {
      toast.error("Please fill in all required fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    addCourseRating();
  };

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