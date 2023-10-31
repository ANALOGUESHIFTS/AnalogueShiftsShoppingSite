import { useEffect, useState } from "react";

export default function EditAddress({ recentData, cancel, save }) {
  const [opacity, setOpacity] = useState(0);
  const [address, setAddress] = useState([
    {
      label: "First Name",
      value: recentData.firstName,
      type: "text",
    },
    {
      label: "Last Name",
      value: recentData.lastName,
      type: "text",
    },
    {
      label: "Phone Number",
      value: recentData.phoneNumber,
      type: "text",
    },
    {
      label: "Additional Phone Number",
      value: recentData.additionalPhoneNumber,
      type: "text",
    },
    {
      label: "Delivery Address",
      value: recentData.deliveryAddress,
      type: "text",
      fullWidth: true,
    },
    {
      label: "Additional Info",
      value: recentData.additionalInfo,
      type: "text",
      fullWidth: true,
    },
    {
      label: "Region",
      value: recentData.region,
      type: "text",
    },
    {
      label: "City",
      value: recentData.city,
      type: "text",
    },
  ]);

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

  const handleSave = () => {
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
            Edit Address
          </p>
          <button
            onClick={() => cancel()}
            className="text-PrimaryBlack border-none bg-none"
          >
            <i className="fa-solid fa-xmark text-xl text-PrimaryBlack/90"></i>
          </button>
        </div>
        <div className="px-4 py-4 w-full flex flex-wrap gap-x-4 gap-y-4">
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
              />
            );
          })}
        </div>
        <div className="px-4 pt-4 w-full flex justify-end">
          <button
            onClick={handleSave}
            className="text-white font-bold flex items-center bg-green-600 px-5 py-2 rounded-lg shadow-xl hover:bg-green-600/80 text-xs"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
}
