// console.log('hello')

// /// if we console wont show on reloading page it only work only once 


const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}
// async function saveSubscription(subscription) {
//     let authtoken;

//     authtoken = localStorage.getItem('Auth');
//     if (!authtoken) {
//         authtoken = ''
//     }


//     const res = await fetch('https://y5mpgkus06.execute-api.us-east-1.amazonaws.com/prod/save-sub', {
//         method: "post",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ subscription, authtoken }),
//         credentials: 'include'
//     })
//     // const res = await fetch('http://localhost:5000/save-sub', {
//     //     method: "post",
//     //     headers: {
//     //         "Content-Type": "application/json"
//     //     },
//     //     body: JSON.stringify(subscription),
//     //     credentials: 'include'
//     // })

//     return res.json();
// }

let globalSubscription = null;

let authtoken = null
// In sw.js
self.addEventListener('message', async (event) => {
    console.log('Received message in service worker:', event.data);

    // Handle the auth token
    if (event.data.authtoken) {
        authtoken = event.data.authtoken;
    }
});

// self.addEventListener('message', (event) => {
//     if (event.data && event.data.authtoken) {
//         console.log('Auth token received:', event.data.authtoken);

//         const id = event.data.authtoken;

//         // Use the token as needed

//         // const res = await fetch('http://localhost:5000/save-sub', {
//         //     method: "post",
//         //     headers: {
//         //         "Content-Type": "application/json"
//         //     },
//         //     body: JSON.stringify(subscription),
//         //     credentials: 'include'
//         // })


//     }
// });


self.addEventListener('activate', async (e) => {
    //this will work in firefox without having key of server but not in chrome
    globalSubscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BPx0jnRp630WXTuvJOKiPPRpyZxl8p2XPFkKOCg4MiBUl9_LItrEXiLbmYSs1DOWBbal3k6SWczctiemg8dW62k")

    })

    const id = authtoken;
    const res = await fetch('https://y5mpgkus06.execute-api.us-east-1.amazonaws.com/prod/save-sub', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ globalSubscription, authtoken: id }),
        credentials: 'include'
    })
    // const res = await saveSubscription(subscription)
    // console.log(res)



})

self.addEventListener('push', (e) => {
    const data = JSON.parse(e.data.text())
    const options = {
        body: data.body,
        icon: '/logo.png',

    }

    console.log(data)
    self.registration.showNotification(data.title, options)
})
// Public Key:
// BPx0jnRp630WXTuvJOKiPPRpyZxl8p2XPFkKOCg4MiBUl9_LItrEXiLbmYSs1DOWBbal3k6SWczctiemg8dW62k

// Private Key:
// Lst587Hn7eUzeIcQR4Uk3TJ9Gxf8mST4bwn-J1G92xc