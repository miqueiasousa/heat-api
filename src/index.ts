import { serverHttp } from "./app";

serverHttp.listen(4040, () =>
  console.log("[app] Server is running on port 4040")
);
