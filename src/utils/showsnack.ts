import Snackbar from 'react-native-snackbar';
import { Colors } from '../theme';

export const showSnackbar = (text: string, type: string = 'success') => {
  Snackbar.show({
    text,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: type === 'success' ? 'green' : Colors.red,
    textColor: 'white', // Add this for better visibility
  });
};