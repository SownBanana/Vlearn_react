export const getPureText = (text) => {
    if (text !== null && text !== undefined)
        return text.replace(/(<([^>]+)>)/ig, '');
    return text;
}