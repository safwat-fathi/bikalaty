import { stackMiddlewares } from "./lib/middlewares/stackHandler";
import { withI18n } from "./lib/middlewares/withI18n";
// import { withUser } from "./lib/middlewares/withUser";

const middlewares = [withI18n];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|icon.png|manifest.json|robots.txt).*)"],
};
