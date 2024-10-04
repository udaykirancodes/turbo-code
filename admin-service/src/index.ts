import app from './app'
import { serverConfig } from './config'

app.listen(serverConfig.PORT, () => {
  console.log(`Server Started @`, serverConfig.PORT)
})
