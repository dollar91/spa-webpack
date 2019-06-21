import lodash from "lodash-es";
import item from "./sync.less";
const sync = function() {
    console.log('sync');
    // document.getElementById('app').innerHTML = `<h1 class="${item.test}">hello css</h1>`
}

const isArray = function(a) {
    console.log('isArray', lodash.isArray(a))
}

export { sync, isArray }