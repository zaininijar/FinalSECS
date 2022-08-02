import { CButton, CCard, CFormInput, CInputGroup } from "@coreui/react";
import React, { useEffect, useState } from "react";
import axios from "src/api/axios";
import DataTable from "react-data-table-component";
import Modal from "../../../components/Modal";
import { DeleteIconWhite, EditIcon2White } from "src/assets/icons";
import { immediateToast } from "izitoast-react";

const Jadwal = () => {
  const JADWAL_URL = "/jadwal/me";
  const MHS_LIST_URL = "/list-mahasiswa/";

  const [mahasiswa, setMahasiswa] = useState();
  const [jadwalMe, setJadwalMe] = useState("");

  const [jadwalId, setJadwalId] = useState("");
  const [mhsNilai, setMhsNilai] = useState("");

  const access_token = localStorage.getItem("access_token");

  const getJadwalMe = async (access_token) => {
    let data = {};
    await axios
      .get(JADWAL_URL, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        data = res.data.data;
      })
      .catch((err) => {
        data = err;
      });
    return data;
  };

  const getMahasiswa = async (id) => {
    let data = {};
    await axios
      .get(MHS_LIST_URL + id, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        data = res.data.data;
      })
      .catch((err) => {
        data = err;
      });
    return data;
  };

  useEffect(() => {
    getJadwalMe(access_token).then((res) => {
      setJadwalMe(res);
    });
  }, []);

  const alertSuccess = (message) => {
    immediateToast("success", {
      message: message,
    });
  };

  const handleMhsNilai = (value) => {
    if (value === null) {
      setMhsNilai((prev) => ({ msgErr: "Nilai is required" }));
    } else {
      setMhsNilai(value);
    }
  };

  //DataTable MHS Column
  const mhsColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "NIM",
      selector: (row) => row.nim,
      sortable: true,
    },
    {
      button: true,
      cell: (row) => (
        <div className="App">
          <div className="openbtn">
            <div className="d-flex">
              <Modal
                btnColor="primary"
                btnClass="me-2"
                size="sm"
                // modalTitle={`<span className="small">Input Nilai ${row.name}</span>`}
                onSubmit={async () => {
                  await saveMhsNilai(row.id).then((res) => {
                    return res;
                  });
                }}
                btnTitle={<EditIcon2White width={15} />}
              >
                <div>
                  <label htmlFor="nilai" className="mb-2">
                    Nilai
                  </label>
                  <CInputGroup size="sm" className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        handleMhsNilai(e.target.value);
                      }}
                      type="number"
                      id="nilai"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Nilai"
                    />
                  </CInputGroup>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const saveMhsNilai = (id) => {
    alert(`mhs id : ${id}, jdwl id : ${jadwalId}, nilai : ${mhsNilai}`);
  };

  //DataTable
  const columns = [
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
      name: "Kelas",
      selector: (row) => row.kelas.nama_kelas,
      sortable: true,
    },
    {
      name: "Matakuliah",
      selector: (row) => row.matkul.nama_matakuliah,
      sortable: true,
    },
    {
      name: "TA",
      selector: (row) => row.tapel.tahun_pelajaran,
      sortable: true,
    },
    // {
    //   button: true,
    //   minWidth: "120px",
    //   cell: (row) => (
    //     <div className="App">
    //       <div className="openbtn">
    //         <div className="d-flex">
    //           <Modal
    //             btnColor="primary"
    //             btnClass="me-2"
    //             modalTitle="List Mahasiswa"
    //             onClick={() => {
    //               setJadwalId(row.id);
    //               getMahasiswa(row.id).then((res) => {
    //                 setMahasiswa(res);
    //               });
    //             }}
    //             onSubmit={async () => {
    //               await updateMatakuliah(row.id).then((res) => {
    //                 return res;
    //               });
    //             }}
    //             btnTitle="List Mahasiswa"
    //           >
    //             <div className="App">
    //               <div className="card">
    //                 <DataTable
    //                   title="Movies"
    //                   columns={mhsColumns}
    //                   data={mahasiswa && mahasiswa}
    //                   defaultSortFieldID={1}
    //                   pagination
    //                 />
    //               </div>
    //             </div>
    //             {/* {mahasiswa && JSON.stringify(mahasiswa, null, 2)} */}
    //           </Modal>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
  ];
  //EndDatatable

  return (
    <div className="App">
      <div className="card">
        <CCard>
          <DataTable
            columns={columns}
            data={jadwalMe && jadwalMe}
            title={<span className="fs-6">Jadwal Saya</span>}
            defaultSortFieldID={1}
            pagination
            selectableRows
          />
        </CCard>
      </div>
    </div>
  );
};

export default Jadwal;
