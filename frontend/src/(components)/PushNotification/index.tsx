'use client'

import { getCurrentUser } from "aws-amplify/auth";
import { useEffect } from "react"




export default function PushNotification() {



  useEffect(() => {


    async function register() {

    


      if ('serviceWorker' in navigator) {
        const permission = await Notification.requestPermission();

        if (permission == 'granted') {
          const reg = await navigator.serviceWorker.register("/sw.js")
          return reg;
        }
      }
    }

    register();

  }, [])
  return (
    <div>

    </div>
  )
};