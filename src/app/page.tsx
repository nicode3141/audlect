import HomeButton from "~/components/ui/HomeButton/HomeButton";
export default async function Home() {
	return (
		<div className={`flex h-screen flex-col items-center justify-center gap-10 px-5 text-left`}>
			<div className={`flex flex-col gap-10`}>
				<div className="TextHeader">
					<div
						className={`font-inter justify-start self-stretch text-5xl font-bold text-pretty lg:max-w-2/3 dark:text-white`}
					>
						<span className={`font-extrabold text-indigo-400`}>Vote Music</span> with your Friends, Guests and Artists
					</div>
					<div className={`font-montserrat text-3xl font-medium text-neutral-500 dark:text-gray-100`}>
						<b className="text-white">Audlect</b> is an easy way for you to simply vote music into one playlist for
						everyone.
					</div>
				</div>
				<div className="Buttons align-self flex flex-col gap-10 self-start md:flex-row">
					<HomeButton variant="primary" href="/voting/tEN2ZlbH52xZeOvI">
						View Example
					</HomeButton>
					<HomeButton variant="secondary" href="/pricing">
						Pricing
					</HomeButton>
				</div>
			</div>
		</div>
	);
}
