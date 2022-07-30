import { CButton, CFormInput, CInputGroup } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { immediateToast } from "izitoast-react";
import axios from "src/api/axios";
import {
  DeleteIconWhite,
  EditIcon2White,
  KeyIconWhite,
} from "src/assets/icons";
import Modal from "src/components/Modal";
import dateFormatter from "src/tools/DateFormatter";
import { useNavigate } from "react-router-dom";

const Dosen = () => {
  const DOSEN_URL = "/dosen/";
  const access_token = localStorage.getItem("access_token");
  const [dosen, setDosen] = useState("");
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
      message: `Yakin Ingin Menghapus : ${e.name}`,
      position: "center",
      buttons: [
        [
          "<button><b>YES</b></button>",
          (instance, toast) => {
            deleteDosen(e.id).then((res) => {
              alertSuccess(res.message);
              getDosen(access_token).then((res) => {
                setDosen(res);
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

  const deleteDosen = async (id) => {
    let data = {};
    await axios
      .delete(DOSEN_URL + id, {
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
    getDosen(access_token).then((res) => {
      setDosen(res);
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
      name: "NIP",
      selector: (row) => row.nip,
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
                modalTitle="Edit Dosen"
                onClick={() => {
                  getDosenById(row.id);
                }}
                onSubmit={async () => {
                  await updateDosen(row.id).then((res) => {
                    return res;
                  });
                }}
                btnTitle={<EditIcon2White width={15} />}
              >
                <div>
                  <label htmlFor="nama-dosen" className="mb-2">
                    Nama Dosen
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleName(e.target.value);
                      }}
                      value={name.value}
                      id="nama-dosen"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Nama Dosen"
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
                  <label htmlFor="nip" className="mb-2">
                    NIP
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleNip(e.target.value);
                      }}
                      value={nip.value}
                      type="text"
                      id="nip"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="NIP"
                    />
                  </CInputGroup>
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
                onSubmit={async () => {
                  await updatePasswordDosen(row.id).then((res) => {
                    return res;
                  });
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

  const getDosen = async (access_token) => {
    let data = {};
    await axios
      .get(DOSEN_URL, {
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

  //Dosen
  const [username, setUsername] = useState({ msgErr: "", value: "" });
  const [password, setPassword] = useState({ msgErr: "", value: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    msgErr: "",
    value: "",
  });
  const [nip, setNip] = useState({ msgErr: "", value: "" });
  const [name, setName] = useState({ msgErr: "", value: "" });

  const handleUsername = (value) => {
    if (value === "") {
      setUsername((prev) => ({ msgErr: "Username is required" }));
    } else {
      setUsername({ msgErr: "", value: value });
    }
  };

  const handlePassword = (value) => {
    if (value === "") {
      setPassword((prev) => ({ msgErr: "Password is required" }));
    } else {
      setPassword({ msgErr: "", value: value });
    }
  };

  const handleConfirmPassword = (value) => {
    if (value === "" || password.value !== value) {
      let message = "";

      if (value === "") {
        message = "Password confirmation is required";
      }

      if (password.value !== value) {
        message = "Password and confirmation password must be the same.";
      }

      setConfirmPassword((prev) => ({ msgErr: message }));
    } else {
      setConfirmPassword({ msgErr: "", value: value });
    }
  };

  const handleNip = (value) => {
    if (value === "") {
      setNip((prev) => ({ msgErr: "Nip is required" }));
    } else {
      setNip({ msgErr: "", value: value });
    }
  };

  const handleName = (value) => {
    if (value === "") {
      setName((prev) => ({ msgErr: "Name is required" }));
    } else {
      setName({ msgErr: "", value: value });
    }
  };

  const addDosen = async () => {
    let isSuccess = true;
    await axios
      .post(
        DOSEN_URL,
        {
          username: username.value,
          password: password.value,
          nip: nip.value,
          name: name.value,
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getDosen(access_token).then((res) => {
          setDosen(res);
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

  const getDosenById = async (id) => {
    let data = {};
    await axios
      .get(DOSEN_URL + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        setUsername({ msgErr: "", value: data.user.username });
        setNip({ msgErr: "", value: data.nip });
        setName({ msgErr: "", value: data.name });
      })
      .catch((err) => {
        console.log(err);
      });

    return data;
  };

  const updateDosen = async (id) => {
    await axios
      .put(
        DOSEN_URL + id,
        {
          username: username.value,
          nip: nip.value,
          name: name.value,
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getDosen(access_token).then((res) => {
          setDosen(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        alertSuccess(err.message);
      });
    return;
  };

  const updatePasswordDosen = async (id) => {
    await axios
      .put(
        DOSEN_URL + id,
        {
          password: password.value,
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getDosen(access_token).then((res) => {
          setDosen(res);
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
          <h4 className="fw-light">Dosen</h4>
          <Modal
            btnColor="primary"
            modalTitle="Tambah Dosen"
            btnClass="mx-2"
            btnTitle="Tambah Dosen"
            onClick={() => {
              setName({ msgErr: "", value: "" });
            }}
            onSubmit={addDosen}
          >
            <div>
              <label htmlFor="nama-dosen" className="mb-2">
                Nama Dosen
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleName(e.target.value);
                  }}
                  id="nama-dosen"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Nama Dosen"
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
              <label htmlFor="nip" className="mb-2">
                NIP
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleNip(e.target.value);
                  }}
                  type="text"
                  id="nip"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="NIP"
                />
              </CInputGroup>
            </div>
          </Modal>
        </div>
        <DataTable
          // title="Dosen"
          columns={columns}
          data={dosen && dosen}
          defaultSortFieldID={1}
          pagination
          // paginationComponent={BootyPagination}
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
      {/* {dosen && JSON.stringify(dosen, null, 2)} */}
    </div>
  );
};

export default Dosen;
