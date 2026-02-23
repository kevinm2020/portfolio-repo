import React, {useState} from "react";
import "./DropDownMenu.css";

const DropdownMenu = ({ title, items }) => {

    const[isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
    <div className="dropdown-container">
        
      <button className="dropdown-button" onClick={toggleDropdown}>
        {title} {isOpen ? "▲" : "▼"}
      </button>

      {isOpen && (
        <div className="dropdown-items">
          {items.map((item, index) => (
            <a
              href={item.link || "#"}
              key={index}
              className="dropdown-item"
            >
              <h4>{item.name}</h4>
              <p className="dropdown-date">{item.date}</p>
              <p className="dropdown-synopsis">{item.synopsis}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};


export default DropdownMenu;