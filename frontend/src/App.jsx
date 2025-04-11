import React from "react";
import Calendar from "./components/Calendar.jsx";
import { Button } from "./components/ui/button.jsx";
import Modal from "./components/Modal.jsx";

const App = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="flex flex-col gap-y-10 justify-center items-center relative h-screen bg-gray-100 w-screen">
      <Calendar />
      <Modal show={showModal} setShow={setShowModal} />
      <Button
        onClick={() => setShowModal(!showModal)}
        className="text-white font-bold text-lg cursor-pointer"
      >
        {showModal ? "Cancel Creation" : "Create a new event"}
      </Button>
    </div>
  );
};

export default App;
