function fourChars() {
    return Math.floor(Math.random() * 0x10000 /* 65536 */)
        .toString(16);
}

export default function uuid(num, delim = '-') {
    const today = (new Date()).getTime()
        .toString(16);

    if (num !== undefined) {
        let ret = fourChars();
        for (let i = 0; i < (num); i++) {
            ret += delim + fourChars();
        }
        return (ret + today);
    }
    // return as '8x-8x-7x' (x - max chars)
    return (
        fourChars() + fourChars() + fourChars() + delim +
        fourChars() + fourChars() + fourChars() + delim +
        today
    );
}
