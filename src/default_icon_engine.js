/**
 * Icon engine can be overriden in `forma.iconEngine`.
 */
exports.DefaultIconEngine = {
  generateIcon: function(name) {
    return new forma.html.Tag('i', {class: ['fa', 'fa-'+name]}).toHtml();
  }
};

exports.iconEngine = exports.DefaultIconEngine;