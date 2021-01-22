class inptuWrapper extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: "open" })
        this.type = this.getAttribute('type')
        this.placeholder = this.getAttribute('placeholder')
        console.log(this.error)
        this._shadowDom.innerHTML = `
        <div>
                <input type="${this.type}"   placeholder="${this.placeholder}">
                <div class="error"></div>
            </div>
     `
            //đăng ký lắng nghe thay đổi


    }
    static get observedAttributes() {
            return ['error']
        }
        // sẻ được gọi khi attribute
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'error') {
            this._shadowDom.querySelector('.error').innerText = newValue
        }

    }

    get value() {
        return this._shadowDom.querySelector('input').value
    }
    set value(value) {
            return this._shadowDom.querySelector('input').value = value
        }
        // setErr(err) {
        //     this._shadowDom.querySelector('.error').innerText = err
        // }
}

window.customElements.define('input-wrapper', inptuWrapper)