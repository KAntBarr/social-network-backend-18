const db = require('./config/connection');
const { User, Thought } = require('./models');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Database refreshed.');  
    db.close();
  } catch (error) {
    console.log(error);
  }
});
