import { useEffect, useState, useRef } from "react";

export default function AddAddress({ cancel, save }) {
  const [opacity, setOpacity] = useState(0);
  const [address, setAddress] = useState([
    {
      label: "First Name",
      value: "",
      type: "text",
      required: true,
    },
    {
      label: "Last Name",
      value: "",
      type: "text",
      required: true,
    },
    {
      label: "Phone Number",
      value: "",
      type: "text",
      required: true,
    },
    {
      label: "Additional Phone Number",
      required: false,
      value: "",
      type: "text",
    },
    {
      label: "Delivery Address",
      value: "",
      type: "text",
      fullWidth: true,
      required: true,
    },
    {
      label: "Additional Info",
      value: "",
      type: "text",
      fullWidth: true,
      required: false,
    },
    {
      label: "Region",
      value: "",
      type: "text",
      required: true,
    },
    {
      label: "City",
      value: "",
      type: "text",
      required: true,
    },
  ]);
  const submitRef = useRef();

  const updateField = (label, newValue) => {
    setAddress(
      address.map((data) => {
        if (data.label !== label) {
          return data;
        } else {
          return { ...data, value: newValue };
        }
      })
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    const result = {};
    address.forEach((data) => {
      result[data.label] = data.value;
    });
    save(result);
  };

  useEffect(() => {
    setOpacity(1);
  }, []);
  return (
    <div
      style={{ zIndex: 5, opacity: opacity }}
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/10 duration-500"
    >
      <div className="min-h-[430px] h-auto max-w-[90%] w-[800px] bg-white rounded-xl pb-4">
        <div className="w-full px-4 h-[50px] flex items-center justify-between  border-b">
          <p className="text-PrimaryBlack/90 font-bold text-base ">
            Add A New Address
          </p>
          <button
            onClick={() => cancel()}
            className="text-PrimaryBlack border-none bg-none"
          >
            <i className="fa-solid fa-xmark text-xl text-PrimaryBlack/90"></i>
          </button>
        </div>
        <form
          onSubmit={handleSave}
          action="/"
          method="post"
          className="px-4 py-4 w-full flex flex-wrap gap-x-4 gap-y-4"
        >
          {address.map((data) => {
            return (
              <input
                onChange={(e) => updateField(data.label, e.target.value)}
                style={{
                  width: `${data.fullWidth ? "100%" : "calc(50% - 8px)"}`,
                }}
                type={data.type}
                placeholder={data.label}
                value={data.value}
                className="py-2.5 px-2.5 border outline-PrimaryOrange outline-1 text-sm text-PrimaryBlack/80"
                required={data.required}
              />
            );
          })}
          <button
            ref={submitRef}
            type="submit"
            className="-z-10 opacity-0"
          ></button>
        </form>
        <div className="px-4 pt-4 w-full flex justify-end">
          <button
            onClick={() => submitRef.current.click()}
            className="text-white font-bold flex items-center bg-green-600 px-5 py-2  shadow-xl hover:bg-green-600/80 text-xs"
          >
            SAVE ADDRESS &nbsp; <i className="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
