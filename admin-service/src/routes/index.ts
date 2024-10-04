import { Router } from "express"

import v1Router from "./v1"

const apiRoutes = Router()

apiRoutes.use("/v1", v1Router)

export default apiRoutes
