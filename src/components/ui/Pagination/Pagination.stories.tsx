import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Pagination from "./Pagination";
import { fn } from "storybook/test";
import { useArgs } from "storybook/preview-api";

const meta = {
	component: Pagination,
	tags: ["autodocs"],
	argTypes: {
		variant: { control: "select", options: ["default", "search_result"] },
		totalPages: { control: "number" },
		currentPage: { control: "number" },
		gotoPage: { action: "gotoPage" },
	},
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: "default",
		totalPages: 4,
		currentPage: 1,
		gotoPage: fn(),
	},
	render: (args) => {
		const [storyArgs, updateArgs] = useArgs();

		const handleGotoPage = (page: number) => {
			// Update Storybook args to change currentPage
			updateArgs({ currentPage: page });
		};

		return <Pagination {...args} currentPage={storyArgs.currentPage as number} gotoPage={handleGotoPage} />;
	},
};

export const SearchResult: Story = {
	args: {
		variant: "search_result",
		totalPages: 4,
		currentPage: 1,
		gotoPage: fn(),
	},
	render: (args) => {
		const [storyArgs, updateArgs] = useArgs();

		const handleGotoPage = (page: number) => {
			// Update Storybook args to change currentPage
			updateArgs({ currentPage: page });
		};

		return <Pagination {...args} currentPage={storyArgs.currentPage as number} gotoPage={handleGotoPage} />;
	},
};
