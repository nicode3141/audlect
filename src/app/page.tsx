import HomeButton from "~/components/ui/buttons/HomeButton"
export default async function Home() {

  return (
    
      <div className={`flex items-center justify-center h-screen text-left flex-col gap-10`}>
        <div className={`flex flex-col gap-10`}>
            <div className="TextHeader">
                <div className={`self-stretch justify-start  text-5xl font-bold font-inter`}><span className={`text-indigo-400  font-extrabold`}>Vote Music</span> with your Friends, <br></br>
                    Guests and Artists</div>
                <div className={`text-neutral-500 text-3xl font-medium font-montserrat`}><b>audlect</b>  is an easy way for you to simply vote music
                <br></br>into one playlist for everyone. </div>
           </div>
           <div className="Buttons flex gap-10 align-self self-start">
              <HomeButton variant="primary" href="/voting">View Example</HomeButton>
              <HomeButton variant="secondary" href="/pricing">Pricing</HomeButton>
          </div>
        </div>
      </div>
  );
}