"use client";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Footer from "@/app/components/footer/page";
import Navbar from "@/app/components/navbar/page";
import TopNav from "@/app/components/topnav/page";

const ChartDataTable = ({ data }) => {
  return (
    <div style={{ backgroundColor: "#fff" }} className="chart-data-table mt-3">
      <h3
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: 600,
          backgroundColor: "#036E8C",
        }}
        className="py-1"
      >
        Chart Information
      </h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(0);

  const [data, setData] = useState([
    { name: "Principal", value: 0 },
    { name: "Interest", value: 0 },
  ]);

  const [year, setYear] = useState(1);
  const [chartVisible, setChartVisible] = useState(false);

  const calculateEMI = () => {
    if (!principal || !interestRate || !tenure) {
      alert("Please fill in all the fields.");
      return;
    }

    const principalAmount = parseFloat(principal);
    const rateOfInterest = parseFloat(interestRate) / 100 / 12;
    const loanTenure = parseFloat(tenure) * 12;
    const emiValue = Math.floor(
      (principalAmount *
        rateOfInterest *
        Math.pow(1 + rateOfInterest, loanTenure)) /
        (Math.pow(1 + rateOfInterest, loanTenure) - 1)
    );
    setEmi(emiValue);

    const principalData = {
      name: "Principal",
      value: principalAmount,
    };
    const interestData = {
      name: "Interest",
      value: Math.floor(emiValue * loanTenure - principalAmount),
    };

    setData([principalData, interestData]);
    setChartVisible(true);
  };

  const calculateEMIBreakdown = () => {
    const emiBreakdown = [];
    let principalAmount = parseFloat(principal);
    const rateOfInterest = parseFloat(interestRate) / 100 / 12;
    const loanTenure = parseFloat(tenure) * 12;
    const emiValue = Math.floor(
      (principalAmount *
        rateOfInterest *
        Math.pow(1 + rateOfInterest, loanTenure)) /
        (Math.pow(1 + rateOfInterest, loanTenure) - 1)
    );

    for (let i = year * 12; i > (year - 1) * 12; i--) {
      const interest = Math.floor(principalAmount * rateOfInterest);
      const principalPaid = emiValue - interest;
      const newPrincipal = principalAmount - principalPaid;
      emiBreakdown.push({
        month: i,
        principalPaid: principalPaid,
        interestPaid: interest,
        remainingPrincipal: newPrincipal,
      });
      principalAmount = newPrincipal;
    }
    return emiBreakdown;
  };

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  const emiBreakdown = calculateEMIBreakdown();

  const COLORS = ["#036E8C", "#3E9D7C"];

  return (
    <div style={{ backgroundColor: "#E7E5E5", overflow: "hidden" }}>
      <TopNav />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1
              style={{ color: "#264653", fontWeight: "bold", margin: "15px 0" }}
            >
              EMI Calculator
            </h1>
            <div className="form-group mb-2">
              <label style={{ color: "#264653", fontWeight: "bold" }}>
                Loan Amount:
              </label>
              <input
                type="number"
                className="form-control"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label style={{ color: "#264653", fontWeight: "bold" }}>
                Interest Rate (% per annum):
              </label>
              <input
                type="number"
                className="form-control"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label style={{ color: "#264653", fontWeight: "bold" }}>
                Tenure (in years):
              </label>
              <input
                type="number"
                className="form-control"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
              />
            </div>
            <button
              style={{
                backgroundColor: "#3E9D7C",
                color: "#fff",
                fontWeight: "bold",
              }}
              className="btn"
              onClick={calculateEMI}
              disabled={!principal || !interestRate || !tenure}
            >
              Calculate EMI
            </button>

            <div className="result mt-3">
              <h2 style={{ color: "#264653", fontWeight: "bolder" }}>
                EMI: {emi}
              </h2>
            </div>
            <div className="year-slider mt-3">
              <h3 style={{ color: "#264653", fontWeight: 700 }}>
                Year: {year}
              </h3>
              <input
                type="range"
                min="1"
                max={parseInt(tenure)}
                value={year}
                onChange={handleYearChange}
              />
            </div>
            {chartVisible && (
              <div>
                <div
                  style={{ backgroundColor: "#FFF" }}
                  className="emi-breakdown mt-3"
                >
                  <h3
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontWeight: 600,
                      backgroundColor: "#036E8C",
                    }}
                    className="py-1"
                  >
                    EMI Breakdown
                  </h3>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Principal Paid</th>
                        <th>Interest Paid</th>
                        <th>Remaining Principal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emiBreakdown.map((emi, index) => (
                        <tr key={index}>
                          <td>{emi.month}</td>
                          <td>{emi.principalPaid}</td>
                          <td>{emi.interestPaid}</td>
                          <td>{emi.remainingPrincipal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-6 mt-5 mt-md-0">
            {chartVisible && principal && emi > 0 && (
              <div className="chart-container">
                <PieChart width={400} height={400}>
                  <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>

                <ChartDataTable data={data} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmiCalculator;
