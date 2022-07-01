const {findAuthorById} = require("./books");

function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1 );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const acctId = account.id;
  let total = 0;
  books.forEach(book => book.borrows.forEach(borrow => acctId === borrow.id && total++));
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  //acc id and return arr
  const acctId = account.id;
  let returnArr = [];
  
  //arr of borrowed books by acc
  let borrowedBooksByAcc = books.filter(book => (book.borrows[0].returned==false && book.borrows[0].id==acctId));

  //include author information with book
  borrowedBooksByAcc = borrowedBooksByAcc.map(book => {
    const authorObj = findAuthorById(authors,book.authorId);
    const returnObj = {
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: book.authorId,
      author: authorObj,
      borrows: book.borrows,
      
    }
    return returnObj;
    
    
  });
  returnArr = borrowedBooksByAcc;
  
  //books.forEach(book => book.borrows.forEach(borrow => acctId === borrow.id && borrow.returned === false));
  //let found = books.find((book) => book.borrows.forEach(borrow => acctId === borrow.id && borrow.returned === false));
   
  return returnArr;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
