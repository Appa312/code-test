import React, { useState, useEffect } from 'react'
import './CompanySummaryView.css';
import EmployeeDetails from "./EmployeeDetails";
import { fetchData } from "../../redux/actions";
import { connect } from "react-redux";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";


const CompanySummaryView = ({ fetchCompanyData, companyDetails }) => {
  const [employeeData, setEmployeeData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {
    if (companyDetails) {
      setEmployeeData(companyDetails);
      setFilteredData(companyDetails.employees);
    }
  }, [companyDetails]);

  const handlePrevPage = () => {
    setCurrentPage((prevpage) => Math.max(prevpage - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    setCurrentPage((prevpage) => Math.min(prevpage + 1, totalPages));
  };

  const handleSearch = () => {
    const filteredItems = employeeData.employees?.filter((employee) => {
      const { firstName, lastName, id, address, contactNo } = employee;
      const searchTermLower = searchTerm.toLowerCase();
      return (
        firstName.toLowerCase().includes(searchTermLower) ||
        lastName.toLowerCase().includes(searchTermLower) ||
        id.toLowerCase().includes(searchTermLower) ||
        address.toLowerCase().includes(searchTermLower) ||
        contactNo.includes(searchTerm)
      );
    });
    setFilteredData(filteredItems || []);
    setCurrentPage(1);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleClosePopup = () => {
    setSelectedEmployee(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="company-container">
      <div className="company-header">
        <div className="company-title">
          <h2>{employeeData.companyInfo?.companyName}</h2>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{employeeData.companyInfo?.companyMotto}</h2>
          <h2>
            {new Date(
              employeeData.companyInfo?.companyEst
            ).toLocaleDateString()}
          </h2>
        </div>
      </div>
      <div
        className="search-filter"
        style={{ justifyContent: "end", display: "flex" }}
      >
        <TextField
          variant="outlined"
          className="text-field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="outlined"
          style={{
            textTransform: "none",
            color: "#000",
            borderColor: "#000",
            marginLeft: "10px",
            width: "80px",
            height: "30px",
          }}
          onClick={handleSearch}
        >
          search
        </Button>
      </div>
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Cotact No</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems &&
                currentItems.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell
                      onClick={() => handleEmployeeClick(employee)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={employee.avatar}
                          alt="Avatar"
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                        />
                        {`${employee.firstName} ${employee.lastName}`}
                      </div>
                    </TableCell>
                    <TableCell>{employee.contactNo}</TableCell>
                    <TableCell>{employee.address}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="outlined"
          style={{
            textTransform: "none",
            color: "#000",
            borderColor: "#000",
            marginRight: "20px",
            width: "80px",
            height: "30px",
          }}
        >
          Prev
        </Button>
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, i) => i + 1
        ).map((page) => (
          <button
            key={page}
            style={{
              marginRight: "10px",
            }}
            // variant={currentPage === page ? "contained" : "outlined"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <Button
          onClick={handleNextPage}
          variant="outlined"
          style={{
            textTransform: "none",
            color: "#000",
            borderColor: "#000",
            marginLeft: "10px",
            width: "80px",
            height: "30px",
          }}
          disabled={
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
          }
        >
          Next
        </Button>
      </div>
      <EmployeeDetails
        employee={selectedEmployee}
        open={!!selectedEmployee}
        onClose={handleClosePopup}
      />
    </div>
  );
};
 // redux
  function mapStateToProps(state) {debugger;
  return {
    companyDetails: state.company.companyDetails
  };
};
 
export default connect(mapStateToProps, {
  fetchCompanyData: fetchData,
})(CompanySummaryView);
