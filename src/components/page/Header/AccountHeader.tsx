import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function AccountHeader(){
    return(
        <header className="w-full flex items-center flex-row">
            <SignedOut>
                <div className="flex-1 text-center font-montserrat font-medium "></div>
                <div className=" flex items-center p-4 gap-4 h-16 justify-end">
                    <SignInButton>
                        <button className="bg-[#59308b] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-8 px-4 sm:px-5 cursor-pointer" aria-label='sign-in'>Sign In</button></SignInButton>
                    <SignUpButton>
                        <button className="bg-[#42b75b] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-8 px-4 sm:px-5 cursor-pointer" aria-label='sign-up'>
                        Sign Up
                        </button>
                    </SignUpButton>
                </div>
            </SignedOut>

            <SignedIn>
                <div className='flex items-center p-4 px-6 h-16 justify-end w-full'>
                    <UserButton />
                </div>
            </SignedIn>
        </header>
    )
}