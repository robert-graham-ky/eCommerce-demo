import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductH(props) {
  const { product } = props;
  const price = product.price;
  //const baseImagePath = "../../../image-store-tester/uploads/";
  const baseImagePath = "http://localhost:8000/uploads/";
  const image = product.productImage.replace(/\\/g, '/').split('/').pop();
  const imageSource = `${baseImagePath}${image}`;
  let percentOff;
  let offPrice = `$${product.price}`;

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", left: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>{"$"}{price}</del> {price - (props.percentOff * price) / 100}
      </>
    );
  }
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-4">
            <Link to="/products/1" href="!#" replace>
              {percentOff}
              <img
                className="rounded-start bg-dark cover w-100 h-100"
                alt={product.name}
                src={imageSource}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  {product.name}
                </h5>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  {offPrice}
                </span>
                <div className="mt-auto d-flex">
                  <button className="btn btn-outline-dark ms-auto">
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
