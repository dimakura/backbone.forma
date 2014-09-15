exports.FormView = (function() {

  var initializeActions = function() {
    var self = this;
    var form = self.form;
    if ( ! form.actions ) { return; }
    form.actions.forEach(function(action) {
      self.events['click #' + action.id] = action.action;
    });
  };

  var initializeChangeListeners = function() {
    var self = this;
    var form = self.form;
    form.fields.forEach(function(field) {
      field.registerOnChangeEvent(self);
    });
  };

  var FormView = Backbone.Marionette.ItemView.extend({

    initialize: function(options) {
      if ( typeof options === 'object' ) { _.extend(this, options); }
      if ( !this.form ) { throw new exports.Error('form not defined'); }

      this.events = this.events || {};
      initializeActions.apply(this);
      initializeChangeListeners.apply(this);
    },

    getTemplate: function() {
      return _.template( this.form.toHtml() );
    },

  });

  return FormView;

})();