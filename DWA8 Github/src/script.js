import { books, BOOKS_PER_PAGE, dataList } from './data.js'
import { createBook } from '../modules/preview.js'
let page = 1;
let matches = books;

//FIRST BOOKS

/**
 *  creating a document fragment then calling a fuction with the document fragment as a second parameter
 * while the first parameter as a slice of the matches object to display the first 36 books from the matches object
 * when the code if first run
 */
const starting = document.createDocumentFragment()
createBook(matches.slice(0, BOOKS_PER_PAGE), starting)
dataList.dataListItems.appendChild(starting)


/**
 * Whenever the show more button is clicked the more books html will be created 
 * then the number of books left unshown is updated in the show more button text
 */

dataList.dataListButton.addEventListener('click', function () {
    const fragment = document.createDocumentFragment()
    createBook(matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE), fragment)
    dataList.dataListItems.appendChild(fragment)
    dataList.dataListButton.disabled = (books.length - (page * BOOKS_PER_PAGE)) <= 0
    page += 1
    dataList.dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(books.length - (page * BOOKS_PER_PAGE)) > 0 ? (books.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
});
dataList.dataListButton.innerHTML = `Show more <span class="list__remaining">(${books.length - BOOKS_PER_PAGE})</span>`