import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

enum Role {
  Admin = 1,
  UserProfile = 2,
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(Role.UserProfile);

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
    <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 20, padding: 2 }}>
      <CardContent sx={{ textAlign: "left", padding: 0 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <AccountCircleIcon
              sx={{
                fontSize: 64,
                color: role === Role.Admin ? "primary.main" : "primary.main",
              }}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="flex-start">
          <List>
            <ListItem>
              <ListItemAvatar>
                <EmailIcon />
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <SupervisedUserCircleIcon />
              </ListItemAvatar>
              <ListItemText
                primary={role === Role.Admin ? "Admin" : "User Profile"}
              />
            </ListItem>
          </List>
        </Grid>

        <Grid container justifyContent="flex-end">
          <Button color="primary" variant="contained" onClick={logoutHandler}>
            Logout
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Profile;
