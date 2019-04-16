import { message } from "antd";
import dva from "dva";
import createLoading from "dva-loading";
//import createHistory from 'history/createBrowserHistory'
import "babel-polyfill";

// 1. Initialize
const app = dva({
  history: require("history").createHashHistory(),
  onError(err) {
    message.error(err);
  }
});
// 2. Plugins
app.use(createLoading());
// 3. Model
app.model(require("./models/app"));
// 4. Router
app.router(require("./router"));
// 5. Start
app.start("#root");
