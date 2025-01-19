import 'dotenv/config';
import server from './infra/server';

// @ts-expect-error process.env.SERVER_PORT is a string
server.listen(process.env.SERVER_PORT, '0.0.0.0', () => {
  console.log(`SSH server is running on port ${process.env.SERVER_PORT}`);
});
