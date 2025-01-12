import server from './infra/server';

server.listen(2222, '0.0.0.0', () => {
  console.log('SSH server is running on port 2222');
});
