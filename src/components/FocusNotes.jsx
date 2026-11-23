import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { focusNotes } from "../data/focusNotes";
import "./FocusNotes.css";

function FocusNotes({ index, onIndexChange }) {
  const count = focusNotes.length;
  const note = focusNotes[index];

  const prev = () => onIndexChange((index - 1 + count) % count);
  const next = () => onIndexChange((index + 1) % count);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section
      className="focus"
      aria-label="Focus Notes carousel"
      aria-roledescription="carousel"
    >
      <div className="focus__body" aria-live="polite">
        <p className="focus__eyebrow">{note.eyebrow}</p>
        <h2 className="focus__title">{note.title}</h2>
        <p className="focus__text">{note.body}</p>
      </div>

      <div className="focus__nav">
        <div className="focus__buttons">
          <button
            type="button"
            className="focus__btn"
            onClick={prev}
            aria-label="Previous focus note"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="focus__btn"
            onClick={next}
            aria-label="Next focus note"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="focus__indicators" role="tablist" aria-label="Choose focus note">
          {focusNotes.map((n, i) => (
            <button
              key={n.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to focus note ${i + 1}`}
              className={`focus__indicator${i === index ? " focus__indicator--active" : ""}`}
              onClick={() => onIndexChange(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FocusNotes;
