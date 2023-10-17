import * as actions from "./actionTypes";

export function fetchDataPending() {
  return {
    type: actions.FETCH_DATA_PENDING,
  };
}

export function fetchDataSuccess({ companyDetails }) {
  return {
    type: actions.FETCH_DATA_SUCCESS,
    payload: {
      companyDetails,
    },
  };
}
export function fetchDataFailure() {
  return {
    type: actions.FETCH_DATA_FAILURE,
  };
}
export function fetchData() {
  return async (dispatch) => {
    dispatch(fetchDataPending());

    try {
      const companyDetails = await fetch("data/Sample-data.json").then((res) =>
        res.json()
      );
      dispatch(fetchDataSuccess({ companyDetails }));
    } catch {
      dispatch(fetchDataFailure());
    }
  };
}
