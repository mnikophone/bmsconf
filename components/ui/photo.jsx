import axios from "axios";
import { useRef, useState, useEffect } from "react";

export default function PhotoCapture({ setPassport, setState,user }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  // Start the camera when the user clicks "Start Camera"
  const startCamera = async () => {
    setCapturedPhoto(null);
    setIsCameraActive(true);
  };

  useEffect(() => {
    if (isCameraActive) {
      setTimeout(async () => {
        if (videoRef.current) {
          try {
            console.log("Starting camera...");
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
            });
            videoRef.current.srcObject = stream;
            // Clear previous capture
          } catch (error) {
            console.error("Error accessing camera:", error);
            alert(
              "Camera access is required to capture a photo. Please enable camera permissions."
            );
          }
        } else {
          console.error("Video element not found1");
        }
      }, 800);
    }
  }, [isCameraActive]);

  // Stop the camera
  const stopCamera = () => {
    // const stream = videoRef.current?.srcObject;
    // if (stream) {
    //   stream.getTracks().forEach((track) => track.stop());
    // }
    setIsCameraActive(false);
  };

  // Capture the photo from the video stream
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (video && canvas && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const photoDataURL = canvas.toDataURL("image/png");
      setCapturedPhoto(photoDataURL);
      stopCamera(); // Stop the camera after capturing
    }
  };

  // Handle photo upload
  const handleUpload = async () => {
    if (!capturedPhoto) {
      alert("No photo captured!");
      return;
    }

    const formData = new FormData();
    formData.append("file", dataURLtoBlob(capturedPhoto), "photo.png");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus(
          `Photo uploaded successfully! File name: ${data.fileName}`
        );
        setPassport(data.fileName);
        setUploadedFileName(data.fileName); // Save the file name

        axios.post('/api/add',{
          user:{
            id:user.id,fullName:user.fullName,Zone:user.Zone,passport:data.fileName
          }
        })
        setState("kitambulisho");
        setCapturedPhoto(null); // Clear photo preview
      } else {
        setUploadStatus("Failed to upload photo.");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      setUploadStatus("An error occurred.");
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const buffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }

    return new Blob([buffer], { type: mimeString });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Camera View */}
      {!capturedPhoto && (
        <div>
          {isCameraActive ? (
            <div>
              <video ref={videoRef} autoPlay style={{ width: "100%" }} />
              <button
                onClick={capturePhoto}
                style={{ margin: "10px" }}
                className="p-1 px-6 bg-black text-white rounded-2"
              >
                Capture Photo
              </button>
              {/* <button onClick={stopCamera}>Stop Camera</button> */}
            </div>
          ) : (
            <button
              onClick={startCamera}
              className="bg-black text-white p-1 px-4 rounded-xl"
            >
              Start Camera
            </button>
          )}
        </div>
      )}
      {/* <button onClick={startCamera}>Start Camera</button> */}
      {/* Photo Preview */}
      {capturedPhoto && (
        <div>
          <h3>Preview</h3>
          <img
            src={capturedPhoto}
            alt="Captured"
            style={{ width: "100%", maxWidth: "400px" }}
          />
          <div>
            <button
              onClick={startCamera}
              style={{ margin: "10px" }}
              className="bg-black text-white p-1 px-4 rounded-sm"
            >
              Retake Photo
            </button>
            <button
              onClick={handleUpload}
              className="bg-black text-white p-1 px-8 rounded-sm"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Upload Status */}
      <p>{uploadStatus}</p>
      {uploadedFileName && (
        <div>
          <p>
            <strong>Uploaded file name: </strong>
            {uploadedFileName}
          </p>
        </div>
      )}

      {/* Hidden Canvas for Capturing Photos */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
