const db = require('./config/connection');
const { User } = require('./models');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    console.log('Database refreshed.');  
    db.close();
  } catch (error) {
    console.log(error);
  }
});
