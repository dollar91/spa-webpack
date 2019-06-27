import help from '../common/help';
console.log('async引用', help.version);
let asynctest = {
    init: function() {
        console.log('async-test');
    }
};
export default asynctest;