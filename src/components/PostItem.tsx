import React from "react";
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
import { Post as PostType } from "../types/types";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PostItem: React.FC<{ post: PostType }> = ({ post }) => {
  const isParent = post.parentId === null;
  const marginValue = isParent ? 2 : 1;
  const paddingValue = "0 24px";

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
              <Typography variant="h6">{post.account}</Typography>
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
              {post.date.toLocaleDateString("en-US", {
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
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostItem;
