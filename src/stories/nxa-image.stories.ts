import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../image/nxa-image';

interface NxaImageArgs {
  'data-features': string;
  'data-crop': string;
  interval: number;
}

const meta: Meta<NxaImageArgs> = {
  title: 'Components/NxaImage',
  component: 'nxa-image',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A versatile image component with support for cropping, slideshows, and fullscreen viewing',
      },
    },
  },
  argTypes: {
    'data-features': {
      control: 'text',
      description: 'Space-separated list of features to enable',
    },
    'data-crop': {
      control: 'text',
      description: 'Global crop settings for all images',
    },
    interval: {
      control: 'number',
      description: 'Custom interval for slideshow transitions in milliseconds',
    },
  },
  render: (args) => {
    return html`
      <nxa-image
        data-features=${args['data-features'] || ''}
        data-crop=${args['data-crop'] || ''}
        interval=${args.interval || ''}
        style="width: 800px; height: 400px;"
      >
        <img src="https://picsum.photos/800/400?random=1" data-caption="Image 1" />
        <img src="https://picsum.photos/800/400?random=2" data-caption="Image 2" />
        <img src="https://picsum.photos/800/400?random=3" data-caption="Image 3" />
      </nxa-image>
    `;
  },
};

export default meta;
type Story = StoryObj<NxaImageArgs>;

export const Default: Story = {
  args: {
    'data-features': '',
    'data-crop': '',
    interval: 5000,
  },
};

export const Slideshow: Story = {
  args: {
    'data-features': 'slideshow arrows indicators',
    'data-crop': '',
    interval: 3000,
  },
};

export const Fullsize: Story = {
  args: {
    'data-features': 'fullsize',
    'data-crop': '',
    interval: 5000,
  },
};

export const WithCrop: Story = {
  args: {
    'data-features': '',
    'data-crop': 'top: 20%; right: 20%; bottom: 20%; left: 20%;',
    interval: 5000,
  },
};

export const RoundBorders: Story = {
  args: {
    'data-features': 'round-borders',
    'data-crop': '',
    interval: 5000,
  },
};

export const SlideshowWithRoundBorders: Story = {
  args: {
    'data-features': 'slideshow arrows indicators round-borders',
    'data-crop': '',
    interval: 3000,
  },
};

export const SlideshowWithCrop: Story = {
  args: {
    'data-features': 'slideshow arrows indicators',
    'data-crop': 'top: 10%; right: 10%; bottom: 10%; left: 10%;',
    interval: 3000,
  },
};

export const FullsizeWithCrop: Story = {
  args: {
    'data-features': 'fullsize',
    'data-crop': 'top: 15%; right: 15%; bottom: 15%; left: 15%;',
    interval: 5000,
  },
};

export const AllFeatures: Story = {
  args: {
    'data-features': 'slideshow arrows indicators fullsize round-borders',
    'data-crop': 'top: 10%; right: 10%; bottom: 10%; left: 10%;',
    interval: 3000,
  },
}; 