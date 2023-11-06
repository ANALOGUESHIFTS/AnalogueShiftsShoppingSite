import { useState, useEffect, useRef } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { v4 } from "uuid";
const ages = ["0-16", "17-21", "22-27", "28-34", "35-40", "40-49", "50+"];
const designs = ["Existing Outfit", "New Design"];
const expressService = ["Yes", "No"];
const ableToFit = ["Yes, I will", "No, I won't"];
const shippings = ["Local", "International"];
const eventLocations = ["Nigeria", "Africa", "Abroad"];

export default function BespokeModal({ close }) {
  const [screens, setScreens] = useState(["Loading", "Pick Date", "Details"]);
  const [selectedScreen, setSelectedScreen] = useState(screens[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [element, setElement] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const availableDatesCollectionRef = collection(db, "availableDates");

  //Details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [purposeOfOutfit, setPurposeOfOutfit] = useState([
    { purpose: "Birthday", value: false },
    { purpose: "Traditional Wedding", value: false },
    { purpose: "White Wedding", value: false },
    { purpose: "Otisi Set", value: false },
    { purpose: "Reception Dress", value: false },
    { purpose: "Anniversary Dress", value: false },
    { purpose: "Red Carpet", value: false },
    { purpose: "Court Wedding", value: false },
    { purpose: "Wedding Guest", value: false },
    { purpose: "RTW", value: false },
    { purpose: "Prom", value: false },
    { purpose: "Graduation", value: false },
    { purpose: "Sister Of Bride/Groom", value: false },
    { purpose: "Mother of Bride/Groom", value: false },
    { purpose: "Evening Wear", value: false },
    { purpose: "Other", value: false },
  ]);
  const [ageRange, setAgeRange] = useState("");
  const [designType, setDesignType] = useState("");
  const [indicationOfBudget, setIndicationOfBudget] = useState("");
  const [otherPurpose, setOtherPurpose] = useState("");
  const [dateOfTheEvent, setDateOfTheEvent] = useState("");
  const [proposedOutfitPickupDate, setProposedOutfitPickupDate] = useState("");
  const [selectedExpressService, setSelectedExpressService] = useState("");
  const [ableToFitTheOutfitInStudio, setAbleToFitTheOutfitInStudio] =
    useState("");
  const [cinnamonTerms, setCinnamonTerms] = useState(false);
  const [shippingInformation, setShippingInformation] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventLocationDetails, setEventLocationDetails] = useState("");
  const [howYouWantToFeelInCinnamonPiece, setHowYouWantToFeelInCinnamonPiece] =
    useState("");
  const [describeStyleInThreeWords, setDescribeStyleInThreeWords] =
    useState("");
  const [otherRelavantInformation, setOtherRelevantInformation] = useState("");
  const [sizes, setSizes] = useState([
    { size: "UK 6", value: false },
    { size: "UK 8", value: false },
    { size: "UK 10", value: false },
    { size: "UK 12", value: false },
    { size: "UK 14", value: false },
    { size: "UK 16", value: false },
    { size: "UK 18", value: false },
    { size: "UK 20", value: false },
    { size: "UK 22", value: false },
  ]);
  const formRef = useRef();

  const getDates = async () => {
    try {
      const data = await getDocs(availableDatesCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setAvailableDates(
        filteredData
          .filter((date) => new Date() < new Date(date.date))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      setSelectedScreen("Pick Date");
    } catch (err) {
      console.log(err);
      setSelectedScreen("Pick Date");
    }
  };

  const loadingScreen = (
    <div className="w-full h-full bg-white flex justify-center items-center">
      <div className="lds-roller spin-black">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  const pickDateScreen = (
    <div className="w-full relative h-full bg-[#eed6d0] flex flex-col items-center pt-12">
      <i
        onClick={close}
        className="fa-solid fa-xmark text-lg absolute right-3 top-3 cursor-pointer text-PrimaryBlack/50 hover:text-PrimaryBlack/80"
      ></i>
      <img
        src="/images/default-calendar.png"
        className="w-[60px] h-[60px] rounded-full border-4 border-solid"
        alt=""
      />
      <p className="text-PrimaryBlack/80 text-base pt-5 font-semibold">
        In Store Consultation
      </p>
      <div className="pt-5 w-full px-8">
        <select
          name="Date"
          onChange={(e) => setSelectedDate(e.target.value)}
          className="outline-none  border w-full px-4 py-2.5 bg-white text-sm font-semibold text-PrimaryBlack/80 cursor-pointer"
        >
          <option value="">Select Date</option>
          {availableDates.map((date) => {
            return (
              <option key={date.date} value={date.date}>
                {date.date}
              </option>
            );
          })}
        </select>
      </div>
      <div className="absolute bottom-5 right-5">
        <button
          onClick={() => setSelectedScreen("Details")}
          className="text-PrimaryBlack/80 text-sm font-semibold px-8 py-2 rounded bg-white border hover:bg-PrimaryBlack/80 hover:text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const toggleCheck = (arr, id) => {
    for (let x of arr) {
      if (x !== id) {
        document.getElementById(x).style.backgroundColor = "white";
      } else {
        document.getElementById(x).style.backgroundColor = "rgba(37,37,37,0.7)";
      }
    }
  };

  const updateSize = (s, v) => {
    setSizes((prev) =>
      prev.map((p) => {
        if (p.size !== s) {
          return p;
        } else {
          return { ...p, value: v };
        }
      })
    );
  };

  const updatePurpose = (s, v) => {
    setPurposeOfOutfit((prev) =>
      prev.map((p) => {
        if (p.purpose !== s) {
          return p;
        } else {
          return { ...p, value: v };
        }
      })
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (cinnamonTerms === false) {
      alert("Must Accept Terms and condition");
    } else {
      alert("SUBMITTED");
    }
  };

  const detailScreen = (
    <div className="w-full relative h-full bg-white p-5">
      <i
        onClick={close}
        className="fa-solid fa-xmark text-lg absolute right-3 top-3 cursor-pointer text-PrimaryBlack/50 hover:text-PrimaryBlack/80"
      ></i>
      <p className="text-PrimaryBlack/90 font-bold text-sm">Confirm Booking</p>
      <div className="flex justify-between flex-wrap gap-y-2 gap-x-2 pb-4 pt-2 border-b">
        <p className="text-PrimaryOrange tracking-wider max-[500px]:flex-wrap font-semibold text-xs flex items-center">
          <i className="fa-regular fa-calendar text-sm"></i>&nbsp;&nbsp;
          {selectedDate}
        </p>
        <p className="text-PrimaryBlack/90 tracking-wide font-bold text-xs flex items-center">
          <i className="fa-regular fa-clock text-sm"></i>&nbsp;1 hour
        </p>
      </div>
      <div className="w-full py-4 overflow-y-scroll h-[350px] px-3 max-[500px]:h-[60%]">
        <div className="w-full px-5 py-2 flex items-center gap-2 rounded-lg border">
          <i className="fa-solid fa-warning text-PrimaryOrange text-sm"></i>
          <p className="text-PrimaryBlack/90 font-bold text-xs">
            Booking will only be confirmed after checkout
          </p>
        </div>
        <div className="w-full px-5 py-2 flex items-center gap-2 rounded-lg border mt-4">
          <i className="fa-solid fa-location text-PrimaryBlack/80 text-sm"></i>
          <p className="text-PrimaryBlack/90 font-bold text-xs">
            SF1 kadun city plaza, before kastina round about, opposite studio
            24, kaduna Nigeria
          </p>
        </div>
        <form
          onSubmit={handleFormSubmit}
          action=""
          method="post"
          className="w-full flex flex-col gap-3 mt-3"
        >
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            required
          />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            required
          />
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs">
              Bespoke Service *
            </p>
            <div className="pt-2 flex items-center gap-2 cursor-pointer">
              <input
                onChange={(e) => setCinnamonTerms(true)}
                value={cinnamonTerms}
                type="radio"
                required
              />
              <p className="text-PrimaryBlack/90 font-bold text-xs">
                I agree with the Terms and Conditions of the Bespoke Service
              </p>
            </div>
          </div>
          <input
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone"
            className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            required
          />
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full h-24 py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
          ></textarea>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs">Size *</p>
            <div className="pt-2 flex flex-col gap-1">
              {sizes.map((s) => {
                return (
                  <div key={v4()} className="pt-2 flex items-center gap-2">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      onChange={(e) => updateSize(s.size, e.target.checked)}
                    />
                    <p className="text-PrimaryBlack/90 font-bold text-[10px]">
                      {s.size}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs">
              Age Range *
            </p>
            <div className="pt-2 flex flex-col gap-1">
              {ages.map((ag) => {
                return (
                  <div
                    type="button"
                    key={v4()}
                    className="pt-2 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setAgeRange(ag);
                      toggleCheck(ages, ag);
                    }}
                  >
                    <div className="w-3.5 h-3.5 p-0.5 rounded-full border-PrimaryBlack/70 border">
                      <div id={ag} className="w-full h-full rounded-full"></div>
                    </div>
                    <p className="text-PrimaryBlack/90 font-bold text-xs">
                      {ag}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs">
              Do you want an existing design or a new design? *
            </p>
            <div className="pt-2 flex flex-col gap-1">
              {designs.map((ag) => {
                return (
                  <div
                    type="button"
                    key={v4()}
                    className="pt-2 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setDesignType(ag);
                      toggleCheck(designs, ag);
                    }}
                  >
                    <div className="w-3.5 h-3.5 p-0.5 rounded-full border-PrimaryBlack/70 border">
                      <div id={ag} className="w-full h-full rounded-full"></div>
                    </div>
                    <p className="text-PrimaryBlack/90 font-bold text-xs">
                      {ag}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
              Please give us an indication of your budget *
            </p>
            <input
              type="text"
              onChange={(e) => setIndicationOfBudget(e.target.value)}
              className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
              required
            />
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs">
              Purpose of outfit (you can choose more than one option) *
            </p>
            <div className="pt-2 flex flex-col gap-1">
              {purposeOfOutfit.map((s) => {
                return (
                  <div key={v4()} className="pt-2 flex items-center gap-2">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      onChange={(e) =>
                        updatePurpose(s.purpose, e.target.checked)
                      }
                    />
                    <p className="text-PrimaryBlack/90 font-bold text-[10px]">
                      {s.purpose}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
              Please specify if you chose "other" above
            </p>
            <input
              type="text"
              onChange={(e) => setOtherPurpose(e.target.value)}
              className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            />
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
              When is the date of your event? (Please specify if you need
              express delivery which comes at a 10% addition of the original
              price)
            </p>
            <input
              type="text"
              onChange={(e) => setDateOfTheEvent(e.target.value)}
              className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            />
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs">
              I need express service *
            </p>
            <div className="pt-2 flex flex-col gap-1">
              {expressService.map((ag) => {
                return (
                  <div
                    type="button"
                    key={v4()}
                    className="pt-2 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setSelectedExpressService(ag);
                      toggleCheck(expressService, ag);
                    }}
                  >
                    <div className="w-3.5 h-3.5 p-0.5 rounded-full border-PrimaryBlack/70 border">
                      <div id={ag} className="w-full h-full rounded-full"></div>
                    </div>
                    <p className="text-PrimaryBlack/90 font-bold text-xs">
                      {ag}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
              Proposed outfit pick up date
            </p>
            <input
              type="text"
              onChange={(e) => setProposedOutfitPickupDate(e.target.value)}
              className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            />
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs">
              Will you be available to fit the outfit in the Kaduna Studio?
            </p>
            <div className="pt-2 flex flex-col gap-1">
              {ableToFit.map((ag) => {
                return (
                  <div
                    type="button"
                    key={v4()}
                    className="pt-2 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setAbleToFitTheOutfitInStudio(ag);
                      toggleCheck(ableToFit, ag);
                    }}
                  >
                    <div className="w-3.5 h-3.5 p-0.5 rounded-full border-PrimaryBlack/70 border">
                      <div id={ag} className="w-full h-full rounded-full"></div>
                    </div>
                    <p className="text-PrimaryBlack/90 font-bold text-xs">
                      {ag}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs">
              Shipping Information *
            </p>
            <div className="pt-2 flex flex-col gap-1">
              {shippings.map((ag) => {
                return (
                  <div
                    type="button"
                    key={v4()}
                    className="pt-2 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setShippingInformation(ag);
                      toggleCheck(shippings, ag);
                    }}
                  >
                    <div className="w-3.5 h-3.5 p-0.5 rounded-full border-PrimaryBlack/70 border">
                      <div id={ag} className="w-full h-full rounded-full"></div>
                    </div>
                    <p className="text-PrimaryBlack/90 font-bold text-xs">
                      {ag}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs">
              Where is your event happening? (Please specify in the box below)
            </p>
            <div className="pt-2 flex flex-col gap-1">
              {eventLocations.map((ag) => {
                return (
                  <div
                    type="button"
                    key={v4()}
                    className="pt-2 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setEventLocation(ag);
                      toggleCheck(eventLocations, ag);
                    }}
                  >
                    <div className="w-3.5 h-3.5 p-0.5 rounded-full border-PrimaryBlack/70 border">
                      <div id={ag} className="w-full h-full rounded-full"></div>
                    </div>
                    <p className="text-PrimaryBlack/90 font-bold text-xs">
                      {ag}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
              Please specify the location
            </p>
            <input
              type="text"
              onChange={(e) => setEventLocationDetails(e.target.value)}
              className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            />
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
              How would you describe your style in 3 words?
            </p>
            <input
              type="text"
              onChange={(e) => setDescribeStyleInThreeWords(e.target.value)}
              className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            />
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
              How do you want to feel in your TUBO piece?
            </p>
            <textarea
              cols="30"
              rows="10"
              onChange={(e) =>
                setHowYouWantToFeelInCinnamonPiece(e.target.value)
              }
              className="w-full h-24 py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            ></textarea>
          </div>
          <div>
            <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
              Any other relevant information you would like to share? (Please be
              as detailed as possible)
            </p>
            <textarea
              cols="30"
              rows="10"
              onChange={(e) => setOtherRelevantInformation(e.target.value)}
              className="w-full h-24 py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
            ></textarea>
          </div>
          <button
            ref={formRef}
            type="submit"
            className="absolute -z-10 opacity-0"
          ></button>
        </form>
      </div>
      <div className="pt-4 w-full flex justify-between">
        <button
          onClick={() => setSelectedScreen("Pick Date")}
          className="text-PrimaryBlack/80 px-8 py-2 rounded border border-PrimaryBlack/90 text-xs hover:border-PrimaryBlack/70"
        >
          Back
        </button>
        <button
          onClick={() => formRef.current.click()}
          className="text-white px-8 py-2 rounded border bg-PrimaryOrange border-PrimaryOrange/90 text-xs"
        >
          Continue
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    switch (selectedScreen) {
      case "Loading":
        setElement(loadingScreen);
        break;
      case "Pick Date":
        setElement(pickDateScreen);
        break;
      case "Details":
        setElement(detailScreen);
        break;
      default:
        setElement(loadingScreen);
        break;
    }
  }, [selectedScreen]);

  useEffect(() => {
    getDates();
  }, []);

  return (
    <div className="fixed top-0  left-0 w-screen h-screen bg-black/25 flex justify-center items-center">
      <div className="w-[600px] max-[500px]:w-[90%] h-[500px] overflow-hidden rounded-xl">
        {element}
      </div>
    </div>
  );
}
