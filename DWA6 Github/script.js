import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books


/////////FIRST RUN SECTION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function element1(author, id, image, title) {
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
    return element
}

// showing the first 36 books 
const starting = document.createDocumentFragment()
for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    starting.appendChild(element1(author, id, image, title))
}
document.querySelector('[data-list-items]').appendChild(starting)


/////////SEARCH AND SETTING BUTTONS CLICK SECTION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false
})

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true
    document.querySelector('[data-search-title]').focus()
})

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true
})

document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false
})


/////////SETTINGS SECTION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Check if its night or theme day when first running code the set setting theme name accordingly
function darktheme() {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
}
function lighttheme() {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night'
    darktheme()
} else {
    document.querySelector('[data-settings-theme]').value = 'day'
    lighttheme()
}

//Change theme when new form option is selected
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        darktheme()
    } else {
        lighttheme()
    }
    document.querySelector('[data-settings-overlay]').open = false
})


/////////SEARCH SECTION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Option for search button
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

document.querySelector('[data-search-genres]').appendChild(SearchOption(genres, 'Genres'))
document.querySelector('[data-search-authors]').appendChild(SearchOption(authors, 'Authors'))

//When the search buttbon is clicked
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

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

    page = 1;
    matches = result

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }

    document.querySelector('[data-list-items]').innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        newItems.appendChild(element1(author, id, image, title))
    }
    document.querySelector('[data-list-items]').appendChild(newItems)

    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('[data-search-overlay]').open = false
})

/////////SHOWMORE BUTTON SECTION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Showing more books when Showmore button is clicked

document.querySelector('[data-list-button]').innerHTML = `Show more <span class="list__remaining">(${books.length - BOOKS_PER_PAGE})</span>`

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        fragment.appendChild(element1(author, id, image, title))
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) <= 0
    document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
})



//Showing details of books when book window is clicked
document.querySelector('[data-list-items]').addEventListener('click', (event) => {
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