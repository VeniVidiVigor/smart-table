import './fonts/ys-display/fonts.css'
import './style.css'

import {data as sourceData} from "./data/dataset_1.js";

import {initData} from "./data.js";
import {processFormData} from "./lib/utils.js";

import {initTable} from "./components/table.js";
// @todo: подключение
import {initPagination} from "./components/pagination.js";
import {initSorting} from "./components/sorting.js";
import {initFiltering} from "./components/filtering.js";
import {initSearching} from "./components/searching.js";


// Исходные данные используемые в render()
const {data, ...indexes} = initData(sourceData);

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */
function collectState() {
    const formState = processFormData(new FormData(sampleTable.container));
    const rowsPerPage = parseInt(formState.rowsPerPage);
    const page = parseInt(formState.page ?? 1);

    return {
        ...formState,
        rowsPerPage,
        page
    };
}

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
function render(action) {
    let state = collectState(); // состояние полей из таблицы
    let rows = [...data]; // копируем для последующего изменения
    // @todo: использование
    rows = applySearching(rows, state, action);
    rows = applyFiltering(rows, state, action);
    rows = applySorting(rows, state, action);
    rows = applyPagination(rows, state, action);

    sampleTable.render(rows)
}

const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ['search', 'header', 'filter'],
    after: ['pagination']
}, render);

// @todo: инициализация
const applyPagination = initPagination(
    sampleTable.pagination.elements,
    (buttonElement, pageNumber, isCurrent) => {
        const inputElement = buttonElement.querySelector('input');
        const textElement = buttonElement.querySelector('span');
        inputElement.value = pageNumber;
        inputElement.checked = isCurrent;
        textElement.textContent = pageNumber;
        return buttonElement;
    }
);

const applySorting = initSorting([
    sampleTable.header.elements.sortByDate,
    sampleTable.header.elements.sortByTotal
]);

const applyFiltering = initFiltering(sampleTable.filter.elements, {
    searchBySeller: indexes.sellers
});

const applySearching = initSearching('search');

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);

render();