import angular from "angular";

import demo from "./components/demo";
import example from "./components/example";
import quoteCard from "./components/quote-card";

import appService from "./app.service";

export default angular.module("myApp", [demo.name, example.name, quoteCard.name]).service(...appService);
