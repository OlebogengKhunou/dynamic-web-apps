import { genres, authors, search, books, dataList, BOOKS_PER_PAGE } from "../src/data.js"
import { createBook } from "./preview.js"

function searchFunctionality() {
    let page = 1
    let matches = books;

    /** 
     * - Function to loop through called objects (genre and author) as parameters then appending object property values in the option elements. 
     * @param {Object} option - object to be looped through
     * @param {string} firstOption - first option that appears in the authors and genres selects on the search form.
     * @returns {HTMLElement} - a document fragment
     */
    function createSearchOption(option, firstOption) {
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


    /**
     *  Whenever the genres or authors select element is clicked the dropdown list of 
     *  all genres or authors will show and the user will choose one
     */
    function insertSearchOption() {
        search.dataSearchGenres.appendChild(createSearchOption(genres, 'Genres')),
            search.dataSearchAuthors.appendChild(createSearchOption(authors, 'Authors'))
    }


    /**
     * Whenever the search button is clicked all the books show will disappear as new books html is created
     * based on the information in the search form then if all the search books are displayed the the show more button is disabled 
     * The search form will disappear when submitted
     * if the result of searched bookd is none the an error message will appear
     */
    function filterBooks() {
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
            createBook(result.slice(0, BOOKS_PER_PAGE), newItems)
            dataList.dataListItems.appendChild(newItems)


            dataList.dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
            dataList.dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
            `

            window.scrollTo({ top: 0, behavior: 'smooth' });
            search.dataSearchOverlay.open = false
        })
    }


    // button to display the search overlay when clicked
    search.dataHeaderSearch.addEventListener('click', () => {
        search.dataSearchOverlay.open = true
        search.dataSearchTitle.focus()
    })
    // button to close the search overlay when cliked    
    search.dataSearchCancel.addEventListener('click', () => {
        search.dataSearchOverlay.open = false
    })

    //return
    insertSearchOption()
    filterBooks()

}

searchFunctionality()
