import Snackbar from 'react-native-snackbar';
import { Colors } from '../theme';

export const showSnackbar = (text: string,success:string) => {
  Snackbar.show({
    text,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: success === 'success' ? 'green' : Colors.red,
  });
};
