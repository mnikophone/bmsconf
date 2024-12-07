import { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import Photo from "../components/ui/photo";
import axios from "axios";
function People({ user }) {
  const elementRef = useRef();
  const downloadImage = () => {
    if (elementRef.current) {
      toPng(elementRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "boarding-pass.png";
          link.click();
        })
        .catch((err) => {
          console.error("Could not convert element to image", err);
        });
    }
  };
  const info = user;

  return (
    <>
      <nav className="relative max-w-lg" ref={elementRef}>
        <div className="">
          <img src="/background.png" className="w-full" alt="" />
        </div>
        <div className="absolute top-12 pt-1  left-12 text-xs">
          {" "}
          {info.fullName}
        </div>
        <div className="absolute top-20 left-12 pt-4 text-xs max-w-[120px]">
          {" "}
          {info.Zone}
        </div>
        <div className="absolute top-20 left-44 pt-4 text-xs"> {info.id}</div>
        <div className="absolute top-12 left-60 pl-8 max-w-[100px] max-h-[100px]">
          <img src={"/uploads/" + info.passport} className="w-full" alt="" />
        </div>
      </nav>
      <div className="flex justify-center">
        <button
          className="bg-black text-white p-1 px-6 rounded-md "
          onClick={downloadImage}
        >
          download
        </button>
      </div>
    </>
  );
}
export default function Form() {
  const [pfNumber, setPfNumber] = useState("");
  const [state, setState] = useState("form");
  const [stateR, setStateR] = useState("default");
  const [passport, setPassport] = useState("");

  const [isCameraActive, setIsCameraActive] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Use Axios to call the API route
      axios.post("/api/get", { id: parseInt(pfNumber) }).then(({ data }) => {
        setUser(data.data);
        console.log(data);

        setStateR(data.stateR);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setUser(null);
      setStateR("notfound");
    }
  };
  const [user, setUser] = useState({
    id: 12345,
    fullName: "Faustine Mniko",
    Zone: "TANZANIA HEAD OFFICE",
    passport: "passport.jpg",
  });

  return (
    <div>
      <div className=" min-h-screen bg-gray-100 max-w-md m-auto bgmob">
        <div className="bg-whit">
          <img src="/logo.png" alt="" />
        </div>
        {state == "form" ? (
          <div>
            <form
              onSubmit={handleSubmit}
              className="m-auto  rounded-lg p-6 w-full max-w-sm"
            >
              <h2 className=" font-bold text-gray-700 mb-4 text-center">
                Enter Your PF Number
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="pfNumber"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  PF Number
                </label>
                <input
                  type="Number"
                  id="pfNumber"
                  name="pfNumber"
                  value={pfNumber}
                  onChange={(e) => setPfNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="Enter your PF number"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                search
              </button>
            </form>
            {stateR == "display" && (
              <div className="p-10">
                <div className="font-bold text-center text-xl">
                  Verify Your Details
                </div>
                <div className="flex gap-4">
                  <nav className="font-bold">PF Number</nav>
                  <nav>:</nav>
                  <nav>{user.id}</nav>
                </div>
                <div className="flex gap-4">
                  <nav className="font-bold">Full Name</nav>
                  <nav>:</nav>
                  <nav>{user.fullName}</nav>
                </div>
                <div className="flex gap-4">
                  <nav className="font-bold">Zone</nav>
                  <nav>:</nav>
                  <nav>{user.Zone}</nav>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => {
                    setState("photo");
                  }}
                >
                  Submit
                </button>
              </div>
            )}
            {stateR == "notfound" && (
              <div className="p-10">
                <div className="font-bold text-center text-xl">
                  Verify Your Details
                </div>
                Record not found, insert your PF Number correctly
              </div>
            )}
            {state == "pass" && (
              <People user={{ ...user, passport: passport }} />
            )}
          </div>
        ) : (
          <>
            {state == "photo" ? (
              <Photo setPassport={setPassport} setState={setState} />
            ) : (
              <People user={{ ...user, passport: passport }} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
