import Image from "next/image";
import Blog from "./component/blog";
import HeroSection from "./component/HeroSection";

export default function Home() {
  return (
   <div>
    <HeroSection/>
         <Blog/>
   </div>
  );
}
