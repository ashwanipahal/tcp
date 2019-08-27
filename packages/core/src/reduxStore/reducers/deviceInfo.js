import GLOBAL_CONSTANTS from '../constants';

const DeviceInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.SET_DEVICE_INFO: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export default DeviceInfoReducer;
