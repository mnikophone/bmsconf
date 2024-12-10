import Image from "next/image";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import RetroGrid from "../components/ui/retro-grid";
// import RetroGrid from "@/components/ui/retro-grid";
import Marquee from "../components/ui/marquee";
import { useEffect, useState } from "react";
import axios from "axios";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function People({user}) {
  const info = {
    id: 12345,
    fullName: "Faustine Mniko",
    zone: "TANZANIA HEAD OFFICE",
    passport: "passport.jpg",
  };
  return (
    <>
      <nav className="relative max-w-lg">
        <div className="">
          <img src="/background.png" className="w-full" alt=""/>
        </div>
        <div className="absolute top-16 pt-1 pl-1 left-14">
          {info.fullName}
        </div>
        <div className="absolute top-28 left-14 pt-2 text-xs max-w-[120px]">
          {info.zone}
        </div>
        <div className="absolute top-28 left-44 pt-2"> {info.id}</div>
        <div className="absolute top-12 left-80 pl-4 max-w-[100px] max-h-[100px]">
          <img src={info.passport} className="w-full" alt="" />
        </div>
      </nav>
    </>
  );
}

const transition = { duration: 4, yoyo: Infinity, ease: "easeInOut" };
export default function Home() {

  const [datas,setDatas]=useState([])
  useEffect(()=>{
     axios.post('/api/getall').then(({data})=>{
      setDatas(data.documents);
      
     })
  },[])
  return (
    <div>
      <div className="absolute top-0 left-0 w-full">
        <RetroGrid />
      </div>
      <Marquee pauseOnHover className="[--duration:100s]">
        {
          datas.filter((mydata,i)=>{
            if(i<5)
            {
             return <People user={mydata}/>
            }
          })
        }
        <div className=" flex gap-5">
        </div>
      </Marquee>



      <div
        className="absolute top-0 left-0 overflow-hiden "
        style={{ zIndex: -10 }}
      >
        <video src="/background.mp4" muted autoPlay loop className="fixed"></video>
      </div>
      {/* <div className="w-full absolute flex justify-center items-center top-0 h-screen overflow-hidden bg-black bg-opacity-50">
        <motion.div
          className="box"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [720, 0, 45, 45, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            times: [0, 0.2, 0.7, 0.8, 1],
          }}
        >
          <People />
        </motion.div>
      </div> */}
    </div>
  );
}
