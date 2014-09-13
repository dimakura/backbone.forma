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
    actions: [
      new forma.Action({ label: 'Login', action: 'onLogin', type: 'primary', icon: 'check' }),
      new forma.Action({ label: 'Cancel', action: 'onCancel', icon: 'times' }),
    ]
  });

  var formView = new forma.FormView({
    form: form,
    model: model,
  });

  window.formView = formView;

  assert.ok(formView, 'form view defined');
  assert.equal(formView.form, form, 'form should be defined in formView');

  formView.setElement('#playground');
  formView.render();

  var $form = $($('#playground .forma-form')[0]);
  assert.ok($form);

  var $username = $($('input[name="username"]')[0]);
  assert.ok($username);
  assert.equal($username.val(), 'dimitri');

  var $password = $($('input[name="password"]')[0]);
  assert.ok($password);
  assert.equal($password.val(), 'secret');
});
