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
import DateFormatter from "src/tools/DateFormatter";
import { useNavigate } from "react-router-dom";

const Matakuliah = () => {
  const MATAKULIAH_URL = "/matakuliah/";
  const JURUSAN_URL = "/jurusan/";
  const access_token = localStorage.getItem("access_token");
  const [matakuliah, setMatakuliah] = useState("");
  const [jurusan, setJurusan] = useState("");
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
      message: `Yakin Ingin Menghapus : ${e.nama_matakuliah}`,
      position: "center",
      buttons: [
        [
          "<button><b>YES</b></button>",
          (instance, toast) => {
            deleteMatakuliah(e.id).then((res) => {
              alertSuccess(res.message);
              getMatakuliah(access_token).then((res) => {
                setMatakuliah(res);
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

  const deleteMatakuliah = async (id) => {
    let data = {};
    await axios
      .delete(MATAKULIAH_URL + id, {
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
    getMatakuliah(access_token).then((res) => {
      setMatakuliah(res);
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
      name: "Nama Matakuliah",
      selector: (row) => row.nama_matakuliah,
      sortable: true,
    },
    {
      name: "Kode Matakuliah",
      selector: (row) => row.kode_matakuliah,
      sortable: true,
    },
    {
      name: "Semester",
      selector: (row) => row.semester,
      sortable: true,
    },
    {
      name: "SKS",
      selector: (row) => row.sks,
      sortable: true,
    },
    {
      name: "Nama Jurusan",
      selector: (row) => row.jurusan.nama_jurusan,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => DateFormatter(row.createdAt),
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
                modalTitle="Edit Matakuliah"
                onClick={() => {
                  getMatakuliahById(row.id);
                }}
                onSubmit={async () => {
                  await updateMatakuliah(row.id).then((res) => {
                    return res;
                  });
                }}
                btnTitle={<EditIcon2White width={15} />}
              >
                <div>
                  <label htmlFor="nama-matakuliah" className="mb-2">
                    Nama Matakuliah
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleNamaMatakuliah(e.target.value);
                      }}
                      value={namaMatakuliah.value}
                      id="nama-matakuliah"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Nama Matakuliah"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="nama-matakuliah" className="mb-2">
                    Kode Matakuliah
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleKodeMatakuliah(e.target.value);
                      }}
                      value={kodeMatakuliah.value}
                      id="nama-matakuliah"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Kode Matakuliah"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="nama-matakuliah" className="mb-2">
                    Semester
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleSemester(e.target.value);
                      }}
                      value={semester.value}
                      id="nama-matakuliah"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Semester"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="nama-matakuliah" className="mb-2">
                    SKS
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleSks(e.target.value);
                      }}
                      value={sks.value}
                      id="nama-matakuliah"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="SKS"
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
                    value={jurusanId.value}
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

  const getMatakuliah = async (access_token) => {
    let data = {};
    await axios
      .get(MATAKULIAH_URL, {
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

  //Matakuliah
  const [namaMatakuliah, setNamaMatakuliah] = useState({
    msgErr: "",
    value: "",
  });

  const [kodeMatakuliah, setKodeMatakuliah] = useState({
    msgErr: "",
    value: "",
  });

  const [semester, setSemester] = useState({
    msgErr: "",
    value: "",
  });

  const [sks, setSks] = useState({
    msgErr: "",
    value: "",
  });

  const [jurusanId, setJurusanId] = useState({
    msgErr: "",
    value: "",
  });

  const handleNamaMatakuliah = (value) => {
    if (value === "") {
      setNamaMatakuliah((prev) => ({ msgErr: "Type nama matakuliah" }));
    } else {
      setNamaMatakuliah({ msgErr: "", value: value });
    }
  };

  const handleKodeMatakuliah = (value) => {
    if (value === "") {
      setKodeMatakuliah((prev) => ({ msgErr: "Type kode matakuliah" }));
    } else {
      setKodeMatakuliah({ msgErr: "", value: value });
    }
  };

  const handleSemester = (value) => {
    if (value === "") {
      setSemester((prev) => ({ msgErr: "Type kode matakuliah" }));
    } else {
      setSemester({ msgErr: "", value: value });
    }
  };

  const handleSks = (value) => {
    if (value === "") {
      setSks((prev) => ({ msgErr: "Type kode matakuliah" }));
    } else {
      setSks({ msgErr: "", value: value });
    }
  };

  const handleJurusanId = (value) => {
    if (value === "") {
      setJurusanId((prev) => ({ msgErr: "Select jurusan" }));
    } else {
      setJurusanId({ msgErr: "", value: value });
    }
  };

  const addMatakuliah = async () => {
    let isSuccess = true;
    await axios
      .post(
        MATAKULIAH_URL,
        {
          kode_matakuliah: kodeMatakuliah.value,
          nama_matakuliah: namaMatakuliah.value,
          semester: semester.value,
          sks: sks.value,
          jurusan_id: parseInt(jurusanId.value),
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getMatakuliah(access_token).then((res) => {
          setMatakuliah(res);
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

  const updateMatakuliah = async (id) => {
    await axios
      .put(
        MATAKULIAH_URL + id,
        {
          kode_matakuliah: kodeMatakuliah.value,
          nama_matakuliah: namaMatakuliah.value,
          semester: semester.value,
          sks: sks.value,
          jurusan_id: parseInt(jurusanId.value),
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getMatakuliah(access_token).then((res) => {
          setMatakuliah(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        alertSuccess(err.message);
      });
    return;
  };

  const getMatakuliahById = async (id) => {
    let data = {};
    await axios
      .get(MATAKULIAH_URL + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        setNamaMatakuliah({ msgErr: "", value: data.nama_matakuliah });
        setKodeMatakuliah({ msgErr: "", value: data.kode_matakuliah });
        setSemester({ msgErr: "", value: data.semester });
        setSks({ msgErr: "", value: data.sks });
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
          <h4 className="fw-light">Matakuliah</h4>
          <Modal
            btnColor="primary"
            modalTitle="Tambah Matakuliah"
            btnClass="mx-2"
            btnTitle="Tambah Matakuliah"
            onClick={() => {
              setNamaMatakuliah({ msgErr: "", value: "" });
              setKodeMatakuliah({ msgErr: "", value: "" });
              setSemester({ msgErr: "", value: "" });
              setSks({ msgErr: "", value: "" });
              setJurusanId({ msgErr: "", value: "" });
            }}
            onSubmit={addMatakuliah}
          >
            <div>
              <label htmlFor="nama-matakuliah" className="mb-2">
                Nama Matakuliah
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleNamaMatakuliah(e.target.value);
                  }}
                  id="nama-matakuliah"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Nama Matakuliah"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="nama-matakuliah" className="mb-2">
                Kode Matakuliah
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleKodeMatakuliah(e.target.value);
                  }}
                  id="nama-matakuliah"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Kode Matakuliah"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="nama-matakuliah" className="mb-2">
                Semester
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleSemester(e.target.value);
                  }}
                  id="nama-matakuliah"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Semester"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="nama-matakuliah" className="mb-2">
                SKS
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleSks(e.target.value);
                  }}
                  id="nama-matakuliah"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="SKS"
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
          data={matakuliah && matakuliah}
          //   title={<span className="fs-6">Semua "MATAKULIAH"</span>}
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

export default Matakuliah;
