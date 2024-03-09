import Image from "next/image";
import AddRupeeLogo from "../../../../public/AddRupee_logo.jpeg";
import "../../styles.css";

const WhyChooseAddRupee = () => {
  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <div className="container px-4 pt-5" id="custom-cards">
        <h2 style={{ color: "#264653", fontWeight: 600 }}>
          Why Choose Add Rupee
        </h2>
        <p className="pb-2 border-bottom" style={{ color: "gray" }}>
          Add Rupee: Your trusted partner for financial success. Tailored
          solutions, transparency, and a path to prosperity.
        </p>

        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col">
            <div className="card NoHiddenFeeImg card-cover h-100 overflow-hidden rounded-5 shadow-lg">
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2
                  style={{ color: "white", fontWeight: 900 }}
                  className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold"
                >
                  No Hidden Fee
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <Image
                      src={AddRupeeLogo}
                      alt="AddRupee"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <small
                      style={{
                        fontWeight: 600,
                        color: "#15616d",
                        fontSize: "15px",
                      }}
                    >
                      No Hidden Fee
                    </small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card LessDocuments card-cover h-100 overflow-hidden text-white  rounded-5 shadow-lg">
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Less Documents
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <Image
                      src={AddRupeeLogo}
                      alt="AddRupee"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <small
                      style={{
                        fontWeight: 600,
                        color: "#001524",
                        fontSize: "15px",
                      }}
                    >
                      Less Documents
                    </small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card SpecialistTeam card-cover h-100 overflow-hidden text-white  rounded-5 shadow-lg">
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Specialist Team
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <Image
                      src={AddRupeeLogo}
                      alt="AddRupee"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center  me-3">
                    <small
                      style={{
                        fontWeight: 600,
                        color: "#ffffff",
                        fontSize: "15px",
                      }}
                    >
                      Specialist Team
                    </small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAddRupee;
