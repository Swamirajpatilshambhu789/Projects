"use client"
import Spline from '@splinetool/react-spline';
import Navbar from "@/components/navbar/Navbar.js";
import './page.css'
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Changed from 'next/router' to 'next/navigation'

export default function Home() {
  const [textformaincontent, settextformaincontent] = useState("Jarvis is just an rather very intelligent system ")
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter(); // Add this line

  const handleMouseOver = () => {
    setIsHovering(true);
    settextformaincontent("Jarvis  -  Just an rather very inteligent system created by Swamiraj Patil is full created by him without using any llms by chatgpt or any other ai tools helping in windows os aswell as coding and etc");
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    settextformaincontent("Jarvis is just an rather very intelligent system");
  };

  const handleLogin = () => {
    router.push('/loginpage');
  };

  return (
    <div className="page">
      <div className="spline-container">
      <Spline
        scene="https://prod.spline.design/ZlbmhWqhymQt73we/scene.splinecode" 
      />
      </div>
      <Navbar/>
      <audio>
        <source src="" type="audio/mpeg" />
      </audio>
    </div>
  );
}