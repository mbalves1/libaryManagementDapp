// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Library {
  struct Book {
    uint id;
    string name;
    uint year;
    string author;
    bool finished;
  }

  Book[] private bookList;
  mapping(uint256 => address) bookToOwner;

  event AddBook(address recipient, uint bookId);

  function addBook(string memory name, uint16 year, string memory author, bool finished) external {
    uint bookId = bookList.length;
    bookList.push(Book(bookId, name, year, author, finished));
    bookToOwner[bookId] = msg.sender;
    emit AddBook(msg.sender, bookId);
  }

}