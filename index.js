/* jshint node: true */
'use strict';

module.exports = {
  name: 'embric',
  
  isDevelopingAddon: function() {
    return true;
  },
  
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/fabric/dist/fabric.js');
  }
};
