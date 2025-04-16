import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {
    cropImage,
    cssToJson,
    createFullsizeView,
    getSlideshowStyles,
    detectMobileDevice
} from "./nxa-image.utils";
import {defaultSlideshowInterval, SlideShowTransitions} from "./nxa-image.types";
import type { SlideShowConfig } from "./nxa-image.types";
import {style} from "./style";

/**
 * NxaImage component - A versatile image display component with slideshow, fullscreen, and cropping capabilities.
 *
 * @element nxa-image
 *
 * @attr {string} data-features - Space-separated list of features to enable. Supported values:
 *   - "slideshow" - Enables slideshow functionality
 *   - "fullsize" - Enables fullscreen view on click
 *   - "arrows" - Shows navigation arrows for slideshow
 *   - "indicators" - Shows indicator dots for slideshow
 *   - "round-borders" - Applies rounded corners to the component
 *   - "blend" - Uses blend transition effect for slideshow TODO: Not implemented yet
 *   - "dont-pause-on-hover" - Prevents slideshow from pausing on hover
 *
 * @attr {string} data-crop - Global crop settings applied to all images. Format: "top: value; right: value; bottom: value; left: value"
 *   Values can be in pixels (e.g., "10px") or percentages (e.g., "10%")
 *
 * @attr {number} interval - Custom interval for slideshow transitions in milliseconds (default: 5000)
 *
 * @csspart image-container - The container for the images
 * @csspart caption-container - The container for the caption
 * @csspart indicators - The container for the slideshow indicators
 * @csspart navigation-arrows - The container for the navigation arrows
 *
 * @cssprop --nxa-image-border-radius - Border radius for rounded corners (default: 12px)
 *
 * @fires nxa-image-fullsize-open - Fired when fullsize view is opened
 * @fires nxa-image-fullsize-close - Fired when fullsize view is closed
 * @fires nxa-image-slide-change - Fired when the active slide changes
 *
 * @slot - Default slot for images. Each image can have the following attributes:
 *   - data-caption: Text caption for the image
 *   - data-crop: Individual crop settings for this image (overrides global settings)
 *   - style="object-position: X Y": Controls the focus point of the image
 */
@customElement('nxa-image')
export class NxaImage extends LitElement {
    static styles = style;

    @property({ type: Object })
     globalDataCrop: Record<string, string> = {};

    @property({ type: Array })
     childDataCrop: Record<string, string>[] = [];

    @property({ type: Array })
     dataFeatures: string[] = [];

    @property({ type: Object })
     slidesShowConfig: SlideShowConfig = {};

    @property({ type: Boolean })
     fullSize: boolean = false;

    @property({ type: Boolean })
     roundBorders: boolean = false;

    @property({ type: Number })
     interval: number = 0;

    @state()
     slideInterval: number = 0;

    @state()
     currentCaption: string = '';

    @state()
     touchStartX: number = 0;

    @state()
    touchStartY: number = 0;

    @state()
    isMobileDevice: boolean = false;

    @state()
    isPaused: boolean = false;

    @state()
    slideProgress: number = 0;

    constructor() {
        super();
        if (!this.style.width) {
            this.style.width = '100%';
        }
        if (!this.style.height) {
            this.style.height = '100%';
        }
    }

