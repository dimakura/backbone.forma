/**
 * Form engine can be overriden in `forma.FormEngine`, it should be accessible via `new forma.FormEngine()`.
 */
exports.DefaultFormEngine = (function() {

  var generateTitleTag = function() {
    var title = this.form.title
      , icon = this.form.icon;

    if (title) {
      var children = []
        , iconTag
        , titleTag;

      if (icon) {
        iconTag = this.iconEngine.generateIconTag(icon, { class: 'forma-title-icon' });
        children.push(iconTag);
      }

      if(title) {
        children.push(new exports.html.Tag('span', {class: 'forma-title-text'}, title));
      }
      
      return new exports.html.Tag('div', {class: 'forma-title'}, children);
    }
  };

  var Engine = function() {
    /* nothing here */
  };

  Engine.prototype.generateFormTag = function(form) {
    this.form = form;
    this.iconEngine = exports.iconEngine;

    var children = [
      generateTitleTag.apply(this),
    ];

    return new exports.html.Tag('div', {class: 'forma-form'}, children);
  };


  return Engine;

})();

exports.FormEngine = exports.DefaultFormEngine;