import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
} from "@mui/material";

interface User {
  id: number;
  password: string;
  email: string;
  role_id: number;
}

/**
 * Represents the Users component that displays a list of users.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered JSX element for the Users component.
 */
const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:80/api/getUsers.php");
        const data = await response.json();

        if (data.status === 1) {
          setUsers(data.data);
        } else {
          console.error("Failed to retrieve user data.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  /**
   * Handles a change in the current page in pagination.
   *
   * @param {unknown} event - The event object.
   * @param {number} newPage - The new page number.
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Handles a change in the number of rows per page in pagination.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event object.
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice the users array based on the current page and rows per page
  const slicedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom>
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Users;
