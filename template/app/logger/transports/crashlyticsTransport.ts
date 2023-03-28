import crashlytics from '@react-native-firebase/crashlytics';
import {Transport} from '../';

const crashlyticsTransport: Transport = {
  name: 'Crashlytics',
  log(message: string) {
    crashlytics().log(message);
  },
  error(error: Error | string) {
    crashlytics().recordError(
      typeof error === 'string' ? new Error(error) : error,
    );
  },
};

export default crashlyticsTransport;
