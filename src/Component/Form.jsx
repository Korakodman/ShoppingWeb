import React from "react";

function Form() {
  return (
    <form>
      <label className="p-2 font-semibold text-2xl">Search</label>
      <input
        type="search"
        className="border border-2 focus:outline-none px-2 py-3 w-[300px] text-lg"
        placeholder="Search Something You Want"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // อัปเดตค่า search
      />
    </form>
  );
}

export default Form;
