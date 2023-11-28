import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/login-image.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

/**
 * Represents the details required for user authentication or registration.
 */
interface UserDetails {
  email: string;
  password: string;
  school?: string;
}

/**
 * Component for handling user login and registration.
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState<UserDetails>({
    email: "",
    password: "",
    school: "",
  });
  const [viewState, setViewState] = useState(true);

  /**
   * Handles the user login process.
   */
  const loginHandler = () => {
    if (details.email && details.password) {
      axios.post("http://localhost:80/api/login.php", details).then((res) => {
        if (res.data.status) {
          sessionStorage.setItem("id", res.data?.user?.id);
          sessionStorage.setItem("role_id", res.data?.user?.role_id);
          sessionStorage.setItem("email", res.data?.user?.email);
          notifySuccess("Login Successful");
          navigate("/RateACourse");
        } else {
          notifyError("Invalid Login Credentials");
        }
      });
    } else {
      notifyError("Invalid Login Credentials");
    }
  };

  /**
   * Handles the user registration process.
   */
  const createHandler = () => {
    if (details.email && details.password) {
      axios
        .post("http://localhost:80/api/userExists.php", details)
        .then((res) => {
          if (res.data.status !== 1) {
            axios
              .post("http://localhost:80/api/create.php", details)
              .then(() => {
                notifySuccess("User Created");
              });
          } else {
            notifyError("User already exists");
          }
        });
    } else {
      notifyError("Invalid Login Credentials");
    }
  };

  /**
   * Handles the form submission.
   * @param {FormEvent<HTMLFormElement>} e - The form event.
   */
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    viewState ? loginHandler() : createHandler();
  };

  /**
   * Handles the input change for form fields.
   * @param {ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  /**
   * Displays a success notification using the toast library.
   * @param {string} message - The success message to be displayed.
   */
  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

  /**
   * Displays an error notification using the toast library.
   * @param {string} message - The error message to be displayed.
   */
  const notifyError = (message: string) =>
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            alt="Login Background"
            src={LoginImage}
            style={{ height: "100%", objectFit: "cover", width: "100%" }}
          />
        </Grid>
        <Grid
          alignItems="center"
          container
          item
          justifyContent="space-between"
          sm={6}
          style={{ padding: 10 }}
          xs={12}
        >
          <div></div>
          <form onSubmit={submitHandler}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 400,
                minWidth: 300,
              }}
            >
              <Grid container justifyContent="center">
                {viewState ? (
                  <AccountCircleIcon fontSize="large" />
                ) : (
                  <PersonAddIcon fontSize="large" />
                )}
              </Grid>
              <TextField
                label="Email"
                margin="normal"
                variant="standard"
                name="email"
                value={details.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Password"
                margin="normal"
                type="password"
                variant="standard"
                name="password"
                value={details.password}
                onChange={handleInputChange}
              />
              <div style={{ height: 20 }} />
              <Button color="primary" variant="contained" type="submit">
                {viewState ? "Log In" : "Create Account"}
              </Button>
              <div style={{ height: 20 }} />
              <Button onClick={() => setViewState((current) => !current)}>
                {viewState ? "Sign up now" : "Have an account? Login."}
              </Button>
            </div>
          </form>
          <div></div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
