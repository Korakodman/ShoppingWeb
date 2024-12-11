import React, { forwardRef } from "react";
import PropTypes from "prop-types";
const Dialog = forwardRef(
  ({ Clickclose, AddCart, AddCartForm, Name, Price, image }, ref) => {
    const convertToBaht = (usd) => {
      const exchangeRate = 35; // อัตราแลกเปลี่ยน (USD -> THB)
      const baht = usd * exchangeRate;
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(baht);
    };

    return (
      <dialog
        ref={ref}
        onClick={Clickclose}
        className=" w-[750px] h-fit p-3 rounded-md  "
      >
        <form action="" onSubmit={AddCartForm} className=" items-center flex">
          <div>
            <img
              src={image}
              className=" w-[250px] h-[250px] border-2 object-fill rounded-md"
            ></img>
          </div>
          <div className="p-2 border-black border-4 w-[500px] m-4 grid rounded-md">
            <div className=" p-2">
              <header className=" font-extralight text-3xl">{Name}</header>
              <p className=" font-semibold text-2xl mt-2 text-end">
                Price :{" "}
                <span className=" text-red-500">{convertToBaht(Price)} </span>
                Bath
              </p>
            </div>
            <div className=" text-end mt-2 text-xl">
              <button
                className=" bg-blue-300 p-2 font-semibold hover:bg-blue-500 rounded-sm"
                onClick={AddCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </form>
      </dialog>
    );
  }
);
Dialog.displayName = "Dialog";
Dialog.propTypes = {
  Clickclose: PropTypes.func,
  AddCart: PropTypes.func,
  AddCartForm: PropTypes.func,
  Name: PropTypes.string,
  Price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
};
export default Dialog;
