import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createEvent } from "../redux/actions/event.actions";
import { categories } from "../lib/constants";

const Modal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.eventStore);
  const [eventData, setEventData] = React.useState({
    title: "",
    category: "exercise",
    startTime: new Date(),
    endTime: new Date(),
  });

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent(eventData));
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white rounded-2xl shadow-lg p-8 z-50">
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setShow(false)}
      >
        ❌
      </div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create New Event
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Event title"
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={eventData.category}
            onChange={(e) =>
              setEventData({ ...eventData, category: e.target.value })
            }
            defaultValue={eventData}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="startTime"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={eventData.startTime}
            onChange={(e) =>
              setEventData({ ...eventData, startTime: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="endTime"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={eventData.endTime}
            onChange={(e) =>
              setEventData({ ...eventData, endTime: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default Modal;
