import {Transport} from '../';

const consoleTransport: Transport = {
  name: 'Console',
  log(message: string) {
    console.log(message);
  },
  error(error: Error | string) {
    console.error(error);
  },
};

export default consoleTransport;
