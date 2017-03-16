"use babel";

import Bundler from "./Bundler";

export default {
  config: {
    execPath: {
      type: "string",
      default: "sq"
    },
    verbose: {
      type: "boolean",
      default: true
    },
    run: {
      type: "boolean",
      default: true
    }
  },

  activate() {
    require('atom-package-deps').install('squirrel-linter');

    if (atom.config.get("squirrel-linter.verbose")) {
      console.log('%c[squirrel-linter activated]', 'color: blue; font-weight: bold');
    }
  },

  provideLinter() {
    const atomLinter = require("atom-linter");

    return {
      name: "squirrel",
      grammarScopes: ["source.nut"],
      scope: "file",
      lintOnFly: false,
      lint: (activeEditor) => {

        // config options
        const verbose = atom.config.get("squirrel-linter.verbose");
        const run = atom.config.get("squirrel-linter.run");
        const execPath = atom.config.get("squirrel-linter.execPath");

        // original file path
        const filePathOriginal = activeEditor.getPath();

        let filePath, // actual file path
          args, // compiler args
          linesBeforeOriginalFile; // # of lines before original source for correct error offset calculation

        if (run) /* run - need ei platform shims */ {

          // bundle shim+source
          let bundler = new Bundler([__dirname + '/shims.nut', filePathOriginal], filePathOriginal + '.bundled');
          bundler.bundle();
          filePath = bundler.output;
          args = [filePath];
          linesBeforeOriginalFile = bundler.sourceLines[0];

        } else /* just compile */ {

          filePath = filePathOriginal;
          args = [' -c ', filePath];
          linesBeforeOriginalFile = 0;

        }

        // run compiler

        return atomLinter.exec(execPath, args, {stream: null /* passes both STDOUT/STDERR streams*/})
          .then(output => {

              // log sq command output to console

              if ((verbose || run /* if we run, we want console output */) && output.stdout) {
                console.log('%c[squirrel-linter stdout]:', 'font-weight: bold; color: blue');
                console.log(output.stdout);
              }

              if ((verbose || run /* if we run, we want console output */) && output.stderr) {
                console.log('%c[squirrel-linter stderr]:', 'font-weight: bold; color: red');
                console.log(output.stderr);
              }

              let matches,
                errorMessage,
                range,
                res;

              if (
                output.stderr
              ) {

                if (matches = /AN ERROR HAS OCCURED \[(.*)\]/.exec(output.stderr) /* runtime error */) {

                  errorMessage = matches[1];

                  // look for line
                  if (matches = /line \[(\d+)\]/.exec(output.stderr)) {
                    const line = parseInt(matches[1]);
                    range = [[line - 1 - linesBeforeOriginalFile, 0], [line - 1 - linesBeforeOriginalFile, Infinity]];
                  }

                } else if (matches = /line = \((\d+)\) column = \((\d+)\) : (.*)/.exec(output.stderr) /* compiler error */) {

                  const line = parseInt(matches[1]);
                  const col = parseInt(matches[2]);
                  errorMessage = matches[3];
                  range = [[line - 1 - linesBeforeOriginalFile, col - 1], [line - 1 - linesBeforeOriginalFile, col]];

                } else {
                  return [];
                }

                res = [{
                  type: "Error",
                  text: errorMessage,
                  filePath: filePathOriginal,
                  range
                }];

                // we're screwed
                return res;

              } else {
                // we're okay
                return [];
              }
            }
          )
      }
    };
  }
};
