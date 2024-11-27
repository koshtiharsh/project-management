'use client'


import { useEffect } from "react"




export default function PushNotification() {



  useEffect(() => {


    async function register() {


      console.log('check 1')

      if ('serviceWorker' in navigator) {
        console.log('check 2')
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