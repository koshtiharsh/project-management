'use client'


import { useEffect } from "react"




export default function PushNotification() {

  useEffect(() => {
    async function registerServiceWorker() {
      try {
        if ('serviceWorker' in navigator) {
          const permission = await Notification.requestPermission();

          if (permission === 'granted') {
            const reg = await navigator.serviceWorker.register('/sw.js');

            // Wait for the service worker to be ready
            const registration = await navigator.serviceWorker.ready;

            const authtoken = localStorage.getItem('Auth');
            if (authtoken) {
              // Send message using the controller
              registration.active?.postMessage({ authtoken });
              console.log('Auth token sent to service worker');
            }
          }
        }
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    }

    registerServiceWorker();
  }, []);
  return (
    <div>

    </div>
  )
};