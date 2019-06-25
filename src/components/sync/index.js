import lodash from "lodash-es";
import item from "./sync.less";
const sync = function() {
    console.log('sync');
    fetch('/api/test').then(res => res.json())
    .then(data => {
        console.log('fetch结束', data.message)
    })
    // document.getElementById('app').innerHTML = `<h1 class="${item.test}">hello css</h1>`
}

const isArray = function(a) {
    console.log('isArray', lodash.isArray(a))
}

export { sync, isArray }