function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const randArray = function(value) {
    let arrayRandom = new Array(value);
    let i = 0;
    while (i < arrayRandom.length) {
        let ran;
        ran = getRandomInt(1, 10);
        if (!arrayRandom.includes(ran)) {
            arrayRandom[i] = ran;
            i++;
        }
    }

    return arrayRandom;
}
console.log(randArray(3))
module.exports = randArray;