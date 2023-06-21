/** 
 * - Function to loop through called objects (genre and author) as parameters then appending object property values in the option elements. 
 * @param {Object} option - object to be looped through
 * @param {string} firstOption - first option that appears in the authors and genres selects on the search form.
 * @returns {HTMLElement} - a document fragment
 */

export function createSearchOption(option, firstOption) {
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
