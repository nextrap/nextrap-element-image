import type { Preview } from "@storybook/web-components";
import { fn } from '@storybook/test';
import { setCustomElementsManifest } from '@storybook/web-components';
import '../src/image/nxa-image';

// Import your custom elements manifest if you have one
// import customElements from '../custom-elements.json';

const preview: Preview = {
  parameters: {
    actions: { 
      // Remove argTypesRegex and use fn() in individual stories instead
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      story: {
        inline: true,
      },
    },
  },
  decorators: [
    (story) => {
      // Add any global decorators here
      return story();
    },
  ],
};

// If you have a custom elements manifest, uncomment this line
// setCustomElementsManifest(customElements);

export default preview; 