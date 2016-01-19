# linter-sq

Squirrel langualge Atom editor, utilizing standard Squirrel compiler binary – __sq__.

## OS X TL;RD

```bash
brew install squirrel
apm install linter-sq
```

## Plugin installation

Install from the Settings pane of Atom by searching for and installing the `linter-sq` package.

Or install from terminal with:

```
apm install linter-sq
```

## Squirrel installation

In order for plugin to work, __sq__ executable should be available.

__OS X__

`brew install squirrel`

__Linux, Windows__

[http://sourceforge.net/projects/squirrel/](http://sourceforge.net/projects/squirrel/)

### Atom package

* `$ apm install squirrel-linter`

## Using with Electric Imp
 
### server.log() shim

The following code creates a shim for server.log():

```squirrel
// server.log shim
if (!("server" in getroottable())) {
  server.log <- {
    log = print
  };
}
```

### Configuring Squirrel compiler

Electric Imp uses non-standard Squirrel compiler, so to replicate EI environment __liter-sq.execPath__ config option can be set to use the specific compiler binary.

## License

MIT

## Author

Mikhail Yurasov <mikhail@electricimp.com>
