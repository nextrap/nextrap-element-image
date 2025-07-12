import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
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
  'onSlideChange'?: (index: number, image: HTMLImageElement) => void;
  'onFullscreenEnter'?: (image: HTMLImageElement) => void;
  'onFullscreenExit'?: (image: HTMLImageElement) => void;
  'onSlideshowPause'?: (image: HTMLImageElement) => void;
  'onSlideshowResume'?: (image: HTMLImageElement) => void;
  'onImageClick'?: (image: HTMLImageElement, event: MouseEvent) => void;
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
        .onSlideChange=${args.onSlideChange}
        .onFullscreenEnter=${args.onFullscreenEnter}
        .onFullscreenExit=${args.onFullscreenExit}
        .onSlideshowPause=${args.onSlideshowPause}
        .onSlideshowResume=${args.onSlideshowResume}
        .onImageClick=${args.onImageClick}
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

// Basic Single Image Examples
export const Basic_SingleImage: Story = {
  name: 'Single Image/Basic',
  args: {
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Single image example' }
    ],
  },
};

export const Basic_SingleImageNoCaption: Story = {
  name: 'Single Image/Without Caption',
  args: {
    images: [
      { src: 'https://picsum.photos/800/400?random=1' }
    ],
  },
};

export const Basic_RoundedCorners: Story = {
  name: 'Single Image/With Rounded Corners',
  args: {
    'data-features': 'round-borders',
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'With rounded corners' },
    ],
  },
};

// Slideshow Examples
export const Slideshow_Basic: Story = {
  name: 'Slideshow/Basic',
  args: {
    'data-features': 'slideshow arrows indicators',
    interval: 3000,
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'First slide' },
      { src: 'https://picsum.photos/800/400?random=2', caption: 'Second slide' },
      { src: 'https://picsum.photos/800/400?random=3', caption: 'Third slide' },
    ],
  },
};

export const Slideshow_WithoutPause: Story = {
  name: 'Slideshow/Without Pause on Hover',
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

export const Slideshow_WithFullscreen: Story = {
  name: 'Slideshow/With Fullscreen',
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

// Cropping Examples using pixel-matrix.png
export const Crop_Center: Story = {
    name: 'Cropping/Center Focus',
    args: {
        'data-crop': 'top: 10%;',
        width: "100%",
        height: "100%",
        images: [
            {
                src: 'pixel-matrix.png',
                caption: 'Center crop showing blue square'
            },
        ],
    },
};

export const Crop_TopLeft: Story = {
  name: 'Cropping/Top Left Corner',
  args: {
    'data-crop': 'top: 0%; right: 70%; bottom: 70%; left: 0%;',
    images: [
      {
        src: 'pixel-matrix.png',
        caption: 'Top left crop showing pink corner'
      },
    ],
  },
};

export const Crop_BottomRight: Story = {
  name: 'Cropping/Bottom Right Corner',
  args: {
    'data-crop': 'top: 70%; right: 0%; bottom: 0%; left: 70%;',
    images: [
      {
        src: 'pixel-matrix.png',
        caption: 'Bottom right crop showing pink corner'
      },
    ],
  },
};

export const Crop_Horizontal: Story = {
  name: 'Cropping/Horizontal Strip',
  args: {
    'data-crop': 'top: 40%; right: 0%; bottom: 40%; left: 0%;',
    images: [
      {
        src: 'pixel-matrix.png',
        caption: 'Horizontal strip showing middle section'
      },
    ],
  },
};

export const Crop_Vertical: Story = {
  name: 'Cropping/Vertical Strip',
  args: {
    'data-crop': 'top: 0%; right: 40%; bottom: 0%; left: 40%;',
    images: [
      {
        src: 'pixel-matrix.png',
        caption: 'Vertical strip showing middle section'
      },
    ],
  },
};

export const Crop_DiagonalTLBR: Story = {
  name: 'Cropping/Diagonal Top-Left to Bottom-Right',
  args: {
    images: [
      {
        src: 'pixel-matrix.png',
        caption: 'Diagonal strip from top-left to bottom-right',
        crop: 'top: 0%; right: 60%; bottom: 60%; left: 0%;'
      },
      {
        src: 'pixel-matrix.png',
        crop: 'top: 20%; right: 40%; bottom: 40%; left: 20%;'
      },
      {
        src: 'pixel-matrix.png',
        crop: 'top: 40%; right: 20%; bottom: 20%; left: 40%;'
      },
      {
        src: 'pixel-matrix.png',
        crop: 'top: 60%; right: 0%; bottom: 0%; left: 60%;'
      }
    ],
    'data-features': 'slideshow arrows indicators',
    interval: 2000,
  },
};

// Callback Examples
export const Callback_SlideChange: Story = {
  name: 'Callbacks/Slide Change',
  args: {
    'data-features': 'slideshow arrows indicators',
    interval: 3000,
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'First slide' },
      { src: 'https://picsum.photos/800/400?random=2', caption: 'Second slide' },
      { src: 'https://picsum.photos/800/400?random=3', caption: 'Third slide' },
    ],
    onSlideChange: action('slide-changed'),
  },
};

export const Callback_Fullscreen: Story = {
  name: 'Callbacks/Fullscreen',
  args: {
    'data-features': 'fullsize',
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'Click to view fullscreen' },
    ],
    onFullscreenEnter: action('fullscreen-entered'),
    onFullscreenExit: action('fullscreen-exited'),
  },
};

export const Callback_Slideshow: Story = {
  name: 'Callbacks/Slideshow Controls',
  args: {
    'data-features': 'slideshow arrows indicators',
    interval: 3000,
    images: [
      { src: 'https://picsum.photos/800/400?random=1', caption: 'First slide' },
      { src: 'https://picsum.photos/800/400?random=2', caption: 'Second slide' },
      { src: 'https://picsum.photos/800/400?random=3', caption: 'Third slide' },
    ],
    onSlideshowPause: action('slideshow-paused'),
    onSlideshowResume: action('slideshow-resumed'),
  },
};

// Complete Example
export const Complete_AllFeatures: Story = {
  name: 'Complete/All Features Combined',
  args: {
    'data-features': 'slideshow arrows indicators fullsize round-borders',
    'data-crop': 'top: 10%; right: 10%; bottom: 10%; left: 10%;',
    interval: 3000,
    width: '800px',
    height: '400px',
    images: [
      {
        src: 'pixel-matrix.png',
        caption: 'Complete example with all features',
        crop: 'top: 15%; right: 15%; bottom: 15%; left: 15%;'
      },
      {
        src: 'pixel-matrix.png',
        caption: 'Different crop settings',
        crop: 'top: 25%; right: 25%; bottom: 25%; left: 25%;'
      },
      {
        src: 'pixel-matrix.png',
        caption: 'Even more variations',
        crop: 'top: 35%; right: 35%; bottom: 35%; left: 35%;'
      },
    ],
  },
};
