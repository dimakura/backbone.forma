QUnit.test( "basic form view", function( assert ) {
  var form = new forma.Form({
    title: 'Login',
    icon: 'user'
  });
  var formView = new forma.FormView({form: form});

  assert.ok(formView, 'form view defined');
  assert.equal(formView.form, form, 'form should be defined in formView');
});