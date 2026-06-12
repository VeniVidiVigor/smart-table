import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageButton = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();
    let pageCount;

    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;
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
         return Object.assign({}, query, { // добавим параметры к query, но не изменяем исходный объект
            limit,
            page
        });
    };

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);

        // @todo: #2.4 — получить список видимых страниц и вывести их
        const pageNumbers = getPages(page, pageCount, 5);
        pages.replaceChildren(...pageNumbers.map((pageNumber) => {
            const pageElement = pageButton.cloneNode(true);
            return createPage(pageElement, pageNumber, pageNumber === page);
        }));

        // @todo: #2.5 — обновить статус пагинации
        fromRow.textContent = (page - 1) * limit + 1;
        toRow.textContent = Math.min(page * limit, total);
        totalRows.textContent = total;
    }; 

    return {
        updatePagination,
        applyPagination
    }; 
};