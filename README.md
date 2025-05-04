# STAGE
sequelize
await sequelize.sync({ alter: true });
await sequelize.sync({ force: true }); //for dropping all tables and data