import {
  CButton,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
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

const Mahasiswa = () => {
  const MAHASISWA_URL = "/mahasiswa/";
  const KELAS_URL = "/kelas/";
  const access_token = localStorage.getItem("access_token");
  const [mahasiswa, setMahasiswa] = useState("");
  const [kelas, setKelas] = useState("");
  const confirmDelete = (e) => {
    immediateToast("question", {
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      id: "question",
      zindex: 9999,
      title: "Hey",
      message: `Yakin Ingin Menghapus : ${e.name}`,
      position: "center",
      buttons: [
        [
          "<button><b>YES</b></button>",
          (instance, toast) => {
            deleteMahasiswa(e.id).then((res) => {
              alertSuccess(res.message);
              getMahasiswa(access_token).then((res) => {
                setMahasiswa(res);
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

  const deleteMahasiswa = async (id) => {
    let data = {};
    await axios
      .delete(MAHASISWA_URL + id, {
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

  useEffect(() => {
    getMahasiswa(access_token).then((res) => {
      setMahasiswa(res);
    });

    getKelas(access_token).then((res) => {
      setKelas(res);
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
      name: "Nama Lengkap",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "NIM",
      selector: (row) => row.nim,
      sortable: true,
    },
    {
      name: "Kelas",
      selector: (row) => row.kelas.nama_kelas,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.user.username,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => dateFormatter(row.createdAt),
      sortable: true,
    },
    {
      button: true,
      minWidth: "250px",
      cell: (row) => (
        <div className="App">
          <div className="openbtn">
            <div className="d-flex">
              <Modal
                btnColor="primary"
                btnClass=""
                modalTitle="Edit Mahasiswa"
                onClick={() => {
                  getMahasiswaById(row.id);
                }}
                onSubmit={() => {
                  updateMahasiswa(row.id);
                }}
                btnTitle={<EditIcon2White width={15} />}
              >
                <div>
                  <label htmlFor="nama-mahasiswa" className="mb-2">
                    Nama Mahasiswa
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleName(e.target.value);
                      }}
                      value={name.value}
                      id="nama-mahasiswa"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Nama Mahasiswa"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="username" className="mb-2">
                    Username
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleUsername(e.target.value);
                      }}
                      value={username.value}
                      id="username"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Username"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="nim" className="mb-2">
                    NIM
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleNim(e.target.value);
                      }}
                      value={nim.value}
                      type="text"
                      id="nim"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="NIM"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="kelas" className="mb-2">
                    Kelas
                  </label>
                  <CFormSelect
                    size="sm"
                    className="mb-3"
                    aria-label="Small select example"
                    value={kelasId.value}
                    onChange={(e) => {
                      handleKelasId(e.target.value);
                    }}
                  >
                    <option value={null}>Select Kelas</option>
                    {kelas &&
                      kelas.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.nama_kelas}
                          </option>
                        );
                      })}
                  </CFormSelect>
                </div>
              </Modal>
              <Modal
                btnColor="info"
                modalTitle="Change Password"
                btnClass="mx-2"
                btnTitle={<KeyIconWhite width={15} />}
                onClick={() => {
                  setPassword({ msgErr: "", value: "" });
                  setConfirmPassword({ msgErr: "", value: "" });
                }}
                onSubmit={() => {
                  updatePasswordMahasiswa(row.id);
                }}
              >
                <div>
                  <label htmlFor="new-password" className="mb-2">
                    New Password
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      id="new-password"
                      value={password.value}
                      onChange={(e) => {
                        handlePassword(e.target.value);
                      }}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="New Password"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="mb-2">
                    Confirm Password
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      id="confirm-password"
                      value={confirmPassword.value}
                      onChange={(e) => {
                        handleConfirmPassword(e.target.value);
                      }}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Confirm Password"
                    />
                  </CInputGroup>
                  {confirmPassword.msgErr && (
                    <span className="text-danger text-xs">
                      {confirmPassword.msgErr}
                    </span>
                  )}
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

  //?get Kelas
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

  const getMahasiswa = async (access_token) => {
    let data = {};
    await axios
      .get(MAHASISWA_URL, {
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

  //Mahasiswa
  const [username, setUsername] = useState({ msgErr: "", value: "" });
  const [password, setPassword] = useState({ msgErr: "", value: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    msgErr: "",
    value: "",
  });
  const [nim, setNim] = useState({ msgErr: "", value: "" });
  const [name, setName] = useState({ msgErr: "", value: "" });
  const [kelasId, setKelasId] = useState({ msgErr: "", value: "" });

  const handleUsername = (value) => {
    if (value === "") {
      setUsername((prev) => ({ msgErr: "Type nama kelas" }));
    } else {
      setUsername({ msgErr: "", value: value });
    }
  };

  const handlePassword = (value) => {
    if (value === "") {
      setPassword((prev) => ({ msgErr: "Type nama kelas" }));
    } else {
      setPassword({ msgErr: "", value: value });
    }
  };

  const handleConfirmPassword = (value) => {
    if (value === "" || password.value !== value) {
      let message = "";

      if (value === "") {
        message = "Type new password";
      }

      if (password.value !== value) {
        message = "Password and confirmation password must be the same.";
      }

      setConfirmPassword((prev) => ({ msgErr: message }));
    } else {
      setConfirmPassword({ msgErr: "", value: value });
    }
  };

  const handleNim = (value) => {
    if (value === "") {
      setNim((prev) => ({ msgErr: "Type nama kelas" }));
    } else {
      setNim({ msgErr: "", value: value });
    }
  };

  const handleName = (value) => {
    if (value === "") {
      setName((prev) => ({ msgErr: "Type nama kelas" }));
    } else {
      setName({ msgErr: "", value: value });
    }
  };

  const handleKelasId = (value) => {
    if (value === "") {
      setKelasId((prev) => ({ msgErr: "Type nama kelas" }));
    } else {
      setKelasId({ msgErr: "", value: value });
    }
  };

  const addMahasiswa = async () => {
    await axios
      .post(
        MAHASISWA_URL,
        {
          username: username.value,
          password: password.value,
          nim: nim.value,
          name: name.value,
          kelas_id: parseInt(kelasId.value),
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getMahasiswa(access_token).then((res) => {
          setMahasiswa(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        alertSuccess(err.message);
      });
    return;
  };

  const getMahasiswaById = async (id) => {
    let data = {};
    await axios
      .get(MAHASISWA_URL + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        setUsername({ msgErr: "", value: data.user.username });
        setNim({ msgErr: "", value: data.nim });
        setName({ msgErr: "", value: data.name });
        setKelasId({ msgErr: "", value: data.kelas_id });
      })
      .catch((err) => {
        console.log(err);
      });

    return data;
  };

  const updateMahasiswa = async (id) => {
    await axios
      .put(
        MAHASISWA_URL + id,
        {
          username: username.value,
          nim: nim.value,
          name: name.value,
          kelas_id: parseInt(kelasId.value),
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getMahasiswa(access_token).then((res) => {
          setMahasiswa(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        alertSuccess(err.message);
      });
    return;
  };

  const updatePasswordMahasiswa = async (id) => {
    await axios
      .put(
        MAHASISWA_URL + id,
        {
          password: password.value,
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getMahasiswa(access_token).then((res) => {
          setMahasiswa(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        alertSuccess(err.message);
      });
    return;
  };

  return (
    <div className="App">
      <div className="card">
        <div className="mt-3 mx-3 d-flex align-items-center justify-content-between">
          <h4 className="fw-light">Mahasiswa</h4>
          <Modal
            btnColor="primary"
            modalTitle="Tambah Mahasiswa"
            btnClass="mx-2"
            btnTitle="Tambah Mahasiswa"
            onClick={() => {
              setName({ msgErr: "", value: "" });
            }}
            onSubmit={addMahasiswa}
          >
            <div>
              <label htmlFor="nama-mahasiswa" className="mb-2">
                Nama Mahasiswa
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleName(e.target.value);
                  }}
                  id="nama-mahasiswa"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Nama Mahasiswa"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="username" className="mb-2">
                Username
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleUsername(e.target.value);
                  }}
                  id="username"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Username"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handlePassword(e.target.value);
                  }}
                  type="password"
                  id="password"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Password"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="nim" className="mb-2">
                NIM
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleNim(e.target.value);
                  }}
                  type="text"
                  id="nim"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="NIM"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="kelas" className="mb-2">
                Kelas
              </label>
              <CFormSelect
                size="sm"
                className="mb-3"
                aria-label="Small select example"
                onChange={(e) => {
                  handleKelasId(e.target.value);
                }}
              >
                <option value={null}>Select Kelas</option>
                {kelas &&
                  kelas.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.nama_kelas}
                      </option>
                    );
                  })}
              </CFormSelect>
            </div>
          </Modal>
        </div>
        <DataTable
          // title="Mahasiswa"
          columns={columns}
          data={mahasiswa && mahasiswa}
          defaultSortFieldID={1}
          pagination
          // paginationComponent={BootyPagination}
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
      {/* {mahasiswa && JSON.stringify(mahasiswa, null, 2)} */}
    </div>
  );
};

export default Mahasiswa;
