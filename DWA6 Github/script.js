import { books, 
         authors, 
         genres, 
         BOOKS_PER_PAGE, 
         settings, 
         search, 
         dataList } from './data.js'


let page = 1;
let matches = books


//FIRST RUN DISPLAY SECTION

/**
 * Function to loop through called objects (genre and author) as a parameters
 * then creates an element with an html template containing object property values
 * then appending the document fragment.
 * @param {*} details an object with a slice function to limit books being displayed
 * @param {string} DocumentFragment a document fragment to append the created element in the function
 */
function element1(details, DocumentFragment) {
    for (const { author, id, image, title } of details) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
        DocumentFragment.appendChild(element)
    }
}

/**
 * creating a document fragment then calling a fuction with the document fragment as a second parameter
 * while the first parameter as a slice of the matches object to display the first 36 books from the matches object
 * when the code if first run
 */
const starting = document.createDocumentFragment()
element1(matches.slice(0, BOOKS_PER_PAGE), starting)
dataList.dataListItems.appendChild(starting)

/**
 * Whenever each book is clicked upon an overlay will appear with that books details looped through the books object.
 */
dataList.dataListItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null

            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            }

            active = result
        }
    }

    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})





//SEARCH, SETTING AND BOOK OVERLAY BUTTONS CLICK SECTION

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

/**
 * function that run night or day theme changing settings.
 */ 
function darktheme() {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
}
function lighttheme() {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}
/**
 * Checking if the theme is already night the changing the value of theme settings to 'night'
 * else change the value of theme settings to 'day' 
 */

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    settings.dataSettingsTheme.value = 'night'
    darktheme()
} else {
    settings.dataSettingsTheme.value = 'day'
    lighttheme()
}

/**
 *  Whenever the settings save button is clicked the theme will change
 *  based on the option selected when form is submitted.
 */

settings.dataSettingsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        darktheme()
    } else {
        lighttheme()
    }
    settings.dataSettingsOverlay.open = false
})




//SEARCH SECTION

/** 
 * Function to loop through called objects (genre and author) as parameters then appending object property values in the option elements. 
 * @param {object} option object to be looped through
 * @param {string} firstOption first option that appears in the authors and genres selects on the search form.
 * @returns {string} a document fragment
 */

function SearchOption(option, firstOption) {
    const SearchHtml = document.createDocumentFragment()
    const firstOptionsElement = document.createElement('option')
    firstOptionsElement.value = 'any'
    firstOptionsElement.innerText = `All ${firstOption}`
    SearchHtml.appendChild(firstOptionsElement)

    for (const [id, name] of Object.entries(option)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        SearchHtml.appendChild(element)
    }
    return SearchHtml
}

search.dataSearchGenres.appendChild(SearchOption(genres, 'Genres'))
search.dataSearchAuthors.appendChild(SearchOption(authors, 'Authors'))

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

    dataList.dataListItems.innerHTML = ''

    const newItems = document.createDocumentFragment()
    element1(result.slice(0, BOOKS_PER_PAGE), newItems)
    dataList.dataListItems.appendChild(newItems)

    dataList.dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
    dataList.dataListButton.innerHTML = `
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

dataList.dataListButton.addEventListener('click', () => {
    page += 1
    const fragment = document.createDocumentFragment()
    element1(matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE), fragment)
    dataList.dataListItems.appendChild(fragment)
    
    dataList.dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) <= 0
    dataList.dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
})
dataList.dataListButton.innerHTML = `Show more <span class="list__remaining">(${books.length - BOOKS_PER_PAGE})</span>`