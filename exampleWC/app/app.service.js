const serviceName = "AppService";

export class AppService {
  constructor() {
    console.log("[AppService] New Instance");
    this.message = "Hello, world!";
  }
}

export default [serviceName, AppService];
