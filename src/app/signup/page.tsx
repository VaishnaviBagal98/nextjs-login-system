'use client';
import React,{ useState} from 'react'
import { useEffect } from 'react'; 
import axios from 'axios'
import { toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link';



export default function signupPage(){

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const validatePassword = (password: any) => {
        const minLength = password.length >= 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!minLength) return 'Password must be at least 8 characters long.';
        if (!hasLetter) return 'Password must contain at least one letter.';
        if (!hasNumber) return 'Password must contain at least one number.';
        if (!hasSpecialChar) return 'Password must contain at least one special character.';

        return '';
    };

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [passwordError, setPasswordError] = useState("");

    const onSignup = async() => {

        const error = validatePassword(user.password);
        if (error) {
            setPasswordError(error);
            return;
        } else {
            setPasswordError("");
        }

        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push('/login')
        } catch (error: any) {
            console.log("Signup failed");
            toast.error(error.message)
            
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return(
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
          <h1>{loading ? "Processing" : "Signup"}</h1> 
          <hr />
          <label htmlFor="username">Username</label>
          <input
          className='p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600
          text-black'
          id='username'
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
          placeholder='username'
          type="text" /> 

          <label htmlFor="email">Email</label>
          <input
          className='p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600
          text-black'
          id="email"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="Email"
          type="text" 
          />

          <label htmlFor="password">Password</label>
          <input
          className='p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600
          text-black'
          id="password"
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          placeholder="password"
          type="password" 
          /> 
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <button
          onClick={onSignup}
          className='p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600
          text-black'
          >
            {buttonDisabled ? "No signup " : "signup"}
          </button>
          <Link href="/login">Visit login page</Link>
        </div>
    )
}
