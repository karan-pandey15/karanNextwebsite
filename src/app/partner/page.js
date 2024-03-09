import logo from "../../../public/logo.png";
import Link from "next/link";
import "../styles.css";
import PartnerBenefits from "./benefits/page";
import Footer from "../components/footer/page";
import Image from "next/image";

const Partner = () => {
  return (
    <div>
      <section style={{ backgroundColor: "#E7E5E5" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 0",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
          className="px-lg-5 px-md-4 px-2 "
        >
          <Link href={"/"}>
            <Image
              style={{ height: "60px", width: "150px" }}
              src={logo}
              alt="AddRupee"
            />
          </Link>
          <Link
            style={{ backgroundColor: "#036E8C", color: "#ffffff" }}
            className="btn"
            href={"/partner/signin"}
          >
            Sign In
          </Link>
        </div>
        <div className="container">
          <div style={{ padding: "32px 0" }}>
            <h2 style={{ color: "#264653", fontWeight: 700 }}>
              Join <span style={{ color: "#036E8C" }}>Add</span>
              <span style={{ color: "#3E9B77" }}>Rupee</span> as a{" "}
              <span style={{ color: "#606c38" }}>Partner</span>
            </h2>
            <p style={{ color: "gray", fontWeight: 500 }}>
              Welcome to AddRupee's Partner Program - a gateway to a thriving
              collaboration in the financial realm. If you are passionate about
              empowering individuals with financial solutions, we invite you to
              join hands with us. Whether you are an individual professional, a
              financial advisor, or a business entity, becoming a partner with
              AddRupee opens up a world of opportunities.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                style={{
                  backgroundColor: "#036E8C",
                  color: "#ffffff",
                  marginRight: "8px",
                  fontWeight: 600,
                }}
                className="btn partner_buttons"
                href={"/partner/registration"}
              >
                Register Now
              </Link>
              <a
                style={{
                  border: "2px solid #036E8C",
                  color: "#036E8C",
                  marginRight: "8px",
                  fontWeight: 600,
                }}
                className="btn partner_buttons"
                href={"#knowmore"}
              >
                Know More
              </a>
              <Link
                style={{
                  backgroundColor: "#036E8C",
                  color: "#ffffff",
                  // marginLeft: "8px",
                  fontWeight: 600,
                }}
                className="btn partner_buttons partner_contact_button"
                href={"/pages/contactus"}
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="partner_banner">
            <div className="why_partner_with_addrupee">
              <h3>Why Partner with AddRupee?</h3>
              <hr />
              <p>
                At AddRupee, we believe in fostering strong partnerships built
                on trust, innovation, and shared success. By joining our
                network, you gain access to a comprehensive suite of financial
                products and services offered by renowned banks. As a partner,
                you can facilitate loans, credit cards, and various insurance
                options, providing your clients with a one-stop financial
                solution.
              </p>
            </div>
          </div>
          <div id="knowmore">
            <PartnerBenefits />
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Partner;
