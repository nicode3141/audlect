import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AddSongButton, LikeButton } from "./SongButtons";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

const meta = {
	component: LikeButton,
	subcomponents: { AddSongButton },
	tags: ["autodocs"],
	argTypes: {
		liked: { control: "boolean" },
		isLoadingLike: { control: "boolean" },
		handleLike: { action: "handleLike" },
	},
} satisfies Meta<typeof LikeButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockLiked = false;

export const Like: Story = {
	args: {
		liked: mockLiked,
		isLoadingLike: false,
		handleLike: fn(),
	},
	render: () => {
		const [storyArgs, updateArgs] = useArgs();
		return (
			<LikeButton
				liked={storyArgs.liked as boolean}
				isLoadingLike={storyArgs.isLoadingLike as boolean}
				handleLike={() => updateArgs({ liked: !storyArgs.liked })}
			/>
		);
	},
};

export const Add: Story = {
	args: {
		liked: mockLiked,
		isLoadingLike: false,
		handleLike: fn(),
	},
	render: () => {
		const [storyArgs, updateArgs] = useArgs();
		return (
			<AddSongButton
				added={storyArgs.liked as boolean}
				isLoadingAdd={storyArgs.isLoadingLike as boolean}
				handleAdd={() => updateArgs({ liked: !storyArgs.liked })}
			/>
		);
	},
};
