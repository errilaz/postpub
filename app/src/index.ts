import http from "http";

const app = require("./server").default;

let currentHandler = app.callback();
const server = http.createServer(currentHandler);

server.listen(3000, () => {
  console.log("🚀 started");
});

if (module.hot) {
  console.log('✅ Server-side HMR Enabled!');

  module.hot.accept('./server', async () => {
    console.log('🔁 HMR Reloading `./server`...');

    try {
      const newHandler = (await import('./server')).default.callback();
      server.removeListener('request', currentHandler);
      server.on('request', newHandler);
      currentHandler = newHandler;
    } catch (error) {
      console.error(error);
    }
  });
}