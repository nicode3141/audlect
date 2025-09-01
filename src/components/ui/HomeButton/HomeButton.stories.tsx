import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HomeButton from "~/components/ui/HomeButton/HomeButton";

const meta = {
  component: HomeButton,
  tags: ["autodocs"],
} satisfies Meta<typeof HomeButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "primary",
    href: "/",
    children: "HomeButton",
  },
};

export const secondary: Story = {
  args: {
    variant: "secondary",
    href: "/",
    children: "HomeButton",
  },
};

