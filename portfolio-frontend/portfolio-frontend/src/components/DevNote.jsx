import { useContext, useState, useRef } from "react";
import { DevModeContext } from "../context/DevModeContext";

function DevNote({
  title = "Developer Commentary:",
  frontend,
  backend,
  security
}) {
  const { devMode } = useContext(DevModeContext);

  const [open, setOpen] = useState(true);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  if (!devMode) return null;

  const handleMouseDown = (e) => {
    dragging.current = true;

    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  
  return (
    <div
      className="dev-note"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: "default"
      }}
    >
      <div
        className="dev-note-header"
        onClick={() => setOpen(!open)}
        onMouseDown={handleMouseDown}
        style={{ cursor: "grab" }}
      >
        ⚠️ {title}
      </div>

      {open && (
        <div className="dev-note-body">
          {frontend && (
            <p><strong>Frontend:</strong> {frontend}</p>
          )}
          {backend && (
            <p><strong>Backend:</strong> {backend}</p>
          )}
          {security && (
            <p><strong>Security:</strong> {security}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DevNote;