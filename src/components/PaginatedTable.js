import React from "react";

const PaginatedTable = ({currentPage, totalPages, onPageChange, children }) => {

  return (
    <>
      <table className="table table-striped border">
        {children}
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">{currentPage}</span>
          </li>
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PaginatedTable;
