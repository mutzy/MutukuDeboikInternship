'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if(!firstName|| !lastName || !email || !password){
      console.log("All fields are required");
      return;
    }

    try{
      const emailExistsRes = await fetch("api/userExists",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({email})
      });
      
      const {user} = await emailExistsRes.json();

      if(user){
        console.log("user exists");
        return;
      }
      const res = await fetch("api/register",{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      if(res.ok){
        const form = e.target;
        form.reset()
        router.push("/");
      }
    }catch(error){
      console.log("error during reg");
    }

  }


  return (
    <div className="flex h-screen">
      {/* Left Section - Image & Text */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 relative items-center justify-center p-10">
        {/* <Image
          src="#" // Replace with actual image path
          alt="Shop Owner"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        /> */}
        <div className="relative z-10 text-white text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4">No Hazzles</h2>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your free account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Already registered? <Link href="/" className="text-green-500 font-semibold">Sign in</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text"  onChange={(e) => setfirstName(e.target.value) } placeholder="First Name" className="border rounded-lg p-3 w-full" />
              <input type="text"  onChange={(e) => setlastName(e.target.value) }  placeholder="Last Name" className="border rounded-lg p-3 w-full" />
            </div>
            <input type="email" onChange={(e) => setEmail(e.target.value) } placeholder="Email" className="border rounded-lg p-3 w-full" />
            <input type="password" onChange={(e) => setPassword(e.target.value) } placeholder="Password" className="border rounded-lg p-3 w-full" />
            
            <button
              type="submit"
              className="bg-green-500 text-white font-semibold py-3 rounded-lg w-full hover:bg-green-600"
            >
              Continue
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By signing up, you agree to our <a href="#" className="text-green-500">Terms</a> and <a href="#" className="text-green-500">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

