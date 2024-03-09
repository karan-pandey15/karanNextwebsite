import Link from "next/link";
import Image from "next/image";
import "../../../styles.css";

const SmallCard = () => {
  const smallCardData = [
    {
      img: require("../../../../../public/loanImg4.png"),
      title: "Credit Card Rewards",
      description:
        "Credit card rewards are incentives, like cashback or points, earned on purchases. They can be redeemed for discounts, travel, or other benefits.",
      url: "/pages/loan/creditcard",
    },
    {
      img: require("../../../../../public/creditcard1.jpg"),
      title: "Credit Card Debt Management",
      description:
        "Credit card debt management involves budgeting, paying bills on time, reducing spending, and exploring consolidation or balance transfer options to control and eliminate high-interest debts.",
      url: "/pages/loan/creditcard",
    },
    {
      img: require("../../../../../public/creditcard2.jpg"),
      title: "Credit Card Security Tips",
      description:
        "Protect your credit card: Use secure websites, check statements regularly, don't share PINs, and set up alerts for unusual activity to prevent fraud. ",
      url: "/pages/loan/creditcard",
    },
  ];
  return (
    <div>
      {smallCardData.map((items, index) => {
        return (
          <div
            className="card"
            style={{ width: "18rem", marginBottom: "11px" }}
            key={index}
          >
            <Image
              style={{ width: "100%", height: "150px" }}
              src={items.img}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{items.title}</h5>
              <p className="card-text" style={{ fontSize: "15px" }}>
                {items.description}
              </p>
              <Link
                style={{ textDecoration: "none" }}
                href={items.url}
                className=""
              >
                Read more
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SmallCard;
