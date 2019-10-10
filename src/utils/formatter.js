module.exports = {
    currentYear: (new Date()).getFullYear(),
    inArray: (array, item) => Array.isArray(array) && array.includes(item),
    option: (text, value, defaultValue) => {
        return `<option value="${value}" ${value === defaultValue ? 'selected' : ''}>${text}</option>`;
    },
    radio: (name, value, isChecked, extraClass = '', id) => {
        return `<input type="radio" name="${name}" value="${value}" ${isChecked ? 'checked' : ''} class="${extraClass}" ${id ? `id=${id}` : ''} />`;
    },
    checkbox: (name, value, isChecked, extraClass = '', id) => {
        return `<input type="checkbox" name="${name}" value="${value}" ${isChecked ? 'checked' : ''} class="${extraClass}" ${id ? `id=${id}` : ''} />`;
    },
};
