const reNum = /^\D+/ig;

const utils = {
    getNextName: function (list, name) {
        const numbers = [true];
        let ret = name + ' 1';
        list.forEach((item) => {
            const numberName = (item.name + '').replace(reNum, '');
            numbers[numberName] = true;
        });
        numbers.push(false);

        for (let i = 0, l = numbers.length; i < l; i++) {
            if (!numbers[i]) {
                ret = name + ' ' + i;
                break;
            }
        }
        return ret;
    },
};

export default utils;
