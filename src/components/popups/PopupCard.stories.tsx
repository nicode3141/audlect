import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PopupCard from "./PopupCard";
import HomeButton from "../ui/HomeButton/HomeButton";

const meta = {
	component: PopupCard,
	tags: ["autodocs"],
} satisfies Meta<typeof PopupCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Title",
		subtitle: "Subtitle",
		children: (
			<HomeButton variant={"secondary"} href={""}>
				Button
			</HomeButton>
		),
	},
};
