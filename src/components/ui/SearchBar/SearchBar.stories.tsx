import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchBar from "./SearchBar";


const meta = {
  component: SearchBar,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search by Song, Artist",
    onSubmit: (value) => console.log(value)
  },
};