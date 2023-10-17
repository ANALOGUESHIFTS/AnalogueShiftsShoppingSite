import { useState } from "react";

import { Link, useParams } from "react-router-dom";

export default function BlogDetailsPage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const { id } = useParams();

  const blogs = [
    {
      id: 1,
      img: "/images/blog-1.jpg.webp",
      title: "Cinnamon In the look by Marie Claire",
      category: "TRAVEL",
      date: "May 19, 2023",
      description:
        "Cinnamon, a trailblazing entrepreneur, has journeyed from Lagos to the global fashion capitals, establishing herself as a beacon of innovation and style. As the founder of Cinnamon19fashion.com and the creative force behind TSC Agency Nigeria, Cinnamon’s multifaceted talent is phenomenal. In this episode of The Look, she takes us on her sustainable styling journey. Her passion for self-expression and style, ignited by her mother’s glamorous fashion choices, gained momentum when she moved to Paris at 16. Yet, Ozinna’s influence extends beyond her impeccable style. She has a remarkable talent for curating outfits, empowering women, inspiring confidence, and promoting African fashion. Her journey as a fashion curator and entrepreneur began unexpectedly in 2014 with strangers approached her at an NYSC camp to praise her fashion choices.",
    },
    {
      id: 2,
      img: "/images/blog-2.jpg.webp",
      title: "REVOLUTIONISING NIGERIA’S FASHION E-COMMERCE BY THISDAY STYLE",
      category: "FASHION",
      date: "May 19, 2023",
      description:
        "In recent years, Nigeria has witnessed a significant shift in fashion consumer behaviour as more and more Nigerians embrace the idea of making purchases online. Driven by convenience, availability, and a desire for unique fashion pieces, this trend was further accelerated by the COVID-19 pandemic and its accompanying lockdowns and restrictions on movement. Amidst this, a brand that’s slowly gaining traction as a leader in this space is Cinnamon19fashion.com, a virtual concept store that offers new and exciting ways to experience the best Nigerian fashion from the comfort of your home. Founded in 2016, Cinnamon19fashion.com has quickly gained popularity among fashion enthusiasts, providing a curated selection of the best affordable collections from Nigerian designers. The brainchild of Cinnamon, a well-known fashion influencer and brand curator, this online retail platform combines her innate fashion insight with a deep passion for self-expression. Cinnamon, who inherited her impeccable sense of style from her socialite mother, Nkiru Anumudu, has now become a style icon in her own right....",
    },
    {
      id: 3,
      img: "/images/blog-3.jpg.webp",
      title: "Style Star Edit: Zina X Maju",
      category: "TRAVEL",
      date: "May 19, 2019",
      description:
        "Hey Hey! So I hinted about a collaboration a few weeks ago and I am so happy to share with everyone that @ShopMaju has started a Style Star Edit designing clothes inspired by a personality’s style and I’m very honored to be the first #MajuStyleStar As you all know, my style Is filled with lots of bright colors and prints. Every outfit In this edit Is available to shop immediately on www.shopmaju.com I hope you like them as much as I do.",
    },
    {
      id: 4,
      img: "/images/blog-4.jpg.webp",
      title: "The cover August 2022: Cinnamon",
      category: "FASHION",
      date: "August 22, 2022",
      description:
        "We’re stepping into August with the promise of an exciting month filled with fashionable days, perfectly-tailored moments and brightness that can never be dimmed. Speaking of these promises, our coverstar, Cinnamon, is the poster child for fashionable, perfectly-tailored, bright style. In this edition of The Cover, we get into her life as a fashion entrepreneur, the selling point of shopping from African brands and uncover more about her personal style.",
    },
    {
      id: 5,
      img: "/images/blog-5.jpg.webp",
      title: "Quarantine Fashion",
      category: "MODEL",
      date: "May 19, 2020",
      description:
        "Stay home, stay comfy but stay cute. These style stars might have been indoors but they certainly weren’t letting their style slack, from cool sweat pants to comfy T-shirts, gowns and shorts. Here are our some of our favourite quarantine fashion.",
    },
    {
      id: 6,
      img: "/images/blog-6.jpg.webp",
      title: "Closet covet: Kelly Rowland",
      category: "FASHION",
      date: "May 19, 2020",
      description:
        "Kelly is doing an amazing job advocating for the end of systematic racism and black violence and we’re here for it. In addition to her brilliant mind and chart-topping music of course, we also find her fashion style captivating and definitely covet it. Here are some of our top picks from Kelly’s closet.",
    },
  ];

  const previousPost = blogs[Math.max(0, id - 2)];
  const nextPost = blogs[Math.min(blogs.length, id)];

  const data = blogs.filter((blog) => blog.id.toString() === id)[0];

  return (
    <main className="px-28 py-20 max-[800px]:p-5 max-[1000px]:px-12">
      <p className="w-full text-center font-bold text-4xl text-PrimaryBlack">
        {data.title}
      </p>
      <div className="w-full flex justify-center gap-8 items-center py-6 max-[800px]:flex-col">
        <div className="border-b w-32"></div>
        <div className=" flex gap-1">
          <p className="text-PrimaryOrange text-base font-bold">
            {data.category}
          </p>
          <p className="text-base text-PrimaryBlack/50">- {data.date}</p>
        </div>
        <div className="border-b w-32"></div>
      </div>
      <p className="w-full py-6 text-PrimaryBlack/70 font-medium text-lg">
        {data.description}
      </p>
      <p className="pb-5 mb-6 pl-4 w-full border-l-4 border-PrimaryOrange border-solid text-PrimaryBlack font-bold text-xl">
        “ Technology is nothing. What's important is that you have a faith in
        people, that they're basically good and smart, and if you give them
        tools, they'll do wonderful things with them.”{" "}
        <span className="font-semibold text-lg">- STEVEN JOBS</span>
      </p>
      <div className="mb-6 w-full flex flex-wrap justify-between gap-y-4 ">
        <div
          style={{ backgroundImage: `url(${blogs[0].img})` }}
          className="w-[32%] h-60 bg-cover bg-center max-[800px]:w-full"
        ></div>
        <div
          style={{ backgroundImage: `url(${blogs[1].img})` }}
          className="w-[32%] h-60 bg-cover bg-center max-[800px]:w-full"
        ></div>
        <div
          style={{ backgroundImage: `url(${blogs[2].img})` }}
          className="w-[32%] h-60 bg-cover bg-center max-[800px]:w-full"
        ></div>
      </div>
      <div className="w-full h-44 flex justify-between items-center border-t max-[800px]:flex-col">
        <Link
          to={`/blog-details/${Math.max(1, parseInt(id) - 1)}`}
          className="flex w-96 h-24 items-center gap-3 max-[800px]:w-full max-[800px]:justify-between"
        >
          <i class="fa-solid fa-arrow-left text-PrimaryBlack/70 text-xl"></i>
          <div
            style={{ backgroundImage: `url(${previousPost.img})` }}
            className="h-20 w-20 rounded-full bg-cover bg-center"
          ></div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-PrimaryBlack/70 font-semibold">
              Previous Post:
            </p>
            <p className="text-PrimaryBlack font-bold text-base">
              {previousPost.title.length <= 30
                ? previousPost.title
                : previousPost.title.slice(0, 30).concat("...")}
            </p>
          </div>
        </Link>
        <Link
          to={`/blog-details/${Math.min(parseInt(id) + 1, blogs.length)}`}
          className="flex w-96 h-24 items-center gap-3 max-[800px]:w-full max-[800px]:justify-between"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm text-PrimaryBlack/70 font-semibold">
              Next Post:
            </p>
            <p className="text-PrimaryBlack font-bold text-base">
              {nextPost.title.length <= 30
                ? nextPost.title
                : nextPost.title.slice(0, 30).concat("...")}
            </p>
          </div>
          <div
            style={{ backgroundImage: `url(${nextPost.img})` }}
            className="h-20 w-20 rounded-full bg-cover bg-center"
          ></div>
          <i class="fa-solid fa-arrow-right text-PrimaryBlack/70 text-xl"></i>
        </Link>
      </div>
      <div className="w-full">
        <p className="font-bold text-2xl text-PrimaryBlack pb-5">
          Leave A Comment
        </p>

        <div className="w-full flex justify-between pb-5 max-[800px]:gap-5 max-[800px]:flex-col">
          <input
            type="text"
            value={userName}
            placeholder="Your name"
            onChange={(e) => setUserName(e.target.value)}
            className="w-[47%] max-[800px]:w-full py-3 border outline-none rounded pl-4 text-PrimaryBlack/70 text-[15px]"
          />
          <input
            type="email"
            value={userEmail}
            placeholder="Your email"
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-[47%] max-[800px]:w-full py-3 border outline-none pl-4 rounded text-PrimaryBlack/70 text-[15px]"
          />
        </div>
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          name="message"
          className="outline-none border h-40 rounded text-PrimaryBlack/70 text-[15px] px-4 py-3 w-full"
          cols="30"
          rows="10"
        ></textarea>
        <div className="pt-5">
          <button className="bg-PrimaryOrange text-white text-[15px] font-bold border-npne px-6 py-2.5">
            SEND MESSAGE
          </button>
        </div>
      </div>
    </main>
  );
}
