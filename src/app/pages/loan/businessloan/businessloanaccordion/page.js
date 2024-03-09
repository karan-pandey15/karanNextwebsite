import "../styles.css";

const BusinessLoanAccordion = () => {
  return (
    <>
      <section className="pb-5">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            paddingBottom: "11px",
          }}
        >
          <h3 style={{ fontWeight: "600" }}>Top FAQs for business loan</h3>
          <span
            style={{
              fontWeight: 700,
              fontSize: "22px",
              paddingLeft: "7px",
              cursor: "pointer",
            }}
            className="business_loan_accordion_hash"
          >
            #
          </span>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                How can I qualify for a business loan with AddRupee? #1
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                To qualify for an AddRupee business loan, diverse criteria are
                considered, including credit history, business performance, and
                financial stability. This flexibility ensures accessibility for
                a wide range of businesses seeking financial support. Our
                thorough evaluation process aims to understand your unique needs
                and provide a tailored financing solution.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                What is the typical loan term offered by AddRupee? #2
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                AddRupee offers flexible loan terms tailored to individual
                business needs. This customization allows businesses to choose
                repayment periods that align with their specific requirements,
                promoting optimal financial management and adaptability.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                How quickly can I get approval for a business loan? #3
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                AddRupee prioritizes efficiency in the approval process. Upon
                submission of necessary documents with your application, our
                team works swiftly to provide timely approvals, ensuring a
                prompt response to your funding needs.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                What types of businesses does AddRupee support with loans? #4
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                AddRupee is versatile, supporting businesses across various
                industries, from startups to well-established entities. Our
                inclusive approach ensures that a diverse array of businesses
                can benefit from our customized loan solutions.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Are there specific purposes for which I can use the loan? #5
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                There are no restrictions on the use of the loan funds. Whether
                for working capital, expansion, or equipment purchase, AddRupee
                empowers you to decide how to allocate the funds, providing
                flexibility in your business strategies.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                What interest rates can I expect on a business loan from
                AddRupee? #6
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                AddRupee offers competitive interest rates tailored to your
                business profile. Our commitment to transparency ensures that
                you understand the cost of borrowing, allowing you to make
                informed financial decisions for your business's growth.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
              >
                Is collateral required for securing a business loan? #7
              </button>
            </h2>
            <div
              id="collapseSeven"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Collateral requirements depend on the loan type and amount.
                AddRupee provides both secured and unsecured loan options,
                allowing you to choose the most suitable option based on your
                preferences and business circumstances.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEight"
                aria-expanded="false"
                aria-controls="collapseEight"
              >
                Can I apply for a business loan if I have a less-than-perfect
                credit score? #8
              </button>
            </h2>
            <div
              id="collapseEight"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Can I apply for a business loan if I have a less-than-perfect
                credit score? Yes, AddRupee considers various factors in the
                application process. While a good credit score is advantageous,
                we assess the overall financial health of your business,
                providing opportunities for businesses with diverse credit
                histories.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessLoanAccordion;
