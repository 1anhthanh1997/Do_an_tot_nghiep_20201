import {
  CHANGE_PERSONAL_INFORMATION_FAIL,
  CHANGE_PERSONAL_INFORMATION_LOADING,
  CHANGE_PERSONAL_INFORMATION_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_FAIL,
  GET_ALL_TRIP_SUCCESS,
  GET_ALL_TRIP_LOADING,
  GET_ALL_TRIP_FAIL,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_LOADING, CREATE_TRIP_FAIL, EDIT_TRIP, EDIT_TRIP_SUCCESS, EDIT_TRIP_LOADING, EDIT_TRIP_FAIL,
} from '../actions/actionTypes';

import {STATUS} from '../../../constants';

const initUserInfo = {
  changePersonalInformation: {
    status: STATUS.DEFAULT,
    changePersonalInformationResultData: {},
    errorCode: '',
    errorMessage: '',
  },
  changePassword: {
    status: STATUS.DEFAULT,
    changePasswordResultData: {},
    errorCode: '',
    errorMessage: '',
  },
  getAllTrip: {
    status: STATUS.DEFAULT,
    getAllTripResultData: [],
    errorCode: '',
    errorMessage: '',
  },
  createTrip: {
    status: STATUS.DEFAULT,
    createTripResultData: {},
    errorCode: '',
    errorMessage: '',
  },
  editTrip: {
    status: STATUS.DEFAULT,
    editTripResultData: {},
    errorCode: '',
    errorMessage: '',
  },
};

const f02Reducer = (info = initUserInfo, action) => {
  switch (action.type) {
    case CHANGE_PERSONAL_INFORMATION_SUCCESS:
      return {
        ...info,
        changePersonalInformation: {
          status: STATUS.SUCCESS,
          changePersonalInformationResultData: action.payload,
        },
      };
    case CHANGE_PERSONAL_INFORMATION_LOADING:
      return {
        ...info,
        changePersonalInformation: {
          status: STATUS.LOADING,
        },
      };
    case CHANGE_PERSONAL_INFORMATION_FAIL:
      return {
        ...info,
        changePersonalInformation: {
          status: STATUS.ERROR,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        },
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...info,
        changePassword: {
          status: STATUS.SUCCESS,
          changePasswordResultData: action.payload,
        },
      };
    case CHANGE_PASSWORD_LOADING:
      return {
        ...info,
        changePassword: {
          status: STATUS.LOADING,
        },
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...info,
        changePassword: {
          status: STATUS.ERROR,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        },
      };
    case GET_ALL_TRIP_SUCCESS:
      return {
        ...info,
        getAllTrip: {
          status: STATUS.SUCCESS,
          getAllTripResultData: action.payload,
        },
      };
    case GET_ALL_TRIP_LOADING:
      return {
        ...info,
        getAllTrip: {
          status: STATUS.LOADING,
        },
      };
    case GET_ALL_TRIP_FAIL:
      return {
        ...info,
        getAllTrip: {
          status: STATUS.ERROR,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        },
      };
    case CREATE_TRIP_SUCCESS:
      return {
        ...info,
        createTrip: {
          status: STATUS.SUCCESS,
          createTripResultData: action.payload,
        },
      };
    case CREATE_TRIP_LOADING:
      return {
        ...info,
        createTrip: {
          status: STATUS.LOADING,
        },
      };
    case CREATE_TRIP_FAIL:
      return {
        ...info,
        createTrip: {
          status: STATUS.ERROR,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        },
      };
    case EDIT_TRIP_SUCCESS:
      return {
        ...info,
        editTrip: {
          status: STATUS.SUCCESS,
          editTripResultData: action.payload,
        },
      };
    case EDIT_TRIP_LOADING:
      return {
        ...info,
        editTrip: {
          status: STATUS.LOADING,
        },
      };
    case EDIT_TRIP_FAIL:
      return {
        ...info,
        editTrip: {
          status: STATUS.ERROR,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        },
      };
    default:
      return info; //state does not change
  }
};

export default f02Reducer;
