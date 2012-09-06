pieChart = {
  data: [
        { percent: 80, label: "Made up stats"},
        { percent: 20, label: "Scary truth"}
  ],
  width: 600,
  height: 400,
  svgGraph: {},
  pie: {},
  arc: {},
  createSvgGraph: function(divId) {
     pieChart.svgGraph = d3.select(divId)
        .append("svg:svg")
        .attr("class", "pie-chart")
        .attr("width", pieChart.width)
        .attr("height", pieChart.height)
        .append("svg:g");
  },
  createPieFxs: function(innerRadius) {
    pieChart.pie = d3.layout.pie().value(function(d) { return d.percent; });
    pieChart.arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(200);
  },
  drawArcs: function() {
    var arcsG = pieChart.svgGraph.append("svg:g")
      .attr("class", "arcs")
      .attr("transform", "translate(" + pieChart.width/2 + "," + pieChart.height/2 + ")");  

    var color = d3.scale.category10();

    var arcs = arcsG.selectAll("path")
                    .data(pieChart.pie(pieChart.data)).enter()
        .append("svg:path")
        .attr("d", pieChart.arc)        
        .attr("class", "pie-section")
        .attr("fill", function(d,i) { return color(i); });    
  },
  setupSlides: function() {
    // Create Chart
    pieChart.createSvgGraph("#pie-createChart");

    // Normal Chart
    pieChart.createSvgGraph("#pie-normalChart");
    pieChart.createPieFxs(0);
    pieChart.drawArcs();

    // Doughnut Chart
    pieChart.createSvgGraph("#pie-doughnutChart");
    pieChart.createPieFxs(100);
    pieChart.drawArcs();    
  }
}


