import { CButton, CFormInput, CInputGroup } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { immediateToast } from "izitoast-react";
import axios from "src/api/axios";
import { DeleteIconWhite, EditIcon2White } from "src/assets/icons";
import Modal from "src/components/Modal";
import dateFormatter from "src/tools/DateFormatter";
import { useNavigate } from "react-router-dom";

const TahunPelajaran = () => {
  const TAHUN_PELAJARAN_URL = "/tahun-pelajaran/";
  const access_token = localStorage.getItem("access_token");
  const [tahunPelajaran, setTahunPelajaran] = useState("");
  const navigate = useNavigate();

  const confirmDelete = (e) => {
    immediateToast("question", {
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      id: "question",
      zindex: 9999,
      title: "Hey",
      message: `Yakin Ingin Menghapus Tahun Pelajaran : ${e.tahun_pelajaran}`,
      position: "center",
      buttons: [
        [
          "<button><b>YES</b></button>",
          (instance, toast) => {
            deleteTahunPelajaran(e.id).then((res) => {
              alertSuccess(res.message);
              getTahunPelajaran(access_token).then((res) => {
                setTahunPelajaran(res);
              });
              instance.hide({ transitionOut: "fadeOut" }, toast, "button");
            });
          },
          true,
        ],
        [
          "<button>NO</button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
        ],
      ],
      onClosing: function (instance, toast, closedBy) {
        console.info("Closing | closedBy: " + closedBy);
      },
      onClosed: function (instance, toast, closedBy) {
        console.info("Closed | closedBy: " + closedBy);
      },
    });
  };

  const deleteTahunPelajaran = async (id) => {
    let data = {};
    await axios
      .delete(TAHUN_PELAJARAN_URL + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        data = err.data;
      });

    return data;
  };

  const alertSuccess = (message) => {
    immediateToast("success", {
      message: message,
    });
  };

  const alertDanger = (message) => {
    immediateToast("info", {
      message: message,
      color: "red",
    });
  };

  useEffect(() => {
    getTahunPelajaran(access_token).then((res) => {
      setTahunPelajaran(res);
    });
  }, []);

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
      name: "Nama TahunPelajaran",
      selector: (row) => row.tahun_pelajaran,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => dateFormatter(row.createdAt),
      sortable: true,
    },
    {
      button: true,
      minWidth: "120px",
      cell: (row) => (
        <div className="App">
          <div className="openbtn">
            <div className="d-flex">
              <Modal
                btnColor="primary"
                btnClass="me-2"
                modalTitle="Edit Pelajaran"
                onClick={() => {
                  getTahunPelajaranById(row.id);
                }}
                onSubmit={async () => {
                  await updateTahunPelajaran(row.id).then((res) => {
                    return res;
                  });
                }}
                btnTitle={<EditIcon2White width={15} />}
              >
                <div>
                  <label htmlFor="tahun_pelajaran" className="mb-2">
                    Nama Tahun Pelajaran
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      id="tahun_pelajaran"
                      onChange={(e) => {
                        handleNamaTahunPelajaran(e.target.value);
                      }}
                      value={namaTahunPelajaran.value}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="tahun pelajaran"
                    />
                  </CInputGroup>
                </div>
              </Modal>
              <CButton
                color="danger"
                className="text-xs text-light text-nowrap"
                onClick={() => {
                  confirmDelete(row);
                }}
                title="delete"
              >
                <DeleteIconWhite width={15} />
              </CButton>
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

  const getTahunPelajaran = async (access_token) => {
    let data = {};
    await axios
      .get(TAHUN_PELAJARAN_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
      })
      .catch((err) => {
        if (err.response.status === 403) {
          navigate("/dashboard");
        }
        console.log(err);
      });

    return data;
  };

  //TahunPelajaran
  const [namaTahunPelajaran, setNamaTahunPelajaran] = useState({
    msgErr: "",
    value: "",
  });
  const handleNamaTahunPelajaran = (value) => {
    if (value === "") {
      setNamaTahunPelajaran((prev) => ({ msgErr: "Type nama kelas" }));
    } else {
      setNamaTahunPelajaran({ msgErr: "", value: value });
    }
  };

  const addTahunPelajaran = async () => {
    let isSuccess = true;

    await axios
      .post(
        TAHUN_PELAJARAN_URL,
        {
          tahun_pelajaran: namaTahunPelajaran.value,
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getTahunPelajaran(access_token).then((res) => {
          setTahunPelajaran(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        err.response.data.message.map((err) => {
          alertDanger(err);
        });
        isSuccess = false;
      });
    return isSuccess;
  };

  const updateTahunPelajaran = async (id) => {
    await axios
      .put(
        TAHUN_PELAJARAN_URL + id,
        {
          tahun_pelajaran: namaTahunPelajaran.value,
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getTahunPelajaran(access_token).then((res) => {
          setTahunPelajaran(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        alertSuccess(err.message);
      });
    return;
  };

  const getTahunPelajaranById = async (id) => {
    let data = {};
    await axios
      .get(TAHUN_PELAJARAN_URL + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        setNamaTahunPelajaran({ msgErr: "", value: data.tahun_pelajaran });
      })
      .catch((err) => {
        console.log(err);
      });

    return data;
  };

  return (
    <div className="App">
      <div className="card">
        <div className="mt-3 mx-3 d-flex align-items-center justify-content-between">
          <h4 className="fw-light">Tahun Pelajaran</h4>
          <Modal
            btnColor="primary"
            modalTitle="Tambah Tahun Pelajaran"
            btnClass="mx-2"
            btnTitle="Tambah Tahun Pelajaran"
            onClick={() => {
              setNamaTahunPelajaran({ msgErr: "", value: "" });
            }}
            onSubmit={addTahunPelajaran}
          >
            <div>
              <label htmlFor="nama-kelas" className="mb-2">
                Nama TahunPelajaran
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleNamaTahunPelajaran(e.target.value);
                  }}
                  id="nama-kelas"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Tahun Pelajaran"
                />
              </CInputGroup>
            </div>
          </Modal>
        </div>
        <DataTable
          // title="TahunPelajaran"
          columns={columns}
          data={tahunPelajaran && tahunPelajaran}
          defaultSortFieldID={1}
          pagination
          // paginationComponent={BootyPagination}
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
      {/* {tahunPelajaran && JSON.stringify(tahunPelajaran, null, 2)} */}
    </div>
  );
};

export default TahunPelajaran;
