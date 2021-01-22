const style = `
.contens{
    border: 3px dashed #15b27e;
    height:200px;
    width: 300px;
    text-align: center;
    background: #9700b338;
    margin: auto;
    
} 
.text{
    height:150px;
    width: 250px;

}
`
class content extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
        this._shadowDom.innerHTML = `
        <style>
        ${style}
        </style>
        <div class="contens"  >
        <input class="text"  type="text"  />
        <div id="dang" >đăng</div>
        </div>
        `
        this._shadowDom.getElementById('dang')
            .addEventListener('click', () => {
                this._shadowRoot.getElementById('dang').value
            })
        addDocument()

        function addDocument() {
            const dataToAdd = this._shadowDom.querySelector('text').value

        }
        firebase.firestore().collection('posts').add({ dataToAdd })
    }

}


window.customElements.define('stoty-conten', content)


























































// this._shadowDom.querySelector('dang').onclick = () => {
//     const a = this.shadowDom.querySelector('text').value;
//     if (a.trim()) {
//         db.collection('đăng').add({
//             a
//         })
//         alert('Bạn đã tải lên thành công');
//     } else {
//         alert('Bạn hãy nhập gì đấy');
//     }

// }


// window.customElements.define('stoty-conten', content);