import BlogSection from "./blogSection";
import DealOfTheWeek from "./dealOfTheWeek";
import HomeSectionOne from "./homeSectionOne";
import HomeSectionTwo from "./homeSectionTwo";
import InstaFashion from "./instaFashion";
import MensCollection from "./mensCollection";

export default function HomePage() {
  return (
    <main className="w-full">
      <HomeSectionOne />
      <HomeSectionTwo />
      <DealOfTheWeek />
      <MensCollection />
      <InstaFashion />
      <BlogSection />
    </main>
  );
}
