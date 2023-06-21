import { authors, books } from "./src/data.js";

export class BookPreview extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render(0, 0)
    }

    render(startOfSlice, endOfSlice) {
        const documentFragment = document.createDocumentFragment();
        const slicedBooks = books.slice(startOfSlice, endOfSlice);

        for (const { author, id, image, title } of slicedBooks) {
            const element = document.createElement('button');
            element.classList.add('preview');
            element.setAttribute('data-preview', id);

            element.innerHTML = `
          <img
              class="preview__image"
              src="${image}"
          />
          <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
              <div class="preview__author">${authors[author]}</div>
          </div>
        `;

            documentFragment.appendChild(element);
        };

        this.appendChild(documentFragment);
    }
}

customElements.define('booklist-items', BookPreview);
