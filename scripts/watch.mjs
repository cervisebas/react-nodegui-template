import { platform } from "os";
import { execa, execaCommandSync } from "execa";
import webpack from "webpack";
import WebpackConfig from "../webpack.config.js";

const isWindows = platform() === 'win32';
const cmd = isWindows ? 'npm.cmd' : 'npm';


function watch() {
  /**
   * @type {ReturnType<typeof execa>}
   */
  let nodeGuiProcess = null;

  WebpackConfig.watch = true;
  WebpackConfig.mode = 'development';
  WebpackConfig.plugins.push({
    apply: (compiler) => {
      compiler.hooks.afterEmit.tapAsync('NodeGuiMainWatcher', (compilation, callback) => {
        nodeGuiProcess?.removeAllListeners();
        
        if (nodeGuiProcess && !nodeGuiProcess.killed) {
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
            env: process.env,
            windowsHide: true,
          },
        );

        nodeGuiProcess.on('close', (code) => {
          if (code === 0 || code === 1) {
            process.exit(0);
          }
        });

        callback();
      });
    }
  });

  const compiler = webpack(WebpackConfig);

  compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        stats.toString({
          colors: true,
        }),
      );
    }
  });
}

watch();
