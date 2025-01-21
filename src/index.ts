import 'dotenv/config';
import server from './infra/server';

const PORT = process.env.SERVER_PORT ?? 2222;

// @ts-expect-error process.env.SERVER_PORT is a string
server.listen(PORT, '0.0.0.0', () => {
  console.log(`SSH server is running on port ${PORT}`);
});
