QUnit.test( "basic form view", function( assert ) {
  var User = Backbone.Model.extend({
    defaults: {
      username: '',
      password: ''
    }
  });

  var model = new User({
    username: 'dimitri',
    password: 'secret',
    _errors: {
      _form: 'illegal username/password',
      username: 'illegal username'
    }
  });

  var usernameFld = new forma.TextField({ name: 'username', label: 'Username', required: true });
  var passwordFld = new forma.TextField({ name: 'password', label: 'Password', required: true, hidden: true });

  var form = new forma.Form({
    title: 'Login User',
    icon: 'user',
    fields: [ usernameFld, passwordFld ],
    actions: [
      new forma.Action({ label: 'Login', type: 'primary', icon: 'check', action: function(evt) {
        evt.preventDefault();
        loggedIn = true;
      }}),
      new forma.Action({ label: 'Cancel', icon: 'times', action: function(evt) {
        evt.preventDefault();
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

  // buttons should be inside form tag

  var $buttons = $('form button');
  assert.equal($buttons.length, 2);

  // testing actions

  var loggedIn = false;
  var canceled = false;

  assert.ok( ! loggedIn );
  assert.ok( ! canceled );

  var $loginButton = $($('#playground button')[0]);
  var $cancelButton = $($('#playground button')[1]);

  $loginButton.click();
  $cancelButton.click();

  assert.ok( loggedIn );
  assert.ok( canceled );

  // testing model changes

  $username = $('#' + usernameFld.id);
  $password = $('#' + passwordFld.id);

  $username.val('new_username'); $username.change();
  $password.val('new_password'); $password.change();

  var newModel = formView.model;
  assert.equal(newModel.get('username'), 'new_username');
});
