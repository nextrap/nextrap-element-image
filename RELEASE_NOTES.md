# Release Notes

All notable changes to the Nextrap Element Image project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2023-11-20 - Enhanced Mobile Experience & Fullscreen Navigation

### Added
- Improved fullscreen mode with navigation controls:
  - Next/previous buttons for slideshow navigation in fullscreen view
  - Keyboard arrow key support for navigating between slides
  - Swipe gesture support for mobile devices in fullscreen mode
- Enhanced touch interaction system:
  - Improved swipe detection with velocity and distance thresholds
  - Better touch event handling with passive event listeners
  - Smoother animations and transitions for touch interactions

### Changed
- Redesigned fullscreen UI with improved styling:
  - Better positioning and sizing of navigation controls
  - Enhanced close button with improved visibility
  - Responsive design adjustments for different screen sizes
- Optimized touch event handling for better performance
- Improved mobile detection and responsiveness

## [1.1.0] - 2023-11-15 - Event Callbacks

### Added
- Six new event callbacks for enhanced component integration:
  - `onSlideChange`: Triggered when the active slide changes
  - `onFullscreenEnter`: Triggered when entering fullscreen mode
  - `onFullscreenExit`: Triggered when exiting fullscreen mode
  - `onSlideshowPause`: Triggered when the slideshow is paused
  - `onSlideshowResume`: Triggered when the slideshow is resumed
  - `onImageClick`: Triggered when an image is clicked
- Comprehensive documentation and examples for all event callbacks
- Automatic slideshow pause when fullsize image is shown

### Changed
- Updated README.md with new event callbacks documentation and usage examples
- Improved Storybook stories to demonstrate event callback functionality
- Relocated test image asset from src/image/ to .storybook/static/ directory
- Enhanced event handling system for better performance and reliability

## [1.0.0] - 2025-04-14 - Initial release

### Added
- Initial release of the Nextrap Element Image component
- Core image component with flexible positioning capabilities
- Slideshow functionality with navigation controls
- Fullsize image viewing with modal support and blurred background
- Virtual image cropping with percentage-based dimensions
- Touch support with swipe detection
- Responsive aspect ratio handling
- Caption support via alt text and data-caption attributes
- Rounded border support
- Pause-on-hover functionality for slideshows
- Custom event system for fullsize view and slide changes
- CSS custom properties for styling customization
- Comprehensive slot system for image management

### Features
- Image positioning control (top, bottom, left, right, center)
- Slideshow navigation (left/right) with indicators
- Fullscreen modal view with blurred background
- Virtual image cropping with percentage-based dimensions
- Mobile-friendly swipe detection
- Responsive design support
- Rounded border customization
- Slideshow pause-on-hover functionality
- Custom event system for integration
- CSS custom properties for styling

### Technical Details
- Web Components based implementation using Lit
- TypeScript support
- Modular architecture with separate utility functions
- Comprehensive test coverage
- Documentation and type definitions
- Custom event system for component interaction
- CSS custom properties for styling flexibility

## Version Categories

### Major Version (X.0.0)
- Breaking changes that require user action
- Major feature additions
- Significant architectural changes

### Minor Version (0.X.0)
- New features in a backward-compatible manner
- Enhancements to existing features
- New utility functions or helpers

### Patch Version (0.0.X)
- Bug fixes
- Performance improvements
- Documentation updates
- Minor improvements to existing features

## Template for New Versions

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features or capabilities
- New components or utilities
- New documentation

### Changed
- Changes in existing functionality
- Updates to existing features
- Performance improvements

### Deprecated
- Soon-to-be removed features
- Features that will be changed in future versions

### Removed
- Removed features
- Removed dependencies
- Cleanup of deprecated features

### Fixed
- Bug fixes
- Security patches
- Performance issues

### Security
- Security-related changes
- Vulnerability fixes
- Security improvements
```
