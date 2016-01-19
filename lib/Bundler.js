'use babel';

import fs from 'fs';

export default class Bundler {

  constructor(src, options = {}) {
    // def options
    this._options = {};

    // mix options
    Object.assign(this._options, options);

    this._src = src;
  }

  bundle() {
    const bundleName = this._src + '.bundled';
    const file = fs.readFileSync(this._src);
    const shims = fs.readFileSync(__dirname + '/shims.nut');
    fs.writeFileSync(bundleName, shims + "\n\n\n" + file);
    return bundleName;
  }

}
