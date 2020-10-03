import { StyleSheet } from 'react-native';
import Colors from 'theme/Colors';
import Dimensions from 'theme/Dimensions';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Dimensions.space2x,
    width: '100%',
    flex: 1,
  },
  inputContainer: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    marginBottom: Dimensions.space2x,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    marginBottom: Dimensions.space2x,
    padding: Dimensions.space1x,
  },
});

export default style;
