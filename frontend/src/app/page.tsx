import PushNotification from "@/(components)/PushNotification";
import HomePage from "./home/page";
import { useEffect } from "react";

export default function Home() {

  
  return (
    <>
      <HomePage />
      <PushNotification />
    </>
  );
}
