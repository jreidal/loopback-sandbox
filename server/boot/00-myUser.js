global.Promise = require('bluebird');

module.exports = function(app) {

  var dataSource = app.dataSources.mydatasource;
  var table = 'myUser';
  var data = [
  {
    username: 'admin',
    name: 'Administrator',
    email: 'example@example.com',
    password: '1234',
    emailVerified: true,
  }
  ];

  dataSource.automigrate(table)
  .then(function(result) {
    return;
  })
  .then(function() {
    data.map(function(table) {
      app.models.MyUser.create(table)
      .then(function(record) {
        console.log('Successfully created user!\n', record);

        if (record.username === 'admin') {
          var Role = app.models.Role;
          var RoleMapping = app.models.RoleMapping;

          Role.create({
            name: 'admin'
          })
          .then(function(role) {
            console.log('Administrator role successfully assigned to admin!');

            role.principals.create({
              principalType: RoleMapping.USER,
              principalId: record.id
            })
            .then(function(principal) {
              console.log('Principal role mapping of admin successful!');
            })
            .catch(function(err) {
              console.log('principal', err);
            })
          })
          .catch(function(err) {
            console.log('role', err);
          })
        }
        return;
      })
      .catch(function(err) {
        console.log(err);
      })
    })
  })
  .then(function() {
    console.log('Automigration of myUser completed successfully!');
    return;
  })
  .catch(function(err) {
    console.log(err);
  })

};
