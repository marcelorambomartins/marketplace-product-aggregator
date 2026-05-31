export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  externalApi: {
    url: process.env.EXTERNAL_API_URL || 'https://dummyjson.com',
    timeout: parseInt(process.env.EXTERNAL_API_TIMEOUT, 10) || 5000,
  },
});
