"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const WelcomePage = () => {
  const [dogUrl, setDogUrl] = useState("");
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        setDogUrl(data.message);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
       <h1 className="text-4xl">Welcome, {username}!</h1>

      {dogUrl && (
        <Image src={dogUrl} alt="Random dog" width={700} height={700}/>
      )}
    </div>
  );
};

export default WelcomePage;
