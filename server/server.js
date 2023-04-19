const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const errorController = require('./shared/errorController');
const authRouter = require('./auth/authRouter');
const config = require('./config');
const dbConfig = require('./config/dbConfig');
const adminRouter = require('./admin/adminRouter');
const userRouter = require('./user/userRouter');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(userRouter);
app.use((req, res) => {
  res.status(404).json({
    message: 'Desired request cannot be fulfilled !',
  });
});
app.use(errorController);

async function server() {
    try {
       await dbConfig();
        app.listen(config.port, () => {
            console.log(`Server is running at port: ${config.port}`);
        });
    } catch (err) {
      process.exit(1);
    }
  }
  
server();
  
