'use strict';

let a = "12345_6789";

let b = a.slice(a.indexOf("_")+1, a.length);
console.log('b :>> ', b);