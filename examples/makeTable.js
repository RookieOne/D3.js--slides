makeTable = {
  data: [
        { stat:"strength", value:400 },
        { stat:"dexterity", value:1000 },
        { stat:"intelligence", value:450 },
        { stat:"vitality", value:600 }
  ],
  addHeaders: function(tableId) {
    d3.select(tableId)
        .append("tr")
        .selectAll("th")
        .data(makeTable.data)
        .enter()
        .append("th")
        .text(function(d) {
        return d.stat;
        });
  },
  addRow: function(tableId) {
    d3.select(tableId)
        .append("tr")
        .selectAll("td")
        .data(makeTable.data)
        .enter()
        .append("td")
        .text(function(d) {
        return d.value;
        });
  }  
}