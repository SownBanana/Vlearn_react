export const getPureText = (text) => {
    return text.replace(/(<([^>]+)>)/ig, '');
}