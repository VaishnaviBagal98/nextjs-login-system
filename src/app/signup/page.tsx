import React,{ useState} from 'react'

export default function signupPage(){

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onsignup = async() => {
        try {
            
        } catch (error: any) {
            console.log("Signup failed");
            
        }
    }

    return(
        <div>Signup Page</div>
    )
}
