import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VotingTitle } from "./VotingTitle";

const meta = {
	component: VotingTitle,
	tags: ["autodocs"],
} satisfies Meta<typeof VotingTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Voting Title",
	},
};
