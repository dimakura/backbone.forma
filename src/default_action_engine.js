exports.DefaultActionEngine = (function() {

  var Engine = function() {
    /* nothing here */
  };

  Engine.prototype.generateActionButtonTag = function(action) {
    this.action = action;
    this.iconEngine = exports.iconEngine;

    var children = [];
    if ( this.action.icon ) { children.push(this.iconEngine.generateIconTag(this.action.icon)); }
    if ( this.action.label ) { children.push(this.action.label); }

    var buttonClasses = ['forma-action', 'btn'];
    if ( this.action.type ) { buttonClasses.push('btn-'+this.action.type); }
    else { buttonClasses.push('btn-default'); }

    return new exports.html.Tag('button', { id: this.action.id, class: buttonClasses }, children);
  };

  return Engine;

})();

exports.ActionEngine = exports.DefaultActionEngine;