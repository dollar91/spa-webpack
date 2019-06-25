import help from '../common/help';
console.log('async引用', help.version);
const asynctest = {
    init() {
        console.log('async-test');
    }
};
export default asynctest;