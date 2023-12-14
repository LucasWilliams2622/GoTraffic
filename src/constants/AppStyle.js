import {
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  PixelRatio,
} from 'react-native';
import {COLOR} from './Theme';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
const scaleWidth = windowWidth / 375;
const scaleHeight = windowHeight / 667;

// Tính toán kích thước dựa trên tỷ lệ
const scaleSize = size =>
  Math.round(PixelRatio.roundToNearestPixel(size * scaleWidth));
const scaleHeightSize = size =>
  Math.round(PixelRatio.roundToNearestPixel(size * scaleHeight));

const widthScaled = scaleSize(100);
const heightScaled = scaleHeightSize(200);

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  main: {
    flex: 1,
    backgroundColor: COLOR.main,
    paddingHorizontal: 12,
  },

  // =============| ICON - IMAGE |===================
  iconSmall: {
    width: 14,
    height: 14,
  },
  iconMedium: {
    width: 16,
    height: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconBig: {
    width: 24,
    height: 24,
  },

  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    borderColor: COLOR.background,
    borderWidth: 2,
  },
  portrait: {
    height: 160,
    width: 130,
    borderRadius: 8,
  },
  logo: {
    width: 40,
    height: 40,
  },

  //=====================| TEXT - TITLE |============================
  text8: {
    fontSize: 8,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text8Bold: {
    fontSize: 8,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text10: {
    fontSize: 10,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text105: {
    fontSize: 10,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text12: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text12Medium: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text12Bold: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text14: {
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text145: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    color: COLOR.text,
  },
  text14Bold: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text16: {
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text165: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text16Bold: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text18: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text185: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text18Bold: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text20: {
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text20Bold: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text24: {
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text24Bold: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },

  text30: {
    fontSize: 30,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text30Bold: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  text500: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: COLOR.text,
  },
  errorText: {
    fontSize: 14,
    color: COLOR.red,
  },
  // ===================| ROW - COLUMN |========================
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  columnBetween: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // =================| MODAL - BOTTOMSHEET |===================
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  modalContentCenter: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 24,
    width: '80%',
    alignItems: 'flex-start',
    borderRadius: 16,
  },
  modalContentBottom: {
    backgroundColor: COLOR.background,
    paddingHorizontal: 12,
    paddingVertical: 20,
    alignItems: 'flex-start',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  //==================| SOMETHING ESLE |======================
  boxCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.borderColor,
    height: 50,
    alignItems: 'center',
    paddingLeft: 10,
  },
  viewContainer: {
    flex: 1,
    padding: 15,
  },
  dropdown: {
    margin: 15,
    marginBottom: 0,
    borderColor: '#C6C6C6',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    backgroundColor: 'white',
    padding: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 15,
  },
  cardInfo: {
    width: '100%',
    height: 'auto',
    paddingVertical: 16,
    borderTopWidth: 0.5,
    borderTopColor: COLOR.borderColor3,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainerCam: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: '100%',
    zIndex: 1,
    height: windowHeight * 0.18,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewUpload: {
    width: 170,
    height: 100,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  inputBig: {
    borderWidth: 1,
    borderColor: COLOR.borderColor2,
    borderRadius: 8,
    height: 80,
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },

  inputRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.4,
    justifyContent: 'flex-end',
  },
});
