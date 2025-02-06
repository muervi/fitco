const app = require('./app');
const { sequelize } = require('./models'); 

const PORT = process.env.PORT || 5000;


sequelize.authenticate()
  .then(() => {
    console.log('DataBase ok');
    app.listen(PORT, () => {
      console.log(`Server running in port:  ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Can not connecto to db:', err.message);
    process.exit(1);  
  });
