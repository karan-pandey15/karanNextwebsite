"use client";
import Image from "next/image";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import addrupeeText from "../../../../public/addrupeeText.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./styles.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("https://api.addrupee.com/api/get_user_data")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          setEmail(res.data.email);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          router.push("/pages/employeesignin");
        }
      })
      .catch((err) => {
        console.log(err);
        router.push("/pages/employeesignin");
      });
  }, [router]);

  const handleLogout = () => {
    axios
      .get("https://api.addrupee.com/api/emp_logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.clear();
          router.push("/pages/employeesignin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
      style={{ width: "250px" }}
    >
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark "
        style={{ width: "250px", height: "100vh" }}
      >
        <Link
          href="#"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <Image
            style={{ height: 50, width: 150 }}
            src={addrupeeText}
            alt="Add Rupee Text"
          />
        </Link>

        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <Link href="/hrdashboard" className="nav-link text-white">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/hrdashboard/addleadform"
              className="nav-link text-white"
            >
              Add New
            </Link>
          </li>
          <li>
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={<span style={{ color: "white" }}>Candidate Leads</span>}
                menuVariant="dark"
              >
                <NavDropdown.Item href="/hrdashboard/interviewedcandidate">
                  Interviewed Candidate
                </NavDropdown.Item>
                <NavDropdown.Item href="/hrdashboard/sallaryofferedcandidate">
                  Salary Offered
                </NavDropdown.Item>
                <NavDropdown.Item href="/hrdashboard/confirmedcandidate">
                  Confirmed Candidate
                </NavDropdown.Item>
                <NavDropdown.Item href="/hrdashboard/rejectedcandidate">
                  Rejected Candidate
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </li>
          <li>
            <Link
              href="/hrdashboard/blacklistedcandidate"
              className="nav-link text-white"
            >
              Blacklisted AQM
            </Link>
          </li>
          <li>
            <Link
              href="/hrdashboard/exitcandidate"
              className="nav-link text-white"
            >
              Exit AQM
            </Link>
          </li>
        </ul>
        <hr />
        <SplitButton
          key="up"
          id={`dropdown-button-drop-up`}
          drop="up"
          variant="dark"
          title={auth ? `${name}` : "Unknown"}
        >
          <Dropdown.Item
            eventKey="1"
            style={{
              fontWeight: 600,
              color: "black",
            }}
          >
            {auth ? `${email}` : "unknown123@gmail.com"}
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            <Link
              href="/employeedashboard/profile"
              style={{
                textDecoration: "none",
                fontWeight: 600,
                color: "black",
              }}
            >
              Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            style={{ color: "red", fontWeight: 600 }}
            onClick={handleLogout}
          >
            Logout
          </Dropdown.Item>
        </SplitButton>
      </div>
    </aside>
  );
}

export default Sidebar;
