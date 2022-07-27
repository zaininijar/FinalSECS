import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import movies from "./Mahasiswa-data";
import { useToast, immediateToast } from "izitoast-react";

const Mahasiswa = () => {
  const showMessage = useToast({
    message: "Show my message :)",
  });

  useEffect(() => {
    immediateToast("info", {
      message: "Hi, how it is going",
    });
  });

  function getNumberOfPages(rowCount, rowsPerPage) {
    return Math.ceil(rowCount / rowsPerPage);
  }

  function toPages(pages) {
    const results = [];

    for (let i = 1; i < pages; i++) {
      results.push(i);
    }

    return results;
  }

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Runtime (m)",
      selector: (row) => row.runtime,
      sortable: true,
      center: true,
    },
    {
      button: true,
      minWidth: "250px",
      cell: (row) => (
        <div className="App">
          <div className="openbtn">
            <div className="d-flex">
              <CButton
                type="button"
                className="btn btn-primary text-xs text-nowrap"
                data-bs-toggle="modal"
                data-bs-target={`#modal-${row.id}`}
              >
                edit
              </CButton>
              <CButton
                color="danger"
                className="text-xs text-light text-nowrap mx-2"
                onClick={showMessage}
              >
                delete
              </CButton>
              <CButton
                color="danger"
                className="text-xs text-light text-nowrap"
              >
                change password
              </CButton>
            </div>
            <div className="modal" tabIndex="-1" id={`modal-${row.id}`}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Mahasiswa</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <label htmlFor="username" className="mb-2">
                        Username
                      </label>
                      <CInputGroup size="sm" className="mb-3">
                        <CFormInput
                          id="username"
                          value={row.username}
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          placeholder="Username"
                        />
                      </CInputGroup>
                    </div>
                    <div>
                      <label htmlFor="fullname" className="mb-2">
                        Full Name
                      </label>
                      <CInputGroup size="sm" className="mb-3">
                        <CFormInput
                          id="fullname"
                          value={row.name}
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          placeholder="Full Name"
                        />
                      </CInputGroup>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <CButton
                      type="button"
                      color="primary"
                      variant="outline"
                      data-bs-dismiss="modal"
                      size="sm"
                    >
                      Close
                    </CButton>
                    <CButton color="primary" size="sm">
                      Save changes
                    </CButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // RDT exposes the following internal pagination properties
  const BootyPagination = ({
    rowsPerPage,
    rowCount,
    onChangePage,
    onChangeRowsPerPage, // available but not used here
    currentPage,
  }) => {
    const handleBackButtonClick = () => {
      onChangePage(currentPage - 1);
    };

    const handleNextButtonClick = () => {
      onChangePage(currentPage + 1);
    };

    const handlePageNumber = (e) => {
      onChangePage(Number(e.target.value));
    };

    const pages = getNumberOfPages(rowCount, rowsPerPage);
    const pageItems = toPages(pages);
    const nextDisabled = currentPage === pageItems.length;
    const previosDisabled = currentPage === 1;

    return (
      <nav className="mt-2 d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleBackButtonClick}
              disabled={previosDisabled}
              aria-disabled={previosDisabled}
              aria-label="previous page"
            >
              Previous
            </button>
          </li>
          {pageItems.map((page) => {
            const className =
              page === currentPage ? "page-item active" : "page-item";

            return (
              <li key={page} className={className}>
                <button
                  className="page-link"
                  onClick={handlePageNumber}
                  value={page}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleNextButtonClick}
              disabled={nextDisabled}
              aria-disabled={nextDisabled}
              aria-label="next page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
    <div className="form-check">
      <input
        htmlFor="booty-check"
        type="checkbox"
        className="form-check-input"
        ref={ref}
        onClick={onClick}
        {...rest}
      />
      <label className="form-check-label" id="booty-check" />
    </div>
  ));

  return (
    <div className="App">
      <div className="card">
        <DataTable
          title="Movies"
          columns={columns}
          data={movies}
          defaultSortFieldID={1}
          pagination
          // paginationComponent={BootyPagination}
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
    </div>
  );
};

export default Mahasiswa;
