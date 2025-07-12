# Nextrap Element Image

A versatile and powerful image component for modern web applications that provides advanced image handling capabilities including slideshows, positioning, and fullscreen viewing.

## Features

- 🖼️ **Flexible Image Positioning**: Control image position (top, bottom, left, right, center) using `object-position`
- 📐 **Responsive Aspect Ratio**: Maintain aspect ratios across different breakpoints
- 🎭 **Slideshow Capabilities**:
  - Smooth blend effects between slides *(blend effect: not yet implemented)*
  - Left/right navigation
  - Caption support using alt text or data-caption
- 🔍 **Fullsize View**: Display images in a modal with centered positioning and blurred background
- ✂️ **Image Cropping**: Virtual crop functionality with percentage-based or pixel dimensions
- 📱 **Touch Support**: Swipe detection for mobile-friendly navigation
- 🐞 **Debug Mode**: Enable detailed console logging for troubleshooting (`debug` attribute)

## Supported Attributes

- `data-features`: Space-separated list of features to enable. Supported values:
  - `slideshow`, `fullsize`, `arrows`, `indicators`, `round-borders`, `blend` *(not yet implemented)*, `dont-pause-on-hover`
- `data-crop`: Global crop settings for all images (can be overridden per image)
- `interval`: Custom interval for slideshow transitions (ms)
- `debug`: Enables debug mode (boolean)

## CSS Customization

- CSS Parts: `image-container`, `caption-container`, `indicators`, `navigation-arrows`
- CSS Properties: `--nxa-image-border-radius` (default: 12px)

## Custom Events

- `nxa-image-fullsize-open`: Fired when fullsize view is opened
- `nxa-image-fullsize-close`: Fired when fullsize view is closed
- `nxa-image-slide-change`: Fired when the active slide changes

## Installation

```bash
# Installation instructions will depend on your package manager
npm i @nextrap/image
```

## Usage Examples

### Basic Image with Fullsize Capability

```html
<nxa-image style="width: 600px; height: 400px;" data-features="fullsize">
    <img src="path/to/your/image.jpg" alt="Sample image">
</nxa-image>
```

### Image with Rounded Borders

```html
<nxa-image style="width: 600px; height: 400px;" data-features="round-borders">
    <img src="path/to/your/image.jpg" alt="Sample image with rounded borders">
</nxa-image>
```

### Image Cropping

#### Percentage-based Cropping
```html
<nxa-image style="width: 300px; height: 300px">
    <img src="path/to/your/image.jpg" 
         data-crop="top: 10%; bottom: 10%; right: 10%; left: 10%" 
         alt="Cropped image">
</nxa-image>
```

#### Pixel-based Cropping
```html
<nxa-image style="width: 300px; height: 300px">
    <img src="path/to/your/image.jpg" 
         data-crop="top: 50px; bottom: 50px; right: 50px; left: 50px" 
         alt="Cropped image">
</nxa-image>
```

### Slideshow Examples

#### Basic Slideshow
```html
<nxa-image style="width: 100%; height: 400px" data-features="slideshow">
    <img src="path/to/image1.jpg" alt="Slide 1">
    <img src="path/to/image2.jpg" alt="Slide 2">
    <img src="path/to/image3.jpg" alt="Slide 3">
</nxa-image>
```

#### Slideshow with Navigation and Indicators
```html
<nxa-image style="width: 100%; height: 400px" 
           data-features="slideshow arrows indicators">
    <img src="path/to/image1.jpg" alt="Slide 1">
    <img src="path/to/image2.jpg" alt="Slide 2">
    <img src="path/to/image3.jpg" alt="Slide 3">
</nxa-image>
```

#### Slideshow with Captions
```html
<nxa-image style="width: 100%; height: 400px" 
           data-features="slideshow arrows indicators">
    <img src="path/to/image1.jpg" 
         data-caption="Beautiful mountain landscape" 
         alt="Mountain landscape">
    <img src="path/to/image2.jpg" 
         data-caption="Serene ocean view" 
         alt="Ocean view">
    <img src="path/to/image3.jpg" 
         data-caption="Urban cityscape" 
         alt="Cityscape">
</nxa-image>
```

#### Custom Slideshow Settings
```html
<!-- Custom interval (2 seconds) -->
<nxa-image style="width: 100%; height: 400px" 
           data-features="slideshow arrows indicators" 
           interval="2000">
    <img src="path/to/image1.jpg" alt="Slide 1">
    <img src="path/to/image2.jpg" alt="Slide 2">
    <img src="path/to/image3.jpg" alt="Slide 3">
</nxa-image>

<!-- Continuous slideshow (no pause on hover) -->
<nxa-image style="width: 100%; height: 400px" 
           data-features="slideshow arrows indicators dont-pause-on-hover">
    <img src="path/to/image1.jpg" alt="Slide 1">
    <img src="path/to/image2.jpg" alt="Slide 2">
    <img src="path/to/image3.jpg" alt="Slide 3">
</nxa-image>
```

