const { encryptPassword } = require('../../auth/authUtil');
const dbConfig = require('../../config/dbConfig');
const User = require('../userModel');
const userRoles = require('../roles');
const fs = require('fs/promises');
const path = require('path');
const users = [
  {
    id: 1,
    emailId: 'hary@gmail.com',
    password: '6888ggfb7',
  },
  {
    id: 2,
    emailId: 'marry@gmail.com',
    password: 'hjhjdb4kl',
  },
  {
    id: 3,
    emailId: 'mark@gmail.com',
    password: 'mark@gmail.com',
  },
  {
    id: 4,
    emailId: 'fales@gmail.com',
    password: 'jikdfh454j',
  },
  {
    id: 5,
    emailId: 'cs@gmail.com',
    password: 'kjkfdkj448',
  },
  {
    id: 6,
    emailId: 'sing@gmail.com',
    password: 'y8jdf8jd',
  },
  {
    id: 7,
    emailId: 'raj@gmail.com',
    password: 'njjxh3538j',
  },
  {
    id: 8,
    emailId: 'kumar@gmail.com',
    password: 'kdzkm4r9dk',
  },
  {
    id: 9,
    emailId: 'sushil@gmail.com',
    password: 'oskdu3j9d',
  },
  {
    id: 10,
    emailId: 'twist@gmail.com',
    password: '99dh4bf8d',
  }
];
(async function () {
  let mongoose;
  try {
    const finalUsers = await Promise.all(
      users.map(({ id, ...user }) => {
        return new Promise((resolve, reject) => {
          encryptPassword(user.password).then((encryptedPassword) => {
            resolve({
              ...user,
              password: encryptedPassword,
              role: Object.values(userRoles)[Math.floor(Math.random() * 2)],
            });
          });
        });
      })
    );
    console.log(finalUsers)
    mongoose = await dbConfig();
    await User.insertMany(finalUsers);
    await fs.writeFile(
      path.resolve(process.cwd(), 'users.txt'),
      JSON.stringify(
        users.map((user, index) => ({
          ...user,
          role: finalUsers[index].role,
        })),
        null,
        4
      )
    );
  } catch (err) {
  } finally {
    await mongoose.disconnect();
  }
})();
