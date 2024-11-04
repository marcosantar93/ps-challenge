# 3D Scene Visualization Challenge 

https://github.com/user-attachments/assets/4300f0d1-413d-4685-a224-aebf303485ee

## Live Demo

You can view the live application at:

- **URL**: [http://scale-challenge-021124.s3-website-us-east-1.amazonaws.com/](http://scale-challenge-021124.s3-website-us-east-1.amazonaws.com/)

**Note:** The demo supports **HTTP** only, not **HTTPS**. Please ensure your browser allows loading of non-secure content if you are accessing from a secure site.


## Setup

To run the application locally, follow these steps:


```bash
git clone git@github.com:marcosantar93/ps-challenge.git
cd ps-challenge
npm install
npm run start
```

## Usage

The application provides an interactive 3D visualization of a scene with points and cuboids. Below are the instructions on how to use the various features:

### Keyboard Shortcuts

- Space: Play/pause frame reproduction.
- Left Arrow (←): Move to the previous frame.
- Right Arrow (→): Move to the next frame.

### Mouse Controls

Orbit Controls:
- Rotate: Click and drag the left mouse button.
- Pan: Click and drag the right mouse button or hold Shift and drag with the left mouse button.
- Zoom: Use the mouse wheel scroll up/down.

Timeline Controls:
- Play/Pause Button (► / ❚❚): Start or pause the automatic frame playback.
- Previous Frame Button (⏮): Go to the previous frame.
- Next Frame Button (⏭): Go to the next frame.
- Frame Slider: Drag the slider to navigate to a specific frame.
- Speed Control: Adjust the playback speed using the slider. The speed ranges from 0.5x to 10x.

Navigation Controls

Located at the top-right corner of the screen:
- Arrow Buttons (▲, ▼, ◀, ▶): Move the camera up, down, left, or right.
- Zoom Buttons (+, -): Zoom the camera in or out.
- Reset Button (⟳): Reset the camera to the default position.

Interacting with Cuboids
- Hover Over Cuboids: Move your cursor over a cuboid to highlight it.
- Highlight: The cuboid will change color to indicate it is selected.
- Tooltip: A tooltip will appear displaying detailed information about the cuboid, such as its dimensions, position, and other properties.
- Note: Only one cuboid can be highlighted at a time.

# Original Read Me

Welcome to our technical challenge! In this exercise, you are tasked to create a 3D visualization tool using the dependencies provided in the `package.json`. Your application will render a 3D scene given a JSON input containing information about points and cuboids.

### Provided Files

- `package.json`: Contains the dependencies that should be used to build the application.
- `https://static.scale.com/uploads/pandaset-challenge/frame_00.json`: Contains the data of a 3D scene with points and cuboids.

### Requirements

#### General

- Develop a full-screen 3D application.
- Use all dependencies listed in the `package.json`.
- Fetch and render points and cuboids from the provided `frame_00.json`.
- Implement camera controls (pan, zoom, and rotate) to navigate through the 3D scene.

#### Points

- Each point should be rendered in the 3D space according to its coordinates.
- The color of the points should be determined by their height (Z-coordinate). You may choose a color gradient or a set of predefined colors to map against various height ranges.

#### Cuboids

- Render each cuboid according to its position, rotation and dimensions in the 3D space.
- Cuboid faces should be semi-transparent.
- Edges/lines of the cuboids should be solid and well defined.
- Show extra relevant cuboid information on hover (using tooltips or a side panel).

### Bonus

- Develop an interactive timeline that allows users to navigate through the various frames of the scene. This timeline should provide a visual indication of the current frame’s position within the entire scene and facilitate effortless exploration through all available frames. Incorporate shortcuts or controls enabling users to seamlessly transition between adjacent frames, ensuring an intuitive user experience. A total of 50 frames are available in the provided bucket for exploration and integration into the viewer.

### Evaluation Criteria

- **Functionality**: Does the application fulfill the primary requirements?
- **Code Quality**: Is the code well-organized, easy to read, and follows best practices?
- **Visualization**: Is the visualization effective, intuitive, and aesthetically pleasing?
- **Performance**: Does the app run smoothly, even with large datasets?
- **Usability**: Is the application user-friendly and accessible?

### Use of External Resources

- Candidates are permitted to use Google, consult official documentation, or seek assistance from AI models like ChatGPT during the challenge.
- While leveraging external resources is allowed, candidates are expected to navigate through the challenge primarily with their knowledge and skills.
- If external resources were consulted for specific solutions, problem-solving, or coding implementations during the challenge, candidates are required to explicitly mention these instances.
