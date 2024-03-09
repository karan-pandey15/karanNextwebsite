import Image from "next/image";
import Link from "next/link";
import "../../../styles.css";

const BlogCard = () => {
  const cardData = [
    {
      img: require("../../../../../public/personalLoanBlog2.png"),
      title: "The Benefits of Personal Loans",
      description:
        "Personal loans offer financial flexibility, quick access to funds, and no collateral requirements. They can be used for various purposes, from debt consolidation to emergencies, with predictable monthly payments.",
      url: "/pages/loan/personalloan",
    },
    {
      img: require("../../../../../public/businessLoanBlog1.png"),
      title: "Choosing the Right Business Loan",
      description:
        "Selecting the appropriate business loan is vital. It depends on factors like your business needs, creditworthiness, loan terms, and interest rates. Tailor the loan to fit your unique requirements.",
      url: "/pages/loan/businessloan",
    },
    {
      img: require("../../../../../public/businessLoanBlog2.png"),
      title: "Small Business Loan Application Tips",
      description:
        "When applying for a small business loan, prepare by having a solid business plan, good credit history, financial documentation, and a clear purpose for the loan. Present your case effectively.",
      url: "/pages/loan/businessloan",
    },
    {
      img: require("../../../../../public/loanImg1.png"),
      title: "Understanding APR",
      description:
        "APR, or Annual Percentage Rate, represents the cost of borrowing as a percentage. It includes interest and fees, providing a comprehensive measure of a loan's true cost, making comparisons easier.",
      url: "/pages/loan/personalloan",
    },
    {
      img: require("../../../../../public/loanImg2.png"),
      title: "Secured vs. Unsecured Personal Loans",
      description:
        "Secured personal loans require collateral (like property) for approval, often with lower interest rates. Unsecured loans don't need collateral but typically have higher interest rates due to increased risk.",
      url: "/pages/loan/personalloan",
    },
    {
      img: require("../../../../../public/loanImg3.png"),
      title: "Mortgage Types",
      description:
        "Mortgages come in various types, including fixed-rate and adjustable-rate mortgages. Fixed-rate maintains consistent interest rates, while adjustable-rate mortgages have variable rates that can change over time, impacting monthly payments.",
      url: "/pages/loan/homeloan",
    },
  ];
  return (
    <div>
      {cardData.map((item, index) => {
        return (
          <div key={index} style={{ display: "inline-flex", flexWrap: "wrap" }}>
            <div
              className="card"
              style={{ width: "20rem", margin: "0 40px 30px 0" }}
            >
              <Image
                style={{ width: "100%", height: "200px" }}
                src={item.img}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text" style={{ fontSize: "15px" }}>
                  {item.description}
                </p>
                <Link
                  style={{ textDecoration: "none" }}
                  href={item.url}
                  className=""
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogCard;
