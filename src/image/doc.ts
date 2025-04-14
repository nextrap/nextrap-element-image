import {registerComponent} from "@nextrap/doc-visualizer";

registerComponent({
    package: "nxa-image",
    description: "A versatile image component with support for cropping, slideshows, and fullscreen viewing",
    title: "NxaImage",
    examples: [
        {
            title: "Basic Image",
            description: "A simple image with fullsize capability",
            lang: "html",
            code: `
<nxa-image style="width: 600px; height: 400px;" data-features="fullsize">
    <img src="src/image/pixel-matrix.png" alt="Sample image">
</nxa-image>
            `
        },
        {
            title: "Basic Image with Rounded Borders",
            description: "A simple image with rounded corners",
            lang: "html",
            code: `
<h3>Basic Image with Rounded Borders</h3>
<nxa-image style="width: 600px; height: 400px;" data-features="round-borders">
    <img src="src/image/pixel-matrix.png" alt="Sample image with rounded borders">
</nxa-image>
            `
        },
        {
            title: "Image Cropping",
            description: "Demonstrate different cropping options",
            lang: "html",
            code: `
<h3>Percentage-based Cropping</h3>
<div style="display: flex; gap: 20px; margin-bottom: 30px;">
    <nxa-image style="width: 300px; height: 300px">
        <img src="/src/image/pixel-matrix.png" data-crop="top: 10%; bottom: 10%; right: 10%; left: 10%" alt="Cropped image">
    </nxa-image>

    <nxa-image style="width: 300px; height: 300px">
        <img src="/src/image/pixel-matrix.png" data-crop="top: 20%; bottom: 0%; right: 0%; left: 20%" alt="Cropped image">
    </nxa-image>
</div>

<h3>Pixel-based Cropping</h3>
<div style="display: flex; gap: 20px;">
    <nxa-image style="width: 300px; height: 300px">
        <img src="/src/image/pixel-matrix.png" data-crop="top: 50px; bottom: 50px; right: 50px; left: 50px" alt="Cropped image">
    </nxa-image>

    <nxa-image style="width: 300px; height: 300px">
        <img src="/src/image/pixel-matrix.png" data-crop="top: 0px; bottom: 100px; right: 100px; left: 0px" alt="Cropped image">
    </nxa-image>
</div>
            `
        },
        {
            title: "Basic Slideshow",
            description: "Simple slideshow with automatic transitions",
            lang: "html",
            code: `
<div style="min-height: 5em; width: 100%"></div>
<h3>Basic Slideshow</h3>
<nxa-image style="width: 100%; height: 400px" data-features="slideshow">
    <img src="https://fastly.picsum.photos/id/757/2000/1000.jpg?hmac=0ohjkuXx-HYvY_3SRtOZZhGKa6vnDoVwVj8ZCLiMHKY" alt="Slide 1">
    <img src="https://fastly.picsum.photos/id/1065/2000/1000.jpg?hmac=QXp4H8PhNNsEFeXW4NXWHRZILaAzIom1Vj0fZTOiad0" alt="Slide 2">
    <img src="https://fastly.picsum.photos/id/625/2000/1000.jpg?hmac=gQYBbu1oqvVlqbhtf6NOQ1UrIhMIaIXD-foxXkUfObs" alt="Slide 3">
</nxa-image>
            `
        },
        {
            title: "Slideshow with Navigation",
            description: "Slideshow with navigation arrows and indicators",
            lang: "html",
            code: `
<div style="min-height: 5em; width: 100%"></div>
<h3>Slideshow with Navigation</h3>
<nxa-image style="width: 100%; height: 400px" data-features="slideshow arrows indicators">
    <img src="https://fastly.picsum.photos/id/757/2000/1000.jpg?hmac=0ohjkuXx-HYvY_3SRtOZZhGKa6vnDoVwVj8ZCLiMHKY" alt="Slide 1">
    <img src="https://fastly.picsum.photos/id/1065/2000/1000.jpg?hmac=QXp4H8PhNNsEFeXW4NXWHRZILaAzIom1Vj0fZTOiad0" alt="Slide 2">
    <img src="https://fastly.picsum.photos/id/625/2000/1000.jpg?hmac=gQYBbu1oqvVlqbhtf6NOQ1UrIhMIaIXD-foxXkUfObs" alt="Slide 3">
</nxa-image>
            `
        },
        {
            title: "Slideshow with Captions",
            description: "Slideshow with image captions",
            lang: "html",
            code: `
<div style="min-height: 5em; width: 100%"></div>
<h3>Slideshow with Captions</h3>
<nxa-image style="width: 100%; height: 400px" data-features="slideshow arrows indicators">
    <img src="https://fastly.picsum.photos/id/757/2000/1000.jpg?hmac=0ohjkuXx-HYvY_3SRtOZZhGKa6vnDoVwVj8ZCLiMHKY" data-caption="Beautiful mountain landscape" alt="Mountain landscape">
    <img src="https://fastly.picsum.photos/id/1065/2000/1000.jpg?hmac=QXp4H8PhNNsEFeXW4NXWHRZILaAzIom1Vj0fZTOiad0" data-caption="Serene ocean view" alt="Ocean view">
    <img src="https://fastly.picsum.photos/id/625/2000/1000.jpg?hmac=gQYBbu1oqvVlqbhtf6NOQ1UrIhMIaIXD-foxXkUfObs" data-caption="Urban cityscape" alt="Cityscape">
</nxa-image>
            `
        },
        {
            title: "Slideshow with Custom Interval",
            description: "Slideshow with a custom interval of 2 seconds",
            lang: "html",
            code: `
<div style="min-height: 5em; width: 100%"></div>
<h3>Slideshow with Custom Interval (2 seconds)</h3>
<nxa-image style="width: 100%; height: 400px" data-features="slideshow arrows indicators" interval="2000">
    <img src="https://fastly.picsum.photos/id/757/2000/1000.jpg?hmac=0ohjkuXx-HYvY_3SRtOZZhGKa6vnDoVwVj8ZCLiMHKY" alt="Slide 1">
    <img src="https://fastly.picsum.photos/id/1065/2000/1000.jpg?hmac=QXp4H8PhNNsEFeXW4NXWHRZILaAzIom1Vj0fZTOiad0" alt="Slide 2">
    <img src="https://fastly.picsum.photos/id/625/2000/1000.jpg?hmac=gQYBbu1oqvVlqbhtf6NOQ1UrIhMIaIXD-foxXkUfObs" alt="Slide 3">
</nxa-image>
            `
        },
        {
            title: "Slideshow Without Pause on Hover",
            description: "Slideshow that continues playing when hovered",
            lang: "html",
            code: `
<div style="min-height: 5em; width: 100%"></div>
<h3>Slideshow Without Pause on Hover</h3>
<nxa-image style="width: 100%; height: 400px" data-features="slideshow arrows indicators dont-pause-on-hover">
    <img src="https://fastly.picsum.photos/id/757/2000/1000.jpg?hmac=0ohjkuXx-HYvY_3SRtOZZhGKa6vnDoVwVj8ZCLiMHKY" alt="Slide 1">
    <img src="https://fastly.picsum.photos/id/1065/2000/1000.jpg?hmac=QXp4H8PhNNsEFeXW4NXWHRZILaAzIom1Vj0fZTOiad0" alt="Slide 2">
    <img src="https://fastly.picsum.photos/id/625/2000/1000.jpg?hmac=gQYBbu1oqvVlqbhtf6NOQ1UrIhMIaIXD-foxXkUfObs" alt="Slide 3">
</nxa-image>
            `
        },
        {
            title: "Fullscreen Slideshow",
            description: "Slideshow with fullscreen capability",
            lang: "html",
            code: `
<div style="min-height: 5em; width: 100%"></div>
<h3>Fullscreen Slideshow</h3>
<nxa-image style="width: 100%; height: 400px" data-features="slideshow arrows indicators fullsize">
    <img src="https://fastly.picsum.photos/id/757/2000/1000.jpg?hmac=0ohjkuXx-HYvY_3SRtOZZhGKa6vnDoVwVj8ZCLiMHKY" alt="Slide 1">
    <img src="https://fastly.picsum.photos/id/1065/2000/1000.jpg?hmac=QXp4H8PhNNsEFeXW4NXWHRZILaAzIom1Vj0fZTOiad0" alt="Slide 2">
    <img src="https://fastly.picsum.photos/id/625/2000/1000.jpg?hmac=gQYBbu1oqvVlqbhtf6NOQ1UrIhMIaIXD-foxXkUfObs" alt="Slide 3">
</nxa-image>
            `
        },
        {
            title: "Complete Example",
            description: "A comprehensive example with all features",
            lang: "html",
            code: `
<div style="min-height: 5em; width: 100%"></div>
<h3>Complete Example with All Features</h3>
<nxa-image style="width: 100%; height: 500px"
           data-features="slideshow blend fullsize arrows indicators round-borders"
           interval="4000">
    <img src="https://fastly.picsum.photos/id/757/2000/1000.jpg?hmac=0ohjkuXx-HYvY_3SRtOZZhGKa6vnDoVwVj8ZCLiMHKY"
         style="object-position: center center;"
         data-caption="Beautiful mountain landscape"
         alt="Mountain landscape">
    <img src="https://fastly.picsum.photos/id/1065/2000/1000.jpg?hmac=QXp4H8PhNNsEFeXW4NXWHRZILaAzIom1Vj0fZTOiad0"
         style="object-position: center center;"
         data-caption="Serene ocean view"
         alt="Ocean view">
    <img src="https://fastly.picsum.photos/id/625/2000/1000.jpg?hmac=gQYBbu1oqvVlqbhtf6NOQ1UrIhMIaIXD-foxXkUfObs"
         style="object-position: center center;"
         alt="Cityscape">
</nxa-image>
            `
        },
        {
            title: "Slideshow with Image Cropping - IN PROGRESS",
            description: "Slideshow with different crop settings for each image",
            lang: "html",
            code: `
<div style="min-height: 5em; width: 100%"></div>
<h3>Slideshow with Image Cropping</h3>
<nxa-image style="width: 100%; height: 400px" data-features="slideshow arrows indicators">
    <img src="https://fastly.picsum.photos/id/757/2000/1000.jpg?hmac=0ohjkuXx-HYvY_3SRtOZZhGKa6vnDoVwVj8ZCLiMHKY"
         style="object-position: center center;"
         data-caption="Top crop"
         data-crop="top: 10%; bottom: 0%; right: 0%; left: 0%"
         alt="Landscape with top crop">
    <img src="https://fastly.picsum.photos/id/1065/2000/1000.jpg?hmac=QXp4H8PhNNsEFeXW4NXWHRZILaAzIom1Vj0fZTOiad0"
         style="object-position: center center;"
         data-caption="Center focus"
         data-crop="top: 0%; bottom: 0%; right: 15%; left: 15%"
         alt="Landscape with center focus">
    <img src="https://fastly.picsum.photos/id/625/2000/1000.jpg?hmac=gQYBbu1oqvVlqbhtf6NOQ1UrIhMIaIXD-foxXkUfObs"
         style="object-position: center center;"
         data-caption="Bottom crop"
         data-crop="top: 0%; bottom: 10%; right: 0%; left: 0%"
         alt="Landscape with bottom crop">
</nxa-image>
            `
        }
    ]
});
