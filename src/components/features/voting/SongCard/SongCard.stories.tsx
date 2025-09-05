import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SongCard from './SongCard';

const meta = {
	component: SongCard,
	tags: ['autodocs'],
	argTypes: {
		added: { control: 'boolean' },
	},
} satisfies Meta<typeof SongCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		metadata: {
			song_id: 'string',
			deezer_id: 'string',
			isrc: 'string',
			voting_id: 'string',
			song_name: 'Beliver',
			song_artists: 'Imagine Dragons',
			cover_image: 'https://api.deezer.com/album/68346981/image',
			preview_url: '',
			added_by: '',
			created_at: new Date(),
			likes_total: 42,
			liked: true,
		},
		added: true,
	},
};

export const SearchResult: Story = {
	args: {
		metadata: {
			song_id: 'string',
			deezer_id: 'string',
			isrc: 'string',
			voting_id: 'string',
			song_name: 'Beliver',
			song_artists: 'Imagine Dragons',
			cover_image: 'https://api.deezer.com/album/68346981/image',
			preview_url: '',
			added_by: '',
			created_at: new Date(),
			likes_total: 42,
			liked: true,
		},
		added: false,
		addedSearchResult: false,
	},
};
