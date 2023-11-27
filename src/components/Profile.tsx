import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import UserProfile from "./UserProfile";
import Users from "./Users";
import SurveyResponses from "./SurveyResponses";
import { useNavigate } from "react-router-dom";

enum Role {
  UserProfile = 1,
  Admin = 2,
}

interface SurveyResponse {
  id: number;
  satisfaction: number;
  improvements: string;
  comments: string;
  anonymous: number;
  user_id: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(Role.UserProfile);
  const [surveyData, setSurveyData] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:80/api/getSurveys.php")
      .then((response) => {
        if (response.data.status === 1) {
          setSurveyData(response.data.data);
        } else {
          console.error("Failed to retrieve survey data.");
        }
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedId = sessionStorage.getItem("id");
    const storedRoleId = sessionStorage.getItem("role_id");

    if (!storedEmail || !storedId || !storedRoleId) {
      navigate("/");
      return;
    }

    setEmail(storedEmail);
    setId(storedId);
    setRole(parseInt(storedRoleId, 10) as Role);
  }, [navigate]);

  const logoutHandler = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role_id");
    sessionStorage.removeItem("email");
    navigate("/");
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
