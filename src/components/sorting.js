import {sortCollection, sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        let sortField = null;
        let sortOrder = null;

        if (action && action.name === 'sort') {
            // @todo: #3.1 — запомнить выбранный режим сортировки
            action.dataset.value = sortMap[action.dataset.value];
            sortField = action.dataset.field;
            sortOrder = action.dataset.value;

            // @todo: #3.2 — сбросить сортировки остальных колонок
            columns.forEach((column) => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
                }
            });
        } else {
            // @todo: #3.3 — получить выбранный режим сортировки
            columns.forEach((column) => {
                if (column.dataset.value !== 'none') {
                    sortField = column.dataset.field;
                    sortOrder = column.dataset.value;
                }
            });
        }

        return sortCollection(data, sortField, sortOrder);
    }
}