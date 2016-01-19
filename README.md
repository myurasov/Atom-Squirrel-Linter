# linter-imp

Linter for Electric Imp variety of Squirrel.

Utilizes standard Squirrel compiler binary – __sq__.

## OS X TL;RD

```bash
brew install squirrel
apm install linter-imp
```

## Plugin installation

Install from the Settings pane of Atom by searching for and installing the `linter-imp` package.

Or install from terminal with:

```
apm install linter-imp
```

## Squirrel installation

In order for plugin to work, __sq__ executable should be available.

__OS X__

`brew install squirrel`

__Linux, Windows__

[http://sourceforge.net/projects/squirrel/](http://sourceforge.net/projects/squirrel/)

### Atom package

* `$ apm install linter-imp`

## Electric Imp-specific features

In order to be able to run the Electric Imp code, shims are automatically added to the source:
 
* server.log() 
* imp.wakeup()
* (more to come)

## Configuration options

### lint-imp.execPath

\[default: "sq"\]

Electric Imp uses non-standard Squirrel compiler, so to replicate EI environment this config option can be set to use the specific compiler binary.

### lint-imp.verbose

\[default: true\]

If this option is set to _true_, compiler output and other debug infoirmation will be displayed in developer tools console. Press Ctrl+Cmd+J (OSX) to show the console. 

### lint-imp.run

\[default: true\]

If this option is set to _true_, EI shims will be incliuded and file will be executed, rather than just compiled. The output will appear in devtools console.  

## How is this different from lint-squirrel

* Uses the standard squirrel distribution, easily obtainalbe with Homebrew on OS X
* Allows code execution to catch runtime errors
* Adds EI-specific shims to the code

## License

MIT

## Author

Mikhail Yurasov <mikhail@electricimp.com>
