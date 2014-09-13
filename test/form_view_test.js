QUnit.test( "basic form view", function( assert ) {
  var model = new Backbone.Model({
    username: 'dimitri',
    password: 'secret'
  });

  var loggedIn = false;
  var canceled = false;

  var form = new forma.Form({
    title: 'Login User',
    icon: 'user',
    fields: [
      new forma.TextField({ name: 'username', label: 'Username', required: true }),
      new forma.TextField({ name: 'password', label: 'Password', required: true, hidden: true })
    ],
    actions: [
      new forma.Action({ label: 'Login', type: 'primary', icon: 'check', action: function() {
        loggedIn = true;
      }}),
      new forma.Action({ label: 'Cancel', icon: 'times', action: function() {
        canceled = true;
      }}),
    ]
  });

  var formView = new forma.FormView({
    form: form,
    model: model,
  });

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

  // testing actions

  assert.ok( ! loggedIn );
  assert.ok( ! canceled );

  var $loginButton = $($('#playground button')[0]);
  var $cancelButton = $($('#playground button')[1]);

  $loginButton.click();
  $cancelButton.click();

  assert.ok( loggedIn );
  assert.ok( canceled );
});
