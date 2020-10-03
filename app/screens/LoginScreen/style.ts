import { StyleSheet } from 'react-native';
import Colors from 'theme/Colors';
import Dimensions from 'theme/Dimensions';

const style = StyleSheet.create({
  container: {
    width: Dimensions.screenWidth,
    paddingBottom: Dimensions.bottomSpacing,
    paddingHorizontal: Dimensions.space2x,
    backgroundColor: Colors.white,
    flex: 1,
  },
});

export default style;
