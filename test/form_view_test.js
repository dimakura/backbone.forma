QUnit.test( "basic form view", function( assert ) {
  var model = new Backbone.Model({
    username: 'dimitri',
    password: 'secret'
  });

  var form = new forma.Form({
    title: 'Login User',
    icon: 'user',
    fields: [
      new forma.TextField({ name: 'username', label: 'Username', required: true }),
      new forma.TextField({ name: 'password', label: 'Password', required: true, hidden: true })
    ],
    actions: {
      submit: {
        label: 'Login'
      }
    }
  });
  var formView = new forma.FormView({ form: form, model: model });

  assert.ok(formView, 'form view defined');
  assert.equal(formView.form, form, 'form should be defined in formView');

  formView.$el = $('#playground');
  formView.render();

  var $form = $('#playground .forma-form');
  assert.equal($form.length, 1);
});