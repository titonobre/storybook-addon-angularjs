import appModule from "../src/app.module";

// override the service already defined in the module
appModule.factory("AppService", function AppServiceFactory() {
  return {
    message: "Hi Dave!",
  };
});
