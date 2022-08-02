import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import axios from "src/api/axios";
import DataTable from "react-data-table-component";

const Nilai = () => {
  const NILAI_ME_URL = "/nilai/";
  const [nilaiMe, setNilaiMe] = useState("");
  const [ipkMe, setIpkMe] = useState("");

  const access_token = localStorage.getItem("access_token");

  const getNilaiMe = async (access_token) => {
    let data = {};
    await axios
      .get(`${NILAI_ME_URL}me`, {
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

  const getIpkMe = async (access_token) => {
    let data = {};
    await axios
      .get(`${NILAI_ME_URL}ipk`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        data = res.data.data;
        return console.log(data);
      })
      .catch((err) => {
        data = err;
      });
    return data;
  };

  useEffect(() => {
    getNilaiMe(access_token).then((res) => {
      setNilaiMe(res);
    });

    getIpkMe(access_token).then((res) => {
      setIpkMe(res);
    });
  }, []);

  //DataTable Nilai MHS Column
  const nilaiColumns = [
    {
      name: "Nama Matakuliah",
      selector: (row) => row.jadwal.matkul.nama_matakuliah,
      sortable: true,
    },
    {
      name: "Bobot",
      selector: (row) => row.bobot,
      sortable: true,
    },
    {
      name: "Nilai",
      selector: (row) => row.nilai,
      sortable: true,
    },
  ];

  return (
    <div className="App">
      <div className="card">
        <CCard>
          <DataTable
            columns={nilaiColumns}
            data={nilaiMe && nilaiMe}
            title={
              <span className="fs-6">Nilai Saya{process.env.API_URL}</span>
            }
            defaultSortFieldID={1}
            pagination
            selectableRows
          />
        </CCard>
      </div>
      <div className="my-3"></div>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              Jumlah SKS : <b>{ipkMe && ipkMe.jumlah_sks}</b>
            </CCol>
            <CCol>
              IPK : <b>{ipkMe && ipkMe.IPK}</b>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Nilai;
