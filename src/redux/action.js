export const UPDATE_DETAILS_INFO = 'UPDATE_DETAILS_INFO';
export const UPDATE_BASIC_INFO = 'UPDATE_BASIC_INFO';

export const updateBasicInfo = (basicInfo) => {
  return {
    type: UPDATE_BASIC_INFO,
    basicInfo,
  };
};


export const updateDetailsInfo = (detailsInfo) => {
  return {
    type: UPDATE_DETAILS_INFO,
    detailsInfo,
  };
};
