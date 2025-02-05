'use strict';

module.exports = function adapt(book) {
    return Object.assign(book, {
        id: +book.bookId,
        price: +book.price
    });
}
