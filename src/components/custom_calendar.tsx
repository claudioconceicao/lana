"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar } from "./ui/calendar";

interface DateRange {
  from?: Date;
  to?: Date;
}

function CustomCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
    const [date, setDate] = useState<Date | undefined>()

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      numberOfMonths={2}
      selected={date}
      onSelect={setDate}
      className="rounded-lg border shadow-sm"
    />
  );
}