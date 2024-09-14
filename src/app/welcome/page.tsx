"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const WelcomePage = () => {
  const [dogUrl, setDogUrl] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        setDogUrl(data.message);
      });
  }, []);

  return (
    <div className="flex align-middle justify-center h-screen">
      {dogUrl && (
        <Image
          src={dogUrl}
          alt="Random dog"
          width={500}
          height={500}
        />
      )}
    </div>
  );
};


export default WelcomePage;
