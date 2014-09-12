QUnit.test( "action with label", function( assert ) {
  var action = new forma.Action('my action');
  assert.equal(action.label, 'my action');
});

QUnit.test( "action with many properties", function( assert ) {
  var action = new forma.Action({
    label: 'my action',
    icon: 'plus',
    action: 'method_name',
  });
  assert.equal(action.label, 'my action');
  assert.equal(action.icon, 'plus');
  assert.equal(action.action, 'method_name');
});