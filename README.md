<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [squirrel-linter](#squirrel-linter)
  - [OS X TL;RD](#os-x-tlrd)
  - [Plugin installation](#plugin-installation)
  - [Squirrel installation](#squirrel-installation)
    - [Atom package](#atom-package)
  - [Electric Imp-specific features](#electric-imp-specific-features)
  - [Configuration options](#configuration-options)
    - [squirrel-linter.execPath](#squirrel-linterexecpath)
    - [squirrel-linter.verbose](#squirrel-linterverbose)
    - [squirrel-linter.run](#squirrel-linterrun)
  - [How is this different from linter-squirrel](#how-is-this-different-from-linter-squirrel)
  - [License](#license)
  - [Author](#author)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# squirrel-linter

Linter for Squirrel with support for Electric Imp platform.

Utilizes standard Squirrel compiler binary – __sq__.

## OS X TL;RD

```bash
brew install squirrel
apm install squirrel-linter
```

## Plugin installation

## Squirrel installation

In order for plugin to work, __sq__ executable should be available.

__OS X__

`brew install squirrel`

__Linux, Windows__

[http://sourceforge.net/projects/squirrel/](http://sourceforge.net/projects/squirrel/)

### Atom package

* `$ apm install squirrel-linter`

Alternatively, can be installed from the Settings pane of Atom by searching for and installing the `squirrel-linter` package.

## Electric Imp-specific features

In order to be able to run the Electric Imp code, shims are automatically added to the source:

* server.log()
* imp.wakeup()
* \_() - print JSON representation of a table
* (more to come)

## Configuration options

### squirrel-linter.execPath

\[default: "sq"\]

Electric Imp uses non-standard Squirrel compiler, so to replicate EI environment this config option can be set to use the specific compiler binary.

### squirrel-linter.verbose

\[default: true\]

If this option is set to _true_, compiler output and other debug information will be displayed in developer tools console. Press Ctrl+Cmd+J (OSX) to show the console.

### squirrel-linter.run

\[default: true\]

If this option is set to _true_, EI shims will be included and file will be executed, rather than just compiled. The output will appear in devtools console.  

## How is this different from linter-squirrel

* Uses the standard squirrel distribution, easily obtainable with Homebrew on OS X
* Allows code execution to catch runtime errors
* Adds EI-specific shims to the code

## License

MIT

## Author

Mikhail Yurasov <mikhail@electricimp.com>
