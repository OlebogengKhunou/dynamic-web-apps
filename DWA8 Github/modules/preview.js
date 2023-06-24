import { authors, dataList, books } from '../src/data.js'

//FIRST RUN USER INTERFACE
/**
 * - Function to loop through called objects (genre and author) as a parameters
 * then creates an element with an html template containing object property values
 * then appending the document fragment.
 * @param {Object[]} details - an object with a slice function to limit books being displayed
 * @param {HTMLElement} DocumentFragment - a document fragment to append the created element in the function
 */
export function createBook(details, DocumentFragment) {
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


//SHOWMORE BUTTON SECTION
/**
 * - Whenever each book is clicked upon an overlay will appear with that books details looped through the books object.
 */
function showBookDetails () {
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

   
 // button to display an overlay of each book's details when clicked.
    dataList.dataListClose.addEventListener('click', () => {
        dataList.dataListActive.open = false
    })
}

showBookDetails ()