### Complete Example with All Features

```html
<nxa-image style="width: 100%; height: 500px"
           data-features="slideshow blend fullsize arrows indicators round-borders"
           interval="4000">
    <img src="path/to/image1.jpg"
         style="object-position: center center;"
         data-caption="Beautiful mountain landscape"
         alt="Mountain landscape">
    <img src="path/to/image2.jpg"
         style="object-position: center center;"
         data-caption="Serene ocean view"
         alt="Ocean view">
    <img src="path/to/image3.jpg"
         style="object-position: center center;"
         alt="Cityscape">
</nxa-image>
```

### Example with Event Callbacks

```html
<nxa-image 
    style="width: 100%; height: 400px" 
    data-features="slideshow arrows indicators fullsize"
    id="myImageComponent">
    <img src="path/to/image1.jpg" alt="Slide 1">
    <img src="path/to/image2.jpg" alt="Slide 2">
    <img src="path/to/image3.jpg" alt="Slide 3">
</nxa-image>

<script>
    // Get the component instance
    const imageComponent = document.getElementById('myImageComponent');

    // Add event listeners
    imageComponent.onSlideChange = (index, image) => {
        console.log(`Slide changed to index ${index}`);
    };

    imageComponent.onFullscreenEnter = (image) => {
        console.log('Entered fullscreen mode');
    };

    imageComponent.onFullscreenExit = (image) => {
        console.log('Exited fullscreen mode');
    };

    imageComponent.onSlideshowPause = (image) => {
        console.log('Slideshow paused');
    };

    imageComponent.onSlideshowResume = (image) => {
        console.log('Slideshow resumed');
    };

    imageComponent.onImageClick = (image, event) => {
        console.log('Image clicked', event);
    };
</script>
```

## API Reference

### NxaImage Component

The main component that handles all image functionality.

#### Attributes

- `style`: Standard CSS styling (width, height required)
- `data-features`: Space-separated list of features to enable:
  - `slideshow`: Enables slideshow functionality
  - `fullsize`: Enables fullscreen modal view
  - `arrows`: Shows navigation arrows
  - `indicators`: Shows slide indicators
  - `round-borders`: Applies rounded corners
  - `dont-pause-on-hover`: Prevents slideshow from pausing on hover
- `interval`: Custom interval for slideshow transitions (in milliseconds)
- `debug`: Enables debug mode (boolean)

#### Event Callbacks

- `onSlideChange`: Called when the active slide changes. Receives the index of the new active slide and the image element.
- `onFullscreenEnter`: Called when entering fullscreen mode. Receives the image element that was clicked.
- `onFullscreenExit`: Called when exiting fullscreen mode. Receives the image element that was in fullscreen.
- `onSlideshowPause`: Called when the slideshow is paused. Receives the current active image element.
- `onSlideshowResume`: Called when the slideshow is resumed. Receives the current active image element.
- `onImageClick`: Called when an image is clicked. Receives the clicked image element and the click event.

#### Image Element Attributes

- `style.object-position`: Controls image positioning
- `data-caption`: Adds a caption to the image
- `data-crop`: Specifies crop dimensions in percentages or pixels
- `alt`: Alternative text for accessibility

## Browser Support

The component is designed to work in all modern browsers that support Web Components.

## Development

The project uses modern web development tools and practices:

- **Vite** for fast development and building
- **TypeScript** for type safety
- **Storybook** for component development and documentation
- **Web Components** for framework-agnostic usage

### Project Structure
```
src/
├── index.ts           # Main entry point
├── stories/          # Storybook stories and documentation
└── image/
    ├── nxa-image.ts           # Core component implementation
    ├── style.ts              # Styling definitions
    ├── nxa-image.utils.ts    # Utility functions
    ├── nxa-image.types.ts    # TypeScript type definitions
    ├── nxa-image.test.js     # Component tests
    ├── pixel-matrix.png      # Test image asset
    └── README.md             # Component-specific documentation
```

### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. View Storybook documentation:
   ```bash
   apt install xdg-open
   npm run storybook
   ```
5. Run tests:
   ```bash
   npm test
   ```

## License

This project is licensed under the terms specified in the [LICENSE.txt](LICENSE.txt) file.

## Release Notes

For detailed information about changes in each version, please refer to the [RELEASE_NOTES.md](RELEASE_NOTES.md) file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
