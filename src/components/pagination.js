import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageButton = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    return (data, state, action) => {
        // @todo: #2.1 — посчитать количество страниц, объявить переменные и константы
        const rowsPerPage = state.rowsPerPage;
        const totalPages = Math.ceil(data.length / rowsPerPage);
        let currentPage = state.page;

        // @todo: #2.6 — обработать действия
        if (action) {
            switch (action.name) {
                case 'prev':
                    currentPage = Math.max(1, currentPage - 1);
                    break;
                case 'next':
                    currentPage = Math.min(totalPages, currentPage + 1);
                    break;
                case 'first':
                    currentPage = 1;
                    break;
                case 'last':
                    currentPage = totalPages;
                    break;
            }
        }

        // @todo: #2.4 — получить список видимых страниц и вывести их
        const pageNumbers = getPages(currentPage, totalPages, 5);
        pages.replaceChildren(...pageNumbers.map((pageNumber) => {
            const pageElement = pageButton.cloneNode(true);
            return createPage(pageElement, pageNumber, pageNumber === currentPage);
        }));

        // @todo: #2.5 — обновить статус пагинации
        fromRow.textContent = (currentPage - 1) * rowsPerPage + 1;
        toRow.textContent = Math.min(currentPage * rowsPerPage, data.length);
        totalRows.textContent = data.length;

        // @todo: #2.2 — посчитать сколько строк нужно пропустить и получить срез данных
        const startRow = (currentPage - 1) * rowsPerPage;
        return data.slice(startRow, startRow + rowsPerPage);
    }
}