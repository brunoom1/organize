const debugGrid = grid => {
  grid.map(rows => {
    console.log(
      rows.map(col => {
        return col;
      })
    );
  });
};

export default {
  debugGrid
};
