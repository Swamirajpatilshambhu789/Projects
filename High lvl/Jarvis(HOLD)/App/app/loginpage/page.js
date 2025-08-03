"use client"
import Spline from '@splinetool/react-spline';
import Navbar from "@/components/navbar/Navbar.js";
import { useForm, SubmitHandler } from "react-hook-form"
import './page.css'
import { useRouter } from 'next/navigation'; // Changed from 'next/router' to 'next/navigation'
export default function Home() {
  const router = useRouter(); // Add this line
  const {
    register,
    handleSubmit,
    setError,    
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    let res = await fetch("/api/add", {
      method: "POST", headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className="page">
      <div className="spline-container">
        <Spline
          scene="https://prod.spline.design/ppe-F8JutyJbV7iS/scene.splinecode" 
        />
      </div>
      <Navbar/>
      <div className={"main"}>
        <div className="headofform navbar"><div className="headofformscontent navbarcontent">Login</div></div>
      <form className='formhandler' action="" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='username' className='usernamegetter' {...register("username", { required: {value: true, message: "This field is required"}, minLength: {value: 3, message: "Min length is 3"}, maxLength: {value: 8, message: "Max length is 8"} })} type="text"   />
          {errors.username && <div className='red'>{errors.username.message}</div>}
          <br />
          <input placeholder='password' className='passwordgetter' {...register("password", {minLength: {value: 7, message: "Min length of password is 8"},})} type="password"/>
          {errors.password && <div className='red'>{errors.password.message}</div>}
          <br />
          <input className='loginbtninform' disabled={isSubmitting} type="submit" value="Submit" />
          {errors.myform && <div className='red'>{errors.myform.message}</div>}
          {errors.blocked && <div className='red'>{errors.blocked.message}</div>}
        </form>
      </div>
      {/* <button className="loginbtn">Login</button> */}
    </div>
  );
}