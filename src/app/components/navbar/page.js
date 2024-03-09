import Image from "next/image";
import logo from "../../../../public/logo.png";
import Link from "next/link";
import "../../styles.css";

const Navbar = () => {
  return (
    <header className="navbar_div">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <Image
              style={{ height: "60px", width: "150px" }}
              src={logo}
              alt="..."
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  className="nav-link"
                  aria-current="page"
                  href="/pages/aboutus"
                >
                  About Us
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  className="nav-link dropdown-toggle"
                  href="/loans"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Loans
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/loan/personalloan"
                    >
                      Personal Loan
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/loan/businessloan"
                    >
                      Business Loan
                    </Link>
                  </li>

                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/loan/homeloan"
                    >
                      Home Loan
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/loan/loanagainstproperty"
                    >
                      Loan Against Property
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/loan/carloan"
                    >
                      Car Loan
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/loan/odccworkingcapital"
                    >
                      OD/CC/Working Capital
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/loan/creditcard"
                    >
                      Credit Card
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  className="nav-link dropdown-toggle"
                  href="/insurance"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Insurance
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/insurance/healthinsurance"
                    >
                      Health Insurance
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/insurance/generalinsurance"
                    >
                      General Insurance
                    </Link>
                  </li>

                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      className="dropdown-item"
                      href="/pages/insurance/mutalfunds"
                    >
                      Mutual Funds
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  className="nav-link"
                  href="/pages/blog"
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  className="nav-link"
                  href="/pages/emicalculator"
                >
                  Emi Calculator
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  className="nav-link"
                  href="/pages/contactus"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  className="issueRelatedCibil"
                  href={"/pages/cibilissue"}
                  style={{
                    textDecoration: "none",
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#A7C957",
                  }}
                >
                  Improve Your Cibil
                </Link>
              </li>
            </ul>

            <button
              style={{
                backgroundColor: "#036E8C",
              }}
              className="btn button_class m-2 smallSize_block "
              type="submit"
            >
              <Link
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                }}
                href="/partner"
              >
                Partner Login
              </Link>
            </button>
            <button
              style={{
                backgroundColor: "#036E8C",
              }}
              className="btn button_class smallSize_block"
              type="submit"
            >
              <Link
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                }}
                href="/pages/customersignup"
              >
                Apply Now
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
