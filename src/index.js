import {sync} from './components/sync';
sync();

// import asynctest from './components/async';
// asynctest.init();

// 同步包
import(/*webpackChunkName: "async-test"*/ './components/async').then(_ => {
    _.default.init();
});