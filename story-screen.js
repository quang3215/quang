class StoryScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        <story-header></story-header>
        <stoty-conten></stoty-conten>
        `
    }
}

window.customElements.define('story-screen', StoryScreen)