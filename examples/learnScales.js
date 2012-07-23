learnScales = {
  createLinearScaleTable: function(tableId) {
    var values = [0,33,50,68,100];

    var $table = $(tableId);
    $table.empty();
    var headers = "<tr><th>Min, Max</th>";
    for(var i in values) {
        headers = headers + "<th>" + values[i] + "</th>";
    }
    headers = headers + "</tr>";
    $table.append(headers);

    var minMaxes = [
      { min: 0, max: 10 },
      { min: 0, max: 1000 },
      { min: 0, max: 35 },
      { min: 30, max: 50 }
    ];

    for(var i in minMaxes) {
      var min = minMaxes[i].min;
      var max = minMaxes[i].max;
      var x = d3.scale.linear().domain([0, 100]).range([min, max]);  
      var cells = "<tr>";
      cells = cells + "<td>" + min + ", " + max + "</td>";
      for(var i in values) {
        cells = cells + "<td>" + Math.round(x(values[i]) * 100) / 100 + "</td>";
      }
      cells = cells + "</tr>";
      $table.append(cells);
    }    
  },
  createOrdinalScaleTable: function(tableId) {
    var values = {
        "colors": ["red","yellow", "green", "blue", "purple"],
        "captains": ["Archer", "Kirk", "Picard", "Sisko", "Janeway"],
        "stats": ["strength", "dexterity", "intelligence", "vitality", "armor"]
    };
    
    var range = [5,7,9,13,23];

    var $table = $(tableId);
    $table.empty();
    var headers = "<tr>";
    headers = headers + "<th>Categories</th>";
    for(var i in range) {
      headers = headers + "<th>" + range[i] + "</th>";
    }
    headers = headers + "</tr>";
    $table.append(headers); 

    for(var i in values) {
      var domainValues = values[i];
      var y = d3.scale.ordinal().domain(domainValues).range(range);

      var cells = "<tr><td>" + i + "</td>";
      for(var i in domainValues) {
        cells = cells + "<td>" + domainValues[i] + "</td>";
      }
      cells = cells + "</tr>";
      $table.append(cells);  
    }
  }  
}