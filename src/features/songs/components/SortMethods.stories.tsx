import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SortMethods from "./SortMethods";
import { nop } from "~/shared/utils/utils";
import type { SortMethodsType } from "~/types/global";
import { useArgs } from "storybook/internal/preview-api";

const meta = {
	component: SortMethods,
	tags: ["autodocs"],
} satisfies Meta<typeof SortMethods>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		currentSort: "Likes",
		sortOptions: ["Likes", "A-Z", "Date Added", "Least Likes", "Random"],
		onChange: () => nop,
	},
	render: (args) => {
		const [storyArgs, updateArgs] = useArgs();

		return (
			<SortMethods
				{...args}
				currentSort={storyArgs.currentSort as SortMethodsType}
				onChange={(newSort: SortMethodsType) => updateArgs({ currentSort: newSort })}
			/>
		);
	},
};
