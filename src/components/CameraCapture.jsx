import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "../styles/CameraCapture.css";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImage(screenshot);
    uploadImage(screenshot); // Call your upload function here
  };

  const uploadImage = async (base64Image) => {
    // Example: Upload to Firebase Storage or your backend
    console.log("Uploading image...");
    // You can convert base64 to blob and send it via fetch or axios
  };

  return (
    <div className="camera-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-feed"
      />
      <button onClick={capture} className="capture-button">📸 Capture & Upload</button>
      {image && <img src={image} alt="Captured" className="captured-image" />}
    </div>
  );
};

export default CameraCapture;
