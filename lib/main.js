"use babel";

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


    //const regex = "(?<line>\\d+):(?<col>\\d+):(\{(?<lineStart>\\d+):(?<colStart>\\d+)\-(?<lineEnd>\\d+):(?<colEnd>\\d+)}.*:)? (?<type>[\\w \\-]+): (?<message>.*)";

    const regex = "(?<type>[A-Z\\s]+).*";

    return {
      name: "sq",
      grammarScopes: ["source.nut"],
      scope: "file",
      lintOnFly: false,
      lint: (activeEditor) => {

        const verbose = atom.config.get("linter-sq.verboseDebug");
        const command = atom.config.get("linter-sq.execPath");
        const file = activeEditor.getPath();

        return helpers.exec(command, [file], {stream: null})
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
                  filePath: file,
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
