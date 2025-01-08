"use client";
import { useEffect, useState } from "react";
import Landingpage from "@/component/landingpage";
import Mainhome from "@/component/mainhome";
import Cookies from "js-cookie";

export default function Render() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check for the user ID cookie after the component has mounted
    const userId = Cookies.get("userid");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  // Default to Landingpage and switch to Mainhome if the cookie exists
  return isLoggedIn ? <Mainhome /> : <Landingpage />;
}
