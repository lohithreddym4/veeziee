import Link from 'next/link'
import React, { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import './styles/login.css'
const Login = () => {
  const emailRef=useRef(null);
  const passwordRef=useRef(null);
  const router=useRouter();
  const handleSubmit=async()=>{
    const id=toast.loading("Logging in...")
    try {
      const res=await fetch('/api/users/login',{
        method:"POST",
        headers:{
          "Content-type":"Application/json"
        },
        body:JSON.stringify({
          email:emailRef.current.value,
          password:passwordRef.current.value}),
          cache:"no-store"
      })
      const data=await res.json();
      if(data.error){
        toast.error(data.error)
      }
      else{
        toast.success(data.msg)
        emailRef.current.value='';
        passwordRef.current.value='';
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occured");
    }finally{
      toast.remove(id);
    }
  }
  return (
    <div>
        <div className="login-box">
          <h2>Register</h2>
          <form>
            <div className="user-box">
              <input ref={emailRef}  type="email" name="email" required={true} />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input ref={passwordRef}  
              onKeyDown={(e)=>{if(e.key==='Enter'){handleSubmit()} }}
              type="password" name="Password" required={true} />
              <label>Password</label>
            </div>
            <span>Already Registered?    <Link href="/login" className='register'  >
              Login
            </Link> here</span>
            <br />
            <a className='submit' onClick={handleSubmit} href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
          </form>
        </div>
        <Toaster/>

    </div>
  )
}

export default Login
