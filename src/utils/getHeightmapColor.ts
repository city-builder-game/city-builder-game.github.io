export default function getHeightmapColor(value: number) {
  var hexValue = Math.floor(Math.floor(value * 10.2) * 25).toString(16);
  if (hexValue.length < 2) {
    hexValue = "0" + hexValue;
  }
  return "#" + hexValue.repeat(3);
}
