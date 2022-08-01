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

const Jadwal = () => {
  const JADWAL_URL = "/jadwal/";
  const DOSEN_URL = "/dosen/";
  const MATAKULIAH_URL = "/matakuliah/";
  const KELAS_URL = "/kelas/";
  const TAPEL_URL = "/tahun-pelajaran/";

  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  const [jadwal, setJadwal] = useState("");
  const [dosen, setDosen] = useState("");
  const [matakuliah, setMatakuliah] = useState("");
  const [kelas, setKelas] = useState("");
  const [tapel, setTapel] = useState("");

  const confirmDelete = (e) => {
    immediateToast("question", {
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      id: "question",
      zindex: 9999,
      title: "Hey",
      message: `Yakin Ingin Menghapus Jadwal ini?`,
      position: "center",
      buttons: [
        [
          "<button><b>YES</b></button>",
          (instance, toast) => {
            deleteJadwal(e.id).then((res) => {
              alertSuccess(res.message);
              getJadwal(access_token).then((res) => {
                setJadwal(res);
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

  const deleteJadwal = async (id) => {
    let data = {};
    await axios
      .delete(JADWAL_URL + id, {
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
    getJadwal(access_token).then((res) => {
      setJadwal(res);
    });

    getMatakuliah(access_token).then((res) => {
      setMatakuliah(res);
    });

    getDosen(access_token).then((res) => {
      setDosen(res);
    });

    getKelas(access_token).then((res) => {
      setKelas(res);
    });

    getTapel(access_token).then((res) => {
      setTapel(res);
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
      name: "Dosen",
      selector: (row) => row.dosen.name,
      sortable: true,
    },
    {
      name: "Matakuliah",
      selector: (row) => row.matkul.nama_matakuliah,
      sortable: true,
    },
    {
      name: "Kelas",
      selector: (row) => row.kelas.nama_kelas,
      sortable: true,
    },
    {
      name: "Tapel",
      selector: (row) => row.tapel.tahun_pelajaran,
      sortable: true,
    },
    {
      name: "Hari",
      selector: (row) => row.hari,
      sortable: true,
    },
    {
      name: "Jam Mulai",
      selector: (row) => row.jam_mulai,
      sortable: true,
    },
    {
      name: "Jam Selesai",
      selector: (row) => row.jam_selesai,
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
                modalTitle="Edit Jadwal"
                onClick={() => {
                  getJadwalById(row.id);
                }}
                onSubmit={async () => {
                  await updateJadwal(row.id).then((res) => {
                    return res;
                  });
                }}
                btnTitle={<EditIcon2White width={15} />}
              >
                <div>
                  <label htmlFor="dosen" className="mb-2">
                    Dosen
                  </label>
                  <Select
                    className="small p-0 mb-2"
                    value={dosenId.value}
                    onChange={(e) => {
                      handleDosenId(e);
                    }}
                    options={dosen && dosen}
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
                <div>
                  <label htmlFor="kelas" className="mb-2">
                    Kelas
                  </label>
                  <Select
                    className="small p-0 mb-2"
                    value={kelasId.value}
                    onChange={(e) => {
                      handleKelasId(e);
                    }}
                    options={kelas && kelas}
                  />
                </div>
                <div>
                  <label htmlFor="tapel" className="mb-2">
                    Tapel
                  </label>
                  <Select
                    className="small p-0 mb-2"
                    value={tapelId.value}
                    onChange={(e) => {
                      handleTapelId(e);
                    }}
                    options={tapel && tapel}
                  />
                </div>
                <div>
                  <label htmlFor="hari" className="mb-2">
                    Hari
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleHari(e.target.value);
                      }}
                      value={hari.value}
                      id="hari"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Hari"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="jam-mulai" className="mb-2">
                    Jam Mulai
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleJamMulai(e.target.value);
                      }}
                      value={jamMulai.value}
                      id="jam-mulai"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Jam Mulai"
                    />
                  </CInputGroup>
                </div>
                <div>
                  <label htmlFor="jam-selesai" className="mb-2">
                    Jam Selesai
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleJamSelesai(e.target.value);
                      }}
                      value={jamSelesai.value}
                      id="jam-selesai"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Jam Selesai"
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

  const getJadwal = async (access_token) => {
    let data = {};
    await axios
      .get(JADWAL_URL, {
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

  const getDosen = async (access_token) => {
    let data = {};
    let dosenOptions = [];
    await axios
      .get(DOSEN_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        data.map((dsn) => {
          dosenOptions.push({
            value: dsn.id,
            label: dsn.name,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return dosenOptions;
  };

  const getMatakuliah = async (access_token) => {
    let data = {};
    let matkulOption = [];

    await axios
      .get(MATAKULIAH_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        data.map((dt) => {
          matkulOption.push({
            value: dt.id,
            label: dt.nama_matakuliah,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return matkulOption;
  };

  const getTapel = async (access_token) => {
    let data = {};
    let tapelOption = [];
    await axios
      .get(TAPEL_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        data.map((tpl) => {
          tapelOption.push({
            value: tpl.id,
            label: tpl.tahun_pelajaran,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return tapelOption;
  };

  const getKelas = async (access_token) => {
    let data = {};
    let kelasOption = [];
    await axios
      .get(KELAS_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
        if (data.length >= 0) {
          data.map((kls) => {
            kelasOption.push({
              value: kls.id,
              label: kls.nama_kelas,
            });
          });
        } else {
          kelasOption = [];
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return kelasOption;
  };

  //Jadwal
  const [dosenId, setDosenId] = useState({
    msgErr: "",
    value: "",
  });

  const [matakuliahId, setMatakuliahId] = useState({
    msgErr: "",
    value: "",
  });

  const [kelasId, setKelasId] = useState({
    msgErr: "",
    value: "",
  });

  const [tapelId, setTapelId] = useState({
    msgErr: "",
    value: "",
  });

  const [hari, setHari] = useState({
    msgErr: "",
    value: "",
  });

  const [jamMulai, setJamMulai] = useState({
    msgErr: "",
    value: "",
  });

  const [jamSelesai, setJamSelesai] = useState({
    msgErr: "",
    value: "",
  });

  const handleDosenId = (value) => {
    if (value === null) {
      setDosenId((prev) => ({ msgErr: "Select dosen" }));
    } else {
      setDosenId({ msgErr: "", value: value });
    }
  };

  const handleMatakuliahId = (value) => {
    if (value === null) {
      setMatakuliahId((prev) => ({ msgErr: "Select matakuliah" }));
    } else {
      setMatakuliahId({ msgErr: "", value: value });
    }
  };

  const handleKelasId = (value) => {
    if (value === null) {
      setKelasId((prev) => ({ msgErr: "Select kelas" }));
    } else {
      setKelasId({ msgErr: "", value: value });
    }
  };

  const handleTapelId = (value) => {
    if (value === null) {
      setTapelId((prev) => ({ msgErr: "Select tapel" }));
    } else {
      setTapelId({ msgErr: "", value: value });
    }
  };

  const handleHari = (value) => {
    if (value === "") {
      setHari((prev) => ({ msgErr: "Hari is required" }));
    } else {
      setHari({ msgErr: "", value: value });
    }
  };

  const handleJamMulai = (value) => {
    if (value === "") {
      setJamMulai((prev) => ({ msgErr: "Jam mulai is required" }));
    } else {
      setJamMulai({ msgErr: "", value: value });
    }
  };

  const handleJamSelesai = (value) => {
    if (value === "") {
      setJamSelesai((prev) => ({ msgErr: "Jam selesai is required" }));
    } else {
      setJamSelesai({ msgErr: "", value: value });
    }
  };

  const addJadwal = async () => {
    let isSuccess = true;
    await axios
      .post(
        JADWAL_URL,
        {
          dosen_id: parseInt(dosenId.value.value),
          matkul_id: parseInt(matakuliahId.value.value),
          kelas_id: parseInt(kelasId.value.value),
          tapel_id: parseInt(tapelId.value.value),
          hari: hari.value,
          jam_mulai: jamMulai.value,
          jam_selesai: jamSelesai.value,
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getJadwal(access_token).then((res) => {
          setJadwal(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        let list = err.response.data.message;
        if (Array.isArray(list)) {
          err.response.data.message.map((err) => {
            alertDanger(err);
          });
        } else {
          alertDanger(list);
        }

        isSuccess = false;
      });
    return isSuccess;
  };

  const updateJadwal = async (id) => {
    let isSuccess = true;
    await axios
      .put(
        JADWAL_URL + id,
        {
          dosen_id: parseInt(dosenId.value.value),
          matkul_id: parseInt(matakuliahId.value.value),
          kelas_id: parseInt(kelasId.value.value),
          tapel_id: parseInt(tapelId.value.value),
          hari: hari.value.value,
          jam_mulai: jamMulai.value.value,
          jam_selesai: jamSelesai.value.value,
        },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((res) => {
        getJadwal(access_token).then((res) => {
          setJadwal(res);
        });
        alertSuccess(res.data.message);
      })
      .catch((err) => {
        let list = err.response.data.message;
        if (Array.isArray(list)) {
          err.response.data.message.map((err) => {
            alertDanger(err);
          });
        } else {
          alertDanger(list);
        }

        isSuccess = false;
      });
    return isSuccess;
  };

  const getJadwalById = async (id) => {
    let data = {};
    await axios
      .get(JADWAL_URL + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;

        setDosenId({
          msgErr: "",
          value: {
            value: data.dosen.id,
            label: data.dosen.name,
          },
        });

        setMatakuliahId({
          msgErr: "",
          value: {
            value: data.matkul.id,
            label: data.matkul.nama_matakuliah,
          },
        });

        setKelasId({
          msgErr: "",
          value: {
            value: data.kelas.id,
            label: data.kelas.nama_kelas,
          },
        });

        setTapelId({
          msgErr: "",
          value: {
            value: data.tapel.id,
            label: data.tapel.tahun_pelajaran,
          },
        });

        setHari({
          msgErr: "",
          value: data.hari,
        });

        setJamMulai({
          msgErr: "",
          value: data.jam_mulai,
        });

        setJamSelesai({
          msgErr: "",
          value: data.jam_selesai,
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
          <h4 className="fw-light">Set Jadwal</h4>
          <Modal
            btnColor="primary"
            modalTitle="Set Jadwal"
            btnClass="mx-2"
            btnTitle="Set Jadwal"
            onClick={() => {
              setDosenId({ msgErr: "", value: "" });
              setMatakuliahId({ msgErr: "", value: "" });
              setKelasId({ msgErr: "", value: "" });
              setTapelId({ msgErr: "", value: "" });
              setHari({ msgErr: "", value: "" });
              setJamMulai({ msgErr: "", value: "" });
              setJamSelesai({ msgErr: "", value: "" });
            }}
            onSubmit={addJadwal}
          >
            <div>
              <label htmlFor="dosen" className="mb-2">
                Dosen
              </label>
              <Select
                className="small p-0 mb-2"
                value={dosenId.value}
                onChange={(e) => {
                  handleDosenId(e);
                }}
                options={dosen && dosen}
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
            <div>
              <label htmlFor="kelas" className="mb-2">
                Kelas
              </label>
              <Select
                className="small p-0 mb-2"
                value={kelasId.value}
                onChange={(e) => {
                  handleKelasId(e);
                }}
                options={kelas && kelas}
              />
            </div>
            <div>
              <label htmlFor="tapel" className="mb-2">
                Tapel
              </label>
              <Select
                className="small p-0 mb-2"
                value={tapelId.value}
                onChange={(e) => {
                  handleTapelId(e);
                }}
                options={tapel && tapel}
              />
            </div>
            <div>
              <label htmlFor="hari" className="mb-2">
                Hari
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleHari(e.target.value);
                  }}
                  id="hari"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Hari"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="jam-mulai" className="mb-2">
                Jam Mulai
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleJamMulai(e.target.value);
                  }}
                  id="jam-mulai"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Jam Mulai"
                />
              </CInputGroup>
            </div>
            <div>
              <label htmlFor="jam-selesai" className="mb-2">
                Jam Selesai
              </label>
              <CInputGroup size="sm" className="mb-3">
                <CFormInput
                  onChange={(e) => {
                    handleJamSelesai(e.target.value);
                  }}
                  id="jam-selesai"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Jam Selesai"
                />
              </CInputGroup>
            </div>
          </Modal>
        </div>
        <DataTable
          columns={columns}
          data={jadwal && jadwal}
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

export default Jadwal;
