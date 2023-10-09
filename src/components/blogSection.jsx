import { Link } from "react-router-dom";

export default function BlogSection() {
  const blogs = [
    {
      image: "/src/assets/images/latest-1.jpg",
      date: "May 4,2023",
      comments: "5",
      title: "The Best Street Style From London Fashion Week",
      details:
        "Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat",
    },
    {
      image: "/src/assets/images/latest-2.jpg",
      date: "May 4,2023",
      comments: "5",
      title: "Vogue's Ultimate Guide To Autumn/Winter 2023 Shoes",
      details:
        "Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat",
    },
    {
      image: "/src/assets/images/latest-3.jpg",
      date: "May 4,2023",
      comments: "5",
      title: "How To Brighten Your Wardrobe With A Dash Of Lime",
      details:
        "Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat",
    },
  ];
  const perks = [
    {
      icon: "src/assets/images/icon-1.png",
      title: "FREE SHIPPING",
      description: "For all order over 99$",
    },
    {
      icon: "src/assets/images/icon-2.png",
      title: "DELIVERY ON TIME",
      description: "If good have prolems",
    },
    {
      icon: "src/assets/images/icon-1.png",
      title: "SECURE PAYMENT",
      description: "100% secure payment",
    },
  ];
  return (
    <div className="px-28 py-14 max-[1000px]:px-12 max-[800px]:px-5">
      <div className="w-full flex pb-8 justify-center">
        <p
          id="dealOfTheWeekTitle"
          className="text-PrimaryBlack text-3xl font-bold relative w-fit pb-11"
        >
          From The Blog
        </p>
      </div>
      <div className="flex w-full justify-between max-[900px]:flex-col max-[900px]:gap-4">
        {blogs.map((data) => {
          return (
            <div
              key={data.title}
              className="w-[31.5%] h-auto flex flex-col max-[900px]:w-full"
            >
              <img
                className="object-cover w-full h-60"
                src={data.image}
                alt=""
              />
              <div className="pt-6 flex gap-5 items-center">
                <div className="flex items-center gap-1">
                  <i class="fa-regular fa-calendar text-PrimaryOrange"></i>
                  <p className="text-PrimaryBlack/60 text-[15px] font-medium">
                    {data.date}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <i class="fa-regular fa-comment text-PrimaryOrange"></i>
                  <p className="text-PrimaryBlack/60 text-[15px] font-medium">
                    {data.comments}
                  </p>
                </div>
              </div>
              <Link>
                <p className="pt-3 text-PrimaryBlack text-[22px] font-bold w-[80%]">
                  {data.title}
                </p>
              </Link>
              <p className="pt-3 text-PrimaryBlack/80 text-base font-medium tracking-normal">
                {data.details}
              </p>
            </div>
          );
        })}
      </div>
      <div className="pt-14 w-full">
        <div className="w-full border-y border-l grid grid-cols-3 h-28 max-[900px]:border max-[900px]:flex max-[900px]:flex-col max-[900px]:h-auto max-[900px]:py-5 max-[900px]:gap-8">
          {perks.map((data) => {
            return (
              <div
                className="col-span-1 h-full flex justify-center items-center gap-4 border-r max-[900px]:w-full max-[900px]:border-r-none max-[900px]:justify-start max-[900px]:px-[15%]"
                key={data.title}
              >
                <img src={data.icon} alt="" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[17px] font-bold text-PrimaryBlack">
                    {data.title}
                  </p>
                  <p className="text-base text-PrimaryBlack font-medium">
                    {data.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
