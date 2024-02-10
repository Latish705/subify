import connectDB from './config/db.js';

const PORT = process.env.PORT || 8080;
import app from './app.js';

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.log('Error connecting to database');
    console.log(error);
  });
