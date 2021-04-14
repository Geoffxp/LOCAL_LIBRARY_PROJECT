function findAccountById(accounts, id) {
  return accounts.find(person => person.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) => nameA.name.last > nameB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  const borrows = borrowFlattener(books);
  const userBorrows = borrows.filter(borrow => borrow.id === id);
  return userBorrows.length;
}

// helper function: makes array of every borrow entry.
function borrowFlattener(books) {
  const borrows = books.map(book => book.borrows);
  let flattened = borrows.reduce((acc, current) => {
      return acc.concat(current)
    }, []);
  return flattened;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const borrows = books.map(book => book.borrows);
  let result = [];
  for(book in books){
    const latest = borrows[book][0]; //every entry besides the top is always 'returned: true'
    if(latest.id === accountId && latest.returned === false){
      const {id, title, genre, authorId} = books[book]; // destructured book object for array entry
      const author = authors.find(person => person.id === authorId);
      result.push({id, title, genre, authorId, author});
    }
  }
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};