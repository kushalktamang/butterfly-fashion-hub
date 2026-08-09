import BestSeller from "../_components/best-sold-product";
import Faq from "../_components/faq";
import Hero from "../_components/hero-section";
import LatestCollection from "../_components/latest-product";

export default function Home() {
  return (
    <>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Faq />
    </>
  );
}
