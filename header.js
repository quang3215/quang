const style = `
.header{ 
display: flex;
justify-content: space-between;
height: 64px;
background: #0097A7;
align-items: center;
padding: 0 50px;
}  

`

class Header extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
        this._shadowDom.innerHTML = `
        <style>
        ${style}
        </style>
        <div class="header"> 
            <div>story</div>
            <div>
                <div>avatar</div>
                <div>logout</div>
            </div>
        </div>
        
        `

    }
}
window.customElements.define('story-header', Header)