import { type FormEvent, useMemo, useState } from "react";
import { motion } from "motion/react";

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function ContactUs() {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const [displayMonth, setDisplayMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(displayMonth),
    [displayMonth],
  );

  const calendarDays = useMemo(() => {
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startWeekday = (firstDay.getDay() + 6) % 7;
    const cells: Array<Date | null> = Array.from({ length: startWeekday }, () => null);

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(year, month, day));
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [displayMonth]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSelectedDate(null);
    setDisplayMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <section className="relative z-10 overflow-hidden px-6 py-24" id="contact">
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/gtr34.png')", backgroundSize: "88% auto" }}
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white uppercase md:text-5xl">
            Contact Us
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-white/55">
            Tell us what you need and when you want to book. We will respond with availability and next steps.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold tracking-wide text-white/70 uppercase">Name</span>
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                className="rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold tracking-wide text-white/70 uppercase">Email</span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40"
              />
            </label>
          </div>

          <div className="mt-5">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold tracking-wide text-white/70 uppercase">Booking date</span>
              <input type="hidden" name="bookingDate" value={selectedDate ? toDateValue(selectedDate) : ""} required />

              <div className="rounded-xl border border-white/15 bg-black/30 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setDisplayMonth(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                      )
                    }
                    className="rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80 transition-colors hover:bg-white/10"
                  >
                    Prev
                  </button>
                  <p className="text-sm font-semibold tracking-wide text-white uppercase">{monthLabel}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setDisplayMonth(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                      )
                    }
                    className="rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80 transition-colors hover:bg-white/10"
                  >
                    Next
                  </button>
                </div>

                <div className="mb-2 grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-center text-xs font-semibold tracking-wide text-white/45 uppercase">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((date, idx) => {
                    if (!date) {
                      return <div key={`empty-${idx}`} className="h-10" />;
                    }

                    const isPast = date < today;
                    const isSelected = selectedDate ? toDateValue(selectedDate) === toDateValue(date) : false;

                    return (
                      <button
                        key={toDateValue(date)}
                        type="button"
                        disabled={isPast}
                        onClick={() => setSelectedDate(date)}
                        className={`h-10 rounded-md border text-sm transition-colors ${
                          isSelected
                            ? "border-white/50 bg-white/20 text-white"
                            : isPast
                              ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20"
                              : "border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-xs text-white/50">
                  {selectedDate
                    ? `Selected: ${new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(selectedDate)}`
                    : "Select a booking date from the calendar."}
                </p>
              </div>
            </label>
          </div>

          <div className="mt-5">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold tracking-wide text-white/70 uppercase">Description</span>
              <textarea
                name="description"
                required
                rows={5}
                placeholder="Tell us the car type, duration, number of cars, and any special requests."
                className="resize-none rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white/10 md:w-auto"
          >
            Submit
          </button>
        </motion.form>
      </div>
    </section>
  );
}
