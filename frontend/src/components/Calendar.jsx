import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, updateEvent } from "../redux/actions/event.actions.js";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo } from "react";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const Calendar = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.eventStore);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const transformedEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
    }));
  }, [events]);

  const handleUpdate = (event) => {
    const {
      start,
      end,
      event: { _id: id, title, category },
    } = event;

    const updatedEvent = {
      title,
      category,
      startTime: new Date(start),
      endTime: new Date(end),
    };
    dispatch(updateEvent(id, updatedEvent));
  };

  return (
    <div className="w-3/4 h-3/4">
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={transformedEvents}
          localizer={localizer}
          views={["month", "week", "day"]}
          toolbar={true}
          selectable
          draggable
          onEventDrop={handleUpdate}
          onEventResize={handleUpdate}
        />
      )}
    </div>
  );
};

export default Calendar;
