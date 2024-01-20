import React from "react";
import axios from "axios";
import { BaseMap } from "../../BaseMap";

export function Map() {
  const baseUrl = "https://api.crackeddevs.com/api/get-jobs";
  const apiKey = "b178dbf6-1e50-4a8b-a6a0-263bb57905b7";

  try {
    const response = axios.get(baseUrl, {
      headers: {
        "Api-Key": apiKey,
      },
    });
    console.log(response, "ldlel");
  } catch (err) {
    console.log(err, "ehn");
  }

  return (
    <div className="bg-opacity-70 bg-black w-full h-[100vh] px-[4.17vw] py-[3.52vh] flex flex-col justify-center gap-4 ">
      hi
      <div className="text-center">
        <BaseMap />
      </div>
    </div>
  );
}