    /**
     * Lifecycle method called when the element is added to the DOM
     * Initializes properties, event listeners, and observers
     */
    connectedCallback() {
        super.connectedCallback();

        // Initialize arrays and objects to ensure they exist
        this.childDataCrop = [];
        this.dataFeatures = [];
        this.slidesShowConfig = {};
        this.globalDataCrop = {};

        // Parse data-crop attribute
        this.globalDataCrop = cssToJson(this.getAttribute("data-crop") || "");

        // Get child data-crop attributes
        Array.from(this.children).forEach((child, index) => {
            this.childDataCrop[index] = cssToJson(child?.getAttribute("data-crop") || "");
        });

        // Parse features and initialize slideshow config
        this.dataFeatures = this.getAttribute("data-features")?.split(" ").filter(Boolean) || [];
        this.initSlidesShowConfig();

        // Check for captions
        const children = Array.from(this.children) as HTMLElement[];
        this.slidesShowConfig.showCaptions = children.some(child => child.getAttribute("data-caption") !== null);

        this.fullSize = this.dataFeatures.includes("fullsize");

        // Set roundBorders based on data-features
        this.roundBorders = this.dataFeatures.includes("round-borders");

        // Apply round-borders class if needed
        if (this.roundBorders && !this.currentCaption) {
            this.classList.add('round-borders');
        } else {
            this.classList.remove('round-borders');
        }

        // Set initial caption
        this.updateCurrentCaption();

        // Wait for layout to complete before measuring
        requestAnimationFrame(() => {
            this.cropImages();

            // Set up size change detection
            const resizeObserver = new ResizeObserver(() => {
                this.cropImages();
            });
            resizeObserver.observe(this);
        });

        // Detect if mobile device and set up touch events
        this.isMobileDevice = detectMobileDevice();

        if (this.isMobileDevice) {
            this.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            this.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
        }

        // Add resize listener
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    /**
     * Lifecycle method called when the element is removed from the DOM
     * Cleans up intervals and event listeners
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }

        if (this.isMobileDevice) {
            this.removeEventListener('touchstart', this.handleTouchStart.bind(this));
            this.removeEventListener('touchend', this.handleTouchEnd.bind(this));
        }

        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    /**
     * Lifecycle method called after the element's first render
     * Initializes features that require the DOM to be rendered
     */
    firstUpdated() {
        this.isMobileDevice = detectMobileDevice();

        if (this.slidesShowConfig.enabled) {
            this.attachSlideshowStyles();
            this.initSlideshowInterval();
        }

        if (this.fullSize) {
            this.initFullSize();
        }

        this.preventImageDrag();

        this.requestUpdate();
    }

    /**
     * Renders the component template
     * @returns The component's HTML template
     */
    render() {
        return html`
        <div class="image-container">
            <slot @slotchange=${this.handleSlotChange}></slot>
            ${this.slidesShowConfig.showArrows && this.slidesShowConfig.enabled && !this.isMobileDevice ? html`
                <div class="navigation-arrows">
                    <button class="arrow-button prev" @click=${this.prevSlide}>&lt;</button>
                    <button class="arrow-button next" @click=${this.nextSlide}>&gt;</button>
                </div>
            ` : ''}
            ${this.slidesShowConfig.showIndicators && this.slidesShowConfig.enabled ? html`
                <div class="indicators">
                    ${this.renderIndicators()}
                </div>
            ` : ''}
            ${this.slidesShowConfig.enabled && this.isPaused ? html`
                <div class="pause-indicator">
                    <div class="pause-icon"></div>
                </div>
            ` : ''}
        </div>
        <div class="caption-container">
            <div class="caption">${this.currentCaption || ''}</div>
        </div>
    `;
    }

    /**
     * Handles changes to the slotted content
     * Updates crop data, captions, and reinitializes features
     */
    handleSlotChange() {
        this.childDataCrop = [];
        Array.from(this.children).forEach((child, index) => {
            this.childDataCrop[index] = cssToJson(child?.getAttribute("data-crop") || "");
        });

        this.cropImages();
        this.updateCurrentCaption();
        this.preventImageDrag();

        if (this.slidesShowConfig.enabled) {
            this.attachSlideshowStyles();
        }

        if (this.fullSize) {
            this.initFullSize();
        }
    }

    /**
     * Updates the current caption based on the active slide or first image
     */
    updateCurrentCaption() {
        if (this.slidesShowConfig.enabled) {
            const activeSlide = this.querySelector("img.active") as HTMLImageElement;
            if (activeSlide) {
                this.currentCaption = activeSlide.getAttribute("data-caption") || '';
                return;
            }
        }

        // For non-slideshow, just get the first image's caption
        const firstImg = this.querySelector("img") as HTMLImageElement;
        if (firstImg) {
            this.currentCaption = firstImg.getAttribute("data-caption") || '';
        }
    }

    /**
     * Initializes slideshow configuration based on data-features
     */
    initSlidesShowConfig() {
        // Check if slideshow is enabled
        this.slidesShowConfig.enabled = this.dataFeatures.includes("slideshow");

        if (!this.slidesShowConfig.enabled) {
            return;
        }

        // Set default values
        this.slidesShowConfig.interval = this.interval || defaultSlideshowInterval;
        this.slidesShowConfig.pauseOnHover = !this.dataFeatures.includes("dont-pause-on-hover");

        // Set transition effect TODO: Right now it looks always the same - it does not change with different values.
        const transition = SlideShowTransitions.find(t => this.dataFeatures.includes(t));
        this.slidesShowConfig.transition = transition || "fade";

        // Set UI options
        this.slidesShowConfig.showArrows = this.dataFeatures.includes("arrows");
        this.slidesShowConfig.showIndicators = this.dataFeatures.includes("indicators");

        // Set roundBorders based on data-features
        this.roundBorders = this.dataFeatures.includes("round-borders");
    }

    /**
     * Initializes the fullsize view functionality for images
     */
    initFullSize() {
        Array.from(this.children).forEach((child) => {
            if (child instanceof HTMLElement) {
                child.style.cursor = "pointer";
                child.addEventListener("click", (event) => {
                    event.stopPropagation();

                    // For slideshow, use the active image; otherwise use the clicked image
                    let img: HTMLImageElement;
                    if (this.slidesShowConfig.enabled) {
                        img = this.querySelector("img.active") as HTMLImageElement || child as HTMLImageElement;
                    } else {
                        img = child instanceof HTMLImageElement ? child : child.querySelector("img") as HTMLImageElement;
                    }

                    if (img) {
                        createFullsizeView(img, this.isMobileDevice);
                    }
                });
            }
        });
    }

    /**
     * Attaches slideshow styles to the document and initializes the first slide
     */
    attachSlideshowStyles() {
        // Add active class to first image
        const firstImg = Array.from(this.children).find(child =>
            child instanceof HTMLImageElement
        ) as HTMLImageElement | undefined;

        if (firstImg) {
            firstImg.classList.add("active");
        }

        // For slideshow styles, we need to add global styles
        const styleId = 'nxa-image-slideshow-styles';
        if (!document.getElementById(styleId)) {
            const globalStyle = document.createElement('style');
            globalStyle.id = styleId;
            globalStyle.textContent = getSlideshowStyles(this.slidesShowConfig.transition);
            document.head.appendChild(globalStyle);
        }

        // Add slideshow class to host
        this.classList.add("slideshow");
    }

    /**
     * Advances to the next slide in the slideshow
     */
    nextSlide() {
        // Reset progress
        this.slideProgress = 0;

        // reset interval
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.initSlideshowInterval();
        }

        const activeSlide = this.querySelector("img.active");
        if (!activeSlide) {
            return;
        }

        const nextSlide = activeSlide.nextElementSibling || this.querySelector("img:first-child");
        if (nextSlide) {
            activeSlide.classList.remove("active");
            nextSlide.classList.add("active");

            // Update caption when slide changes
            this.updateCurrentCaption();
        }

        // After updating the active slide, request an update to refresh indicators
        this.requestUpdate();
    }

