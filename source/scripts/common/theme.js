let timerId;
let root;
const prefix = 'theme-';
const ANIMATE_CLASS = 'theme-animate';
const CHANGE_TIMEOUT = 1200;
const THEME_DEFAULT = 'light';
const themes = {
    dark: true,
    light: true,
};
let currThemeName = THEME_DEFAULT;

function removeClass(className, toRemove) {
    const classes = className.split(' ');
    for (let i = classes.length - 1; i >= 0; i--) {
        if (classes[i] == toRemove) {
            classes.splice(i, 1);
        }
    }
    className = classes.join(' ');
    className = className.trim();
    return className;
}

function getThemeClass(name) {
    let themeNameClass = prefix;
    if (name != THEME_DEFAULT) {
        // prefix - is default class name for theme
        // in other cases, used prefix + name, like `theme-light` classes
        themeNameClass = prefix + name;
    }
    return themeNameClass;
}

function theme(name) { // dark, light
    (!themes[name]) && (name = THEME_DEFAULT);

    const prevClass = getThemeClass(currThemeName);
    const themeNameClass = getThemeClass(name);

    currThemeName = name;

    !root && (root = document.getElementsByTagName('html')[0]);

    clearTimeout(timerId);
    timerId = setTimeout(function () {
        // remove 'theme-animate' class
        const classNames = removeClass(root.className, ANIMATE_CLASS);
        root.className = classNames;
    }, CHANGE_TIMEOUT);

    let className = removeClass(root.className, prevClass);
    className = removeClass(className, ANIMATE_CLASS);
    root.className = `${className} ${themeNameClass} ${ANIMATE_CLASS}`;
}

theme.getCurrent = function () {
    return currThemeName;
};

export default theme;
