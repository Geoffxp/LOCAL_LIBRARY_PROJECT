function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const loaned = books.filter(book => book.borrows[0].returned === false);
  const returned = books.filter(book => book.borrows[0].returned === true);
  return [loaned, returned];
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  const borrowList = book.borrows;
  for(entry in borrowList){
    const loanedTo = accounts.find(user => user.id === borrowList[entry].id);
    const returned = borrowList[entry].returned;
    result.push({returned, ...loanedTo}); //new object with returned status and account info
  }
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
