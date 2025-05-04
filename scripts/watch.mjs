import { createServer, build } from "vite";
import { execSync } from "child_process";
import { platform } from "os";
import { execa } from "execa";

let cmd = "npm";
if (platform() === "win32") {
  cmd = "npm.cmd";
}

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
   * @type {(import('child_process').ChildProcess) | null}
   */
  let nodeGuiProcess = null;

  const address = server.httpServer?.address();
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST: address?.address,
    VITE_DEV_SERVER_PORT: address?.port,
  });

  const startNodeGui = {
    name: "nodegui-main-watcher",
    writeBundle() {
      if (nodeGuiProcess && !nodeGuiProcess.killed) {
        nodeGuiProcess?.off('close', killProcess);

        if (platform() === "win32") {
          try {
            execSync(`taskkill /F /T /PID ${nodeGuiProcess.pid}`); // windows specific
          } catch {
            console.log('error killing node-gui process');
          }
        } else {
          nodeGuiProcess.kill();
        }
      }
      
      nodeGuiProcess = execa(cmd, ["exec", "qode", "--inspect", "."], { stdio: "inherit", env });
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