    /**
     * Goes to the previous slide in the slideshow
     */
    prevSlide() {
        // Reset progress
        this.slideProgress = 0;

        // reset interval
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.initSlideshowInterval();
        }

        const activeSlide = this.querySelector("img.active");
        if (!activeSlide) {
            return;
        }

        const prevSlide = activeSlide.previousElementSibling || this.querySelector("img:last-child");
        if (prevSlide) {
            activeSlide.classList.remove("active");
            prevSlide.classList.add("active");

            // Update caption when slide changes
            this.updateCurrentCaption();
        }

        // After updating the active slide, request an update to refresh indicators
        this.requestUpdate();
    }

    /**
     * Initializes the slideshow interval and pause/resume behavior
     */
    initSlideshowInterval() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }

        const interval = this.slidesShowConfig.interval || defaultSlideshowInterval;

        // Reset progress
        this.slideProgress = 0;

        // Create a more frequent interval for smooth progress updates
        const progressUpdateInterval = 50; // Update every 50ms for smooth animation
        const progressIncrement = (progressUpdateInterval / interval) * 100;

        this.slideInterval = window.setInterval(() => {
            if (!this.isPaused) {
                this.slideProgress += progressIncrement;

                if (this.slideProgress >= 100) {
                    this.slideProgress = 0;
                    this.nextSlide();
                }

                this.requestUpdate();
            }
        }, progressUpdateInterval);

        if (this.slidesShowConfig.pauseOnHover) {
            this.addEventListener('mouseenter', this.pauseSlideshow.bind(this));
            this.addEventListener('mouseleave', this.resumeSlideshow.bind(this));
        }
    }

    /**
     * Pauses the slideshow
     */
    private pauseSlideshow() {
        this.isPaused = true;
        this.requestUpdate();
    }

    /**
     * Resumes the slideshow
     */
    private resumeSlideshow() {
        this.isPaused = false;
        this.requestUpdate();
    }

    /**
     * Applies cropping to all images based on crop data
     */
    cropImages() {
        const children = Array.from(this.children) as HTMLElement[];

        children.forEach((child, index) => {
            if (!(child instanceof HTMLImageElement)) {
                return;
            }

            const cropData = {
                ...this.globalDataCrop,
                ...this.childDataCrop[index]
            };

            const referenceSize = {
                width: `${this.offsetWidth}px`,
                height: `${this.offsetHeight}px`
            };

            cropImage(child, cropData, referenceSize);
        });
    }

    /**
     * Renders the indicator dots for the slideshow
     * @returns Array of indicator elements
     */
    renderIndicators() {
        const images = Array.from(this.querySelectorAll('img'));
        return images.map((_, index) => {
            const isActive = index === this.getCurrentSlideIndex();
            return html`
                <div class="indicator-container">
                    <div class="indicator ${isActive ? 'active' : ''}"
                         @click=${() => this.goToSlide(index)}>
                        ${isActive ? html`
                            <div class="progress-bar ${this.isPaused ? 'paused' : ''}"
                                 style="width: ${this.slideProgress}%"></div>
                        ` : ''}
                    </div>
                </div>
            `;
        });
    }

    /**
     * Gets the index of the currently active slide
     * @returns The index of the active slide
     */
    getCurrentSlideIndex() {
        const images = Array.from(this.querySelectorAll('img'));
        const activeSlide = this.querySelector('img.active');
        return images.indexOf(activeSlide as HTMLImageElement);
    }

    /**
     * Navigates to a specific slide by index
     * @param index The index of the slide to display
     */
    goToSlide(index: number) {
        // Reset progress
        this.slideProgress = 0;

        const images = Array.from(this.querySelectorAll('img'));
        const activeSlide = this.querySelector('img.active');

        if (activeSlide) {
            activeSlide.classList.remove('active');
        }

        if (images[index]) {
            images[index].classList.add('active');
            this.updateCurrentCaption();
        }

        // Reset interval
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.initSlideshowInterval();
        }
    }

    /**
     * Handles touch start events for swipe detection
     * @param e The touch event
     */
    private handleTouchStart(e: TouchEvent) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    /**
     * Handles touch end events for swipe detection
     * @param e The touch event
     */
    private handleTouchEnd(e: TouchEvent) {
        // Only proceed if slideshow is enabled
        if (!this.slidesShowConfig.enabled) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const xDiff = this.touchStartX - touchEndX;
        const yDiff = this.touchStartY - touchEndY;

        // Only handle horizontal swipes that are more significant than vertical movement
        // This prevents conflict with page scrolling
        if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
            e.preventDefault();
            if (xDiff > 0) {
                // Swipe left, go to next slide
                this.nextSlide();
            } else {
                // Swipe right, go to previous slide
                this.prevSlide();
            }
        }
    }

    /**
     * Handles window resize events to update mobile detection
     */
    private handleResize() {
        // Update mobile device detection on resize
        const wasMobile = this.isMobileDevice;
        this.isMobileDevice = detectMobileDevice();

        // If mobile status changed, update the component
        if (wasMobile !== this.isMobileDevice) {
            this.requestUpdate();
        }
    }

    /**
     * Prevents default drag behavior for images
     */
    private preventImageDrag() {
        const images = Array.from(this.querySelectorAll('img'));
        images.forEach(img => {
            img.setAttribute('draggable', 'false');
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'nxa-image': NxaImage;
    }
}
