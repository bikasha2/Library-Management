const dbConfig = require('../../config/dbConfig');
const Book = require('../bookModel');
const fs = require('fs/promises');
const path = require('path');
const bookStatus = require('../bookStatus');
const bookCategory = require('../bookCategory');
const books = [
  {
    id: 1,
    name: 'Ulysses',
    category: 'CLASSICS',
  },
  {
    id: 2,
    name: 'Don Quixote',
    category: 'HORROR',
  },
  {
    id: 3,
    name: 'One Hundred Years',
    category: 'CRIME',
  },
  {
    id: 4,
    name: 'The Great Gatsby',
    category: 'FANTASY',
  },
  {
    id: 5,
    name: 'Moby Dick',
    category: 'HISTORICAL',
  },
];
(async function () {
  let mongoose;
  try {
    const finalBooks = await Promise.all(
      books.map(({ id, ...book }) => {
        return new Promise((resolve, reject) => {
            resolve({
              ...book,
              status: Object.values(bookStatus)[Math.floor(Math.random() * 1)],
            });
          
        });
      })
    );
    console.log(finalBooks)
    mongoose = await dbConfig();
    const insertedBooks = await Book.insertMany(finalBooks);
    await fs.writeFile(
      path.resolve(process.cwd(), 'books.txt'),
      JSON.stringify(insertedBooks, null, 4)
    );
  } catch (err) {
  } finally {
    await mongoose.disconnect();
  }
})();
