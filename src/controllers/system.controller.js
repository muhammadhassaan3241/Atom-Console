export const getHealthCheck = async (request, response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'System is up and running',
    timestamp: new Date().toUTCString(),
  };
  try {
    response.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    response.status(503).send();
  }
};
