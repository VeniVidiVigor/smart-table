import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const matchesFilters = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((fieldName) => {
        elements[fieldName].append(
            ...Object.values(indexes[fieldName]).map((item) => {
                const optionElement = document.createElement('option');
                optionElement.value = item;
                optionElement.textContent = item;
                return optionElement;
            })
        );
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const fieldName = action.dataset.field;
            const control = action.parentElement.querySelector('input, select');

            if (control) {
                control.value = '';
            }

            state[fieldName] = '';
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter((row) => matchesFilters(row, state));
    }
}