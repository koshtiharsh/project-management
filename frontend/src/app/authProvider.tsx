import {Authenticator} from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css' // just include it , it works own its own 
Amplify.configure({
    Auth:{
        Cognito:{
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_POOL_ID || '',
        }
    }
})
const formFields = {
    signUp: {
        username: {
            order: 1,
            placeholder: 'Enter your username',
            label: "Username",
            inputProps: { required: true }
        },
        email: {
            order: 2,
            placeholder: 'Enter your email',
            label: "Email",
            inputProps: { type: 'email', required: true }
        },
        password: {
            order: 3,
            placeholder: 'New password',
            label: "Password",
            inputProps: {type:'password' ,required: true }
        },
        confirm_password: {
            order: 4,
            placeholder: 'New password',
            label: "Password",
            inputProps: { type:'password',required: true }
        },
    },

};
export default function authProvider({children}:any) {
  return (
    <div className="mt-5">
        <Authenticator formFields={formFields}>
        {({user})=>
            user? (
                <div>{children}</div>
            ) : (
                <div>Please Sign in Below: </div>
            )
        }
        </Authenticator>
    </div>
  )
};