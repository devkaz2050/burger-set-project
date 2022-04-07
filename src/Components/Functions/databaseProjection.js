export const projection = (rules) => {
    const keys = Object.keys(rules);
    return obj => keys.reduce(( newObj, key) => {
        newObj[key] = rules[key].reduce((value, fn, index) => ( index ? fn(value) : obj[fn]), null);
        return newObj
    }, {})
}