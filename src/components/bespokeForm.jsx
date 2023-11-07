import { v4 } from "uuid";
import { useState, useEffect } from "react";

const ages = ["0-16", "17-21", "22-27", "28-34", "35-40", "40-49", "50+"];
const designs = ["Existing Outfit", "New Design"];
const expressService = ["Yes", "No"];
const ableToFit = ["Yes, I will", "No, I won't"];
const shippings = ["Local", "International"];
const eventLocations = ["Nigeria", "Africa", "Abroad"];

export default function BespokeForm({ formRef, submit }) {
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
      submit({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        designType: designType,
        indicationOfBudget: indicationOfBudget,
        otherPurpose: otherPurpose,
        dateOfTheEvent: dateOfTheEvent,
        proposedOutfitPickupDate: proposedOutfitPickupDate,
        selectedExpressService: selectedExpressService,
        ableToFitTheOutfitInStudio: ableToFitTheOutfitInStudio,
        shippingInformation: shippingInformation,
        eventLocation: eventLocation,
        eventLocationDetails: eventLocationDetails,
        howYouWantToFeelInCinnamonPiece: howYouWantToFeelInCinnamonPiece,
        describeStyleInThreeWords: describeStyleInThreeWords,
        otherRelavantInformation: otherRelavantInformation,
        purposeOfOutfit: purposeOfOutfit
          .filter((data) => data.value === true)
          .map((data) => data.purpose),
        sizes: sizes
          .filter((data) => data.value === true)
          .map((data) => data.size),
      });
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      action=""
      method="post"
      className="w-full flex flex-col gap-3 mt-3"
    >
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
        required
      />
      <input
        value={email}
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
        <div
          onClick={(e) => setCinnamonTerms(true)}
          className="pt-2 flex items-center gap-2 cursor-pointer"
        >
          <input
            onChange={(e) => setCinnamonTerms(e.target.checked)}
            value={cinnamonTerms}
            checked={cinnamonTerms}
            type="radio"
            required
          />
          <p className="text-PrimaryBlack/90 font-bold text-xs">
            I agree with the Terms and Conditions of the Bespoke Service
          </p>
        </div>
      </div>
      <p className="text-PrimaryBlack/90 font-bold text-xs">Phone Number</p>
      <input
        value={phoneNumber}
        type="number"
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone"
        className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
        required
      />
      <textarea
        cols="30"
        rows="10"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="w-full h-24 py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
      ></textarea>
      <div>
        <p className="text-PrimaryBlack/90 font-bold text-xs">Size *</p>
        <div className="pt-2 flex flex-col gap-1">
          {sizes.map((s) => {
            return (
              <div
                onClick={() => updateSize(s.size, !s.value)}
                key={v4()}
                className="pt-2 flex cursor-pointer items-center gap-2"
              >
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value={s.size}
                  checked={s.value === true}
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
        <p className="text-PrimaryBlack/90 font-bold text-xs">Age Range *</p>
        <div className="pt-2 flex flex-col gap-1">
          {ages.map((ag) => {
            return (
              <div
                key={v4()}
                className="pt-2 flex items-center gap-2 cursor-pointer"
                onClick={() => setAgeRange(ag)}
              >
                <input type="radio" value={ag} checked={ageRange === ag} />
                <p className="text-PrimaryBlack/90 font-bold text-xs">{ag}</p>
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
                key={v4()}
                className="pt-2 flex items-center gap-2 cursor-pointer"
                onClick={() => setDesignType(ag)}
              >
                <input type="radio" value={ag} checked={designType === ag} />
                <p className="text-PrimaryBlack/90 font-bold text-xs">{ag}</p>
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
          value={indicationOfBudget}
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
              <div
                key={v4()}
                onClick={() => updatePurpose(s.purpose, !s.value)}
                className="pt-2 cursor-pointer flex items-center gap-2"
              >
                <input
                  value={s.purpose}
                  checked={s.value === true}
                  className="cursor-pointer"
                  type="checkbox"
                  onChange={(e) => updatePurpose(s.purpose, e.target.checked)}
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
          value={otherPurpose}
          type="text"
          onChange={(e) => setOtherPurpose(e.target.value)}
          className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
        />
      </div>
      <div>
        <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
          When is the date of your event? (Please specify if you need express
          delivery which comes at a 10% addition of the original price)
        </p>
        <input
          type="text"
          value={dateOfTheEvent}
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
                key={v4()}
                className="pt-2 flex items-center gap-2 cursor-pointer"
                onClick={() => setSelectedExpressService(ag)}
              >
                <input
                  type="radio"
                  value={ag}
                  checked={selectedExpressService === ag}
                />
                <p className="text-PrimaryBlack/90 font-bold text-xs">{ag}</p>
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
          value={proposedOutfitPickupDate}
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
                key={v4()}
                className="pt-2 flex items-center gap-2 cursor-pointer"
                onClick={() => setAbleToFitTheOutfitInStudio(ag)}
              >
                <input
                  type="radio"
                  value={ag}
                  checked={ableToFitTheOutfitInStudio === ag}
                />
                <p className="text-PrimaryBlack/90 font-bold text-xs">{ag}</p>
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
                key={v4()}
                className="pt-2 flex items-center gap-2 cursor-pointer"
                onClick={() => setShippingInformation(ag)}
              >
                <input
                  type="radio"
                  value={ag}
                  checked={shippingInformation === ag}
                />
                <p className="text-PrimaryBlack/90 font-bold text-xs">{ag}</p>
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
                key={v4()}
                className="pt-2 flex items-center gap-2 cursor-pointer"
                onClick={() => setEventLocation(ag)}
              >
                <input type="radio" value={ag} checked={eventLocation === ag} />
                <p className="text-PrimaryBlack/90 font-bold text-xs">{ag}</p>
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
          value={eventLocationDetails}
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
          value={describeStyleInThreeWords}
          type="text"
          onChange={(e) => setDescribeStyleInThreeWords(e.target.value)}
          className="w-full py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
        />
      </div>
      <div>
        <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
          How do you want to feel in your Cinnamon piece?
        </p>
        <textarea
          value={howYouWantToFeelInCinnamonPiece}
          cols="30"
          rows="10"
          onChange={(e) => setHowYouWantToFeelInCinnamonPiece(e.target.value)}
          className="w-full h-24 py-2 rounded border px-3 outline-1 outline-PrimaryBlack/80 text-sm text-PrimaryBlack/90 font-semibold"
        ></textarea>
      </div>
      <div>
        <p className="text-PrimaryBlack/90 font-bold text-xs pb-2">
          Any other relevant information you would like to share? (Please be as
          detailed as possible)
        </p>
        <textarea
          value={otherRelavantInformation}
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
  );
}
