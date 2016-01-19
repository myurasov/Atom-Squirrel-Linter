'use babel';

import fs from "fs";

export default class Bundler {

  /**
   * @param {[{string}]} sources
   * @param {*} options
   */
  constructor(sources, output, options = {}) {
    // def options
    this._options = {};

    // mix options
    Object.assign(this._options, options);

    this._sources = sources;
    this._output = output;
  }

  bundle() {
    // lines per each source
    this._sourceLines = [];

    // bundle contents
    let bundleContent = '';

    for (file of this._sources) {
      const fileContent = fs.readFileSync(file).toString();
      bundleContent += fileContent + '\n';
      const lines = fileContent.split('\n').length;
      this._sourceLines.push(lines);
    }

    fs.writeFileSync(this._output, bundleContent);
  }

  get output() {
    return this._output;
  }

  get sourceLines() {
    return this._sourceLines;
  }
}
