
function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id);
  return found;
}

function findBookById(books, id) {
  let found = books.find((book) => book.id === id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  //create three arrs including return arr
  const result = [];
  let booksBorrowed = [];
  let returnedBooks = [];
  
  //filter borrowed and returned books to separate arrs
  booksBorrowed = books.filter(book => (!book.borrows[0].returned));
  returnedBooks = books.filter(book => (book.borrows[0].returned));
  
  //append arrays to result arr
  result.push(booksBorrowed);
  result.push(returnedBooks);
  
  //return result arr
  return result;
  
}

function getBorrowersForBook(book, accounts) {
  //declare return arr and arr of borrowers of book
  let returnArr = [];
  bookBorrows = book.borrows;
  
  //iterate over each element of borrower arr
  bookBorrows.forEach(borrowObj => {
    //get acc info of each borrower and append return arr with info
    const accInfo = find(accounts,borrowObj.id);
    const returnObj = {
      ...borrowObj,
      ...accInfo,
      
    };
    //append to arr
    returnArr.push(returnObj);
    
  }
    
  );
  //limit 10 items
  returnArr.splice(10);
  //return arr
  return returnArr;
}


//helper funct to find acc obj
function find(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
