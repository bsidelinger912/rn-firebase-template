export type LoggingMethod = (message?: any, ...optionalParams: any[]) => void;

export interface LoggingMethods {
  log: (message: string) => void;
  error: (error: Error | string) => void;
}

export type Transport = LoggingMethods & {
  name: string;
};

class Logger implements LoggingMethods {
  private transports: Transport[] = [];

  public addTransport(transport: Transport) {
    this.transports.push(transport);
  }

  public setTransports(transports: Transport[]) {
    this.transports = transports;
  }

  log(message: string) {
    this.transports.forEach(transport => {
      transport.log(message);
    });
  }

  error(error: Error | string) {
    this.transports.forEach(transport => {
      transport.error(error);
    });
  }
}

export default new Logger();
