import React from "react";
import { render, screen } from "@testing-library/react";
import EmployeeDetails from "./EmployeeDetails";

describe("EmployeeDetails Component", () => {
  it("renders employee details", () => {
    const employee = {
      id: "0d4423bc-929f-48e8-b70a-685e4b59c9ef",
      avatar: "https://randomuser.me/api/portraits/med/men/11.jpg",
      firstName: "Hugo",
      lastName: "Grady",
      jobTitle: "Legacy Markets Strategist",
      contactNo: "0443 060 320"
    };

    render(
      <EmployeeDetails employee={employee} open={true} onClose={() => {}} />
    );

    expect(screen.getByText("Hugo Grady")).toBeInTheDocument();
    expect(screen.getByText("Legacy Markets Strategist")).toBeInTheDocument();
  });
});