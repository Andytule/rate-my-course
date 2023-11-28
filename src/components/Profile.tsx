import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import UserProfile from "./UserProfile";
import Users from "./Users";
import SurveyResponses from "./SurveyResponses";
import { useNavigate } from "react-router-dom";
import apiBaseUrl from "apiConfig";

// Enum defining user roles
enum Role {
  UserProfile = 1,
  Admin = 2,
}

// Interface for survey response data
interface SurveyResponse {
  id: number;
  satisfaction: number;
  improvements: string;
  comments: string;
  anonymous: number;
  user_id: string;
}

/**
 * Profile component for displaying user information, surveys, and admin features.
 */
const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(Role.UserProfile);
  const [surveyData, setSurveyData] = useState<SurveyResponse[]>([]);

  // Fetch survey data from the server on component mount
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/getSurveys.php`)
      .then((response) => {
        const responseData = response.data;
        const startIndex = responseData.indexOf("{");
        const endIndex = responseData.lastIndexOf("}");
        const jsonString = responseData.substring(startIndex, endIndex + 1);
        const parsedData = JSON.parse(jsonString);
        if (parsedData.status === 1) {
          setSurveyData(parsedData.data);
        } else {
          console.error("Failed to retrieve survey data.");
        }
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  // Fetch user information from sessionStorage on component mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedId = sessionStorage.getItem("id");
    const storedRoleId = sessionStorage.getItem("role_id");

    // Redirect to the login page if user information is not found in sessionStorage
    if (!storedEmail || !storedId || !storedRoleId) {
      navigate("/rate-my-course");
      return;
    }

    setEmail(storedEmail);
    setId(storedId);
    setRole(parseInt(storedRoleId, 10) as Role);
  }, [navigate]);

  // Handler for logging out the user
  const logoutHandler = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role_id");
    sessionStorage.removeItem("email");
    navigate("/rate-my-course");
  };

  return (
    <Grid container alignItems="center" sx={{ flexDirection: "column" }}>
      <Grid item xs={12} md={6}>
        <UserProfile email={email} role={role} logoutHandler={logoutHandler} />
      </Grid>

      {role === Role.Admin && (
        <Grid
          item
          xs={12}
          md={6}
          container
          sx={{ flexDirection: "row", maxWidth: "90% !important" }}
        >
          <Grid item xs={6} sx={{ padding: "10px" }}>
            <SurveyResponses surveyData={surveyData} />
          </Grid>
          <Grid item xs={6} sx={{ padding: "10px" }}>
            <Users />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Profile;
