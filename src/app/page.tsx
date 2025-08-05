import Link from "next/link";

import {Inter, Montserrat} from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
})

export default async function Home() {

  return (
    
      <div className={`flex items-center justify-center h-screen text-left flex-col gap-10`}>
        <div className={`flex flex-col gap-10`}>
            <div className="TextHeader">
                <div className={`self-stretch justify-start ${inter.className} text-5xl font-bold`}><span className={`text-indigo-400  font-extrabold`}>Vote Music</span> with your Friends, <br></br>
                    Guests and Artists</div>
                <div className={`text-neutral-500 text-3xl font-medium${montserrat.className}`}><b>audlect</b>  is an easy way for you to simply vote music
                <br></br>into one playlist for everyone. </div>
           </div>
           <div className="Buttons flex gap-10 align-self self-start">
              <div className={`ExampleBtn`}><a href="/example" className={` bg-primaryGreen px-5 py-3 rounded-[10px] text-white hover:text-black ${inter.className} 
                                                                            text-xl font-bold curser-pointer transition-all duration-200 ease-in-out`}>View Example</a></div>
              <div className={`PricingBtn`}><a href="/pricing" className={` bg-gray-400 px-10 py-3 rounded-[10px] text-black hover:text-white ${inter.className}
                                                                             text-xl font-bold curser-pointer transition-all duration-200 ease-in-out`}>Pricing</a></div>

          </div>
        </div>
      </div>
  );
}
