function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrows = borrowFlattener(books);
  const loaned = borrows.filter(entry => entry.returned === false);
  return loaned.length;
}

function getMostCommonGenres(books) {
  let genreList = [];
  let result = [];
  for(book in books){
    if(!genreList.includes(books[book].genre)){
      genreList.push(books[book].genre);
    }
  }
  for(item in genreList){
    let count = books.filter(book => book.genre === genreList[item]).length;
    result.push({name: genreList[item], count: count});
  }
  return topFive(result);
}

function getMostPopularBooks(books) {
  let result = [];
  for(book in books){
    const title = books[book].title;
    const borrows = books[book].borrows.length;
    result.push({name: title, count: borrows});
  }
  return topFive(result);
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  for(author in authors){
    const first = authors[author].name.first;
    const last = authors[author].name.last;
    const authorName = `${first} ${last}`;
    const booksByAuthor = books.filter(book => book.authorId === authors[author].id);
    const count = borrowFlattener(booksByAuthor).length;
    result.push({name: authorName, count: count});
  }
  return topFive(result);
}

function borrowFlattener(books) {
  const borrows = books.map(book => book.borrows);
  let flattened = borrows.reduce((acc, current) => {
      return acc.concat(current);
    }, []);
  return flattened;
}
/* helper function that takes an array and returns 
   the five items with the highest count in order
   from most to least*/
function topFive(list) {
  list.sort((itemA, itemB) => itemB.count - itemA.count);
  return list.slice(0,5);
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
