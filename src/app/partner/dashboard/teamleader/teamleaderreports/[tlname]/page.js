"use client";
import React, { useEffect, useState } from "react";
import numberToWords from "number-to-words";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import Link from "next/link";
import "../../../../../styles.css";
import Sidebar from "../../../sidebar/page";
import Header from "../../../header/page";

const TeamLeaderDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("from1to31");
  const [selectedBankFilter, setSelectedBankFilter] = useState("all");

  const [allData, setData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [rejectData, setRejectedData] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const parseAmount = (amountString) => {
    if (typeof amountString === "string") {
      const cleanedAmount = amountString.replace(/[,\s]/g, "");
      return isNaN(cleanedAmount) ? 0 : Number(cleanedAmount);
    }
    return 0;
  };

  const sumLoginLeads = allData.reduce(
    (acc, item) => acc + parseAmount(item.Loan_Amount_Applied),
    0
  );

  const sumPending = pendingData.reduce(
    (pen, item) => pen + parseAmount(item.Loan_Amount_Applied),
    0
  );

  const sumDisbursed = approvedData.reduce(
    (acc, item) => acc + parseAmount(item.Loan_Amount_Applied),
    0
  );

  const sumRejected = rejectData.reduce(
    (acc, item) => acc + parseAmount(item.Loan_Amount_Applied),
    0
  );

  const numericRepresentation = sumLoginLeads.toLocaleString();
  const wordsRepresentation = numberToWords.toWords(sumLoginLeads);

  const PendingnumericRepresentation = sumPending.toLocaleString();
  const PendingwordsRepresentation = numberToWords.toWords(sumPending);

  const DisnumericRepresentation = sumDisbursed.toLocaleString();
  const DiswordsRepresentation = numberToWords.toWords(sumDisbursed);

  const RejnumericRepresentation = sumRejected.toLocaleString();
  const RejwordsRepresentation = numberToWords.toWords(sumRejected);

  const [tlName, setTlName] = useState(null);

  useEffect(() => {
    setTlName(localStorage.getItem("TL_Name"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetch(
          `https://api.addrupee.com/api/p_fetchAlldata/${tlName}?filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        let result = await data.json();
        setData((prevData) => {
          console.log("this is state", prevData);
          return result;
        });
        console.log("the result is ", result);
        console.log("this is state data", allData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tlName, selectedFilter, selectedBankFilter]);

  const fetchPendingData = async () => {
    const Status = "Pending";
    let data = await fetch(
      `https://api.addrupee.com/api/p_getpendingtldatas/${tlName}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setPendingData(result);
  };

  const fetchApprovedData = async () => {
    const Status = "Disbursed";
    let data = await fetch(
      `https://api.addrupee.com/api/p_getdisbursedtldatas/${tlName}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setApprovedData(result);
    console.log(result);
  };

  const fetchRejectedData = async () => {
    const Status = "Rejected";
    let data = await fetch(
      `https://api.addrupee.com/api/p_getrejectedtldatas/${tlName}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setRejectedData(result);
    console.log(result);
  };

  useEffect(() => {
    fetchPendingData();
    fetchApprovedData();
    fetchRejectedData();
  }, [selectedFilter, selectedBankFilter]);

  return (
    <>
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <section
          style={{
            backgroundColor: "#E7E5E5",
            width: "100%",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <Header OpenSidebar={OpenSidebar} />
          <div className="container" style={{ padding: "20px" }}>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12 mb-2">
                <h3
                  className="fs-3 text-dark"
                  style={{ fontWeight: 600 }}
                >{`${tlName}'s Dashboard`}</h3>
              </div>
              <div className="col-lg-4 col-md-6 col-12 mb-2">
                <select
                  className="form-select"
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  value={selectedFilter}
                >
                  <option value="from1to31" selected>
                    Select Date Filter
                  </option>
                  <option value="lastday">From Last Day</option>
                  <option value="last7days">From Last 7 Days</option>
                  <option value="last30days">From Last 30 Days</option>
                  <option value="all">All Data</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6 col-12 mb-2">
                <select
                  onChange={(e) => setSelectedBankFilter(e.target.value)}
                  value={selectedBankFilter}
                  className="form-select"
                >
                  <option value="all">All Banks</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="AXIS Bank">AXIS Bank</option>
                  <option value="AXIS Finacnce">AXIS Finacnce</option>
                  <option value="AU Small Finance Bank">
                    AU Small Finance Bank
                  </option>
                  <option value="Yes Bank">Yes Bank</option>
                  <option value="IndusInd Bank">IndusInd Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Standard Chartered Bank">
                    Standard Chartered Bank
                  </option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="Cholamandalam Investment and Finance Company">
                    Cholamandalam Investment and Finance Company
                  </option>
                  <option value="Incred Financial Services ">
                    Incred Financial Services
                  </option>
                  <option value="Finnable Credit Pvt Ltd">
                    Finnable Credit Pvt Ltd
                  </option>
                  <option value="Paysense Services">Paysense Services</option>

                  <option value="IDFC first Bank">IDFC First Bank</option>
                  <option value="Tata Capital Finance Services Pvt Ltd">
                    Tata Capital Finance Services Pvt Ltd
                  </option>

                  <option value="Aditya Birla">Aditya Birla</option>
                  <option value="Kotak Mahindra Bank">
                    Kotak Mahindra Bank
                  </option>

                  <option value="Standard Chartered Bank">
                    Standard Chartered Bank
                  </option>
                  <option value="Piramal Capital">Piramal Capital</option>
                  <option value="RBL Bank">RBL Bank</option>

                  <option value="Muthoot Finance Ltd">
                    Muthoot Finance Ltd
                  </option>
                  <option value="IndusInd Bank Limited">
                    IndusInd Bank Limited
                  </option>
                  <option value="L&T Finance Ltd">L&T Finance Limited</option>
                  <option value="Hero Finance Ltd">Hero Finance Limited</option>
                  <option value="Bajaj Finance">Bajaj Finance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="row">
              <h2 style={{ fontWeight: 600 }}>Loan</h2>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card  dashboard_card-1">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/dashboard/teamleader/loan/loginleadsdata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">LOGIN LEADS</h3>
                    <BsFillArchiveFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h5 className="text-white">{allData.length}</h5>
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Volume - {numericRepresentation}
                  </span>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card  dashboard_card-2">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/dashboard/teamleader/loan/pendingdata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">PENDING</h3>
                    <BsFillGrid3X3GapFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h5 className="text-white">{pendingData.length}</h5>
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Volume - {PendingnumericRepresentation}
                  </span>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card  dashboard_card-3">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/dashboard/teamleader/loan/disburseddata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">DISBURSED</h3>
                    <BsPeopleFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h5 className="text-white">{approvedData.length}</h5>
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Volume - {DisnumericRepresentation}
                  </span>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card  dashboard_card-4">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/dashboard/teamleader/loan/rejecteddata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">REJECTED</h3>
                    <BsFillBellFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h5 className="text-white">{rejectData.length}</h5>
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Volume - {RejnumericRepresentation}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TeamLeaderDashboard;
