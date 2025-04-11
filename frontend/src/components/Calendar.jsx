import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  fetchEvents,
  updateEvent,
} from "../redux/actions/event.actions.js";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo } from "react";
import { categories, colors, icons } from "../lib/constants.js";
import { useState } from "react";
import { TrashIcon } from "lucide-react";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const CustomTimeSlot = ({ children }) => {
  return (
    <div className="rbc-time-slot" style={{ minHeight: "40px" }}>
      {children}
    </div>
  );
};

const CustomEvent = ({ event }) => {
  const categoryIndex = categories.indexOf(event.category);
  const eventColor = colors[categoryIndex];
  const eventIcon = icons[categoryIndex];
  const dispatch = useDispatch();
  const handleDelete = (event) => {
    dispatch(deleteEvent(event._id)).then(() => {
      dispatch(fetchEvents(""));
    });
  };

  return (
    <div
      className="h-full p-1 rounded-lg relative shadow-sm flex flex-col justify-center"
      style={{
        backgroundColor: `${eventColor}30`,
        borderLeft: `4px solid ${eventColor}`,
        height: "100%",
      }}
    >
      <button onClick={() => handleDelete(event)} className="cursor-pointer">
        <TrashIcon className="absolute top-2 right-2" size={30} />
      </button>
      <div className="flex items-center gap-1">
        <span className="text-sm">{eventIcon}</span>
        <strong className="text-xs" style={{ color: eventColor }}>
          {event.title}
        </strong>
      </div>
      <div className="text-xs" style={{ color: eventColor }}>
        {moment(event.start).format("h:mm A")} -{" "}
        {moment(event.end).format("h:mm A")}
      </div>
    </div>
  );
};

const eventStyleGetter = (event) => {
  const categoryIndex = categories.indexOf(event.category);
  const eventColor = colors[categoryIndex];

  return {
    style: {
      backgroundColor: `${eventColor}10`,
      border: `0px`,
      color: eventColor,
      borderRadius: "8px",
      margin: "2px 4px",
      minHeight: "40px",
    },
  };
};

const Calendar = ({ category }) => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.eventStore);
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(moment().toDate());

  useEffect(() => {
    dispatch(fetchEvents(category));
  }, [dispatch, category]);

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  const transformedEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
    }));
  }, [events]);

  const handleUpdate = ({ event, start, end }) => {
    const updatedEvent = {
      title: event.title,
      category: event.category,
      startTime: start,
      endTime: end,
    };

    dispatch(updateEvent(event._id, updatedEvent)).then(() => {
      dispatch(fetchEvents(""));
    });
  };

  return (
    <div className="w-full h-full">
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <DnDCalendar
          view={currentView}
          onView={handleViewChange}
          events={transformedEvents}
          date={currentDate}
          onNavigate={handleNavigate}
          localizer={localizer}
          views={["month", "week", "day"]}
          toolbar={true}
          draggable
          onEventDrop={handleUpdate}
          onEventResize={handleUpdate}
          eventPropGetter={eventStyleGetter}
          step={15}
          min={moment().startOf("day").add(8, "hours").toDate()}
          max={moment().startOf("day").add(23, "hours").toDate()}
          timeslots={4}
          components={{
            event: CustomEvent,
            timeSlotWrapper: CustomTimeSlot,
          }}
          style={{
            height: "100%",
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
          dayLayoutAlgorithm="no-overlap"
        />
      )}
    </div>
  );
};

export default Calendar;
