export default function getColor(value: number, biomeValue: number) {
    if ((value * 100) > 68) return "#ffffff";
    else if ((value * 100) > 39) {
      return biomeValue > 0 ? "#008800" : "#00aa00";
    }
    return "#0000ff"
  }
  