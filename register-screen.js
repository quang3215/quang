const style = `<style>
.container{
    height: 100vh;
}
#register-form{
    width: 60%;
    margin:auto;
    text-align: center;
    background-color:rgba(0, 255, 170, 0.37);
    height: 100%;
    padding-top: 15%;
}
.title{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
}
.inp{
    margin-bottom: 10px;
}
</style>
`
import { emailVailid } from "./utils.js";
import { redirect } from "../index.js";


class RegisterScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = ` 
        ${style}
        <div class="container">
        <form id="register-form">
            <div class="title">Share story</div>
            <input-wrapper id="name" type="text" placeholder="Full name"></input-wrapper>
            <input-wrapper id="email" type="email" placeholder="email"></input-wrapper>
            <input-wrapper id="pass" type="pass" placeholder="pass"></input-wrapper>
            <input-wrapper id="passn" type="pass" placeholder="nhập lại"></input-wrapper>
             
            <button class="bnt">Register</button>
            <div id="redirect">Already have account ? <a href="#">Login</a></div>
        </form>
        </div>
        `
        this._shadowRoot.getElementById('redirect')
            .addEventListener('click', () => {
                console.log('aaaa')
                redirect('login')
            })
        this._shadowRoot.getElementById('register-form')
            .addEventListener('submit', (e) => {
                e.preventDefault()
                const name = this._shadowRoot.getElementById('name').value
                const email = this._shadowRoot.getElementById('email').value
                const pass = this._shadowRoot.getElementById('pass').value
                const passn = this._shadowRoot.getElementById('passn').value
                let isValid = true
                if (name.trim() === '') {
                    this._shadowRoot.getElementById('name')
                        .setAttribute('error', 'please input full name')
                }
                if (email.trim() === '') {
                    this._shadowRoot.getElementById('email')
                        .setAttribute('error', 'please input email')
                    isValid = false

                } else if (emailVailid(email) === false) {
                    this._shadowRoot.getElementById('email')
                        .setAttribute('error', 'sai cú pháp')
                    isValid = false

                }
                if (pass.trim() === '') {
                    this._shadowRoot.getElementById('pass')
                        .setAttribute('error', 'please input pass')
                    isValid = false

                }
                if (passn.trim() === '') {
                    this._shadowRoot.getElementById('passn')
                        .setAttribute('error', 'please input pass')
                    isValid = false

                } else if (passn.trim() !== pass) {
                    this._shadowRoot.getElementById('passn')
                        .setAttribute('error', 'sai mk')
                    isValid = false
                } else {
                    this._shadowRoot.getElementById('passn')
                    this.setAttribute('error', '')
                }

                if (isValid) {
                    firebase.auth().createUserWithEmailAndPassword(email, passn)
                        .then((res) => {
                            alert('register success')
                            firebase.auth().currentUser.sendEmailVerification()
                            firebase.auth().currentUser.updateprofile({
                                displayName: name
                            })
                            redirect('login')
                        })
                        .catch((err) => {
                            alert(err.message)
                        })

                }
            })
    }
}
window.customElements.define('register-screen', RegisterScreen)