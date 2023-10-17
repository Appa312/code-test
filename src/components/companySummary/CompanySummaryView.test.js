import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import CompanySummaryView from "./CompanySummaryView";
import thunk from "redux-thunk"; // If you use thunk middleware

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("CompanySummaryView Component", () => {
  let store;
  let initialState;
  let mock;

  beforeEach(() => {
    initialState = {
      company: {
        companyDetails: {
          companyInfo: {
            companyName: "Richards Group",
            companyMotto: "killer incentivize synergies",
            companyEst: "2021-09-10T21:52:11.643Z",
          },
          employees: [
            {
              id: "0d4423bc-929f-48e8-b70a-685e4b59c9ef",
              avatar: "https://randomuser.me/api/portraits/med/men/11.jpg",
              firstName: "Hugo",
              lastName: "Grady",
              jobTitle: "Legacy Markets Strategist",
              contactNo: "0443 060 320",
            },
          ],
        },
      },
    };

    store = mockStore(initialState);
  });

  it("renders company name and details", async () => {
    render(
      <Provider store={store}>
        <CompanySummaryView />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Richards Group")).toBeInTheDocument();
    });
  });

  it("displays employee details when clicked", () => {
    render(
      <Provider store={store}>
        <CompanySummaryView />
      </Provider>
    );

    fireEvent.click(screen.getByText("ID"));

    expect(screen.getByText("ID")).toBeInTheDocument();
  });

  it("filters employees when searching", () => {
    render(
      <Provider store={store}>
        <CompanySummaryView />
      </Provider>
    );

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Hugo" } });

    expect(screen.getByText("Hugo Grady")).toBeInTheDocument();
  });

  it("navigates through pagination", async () => {
    render(
      <Provider store={store}>
        <CompanySummaryView />
      </Provider>
    );

    const prevButton = screen.getByText("Prev");
    const nextButton = screen.getByText("Next");

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Hugo Grady")).toBeInTheDocument();
    });

    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText("Hugo Grady")).toBeInTheDocument();
    });
  });
});
