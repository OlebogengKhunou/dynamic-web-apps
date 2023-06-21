import { books, authors, genres, BOOKS_PER_PAGE, settings, search, dataList } from './src/data.js'
import { showBookDetails, createBook} from './modules/preview.js'
import { createSearchOption } from './modules/search.js'
import { checkTheme, setTheme } from './modules/settings.js'


let page = 1;
let matches = books


//FIRST BOOKS
/**
 * - creating a document fragment then calling a fuction with the document fragment as a second parameter
 * while the first parameter as a slice of the matches object to display the first 36 books from the matches object
 * when the code if first run
 */
const starting = document.createDocumentFragment();
createBook(matches.slice(0, BOOKS_PER_PAGE),starting);
dataList.customElementbookListItems.appendChild(starting);
 

//SHOW BOOK DETAILS
/**
 * Whenever each book is clicked upon an overlay will appear with that books details looped through the books object.
 */
showBookDetails ()


/**
 * search, settings, preview button when clicked the overlay will open or close
 */
search.dataSearchCancel.addEventListener('click', () => {
    search.dataSearchOverlay.open = false
})

search.dataHeaderSearch.addEventListener('click', () => {
    search.dataSearchOverlay.open = true
    search.dataSearchTitle.focus()
})

settings.dataSettingsCancel.addEventListener('click', () => {
    settings.dataSettingsOverlay.open = false
})

settings.dataHeaderSettings.addEventListener('click', () => {
    settings.dataSettingsOverlay.open = true
})

dataList.dataListClose.addEventListener('click', () => {
    dataList.dataListActive.open = false
})


//SETTINGS SECTION

checkTheme()
setTheme()


//SEARCH SECTION
/**
 *  Whenever the genres or authors select element is clicked the dropdown list of 
 *  all genres or authors will show and the user will choose one
 */
search.dataSearchGenres.appendChild(createSearchOption(genres, 'Genres'))
search.dataSearchAuthors.appendChild(createSearchOption(authors, 'Authors'))

/**
 * Whenever the search button is clicked all the books show will disappear as new books html is created
 * based on the information in the search form then if all the search books are displayed the the show more button is disabled 
 * The search form will disappear when submitted
 * if the result of searched bookd is none the an error message will appear
 */

search.dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
     matches = result

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book)
        }
    }

    if (result.length < 1) {
        dataList.dataListMessage.classList.add('list__message_show')
    } else {
        dataList.dataListMessage.classList.remove('list__message_show')
    }

    dataList.customElementbookListItems.innerHTML = ''

    const newItems = document.createDocumentFragment()
    createBook(result.slice(0, BOOKS_PER_PAGE), newItems)
    dataList.customElementbookListItems.appendChild(newItems)


    dataList.dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
    dataList.dataListButton.innerHTML = /*html*/`
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

    window.scrollTo({ top: 0, behavior: 'smooth' });
    search.dataSearchOverlay.open = false
})


//SHOWMORE BUTTON SECTION
/**
 * Whenever the show more button is clicked the more books html will be created 
 * then the number of books left unshown is updated in the show more button text
 */

dataList.dataListButton.addEventListener('click', function () {
    const fragment = document.createDocumentFragment();
    createBook(matches.slice((page * BOOKS_PER_PAGE), ((page + 1) * BOOKS_PER_PAGE)),fragment);
    dataList.customElementbookListItems.appendChild(fragment);
    
    page += 1
    dataList.dataListButton.disabled = (books.length - (page * BOOKS_PER_PAGE)) <= 0
    dataList.dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(books.length - (page * BOOKS_PER_PAGE)) > 0 ? (books.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
});
dataList.dataListButton.innerHTML = `Show more <span class="list__remaining">(${books.length - BOOKS_PER_PAGE})</span>`