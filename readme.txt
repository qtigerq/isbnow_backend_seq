SEQUELIZE:

Criar uma base de dados:
yarn sequelize db:create

Criar uma tabela USERS:
yarn sequelize migration:create --name=create-users

Executa as migrations criadas:
yarn sequelize db:migrate