import './screens/register-screen.js'
import './components/input-wrapper.js'
import './screens/login-screen.js'
import './screens/story-screen.js'
import './components/header.js'
import './components/conten.js'

export function redirect(screenName) {
    if (screenName === 'login') {
        document.querySelector('#app')
            .innerHTML = `<login-screen></login-screen>`
    } else if (screenName === 'register') {
        document.querySelector('#app')
            .innerHTML = `<register-screen></register-screen>`
    } else if (screenName === 'story') {
        document.querySelector('#app')
            .innerHTML = `<story-screen></stoty-screen>`
    }

}
firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        if (!user.emailVerified) {
            alert('pleasse verify email')
            redirect('login')
            return
        } else {
            window.currentUser = {
                email: user.email,
                displayName: user.displayName,
                id: user.uid
            }
            redirect('story')
        }

    } else {
        redirect('login')
    }

})