exports.FormView = (function() {

  var initializeActions = function() {

    var self = this;

    var form = self.form;
    if ( ! form.actions ) { return; }

    self.events = self.events || {};

    form.actions.forEach(function(action) {
      self.events['click #' + action.id] = action.action;
    });
  };

  var FormView = Backbone.Marionette.ItemView.extend({

    initialize: function(options) {

      if ( typeof options === 'object' ) { _.extend(this, options); }
      if ( !this.form ) { throw new exports.Error('form not defined'); }
      initializeActions.apply(this);

    },

    getTemplate: function() {
      return _.template( this.form.toHtml() );
    }

  });

  return FormView;

})();