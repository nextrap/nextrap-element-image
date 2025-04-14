import {css} from "lit";

export const style = css`
    :host
    {
        width: inherit;
        height: inherit;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    :host(.round-borders) {
        border-radius: 12px;
        overflow: hidden;
    }

    ::slotted(img)
    {
        display: block;
        max-width: 100%;
        max-height: 100%;
        width: inherit;
        height: inherit;
        user-select: none;
        -webkit-user-drag: none;
    }

    .navigation-arrows {
        display: flex;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .image-container:hover .navigation-arrows
    {
        opacity: 1;
    }

    .arrow-button
    {
        pointer-events: all;
        background: rgba(0, 0, 0, 0.2);
        color: white;
        border: none;
        width: 40px;
        height: 60px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto 0;
        font-size: 18px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(4px);
        border-radius: 0 4px 4px 0;
    }

    .arrow-button.prev {
        border-radius: 0 4px 4px 0;
    }

    .arrow-button.next {
        border-radius: 4px 0 0 4px;
    }

    .arrow-button:hover {
        background: rgba(0, 0, 0, 0.5);
        width: 50px;
    }

    .image-container
    {
        position: relative;
        flex: 1;
        overflow: hidden;
        width: 100%;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .caption-container {
        position: relative;
        overflow: hidden;
        transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-height: 80px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        margin-top: -1px;
    }

    :host(.round-borders) .caption-container {
        border-radius: 0 0 12px 12px;
        overflow: hidden;
    }

    .caption {
        min-height: 0;
        width: 100%;
        color: #333;
        font-size: 14px;
        text-align: center;
        padding: 12px 16px;
        z-index: 2;
        font-weight: 500;
        letter-spacing: 0.3px;
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        margin: 0;
        line-height: 1.5;
    }

    .caption:empty {
        display: none;
    }

    .caption-container:has(.caption:empty) {
        max-height: 0;
    }

    @media (prefers-color-scheme: dark) {
        .caption {
            color: #f0f0f0;
            background-color: rgba(30, 30, 30, 0.95);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
    }

    .indicators {
        position: absolute;
        bottom: 15px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        z-index: 2;
        opacity: 0.9;
        transition: opacity 0.3s ease;
    }

    .indicator-container {
        position: relative;
        display: flex;
        align-items: center;
    }

    .indicator {
        width: 30px;
        height: 5px;
        border-radius: 2.5px;
        background-color: rgba(0, 0, 0, 0.3);
        margin: 0;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(2px);
        position: relative;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .indicator.active {
        background-color: rgba(0, 0, 0, 0.6);
        width: 40px;
    }

    .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: white;
        transition: width 0.05s linear;
    }

    .progress-bar.paused {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% { opacity: 0.7; }
        50% { opacity: 1; }
        100% { opacity: 0.7; }
    }

    .pause-icon-small {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .pause-icon-small:before, .pause-icon-small:after {
        content: '';
        position: absolute;
        width: 2px;
        height: 8px;
        background-color: white;
        border-radius: 1px;
        top: 50%;
        transform: translateY(-50%);
    }

    .pause-icon-small:before {
        left: 35%;
    }

    .pause-icon-small:after {
        right: 35%;
    }

    /* Remove the standalone pause indicator since we're integrating it with indicators */
    .pause-indicator {
        display: none;
    }

    .image-container:hover .indicators {
        opacity: 1;
    }

    :host(.round-borders) img {
        border-radius: 12px;
    }

    /* When captions are present, adjust the image container to only have top rounded corners */
    :host(.round-borders) .caption-container:not(:empty) ~ .image-container,
    :host(.round-borders) .caption:not(:empty) ~ .image-container {
        border-radius: 12px 12px 0 0;
    }

    /* Ensure the entire component has proper overflow handling */
    :host(.round-borders) {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
`;
