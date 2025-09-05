import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';

export default function AccountHeader() {
	return (
		<header className="flex w-full flex-row items-center">
			<SignedOut>
				<div className="font-montserrat flex-1 text-center font-medium"></div>
				<div className="flex h-16 items-center justify-end gap-4 p-4">
					<SignInButton>
						<button
							className="h-10 cursor-pointer rounded-full bg-[#59308b] px-4 text-sm font-medium text-white sm:h-8 sm:px-5 sm:text-base"
							aria-label="sign-in"
						>
							Sign In
						</button>
					</SignInButton>
					<SignUpButton>
						<button
							className="h-10 cursor-pointer rounded-full bg-[#42b75b] px-4 text-sm font-medium text-white sm:h-8 sm:px-5 sm:text-base"
							aria-label="sign-up"
						>
							Sign Up
						</button>
					</SignUpButton>
				</div>
			</SignedOut>

			<SignedIn>
				<div className="flex h-16 w-full items-center justify-end p-4 px-6">
					<UserButton />
				</div>
			</SignedIn>
		</header>
	);
}
