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
        className=" md:w-[750px] h-fit p-3 rounded-md  "
      >
        <form
          action=""
          onSubmit={AddCartForm}
          className=" items-center md:flex"
        >
          <div className="flex justify-center">
            <img
              src={image}
              className=" md:w-[250px] md:h-[250px] w-[100px] border-2 object-fill rounded-md"
            ></img>
          </div>
          <div className="p-2 border-black border-4 md:w-[500px]  m-4 grid rounded-md">
            <div className=" p-2">
              <header className=" font-extralight md:text-3xl">{Name}</header>
              <p className=" font-semibold md:text-2xl mt-2 text-end">
                Price :{" "}
                <span className=" text-red-500">{convertToBaht(Price)} </span>
                Bath
              </p>
            </div>
            <div className=" text-end mt-2 md:text-xl">
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
