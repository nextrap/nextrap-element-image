import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../image/nxa-image';

interface NxaImageArgs {
  'data-features': string;
  'data-crop': string;
  'interval': number;
  'width': string;
  'height': string;
  'images': Array<{
    src: string;
    caption?: string;
    crop?: string;
  }>;
}

const meta: Meta<NxaImageArgs> = {
  title: 'Components/NxaImage',
  component: 'nxa-image',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A versatile image component with support for:
- Automatic slideshow when multiple images are present
- Manual slideshow control with arrows and indicators
- Fullscreen viewing
- Image cropping
- Rounded corners
- Captions
- Mobile-friendly touch controls
- Customizable transition intervals
        `,
      },
    },
  },
  argTypes: {
    'data-features': {
      control: 'multi-select',
      options: [
        'slideshow',
        'arrows',
        'indicators',
        'fullsize',
        'round-borders',
        'dont-pause-on-hover'
      ],
      description: 'Space-separated list of features to enable',
    },
    'data-crop': {
      control: 'text',
      description: 'Global crop settings for all images (e.g., "top: 20%; right: 20%; bottom: 20%; left: 20%;")',
    },
    interval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Custom interval for slideshow transitions in milliseconds',
    },
    width: {
      control: 'text',
      description: 'Component width (e.g., "800px", "100%")',
    },
    height: {
      control: 'text',
      description: 'Component height (e.g., "400px", "50vh")',
    },
    images: {
      control: 'object',
      description: 'Array of image objects with src, caption, and crop properties',
    },
  },
  args: {
    'data-features': '',
    'data-crop': '',
    interval: 5000,
    width: '800px',
    height: '400px',
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Beautiful landscape' },
      { src: 'https://picsum.photos/800/400?random=2', caption: 'City view' },
      { src: 'https://picsum.photos/800/400?random=3', caption: 'Nature scene' },
    ],
  },
  render: (args) => {
    return html`
      <nxa-image
        data-features=${args['data-features'] || ''}
        data-crop=${args['data-crop'] || ''}
        interval=${args.interval || ''}
        style="width: ${args.width}; height: ${args.height};"
      >
        ${args.images.map(img => html`
          <img 
            src=${img.src}
            data-caption=${img.caption || ''}
            data-crop=${img.crop || ''}
          />
        `)}
      </nxa-image>
    `;
  },
};

export default meta;
type Story = StoryObj<NxaImageArgs>;

// Basic Usage
export const SingleImage: Story = {
  args: {
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Single image example' }
    ],
  },
};

export const MultipleImages: Story = {
  args: {
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'First image' },
      { src: 'https://picsum.photos/800/400?random=2', caption: 'Second image' },
      { src: 'https://picsum.photos/800/400?random=3', caption: 'Third image' },
    ],
  },
};

// Slideshow Variations
export const AutomaticSlideshow: Story = {
  args: {
    'data-features': 'arrows indicators',
    interval: 3000,
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Automatic slideshow' },
      { src: 'https://picsum.photos/800/400?random=2', caption: 'With navigation controls' },
      { src: 'https://picsum.photos/800/400?random=3', caption: 'And indicators' },
    ],
  },
};

export const SlideshowWithoutPause: Story = {
  args: {
    'data-features': 'slideshow arrows indicators dont-pause-on-hover',
    interval: 2000,
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Continuous slideshow' },
      { src: 'https://picsum.photos/800/400?random=2', caption: 'No pause on hover' },
      { src: 'https://picsum.photos/800/400?random=3', caption: 'Faster transitions' },
    ],
  },
};

// Fullscreen Variations
export const FullscreenEnabled: Story = {
  args: {
    'data-features': 'fullsize',
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Click to view fullscreen' },
    ],
  },
};

export const FullscreenWithSlideshow: Story = {
  args: {
    'data-features': 'fullsize slideshow arrows indicators',
    interval: 3000,
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Fullscreen slideshow' },
      { src: 'https://picsum.photos/800/400?random=2', caption: 'With navigation' },
      { src: 'https://picsum.photos/800/400?random=3', caption: 'And indicators' },
    ],
  },
};

// Cropping Variations
export const GlobalCrop: Story = {
  args: {
    'data-crop': 'top: 20%; right: 20%; bottom: 20%; left: 20%;',
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Globally cropped image' },
    ],
  },
};

export const IndividualCrops: Story = {
  args: {
    images: [
      { 
        src: 'https://picsum.photos/800/400?random=1', 
        caption: 'Center cropped',
        crop: 'top: 30%; right: 30%; bottom: 30%; left: 30%;'
      },
      { 
        src: 'https://picsum.photos/800/400?random=2', 
        caption: 'Top cropped',
        crop: 'top: 0%; right: 20%; bottom: 40%; left: 20%;'
      },
      { 
        src: 'https://picsum.photos/800/400?random=3', 
        caption: 'Bottom cropped',
        crop: 'top: 40%; right: 20%; bottom: 0%; left: 20%;'
      },
    ],
  },
};

// Style Variations
export const RoundedCorners: Story = {
  args: {
    'data-features': 'round-borders',
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'With rounded corners' },
    ],
  },
};

export const Responsive: Story = {
  args: {
    width: '100%',
    height: '50vh',
    'data-features': 'slideshow arrows indicators round-borders',
    interval: 3000,
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Responsive slideshow' },
      { src: 'https://picsum.photos/800/400?random=2', caption: 'Full width' },
      { src: 'https://picsum.photos/800/400?random=3', caption: 'Half viewport height' },
    ],
  },
};

// All Features Combined
export const CompleteExample: Story = {
  args: {
    'data-features': 'slideshow arrows indicators fullsize round-borders',
    'data-crop': 'top: 10%; right: 10%; bottom: 10%; left: 10%;',
    interval: 3000,
    width: '800px',
    height: '400px',
    images: [
      { 
        src: 'https://picsum.photos/800/400?random=1', 
        caption: 'Complete example',
        crop: 'top: 15%; right: 15%; bottom: 15%; left: 15%;'
      },
      { 
        src: 'https://picsum.photos/800/400?random=2', 
        caption: 'With all features',
        crop: 'top: 20%; right: 20%; bottom: 20%; left: 20%;'
      },
      { 
        src: 'https://picsum.photos/800/400?random=3', 
        caption: 'And custom crops',
        crop: 'top: 25%; right: 25%; bottom: 25%; left: 25%;'
      },
    ],
  },
};
