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

class LoginScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = ` 
        ${style}
        <div class="container">
        <form id="register-form">
            <div class="title">Share story</div>
           
            <input-wrapper id="email" type="email" placeholder="email"></input-wrapper>
            <input-wrapper id="pass" type="pass" placeholder="pass"></input-wrapper>
            <button class="bnt">login</button>
            <div id="redirect"> don have account ? <a href="#">Register</a></div>
        </form>
        </div>
        `
        this._shadowRoot.getElementById('redirect')
            .addEventListener('click', () => {
                redirect('register')
            })
        this._shadowRoot.getElementById('register-form')
            .addEventListener('submit', (e) => {
                e.preventDefault()

                const email = this._shadowRoot.getElementById('email').value
                const pass = this._shadowRoot.getElementById('pass').value
                let isValid = true

                if (email.trim() === '') {
                    this._shadowRoot.getElementById('email')
                        .setAttribute('error', 'please input email')
                    isValid = false

                } else if (emailVailid(email) === false) {
                    this._shadowRoot.getElementById('email')
                        .setAttribute('error', 'sai cú pháp')
                    isValid = false

                }


                if (isValid) {
                    firebase.auth().signInWithEmailAndPassword(email, pass)
                        .then((res) => {
                            console.log(res)
                            if (!res.user.emailVerified) {
                                alert('pleasse verify email')
                                return
                            }
                            const user = {
                                email: res.user.email,
                                displayName: res.user.displayName,
                                id: res.user.uid
                            }
                            window.curentUser = user
                            redirect('story')
                        })
                        .catch((err) => {
                            alert(err.message)
                        })

                }
            })
    }
}
window.customElements.define('login-screen', LoginScreen)