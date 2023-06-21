export class BookPreview extends HTMLElement {
    constructor() {
        super();
        let profile = document.querySelector('[data-list-items]')
        let myprofile = profile.content;
        const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(myprofile.cloneNode(true));
    }
}