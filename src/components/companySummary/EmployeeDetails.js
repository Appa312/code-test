import React from "react";
import {
  Dialog,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./EmployeeDetails.css";

const EmployeeDetails = ({ employee, open, onClose }) => {
  if (!employee) {
    return null;
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "600px",
            maxHeight: "700px",
            
          },
        },
      }}
      PaperProps={{
        sx: {
          minHeight: "200px",

        },
      }}
    >
      <div style={{ display: "flex", padding: "10px" }}>
        <div style={{ alignItems: "center" }}>
          <img
            src={employee.avatar}
            alt="Avatar"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <div>
            <Typography variant="subtitle1">{employee.jobTitle}</Typography>
            <Typography variant="subtitle1">{employee.age}</Typography>
            <Typography variant="subtitle1">
              {new Date(employee.dateJoined).toLocaleDateString()}
            </Typography>
          </div>
        </div>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <div style={{ marginTop: "30px", marginLeft: "20px" }}>
          <Typography variant="h6">
            {`${employee.firstName} ${employee.lastName}`}
          </Typography>
          <hr />
          <Typography>{employee.bio}</Typography>
        </div>
      </div>
    </Dialog>
  );
};
export default EmployeeDetails;
