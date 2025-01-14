import blessed from 'blessed';
import noop from 'lodash/noop';
import { readFileSync } from 'fs';
import ssh2, { ServerChannel, type ServerConnectionListener } from 'ssh2';
import { setStreamConfig } from '../utils/ssh';
import { renderBlessedApp } from '../game';
import { joinGameRoom, createGameRoom } from '../game/engine/room-manager';

const Server = ssh2.Server;

const listener: ServerConnectionListener = (client) => {
  let stream: ServerChannel;

  client
    .on('authentication', (ctx) => {
      ctx.accept();
    })
    .on('ready', () => {
      let rows: number;
      let cols: number;
      client.once('session', (accept, _reject) => {
        accept()
          .once('pty', (accept, _reject, info) => {
            rows = info.rows;
            cols = info.cols;
            accept();
          })
          .on('window-change', (accept, _reject, info) => {
            rows = info.rows;
            cols = info.cols;
            if (stream) {
              setStreamConfig(stream, {
                rows: rows,
                columns: cols,
              });
              stream.emit('resize');
            }
            accept?.();
          })
          .once('shell', (accept, _reject) => {
            stream = accept();

            setStreamConfig(stream, {
              rows: rows || 24,
              columns: cols || 80,
              isTTY: true,
              setRawMode: noop,
            });
            stream.on('error', noop);

            const screen = blessed.screen({
              autoPadding: true,
              smartCSR: true,
              title: 'Knucklebones',
              program: blessed.program({
                input: stream,
                output: stream,
                terminal: 'xterm',
              }),
            });

            renderBlessedApp(screen, {
              onQuit: () => {
                screen.destroy();
                stream.end();
              },
              createGameRoom,
              joinGameRoom,
            });
            screen.render();
            screen.program.emit('resize');
          });
      });
    })
    .on('close', () => {
      console.log('Connection closed');
    })
    .on('error', (err) => {
      console.error(err);
    });
};

const server = new Server(
  {
    hostKeys: [readFileSync('./ssh/host-key')],
  },
  listener
);

export default server;
