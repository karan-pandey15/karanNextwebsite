import Link from "next/link";
import "../styles.css";
import { IoIosSearch } from "react-icons/io";

const BusinessLoanBanner = () => {
  return (
    <>
      <section className="business_loan_banner">
        <div className="business_loan_content_inside_banner">
          <h2>Get business loans and more, from AddRupee</h2>
          <p>
            Get approval, and funded as fast as. No personal gurantee required.
          </p>
          <div>
            <div
              className="input-group"
              style={{
                width: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IoIosSearch style={{ color: "gray", fontSize: "18px" }} />
              <input
                type="text"
                className="form-control"
                placeholder="How much do you need?"
                aria-label="How much do you need?"
                aria-describedby="button-addon1"
                readOnly
              />
              <Link
                href="/pages/customersignup"
                style={{
                  backgroundColor: "#036E8C",
                  color: "white",
                  borderRadius: "8px",
                }}
                className="btn"
                type="button"
                id="button-addon1"
                data-mdb-ripple-color="dark"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessLoanBanner;
