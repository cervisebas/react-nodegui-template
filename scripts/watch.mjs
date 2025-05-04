import { createServer, build } from "vite";
import { platform } from "os";
import { execa, execaCommandSync } from "execa";

const isWindows = platform() === 'win32';
const cmd = isWindows ? 'npm.cmd' : 'npm';

/**
 * @param {number} code 
 */
function killProcess(code) {
  if (code === 1 || code === 0) {
    process.exit(0);
  }
}

/**
 * @param {import('vite').ViteDevServer} server 
 */
function watch(server) {
  /**
   * @type {ReturnType<typeof execa>}
   */
  let nodeGuiProcess = null;

  const address = server.httpServer?.address();
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST: address?.address,
    VITE_DEV_SERVER_PORT: address?.port,
  });

  const startNodeGui = {
    name: "nodegui-main-watcher",
    async writeBundle() {
      if (nodeGuiProcess && !nodeGuiProcess.killed) {
        nodeGuiProcess?.removeAllListeners();

        if (isWindows) {
          try {
            execaCommandSync(`taskkill /F /T /PID ${nodeGuiProcess?.pid}`);
          } catch {
            console.log('error killing node-gui process');
          }
        } else {
          nodeGuiProcess?.kill();
        }
      }
      
      nodeGuiProcess = execa(
        cmd,
        ["exec", "qode", "--inspect", "."],
        {
          stdio: 'inherit',
          env: env,
          windowsHide: true,
        },
      );
      nodeGuiProcess?.on("close", killProcess);
    }
  };

  return build({
    mode: "development",
    plugins: [startNodeGui],
    build: {
      watch: true,
    },
  });
}

async function startServer() {
  const server = await createServer();
  await server.listen();
  
  await watch(server);
}

startServer();