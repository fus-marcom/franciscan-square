var plan = require('flightplan');

// configuration
plan.target('production', [
  {
    host: 'franciscansquare.com',
    username: 'jweigelfus29',
    port: 22,
    agent: process.env.SSH_AUTH_SOCK
  },
]);

// run commands on localhost
plan.local(function(local) {
  // run gulp dis
  local.log('Run build');
  local.exec('gulp dist');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files dist/', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '~/www/dist/');
});

// run commands on remote hosts
plan.remote(function(remote) {
  remote.log('Move folder to site root');
  remote.exec('cp -fRu ~/www/dist/dist/* ~/www/');
  remote.exec('rm -rf ~/www/dist/*');
});
