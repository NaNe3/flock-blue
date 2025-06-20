import './Carousell.css';

export default function Carousell({ left, children }) {
  return (
    <div className="carousell-container">
      <div className="slider">
        {children}
        {children}
      </div>
    </div>
  );
}