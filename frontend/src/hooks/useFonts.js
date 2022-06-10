import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    inter_black: require('../../assets/fonts/Inter-Black.ttf'),
    inter_extra_bold: require('../../assets/fonts/Inter-ExtraBold.ttf'),
    inter_bold: require('../../assets/fonts/Inter-Bold.ttf'),
    inter_semi_bold: require('../../assets/fonts/Inter-SemiBold.ttf'),
    inter_medium: require('../../assets/fonts/Inter-Medium.ttf'),
    inter_regular: require('../../assets/fonts/Inter-Regular.ttf'),
    inter_light: require('../../assets/fonts/Inter-Light.ttf'),
    inter_extra_light: require('../../assets/fonts/Inter-ExtraLight.ttf'),
    inter_thin: require('../../assets/fonts/Inter-Thin.ttf'),
  });