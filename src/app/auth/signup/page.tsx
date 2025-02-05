'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/app/config/supabase';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e:any) => {
            e.preventDefault()
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else router.push('/auth/login');
        setLoading(false);
    };

    return (
        // <div className="flex flex-col items-center justify-center h-screen">
        //     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 m-2" />
        //     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 m-2" />
        //     <button onClick={handleSignup} className="bg-green-500 text-white p-2 m-2">Sign Up</button>
        //     <p>Already have an account? <a href="#" onClick={() => router.push('/auth/login')} className="text-blue-500">Login</a></p>
        // </div>


<section className="bg-gray-50 dark:bg-gray-900">
<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="email"className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email"  value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required={true}/>
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password"  value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true}/>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-black  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
                dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <a href="#" onClick={() => router.push('/auth/login')}  className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login</a>
                </p>
            </form>
        </div>
    </div>
</div>
</section>
    );
}