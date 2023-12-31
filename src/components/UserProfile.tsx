import React from "react";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

interface UserProfileProps {
  email: string | null;
  role: number;
  logoutHandler: () => void;
}

/**
 * Represents the user profile component.
 *
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string | null} props.email - The user's email.
 * @param {number} props.role - The user's role (1 for regular user, 2 for admin).
 * @param {Function} props.logoutHandler - Callback function for handling user logout.
 *
 * @returns {JSX.Element} The rendered JSX element for the UserProfile component.
 */
const UserProfile: React.FC<UserProfileProps> = ({
  email,
  role,
  logoutHandler,
}) => {
  return (
    <Card sx={{ minWidth: 600, marginTop: 5, padding: 2, maxHeight: "400px" }}>
      <CardContent sx={{ textAlign: "left", padding: 0 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <AccountCircleIcon
              sx={{
                fontSize: 64,
                color: role === 2 ? "primary.main" : "primary.main",
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
              <ListItemText primary={role === 2 ? "Admin" : "User Profile"} />
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

export default UserProfile;
