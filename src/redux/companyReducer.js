import * as actions from "./actionTypes";

const initialState = {
  loading: false,
  companyDetails: null,
};

export default function companyReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.FETCH_DATA_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.FETCH_DATA_SUCCESS: {
      const { companyDetails } = payload;

      return {
        ...state,
        loading: false,
        companyDetails,
      };
    }

    case actions.FETCH_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}
