import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useToast, immediateToast } from "izitoast-react";
import axios from "src/api/axios";
import {
  DeleteIconWhite,
  EditIcon2White,
  EditIconWhite,
  KeyIcon,
  KeyIconWhite,
} from "src/assets/icons";
import Modal from "src/components/Modal";
import dateFormatter from "src/tools/DateFormatter";

const Kelas = () => {
  const KELAS_URL = "/kelas/";
  const JURUSAN_URL = "/jurusan/";
  const access_token = localStorage.getItem("access_token");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const confirmDelete = (e) => {
    immediateToast("question", {
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      id: "question",
      zindex: 9999,
      title: "Hey",
      message: `Yakin Ingin Menghapus : ${e.nama_kelas}`,
      position: "center",
      buttons: [
        [
          "<button><b>YES</b></button>",
          (instance, toast) => {
            deleteKelas(e.id).then((res) => {
              alertSuccess(res.message);
              getKelas(access_token).then((res) => {
                setKelas(res);
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

  const deleteKelas = async (id) => {
    let data = {};
    await axios
      .delete(KELAS_URL + id, {
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
    getKelas(access_token).then((res) => {
      setKelas(res);
    });

    getJurusan(access_token).then((res) => {
      setJurusan(res);
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
      name: "Nama Kelas",
      selector: (row) => row.nama_kelas,
      sortable: true,
    },
    {
      name: "Nama Jurusan",
      selector: (row) => row.jurusan.nama_jurusan,
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
                modalTitle="Edit Kelas"
                onClick={() => {
                  getKelasById(row.id);
                }}
                onSubmit={async () => {
                  await updateKelas(row.id).then((res) => {
                    return res;
                  });
                }}
                btnTitle={<EditIcon2White width={15} />}
              >
                <div>
                  <label htmlFor="nama-kelas" className="mb-2">
                    Nama Kelas
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleNamaKelas(e.target.value);
                      }}
                      value={namaKelas.value}
                      id="nama-kelas"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Nama Kelas"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="jurusan" className="mb-2">
                    Jurusan
                  </label>
                  <CFormSelect
                    size="sm"
                    value={jurusanId.value}
                    className="mb-3"
                    aria-label="Small select example"
                    onChange={(e) => {
                      handleJurusanId(e.target.value);
                    }}
                  >
                    <option value={null}>Select Jurusan</option>
                    {jurusan &&
                      jurusan.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.nama_jurusan}
                          </option>
                        );
                      })}
                  </CFormSelect>
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

  const getKelas = async (access_token) => {
    let data = {};
    await axios
      .get(KELAS_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    return data;
  };

  const getJurusan = async (access_token) => {
    let data = {};
    await axios
      .get(JURUSAN_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    return data;
  };

  //Kelas
  const [namaKelas, setNamaKelas] = useState({ msgErr: "", value: "" });
  const [jurusanId, setJurusanId] = useState({ msgErr: "", value: "" });
  const handleNamaKelas = (value) => {
    if (value === "") {
      setNamaKelas((prev) => ({ msgErr: "Type nama kelas" }));
    } else {
      setNamaKelas({ msgErr: "", value: value });
    }
  };

  const handleJurusanId = (value) => {
    if (value === "") {
      setJurusanId((prev) => ({ msgErr: "Select jurusan" }));
    } else {
      setJurusanId({ msgErr: "", value: value });
    }
  };

  const addKelas = async () => {
    let isSuccess = true;
    await axios
      .post(
        KELAS_URL,
        {
          nama_kelas: namaKelas.value,
          jurusan_id: parseInt(jurusanId.value),
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getKelas(access_token).then((res) => {
          setKelas(res);
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

  const updateKelas = async (id) => {
    await axios
      .put(
        KELAS_URL + id,
        {
          nama_kelas: namaKelas.value,
          jurusan_id: parseInt(jurusanId.value),
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getKelas(access_token).then((res) => {
          setKelas(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        alertSuccess(err.message);
      });
    return;
  };

  const getKelasById = async (id) => {
    let data = {};
    await axios
      .get(KELAS_URL + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        setNamaKelas({ msgErr: "", value: data.nama_kelas });
        setJurusanId({ msgErr: "", value: data.jurusan.id });
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
          <h4 className="fw-light">Kelas</h4>
          <Modal
            btnColor="primary"
            modalTitle="Tambah Kelas"
            btnClass="mx-2"
            btnTitle="Tambah Kelas"
            onClick={() => {
              setNamaKelas({ msgErr: "", value: "" });
              setJurusanId({ msgErr: "", value: "" });
            }}
            onSubmit={addKelas}
          >
            <div>
              <label htmlFor="nama-kelas" className="mb-2">
                Nama Kelas
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleNamaKelas(e.target.value);
                  }}
                  id="nama-kelas"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Nama Kelas"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="jurusan" className="mb-2">
                Jurusan
              </label>
              <CFormSelect
                size="sm"
                className="mb-3"
                aria-label="Small select example"
                onChange={(e) => {
                  handleJurusanId(e.target.value);
                }}
              >
                <option value={null}>Select Jurusan</option>
                {jurusan &&
                  jurusan.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.nama_jurusan}
                      </option>
                    );
                  })}
              </CFormSelect>
            </div>
          </Modal>
        </div>
        <DataTable
          columns={columns}
          data={kelas && kelas}
          //   title={<span className="fs-6">Semua "KELAS"</span>}
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

export default Kelas;
