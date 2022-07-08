const {findAuthorById} = require("./books");

function getTotalBooksCount(books) {
  let total = books.length;
  return total;
}

function getTotalAccountsCount(accounts) {
  let total = accounts.length;
  return total;
}

function getBooksBorrowedCount(books) {
  let checkout = 0;
  for (let i = 0; i<books.length; i++)  {
    const book = books[i].borrows;
    for (let j = 0; j<book.length; j++){
      if (book[j].returned === false)  checkout +=1 ;
    }
  }
  return checkout;
}

function getMostCommonGenres(books) {
  //return arr contains all genres and default count
  returnArr = getAllGenres(books);
  //iterate over each book and increment genre count of each
  books.forEach(book => {
    let findGenreObj = returnArr.find(element => element.name ===book.genre);
    if(!findGenreObj){} else {findGenreObj.count++}
  });
  
  //sort arr based on amount of books in each genre high to low
  returnArr.sort((a,b) => b.count - a.count);
  
  //reduce arr size to 5  
  returnArr.splice(5);
  return returnArr;
}

function getMostPopularBooks(books) {
  //create arr result that includes book info 
  const result = books.map((book) =>{
    const bookInfo = {
      name: book.title,
      count: book.borrows.length,
    };
    //populate arr with books based on their borrow amt
    return bookInfo;
    
  });
  
  //sort arr in descending numeric order
  result.sort((a,b) => b.count - a.count);
  
  //take top five in arr
  result.splice(5);
  //return arr
  return result;
  
}

function getMostPopularAuthors(books, authors) {
  //create returnArr and map info from authors arr
  let returnArr = authors.map(authorObj =>{
    //arr of author's books
    const authorBookArr = books.filter(book => book.authorId === authorObj.id);
    //obtain total borrows of each author's books
    const numBorrows = authorBookArr.reduce((runningSum, curBook) => runningSum + curBook.borrows.length, 0);
    //create authorInfo obj to return to new arr
    const authorInfo = {
      name: authorObj.name.first + " " + authorObj.name.last,
      count: numBorrows,
    };
    //return info obj
    return authorInfo;
    
  });
  

  
  //sort arr and limit to 5 items
  returnArr.sort((a,b) => b.count - a.count);
  returnArr.splice(5);
  //return arr
  return returnArr;
  
}

//helper funct that returns arr of all genres
function getAllGenres(books){
  const genres = [];
  books.forEach(book => {
    if(!genres.includes(book.genre)){
      genreObj = {
        name: book.genre,
        count: 0,
      };
      genres.push(genreObj);
    }
    
  });  
  
  return genres;
  
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
