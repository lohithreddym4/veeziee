"use client"
import React, { useRef, useState } from 'react'
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import './styles/Register.css'

const App = () => {
  const nameRef=useRef(null);
  const emailRef=useRef(null);
  const usernameRef=useRef(null);
  const passwordRef=useRef(null);
  const router=useRouter();
  const handleRegister = async () => {
    const id=toast.loading('Please wait...');
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          { 
            email: emailRef.current.value,
            name: nameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value
          })
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)        
      } else {
        toast.success(data.msg)
        nameRef.current.value='';
        emailRef.current.value='';
        usernameRef.current.value='';
        passwordRef.current.value='';
        router.push('/login');
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    }
    finally{
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
              <input ref={nameRef}  type="text" name="Name" required={true} />
              <label>Name</label>
            </div>
            <div className="user-box">
              <input ref={usernameRef}  type="text" name="Username" required={true} />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input ref={passwordRef}  
              onKeyDown={(e)=>{if(e.key==='Enter'){handleRegister()} }}
              type="password" name="Password" required={true} />
              <label>Password</label>
            </div>
            <span>Already Registered?    <Link href="/login" className='register'  >
              Login
            </Link> here</span>
            <br />
            <a className='submit' onClick={handleRegister} href="#">
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

export default App
