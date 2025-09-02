import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AddSongButton, LikeButton } from "./SongButtons";
import { useArgs } from 'storybook/preview-api';

const meta = {
  component: LikeButton,
  subcomponents: { AddSongButton },
  tags: ["autodocs"],
    argTypes: {
    liked: { control: 'boolean' },
    isLoadingLike: { control: 'boolean' },
    handleLike: { action: 'handleLike' },
  }
} satisfies Meta<typeof LikeButton>;

export default meta;

type Story = StoryObj<typeof meta>;

let mockLiked = false;

export const Like: Story = {
  args: {
    liked: mockLiked,
    isLoadingLike: false,
    handleLike: () => {},
  },
  render: (args) => {
    const [storyArgs, updateArgs] = useArgs();
    return (
      <LikeButton
        liked={storyArgs.liked}
        isLoadingLike={storyArgs.isLoadingLike}
        handleLike={() => updateArgs({ liked: !storyArgs.liked })}
      />
    );
  },
};

export const Add: Story = {
  args: {
    liked: mockLiked,
    isLoadingLike: false,
    handleLike: () => {},
  },
  render: (args) => {
    const [storyArgs, updateArgs] = useArgs();
    return (
      <AddSongButton
        added={storyArgs.liked}
        isLoadingAdd={storyArgs.isLoadingLike}
        handleAdd={() => updateArgs({ liked: !storyArgs.liked })}
      />
    );
  },
};