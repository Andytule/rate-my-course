import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItemIcon,
  Avatar,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link, useNavigate } from "react-router-dom";
import { Post as PostType } from "../types/types";

const PostItem: React.FC<{ post: PostType }> = ({ post }) => {
  const [isParent, setIsParent] = useState(post.parent_id === null);
  const [marginValue, setMarginValue] = useState(isParent ? 2 : 1);
  const paddingValue = "0 24px";
  const navigate = useNavigate();

  const handleReplyClick = () => {
    navigate("/CreateThread", { state: { parentId: post.id } });
  };

  const formattedDate = new Date(post.date);

  return (
    <Card
      variant="outlined"
      style={{
        backgroundColor: isParent ? "#1976d2" : "white",
        color: isParent ? "white" : "black",
        padding: paddingValue,
      }}
      sx={{
        marginBottom: marginValue,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box display="flex" alignItems="center">
              <ListItemIcon>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemIcon>
              <Typography variant="h6">{post.email}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                textAlign: "right",
                marginRight: 0,
              }}
              variant="body2"
            >
              {formattedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Typography variant="body2" sx={{ margin: 0 }}>
          {post.content}
        </Typography>
      </CardContent>
      {post.responses && post.responses.length > 0 && (
        <List>
          {post.responses.map((response) => (
            <PostItem key={response.id} post={response} />
          ))}
        </List>
      )}
      <CardContent sx={{ padding: 0 }}>
        <Box display="flex" justifyContent="space-between">
          <Box></Box>
          <Box>
            <IconButton onClick={handleReplyClick}>
              <ReplyIcon sx={{ color: isParent ? "white" : "inherit" }} />
            </IconButton>
            <IconButton>
              <EditIcon sx={{ color: isParent ? "white" : "inherit" }} />
            </IconButton>
            <IconButton>
              <DeleteIcon sx={{ color: isParent ? "white" : "inherit" }} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostItem;
