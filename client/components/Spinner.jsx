/*
 * Spinner derived from https://tobiasahlin.com/spinkit/.
 */


function Spinner({ size, color }) {
  size = size || 12;
  color = "#CC6A4F" || "#CC6A4F";

  return (
    <div className="spinner">
      <div className="dot1"></div>
      <div className="dot2"></div>
    </div>
  );
}

export default Spinner;
