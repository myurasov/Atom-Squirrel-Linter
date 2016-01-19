"use babel";

import Bundler from './Bundler';

export default {
  config: {
    execPath: {
      type: "string",
      default: "sq"
    },
    verboseDebug: {
      type: "boolean",
      default: true
    }
  },

  activate: () => {
    require('atom-package-deps').install('linter-sq');

    if (atom.config.get("linter-sq.verboseDebug")) {
      console.log('%c[lint-sq activated]', 'color: blue; font-weight: bold');
    }
  },

  provideLinter: () => {
    const helpers = require("atom-linter");

    return {
      name: "imp",
      grammarScopes: ["source.nut"],
      scope: "file",
      lintOnFly: false,
      lint: (activeEditor) => {

        const verbose = atom.config.get("linter-imp.verboseDebug");
        const command = atom.config.get("linter-imp.execPath");
        const fileOriginal = activeEditor.getPath();
        const fileBundled = (new Bundler().bundle());

        return helpers.exec(command, [fileBundled], {stream: null})
          .then(output => {

              // log sq command output to console
              if (verbose) {
                if (output.stdout) {
                  console.log('%c[lint-sq stdout]:', 'font-weight: bold; color: blue');
                  console.log(output.stdout);
                }

                if (output.stderr) {
                  console.log('%c[lint-sq stderr]:', 'font-weight: bold; color: red');
                  console.log(output.stderr);
                }
              }

              let m, message, range, res;

              if (
                output.stderr
              ) {

                if (m = /AN ERROR HAS OCCURED \[(.*)\]/.exec(output.stderr)) {

                  message = m[1];

                  // look for line
                  if (m = /line \[(\d+)\]/.exec(output.stderr)) {
                    const line = parseInt(m[1]);
                    range = [[line - 1, 0], [line - 1, Infinity]];
                  }

                } else if (m = /line = \((\d+)\) column = \((\d+)\) : (.*)/.exec(output.stderr)) {

                  const line = parseInt(m[1]);
                  const col = parseInt(m[2]);
                  message = m[3];
                  range =  [[line - 1, col], [line - 1, col]];

                } else {
                  return [];
                }

                res = [{
                  type: "Error",
                  text: message,
                  filePath: fileOriginal, // todo: subtract # of shim lines
                  range
                }];

                if (verbose) {
                  console.log('result', res);
                }

                // we're screwed
                return res;

              } else {
                // we're okay
                return [];
              }
            }
          );
      }
    };
  }
};
