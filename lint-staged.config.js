module.exports = {
  'resources/**/*.{js,jsx}': ['prettier --write', 'eslint --fix'],
  '**/*.php': [
    './vendor/bin/sail php artisan fixer:fix --config .php_cs-fixer.php --allow-risky=yes -vvv',
  ],
};
