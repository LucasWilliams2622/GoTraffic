import { combineReducers } from 'redux';

const initialBasicInfo = {
  // Khai báo các trường thông tin cơ bản mặc định ở đây
  carNumber: null,
  selectedBrand: null,
  selectedModel: null,
  selectedSeats: null,
  selectedYear: null,
  selectedTransmission: 'manual',
  selectedFuel: 'Xăng',
};

const initialDetailsInfo = {
  // Khai báo các trường thông tin chi tiết mặc định ở đây
  description: '',
  fuelConsumption: 0,
  selectedFeatures: [],
  //images: [],
};

const basicInfoReducer = (state = initialBasicInfo, action) => {
    if (action.type === 'UPDATE_BASIC_INFO') {
      return {
        ...state,
        ...action.basicInfo,
      };
    }
    return state;
  };
  
  const detailsInfoReducer = (state = initialDetailsInfo, action) => {
    if (action.type === 'UPDATE_DETAILS_INFO') {
      return {
        ...state,
        ...action.detailsInfo,
      };
    }
    return state;
  };

const rootReducer = combineReducers({
  basicInfo: basicInfoReducer,
  detailsInfo: detailsInfoReducer,
});

export default rootReducer;
