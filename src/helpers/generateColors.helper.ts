export const generateColors = (numColors: number) => {
  // Predefined color set for consistency and visual appeal
  const predefinedColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#cc65fe",
    "#4bc0c0",
    "#ff9f40",
    "#ffcd56",
    "#c9cbcf",
    "#9966ff",
    "#c05805",
  ];

  const colors = [];

  for (let i = 0; i < numColors; i++) {
    if (i < predefinedColors.length) {
      // Use the predefined colors first
      colors.push(predefinedColors[i]);
    } else {
      // Generate random colors if more are needed
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(randomColor);
    }
  }

  return colors;
};
