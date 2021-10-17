function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
let ran;
ran = getRandomInt(0, 10);
let array = [ran];
for (let i = 0; i < 2; i++) {
    ran = getRandomInt(0, 10);
    if (array.length < 2 && array[i] != ran) {
        array.push(ran);
    } else if (array.length < 3 && array[i] != ran) {
        array.push(ran);
    }

}
module.exports = array;