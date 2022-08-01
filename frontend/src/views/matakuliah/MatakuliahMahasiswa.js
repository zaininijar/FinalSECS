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
import { immediateToast } from "izitoast-react";
import Select from "react-select";
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
import { useNavigate } from "react-router-dom";

const MatakuliahMahasiswa = () => {
  const MATAKULIAH_URL = "/matakuliah/";
  const MAHASISWA_URL = "/mahasiswa/";
  const MATAKULIAH_MAHASISWA_URL = "/matakuliah-mahasiswa/";

  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  const [matakuliahMahasiswa, setMatakuliahMahasiswa] = useState("");
  const [matakuliah, setMatakuliah] = useState("");
  const [mahasiswa, setMahasiswa] = useState("");

  const confirmDelete = (e) => {
    immediateToast("question", {
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      id: "question",
      zindex: 9999,
      title: "Hey",
      message: `Yakin Ingin Menghapus : ${e.mahasiswa.name} -> ${e.matkul.nama_matakuliah}`,
      position: "center",
      buttons: [
        [
          "<button><b>YES</b></button>",
          (instance, toast) => {
            deleteMatakuliahMahasiswa(e.id).then((res) => {
              alertSuccess(res.message);
              getMatakuliahMahasiswa(access_token).then((res) => {
                setMatakuliahMahasiswa(res);
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

  const deleteMatakuliahMahasiswa = async (id) => {
    let data = {};
    await axios
      .delete(MATAKULIAH_MAHASISWA_URL + id, {
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
    getMatakuliahMahasiswa(access_token).then((res) => {
      setMatakuliahMahasiswa(res);
    });

    getMatakuliah(access_token).then((res) => {
      setMatakuliah(res);
    });

    getMahasiswa(access_token).then((res) => {
      setMahasiswa(res);
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
      name: "Mahasiswa",
      selector: (row) => row.mahasiswa.name,
      sortable: true,
    },
    {
      name: "Matakuliah",
      selector: (row) => row.matkul.nama_matakuliah,
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
                modalTitle="Edit MatakuliahMahasiswa"
                onClick={() => {
                  getMatakuliahMahasiswaById(row.id);
                }}
                onSubmit={async () => {
                  await updateMatakuliahMahasiswa(row.id).then((res) => {
                    return res;
                  });
                }}
                btnTitle={<EditIcon2White width={15} />}
              >
                <div>
                  <label htmlFor="mahasiswa" className="mb-2">
                    Mahasiswa
                  </label>
                  <Select
                    className="small p-0 mb-2"
                    value={mahasiswaId.value}
                    onChange={(e) => {
                      handleMahasiswaId(e);
                    }}
                    options={mahasiswa && mahasiswa}
                  />
                </div>
                <div>
                  <label htmlFor="matakuliah" className="mb-2">
                    Matakuliah
                  </label>
                  <Select
                    className="small p-0 mb-2"
                    value={matakuliahId.value}
                    onChange={(e) => {
                      handleMatakuliahId(e);
                    }}
                    options={matakuliah && matakuliah}
                  />
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

  const getMatakuliahMahasiswa = async (access_token) => {
    let data = {};
    await axios
      .get(MATAKULIAH_MAHASISWA_URL, {
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

  const getMahasiswa = async (access_token) => {
    let data = {};
    let mahasiswaOptions = [];
    await axios
      .get(MAHASISWA_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        data.map((mhs) => {
          mahasiswaOptions.push({
            value: mhs.id,
            label: mhs.name,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return mahasiswaOptions;
  };

  const getMatakuliah = async (access_token) => {
    let data = {};
    let mahasiswaOptions = [];

    await axios
      .get(MATAKULIAH_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        data.map((dt) => {
          mahasiswaOptions.push({
            value: dt.id,
            label: dt.nama_matakuliah,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return mahasiswaOptions;
  };

  //MatakuliahMahasiswa
  const [mahasiswaId, setMahasiswaId] = useState({
    msgErr: "",
    value: "",
  });

  const [matakuliahId, setMatakuliahId] = useState({
    msgErr: "",
    value: "",
  });

  const [semester, setSemester] = useState({
    msgErr: "",
    value: "",
  });

  const handleMahasiswaId = (value) => {
    if (value === null) {
      setMahasiswaId((prev) => ({ msgErr: "Select mahasiswa" }));
    } else {
      setMahasiswaId({ msgErr: "", value: value });
    }
  };

  const handleMatakuliahId = (value) => {
    if (value === null) {
      setMatakuliahId((prev) => ({ msgErr: "Select matakuliah" }));
    } else {
      setMatakuliahId({ msgErr: "", value: value });
    }
  };

  const handleSemester = (value) => {
    if (value === "") {
      setSemester((prev) => ({ msgErr: "Semester is required" }));
    } else {
      setSemester({ msgErr: "", value: value });
    }
  };

  const addMatakuliahMahasiswa = async () => {
    let isSuccess = true;
    await axios
      .post(
        MATAKULIAH_MAHASISWA_URL,
        {
          mahasiswa_id: parseInt(mahasiswaId.value.value),
          matkul_id: parseInt(matakuliahId.value.value),
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getMatakuliahMahasiswa(access_token).then((res) => {
          setMatakuliahMahasiswa(res);
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

  const updateMatakuliahMahasiswa = async (id) => {
    let isSuccess = true;
    await axios
      .put(
        MATAKULIAH_MAHASISWA_URL + id,
        {
          mahasiswa_id: parseInt(mahasiswaId.value.value),
          matkul_id: parseInt(matakuliahId.value.value),
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getMatakuliahMahasiswa(access_token).then((res) => {
          setMatakuliahMahasiswa(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        alertSuccess(err.message);
        isSuccess = false;
      });
    return isSuccess;
  };

  const getMatakuliahMahasiswaById = async (id) => {
    let data = {};
    await axios
      .get(MATAKULIAH_MAHASISWA_URL + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        setMahasiswaId({
          msgErr: "",
          value: {
            value: data.mahasiswa.id,
            label: data.mahasiswa.name,
          },
        });
        setMatakuliahId({
          msgErr: "",
          value: {
            value: data.matkul.id,
            label: data.matkul.nama_matakuliah,
          },
        });
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
          <h4 className="fw-light">Set Matakuliah Mahasiswa</h4>
          <Modal
            btnColor="primary"
            modalTitle="Set Matakuliah Mahasiswa"
            btnClass="mx-2"
            btnTitle="Set Matakuliah Mahasiswa"
            onClick={() => {
              setMahasiswaId({ msgErr: "", value: "" });
              setMatakuliahId({ msgErr: "", value: "" });
              setSemester({ msgErr: "", value: "" });
            }}
            onSubmit={addMatakuliahMahasiswa}
          >
            <div>
              <label htmlFor="mahasiswa" className="mb-2">
                Mahasiswa
              </label>
              <Select
                className="small p-0 mb-2"
                value={mahasiswaId.value}
                onChange={(e) => {
                  handleMahasiswaId(e);
                }}
                options={mahasiswa && mahasiswa}
              />
            </div>
            <div>
              <label htmlFor="matakuliah" className="mb-2">
                Matakuliah
              </label>
              <Select
                className="small p-0 mb-2"
                value={matakuliahId.value}
                onChange={(e) => {
                  handleMatakuliahId(e);
                }}
                options={matakuliah && matakuliah}
              />
            </div>
          </Modal>
        </div>
        <DataTable
          columns={columns}
          data={matakuliahMahasiswa && matakuliahMahasiswa}
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

export default MatakuliahMahasiswa;
