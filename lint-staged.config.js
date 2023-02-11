module.exports = {
  'resources/**/*.{js,jsx}': ['prettier --write', 'eslint --fix'],
  '**/*.php': [
    './vendor/bin/sail php ./vendor/bin/pint',
  ],
};
