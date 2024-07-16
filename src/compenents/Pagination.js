import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  return (
    <div style={paginationStyle}>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(1)}>First</button>
          </li>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>
          <li className="page-item active">
            <span className="page-link">{currentPage}</span>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(totalPages)}>Last</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
