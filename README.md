<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [squirrel-linter](#squirrel-linter)
  - [OS X TL;RD](#os-x-tlrd)
  - [Plugin Installation](#plugin-installation)
  - [Squirrel Installation](#squirrel-installation)
    - [Atom Package](#atom-package)
      - [Dependencies](#dependencies)
  - [Usage](#usage)
  - [Electric Imp-specific Features](#electric-imp-specific-features)
  - [Convenience Features](#convenience-features)
  - [Configuration Options](#configuration-options)
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
apm install language-squirrel linter squirrel-linter
```

## Plugin Installation

## Squirrel Installation

In order for plugin to work, __sq__ executable should be available.

__OS X__

`brew install squirrel`

__Linux, Windows__

[http://sourceforge.net/projects/squirrel/](http://sourceforge.net/projects/squirrel/)

### Atom Package

* `$ apm install squirrel-linter`

Alternatively, package can be installed from the Settings pane of Atom by searching for and installing the `squirrel-linter` package.

#### Dependencies

You need **linter** and **language-squirrel** packages installed as well. If you don't have them, run:

* `$ apm install linter language-squirrel`

or install them via the Settings pane.

## Usage

After installation, you will see error highlighted in the editor and the output in the console. (To view the console, press Cmd+Alt+I on OS X, or Ctrl+Alt+I on Windows.)

## Electric Imp-specific Features

In order to be able to run the Electric Imp code, shims are automatically added to the source:

* server.log(*var*)
* imp.wakeup(*timeout*, *callback*)
* imp.cancelwakeup(*timeout_id*)

## Convenience Features

* \_(*var*) – converts a variable to JSON
* \_\_(*var*) – prints a variable as JSON

## Configuration Options

### squirrel-linter.execPath

\[default: "sq"\]

Electric Imp uses non-standard Squirrel compiler, so to replicate EI environment this config option can be set to use the specific compiler binary.

### squirrel-linter.verbose

\[default: true\]

If this option is set to _true_, compiler output and other debug information will be displayed in developer tools console. To show the console press Ctrl+Cmd+I OS X, or Ctrl+Alt+I on Windows.

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

Mikhail Yurasov <me@yurasov.me>
