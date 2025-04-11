import React from "react";
import Calendar from "./components/Calendar.jsx";
import { Button } from "./components/ui/button.jsx";
import Modal from "./components/Modal.jsx";
import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-64 transform transition-all duration-300 ease-in-out">
        <Sidebar category={category} setCategory={setCategory} />
      </div>
      <div className="flex-1 p-8 space-y-8">
        <div className="bg-white h-full rounded-2xl shadow-lg p-6 flex items-center justify-center transition-all duration-300 hover:shadow-xl">
          <Calendar category={category} />
        </div>
        <div className="fixed bottom-8 right-8 z-10">
          <Button
            onClick={() => setShowModal(!showModal)}
            className="rounded-full py-6 cursor-pointer px-8 text-lg font-semibold shadow-lg transition-all duration-300
                      bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600
                      transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
          >
            <span>+</span>
            <span>{showModal ? "Cancel" : "New Event"}</span>
          </Button>
        </div>
        <Modal show={showModal} setShow={setShowModal} />
      </div>
    </div>
  );
};

export default App;
