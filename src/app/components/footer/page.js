import Link from "next/link";
import { MdOutlineLocationOn } from "react-icons/md";
import {
  AiFillPhone,
  AiOutlineMail,
  AiFillFacebook,
  AiFillYoutube,
} from "react-icons/ai";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#232935" }}>
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h5
                style={{
                  color: "#3E9D7C",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                Loan
              </h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/loan/personalloan"
                    className="nav-link p-0 text-white"
                  >
                    Personal Loan
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/loan/businessloan"
                    className="nav-link p-0 text-white"
                  >
                    Business Loan
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/loan/homeloan"
                    className="nav-link p-0 text-white"
                  >
                    Home Loan
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/loan/loanagainstproperty"
                    className="nav-link p-0 text-white"
                  >
                    Loan Against Property
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/loan/carloan"
                    className="nav-link p-0 text-white"
                  >
                    Car Loan
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/loan/odccworkingcapital"
                    className="nav-link p-0 text-white"
                  >
                    OD/CC/Working Capital
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/loan/creditcard"
                    className="nav-link p-0 text-white"
                  >
                    Credit Card
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5
                style={{
                  color: "#3E9D7C",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                Company
              </h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/aboutus"
                    className="nav-link p-0 text-white"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/contactus"
                    className="nav-link p-0 text-white"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/privacypolicy"
                    className="nav-link p-0 text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/termsconditions"
                    className="nav-link p-0 text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link href="#" className="nav-link p-0 text-white">
                    Disclaimer
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/career"
                    className="nav-link p-0 text-white"
                  >
                    Career (Join Us)
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/gallery"
                    className="nav-link p-0 text-white"
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5
                style={{
                  color: "#3E9D7C",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                Other Links
              </h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link href="/pages/blog" className="nav-link p-0 text-white">
                    Blog
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/emicalculator"
                    className="nav-link p-0 text-white"
                  >
                    Emi Calculator
                  </Link>
                </li>

                <li className="nav-item mb-2">
                  <Link
                    href="/pages/insurance/mutalfunds"
                    className="nav-link p-0 text-white"
                  >
                    Mutual Funds
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/insurance/generalinsurance"
                    className="nav-link p-0 text-white"
                  >
                    General Insurance
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/insurance/healthinsurance"
                    className="nav-link p-0 text-white"
                  >
                    Health Insurance
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/pages/employeesignin"
                    className="nav-link p-0 text-white"
                  >
                    Employee Login
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3">
              <h2 style={{ color: "#3E9D7C" }}>Contact Details</h2>
              <p className="text-white">
                {" "}
                <span style={{ color: "#3E9D7C", fontSize: "26px" }}>
                  <MdOutlineLocationOn />
                </span>
                G-13, sector 6 noida - 201301
              </p>
              <p className="text-white">
                <span style={{ color: "#3E9D7C", fontSize: "26px" }}>
                  <AiFillPhone />
                </span>{" "}
                +91 8887796224
              </p>
              <p className="text-white">
                <span style={{ color: "#3E9D7C", fontSize: "26px" }}>
                  <TbDeviceLandlinePhone />
                </span>{" "}
                0120 - 4978652
              </p>
              <p className="text-white">
                {" "}
                <span
                  style={{
                    color: "#3E9D7C",
                    fontSize: "26px",
                    paddingRight: "6px",
                  }}
                >
                  <AiOutlineMail />
                </span>
                support@addrupee.com
              </p>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p
              className="text-white"
              style={{ fontSize: "18px", fontWeight: 500 }}
            >
              © 2023{" "}
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
                href={"https://addrupee.com"}
              >
                AddRupee
              </Link>{" "}
              , Inc. All rights reserved.
            </p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <Link
                  className="link-white fs-2"
                  href="https://www.youtube.com/channel/UCTSA6p0niTmhK1yaK2qDwPA"
                >
                  <AiFillYoutube />
                </Link>
              </li>
              <li className="ms-3">
                <Link
                  className="link-white fs-2 "
                  href="https://www.instagram.com/addrupeefinance/"
                >
                  <BsInstagram />
                </Link>
              </li>
              <li className="ms-3">
                <Link
                  className="link-white fs-2 "
                  href="https://www.facebook.com/people/Add-Rupee/100083152737651/?is_tour_dismissed=true"
                >
                  <AiFillFacebook />
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
