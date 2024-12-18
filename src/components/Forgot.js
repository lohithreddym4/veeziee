import Link from 'next/link'
import React from 'react'


const Forgot = () => {
  return (
    <div>
        <div className="login-box">
  <h2>Forgot</h2>
  <form>
    <div className="user-box">
      <input type="text" name="Username" required={true}/>
      <label>Username</label>
    </div>
    <span>
    </span>
    <Link className='submit'  href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </Link>
  </form>
</div>
    </div>
  )
}

export default Forgot
