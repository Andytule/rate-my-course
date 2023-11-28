import React, { useState } from "react";
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

// Interface for survey response data
interface SurveyResponse {
  id: number;
  satisfaction: number;
  improvements: string;
  comments: string;
  anonymous: number;
  user_id: string;
}

// Props interface for SurveyResponses component
interface SurveyResponsesProps {
  surveyData: SurveyResponse[];
}

/**
 * SurveyResponses component for displaying survey responses in a table format.
 * @param {SurveyResponsesProps} props - The props for the component.
 */
const SurveyResponses: React.FC<SurveyResponsesProps> = ({ surveyData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle change in table page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle change in number of rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice the survey data based on the current page and rows per page
  const slicedSurveyData = surveyData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Survey Responses
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Satisfaction</TableCell>
              <TableCell>Improvements</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>User ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedSurveyData.map((response) => (
              <TableRow key={response.id}>
                <TableCell>{response.id}</TableCell>
                <TableCell>{response.satisfaction}</TableCell>
                <TableCell>{response.improvements}</TableCell>
                <TableCell>{response.comments}</TableCell>
                <TableCell>
                  {response.anonymous ? "N/A" : response.user_id || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={surveyData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default SurveyResponses;
