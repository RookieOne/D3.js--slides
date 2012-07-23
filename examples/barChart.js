barChart = {
  data: [
        { stat:"strength", value:400 },
        { stat:"dexterity", value:1000 },
        { stat:"intelligence", value:450 },
        { stat:"vitality", value:600 }
  ],
  transitionData: {
    "barb": [{ stat:"strength", value:900 },
             { stat:"dexterity", value:400 },
             { stat:"intelligence", value: 250 },
             { stat:"vitality", value:800 }],
    "monk": [{ stat:"strength", value:200 },
             { stat:"dexterity", value:850 },
             { stat:"intelligence", value:250 },
             { stat:"vitality", value:600 }],
    "wiz": [{ stat:"strength", value:330 },
             { stat:"dexterity", value:230 },
             { stat:"intelligence", value:990 },
             { stat:"vitality", value:300 }],
    "witch": [{ stat:"strength", value:200 },
             { stat:"dexterity", value:470 },
             { stat:"intelligence", value:880 },
             { stat:"vitality", value:650 }]
  },
  width: 730,
  height: 300,
  margin: 30,
  barMargin: 10,
  max: 1000,
  svgChart: {},
  scaleX: function(){},
  scaleY: function(){},
  createSvgChart: function(id) {
    barChart.svgChart = d3.select(id)
        .append("svg:svg")
        .attr("class", "bar-chart")
        .attr("width", barChart.width + barChart.margin)
        .attr("height", barChart.height + barChart.margin)
        .append("svg:g");
  },
  createScaleFxs: function() {
    barChart.scaleX = d3.scale.linear().domain([0, barChart.max]).range([barChart.margin, barChart.width]);
    barChart.barHeight = (barChart.height / 4) - barChart.barMargin;
    barChart.scaleY = d3.scale.linear().domain([0, 3]).range([0, barChart.height - barChart.barHeight - barChart.barMargin]);
  },
  addBasicBars: function() {
    barChart.svgChart.selectAll(".bars")
        .data(barChart.data)
        .enter()
        .append("svg:rect")
        .attr("x", barChart.scaleX(0))
        .attr("y", function(d, i) {
            return barChart.scaleY(i);
        })
        .attr("width", function(d) {
            return barChart.scaleX(d.value) - barChart.margin;
        })
        .attr("height", barChart.barHeight);    
  },
  addBars: function() {
    barChart.svgChart.selectAll(".bars")
        .data(barChart.data)
        .enter()
        .append("svg:rect")
        .attr("class", function(d) {
          return "bars " + d.stat;
        })
        .attr("x", barChart.scaleX(0))
        .attr("y", function(d, i) {
            return barChart.scaleY(i);
        })
        .attr("width", function(d) {
            return barChart.scaleX(d.value) - barChart.margin;
        })
        .attr("height", barChart.barHeight);    
  },
  addXAxis: function() {
    barChart.svgChart.append("svg:line")
        .attr("x1", barChart.scaleX(0))
        .attr("x2", barChart.scaleX(barChart.max))
        .attr("y1", barChart.height + 5)
        .attr("y2", barChart.height + 5)
        .attr("class", "x-axis");    
  },
  addXTicks: function() {
    barChart.svgChart.selectAll("x-tick")
        .data(barChart.scaleX.ticks(5))
        .enter()
        .append("svg:line")
        .attr("class", "tick")
        .attr("x1", function(d) {
            return barChart.scaleX(d)
        })
        .attr("x2", function(d) {
            return barChart.scaleX(d)
        })
        .attr("y1", barChart.height + 5)
        .attr("y2", barChart.height);   
  },
  addXLabels: function() {
    barChart.svgChart.selectAll("x-tick-label")
        .data(barChart.scaleX.ticks(5))
        .enter()
        .append("svg:text")
        .attr("class", "x-label")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d) {
            return barChart.scaleX(d);
        })
        .attr("y", barChart.height + 25)
        .attr("text-anchor", "middle");   
  },
  addBarLabels: function() {
    barChart.svgChart.selectAll("bar-label")
        .data(barChart.data)
        .enter()
        .append("svg:text")
        .text(function(d) {
            return d.stat;
        })
        .attr("class", "bar-label")
        .attr("x", function(d) {
            return barChart.scaleX(35);
        })
        .attr("y", function(d, i) {
            return barChart.scaleY(i) + (barChart.barHeight / 2) + 5;
        });    
  },
  addStatLabels: function() {
    barChart.svgChart.selectAll(".stat-label")
        .data(barChart.data)
        .enter()
        .append("svg:text")
        .text(function(d) {
            return d.value;
        })
        .attr("class", "stat-label")
        .attr("x", function(d) {
            return barChart.scaleX(d.value) - 10;
        })
        .attr("y", function(d, i) {
            return barChart.scaleY(i) + (barChart.barHeight / 2) + 5;
        })
        .attr("text-anchor", "end");   
  },
  transitionBars: function(id, key) {
    d3.selectAll(id)
      .selectAll(".bars")
      .data(barChart.transitionData[key])
      .transition()
      .duration(2000)
      .attr("width", function(d) {
          return barChart.scaleX(d.value) - barChart.margin;
      });
  },
  transition: function(id, key) {
    var g = d3.selectAll(id);
    var data = barChart.transitionData[key];

    g.selectAll(".bars")
      .data(data)
      .transition()
      .duration(2000)
      .attr("width", function(d) {
          return barChart.scaleX(d.value) - barChart.margin;
      });
    g.selectAll(".stat-label")
        .data(data)
        .transition()
        .duration(2000)
        .attr("x", function(d) {
            return barChart.scaleX(d.value) - 10;
        })
        .text(function(d) {
                return d.value;
        });      
  },
  setupSlides: function() {
    // Add Svg Slide
    barChart.createSvgChart("#barChart-addSvg");

    // Scales Slides
    learnScales.createLinearScaleTable("#linear-scale");
    learnScales.createOrdinalScaleTable("#ordinal-scale");

    // Add Basic Bars
    barChart.createSvgChart("#barChart-addBasicBars");
    barChart.createScaleFxs();
    barChart.addBasicBars("#barChart-addBasicBars");

    // Add Bars
    barChart.createSvgChart("#barChart-addBars");
    barChart.createScaleFxs();
    barChart.addBars("#barChart-addBars");   

    // X Axis     
    barChart.createSvgChart("#barChart-xAxis");
    barChart.createScaleFxs();
    barChart.addBars();   
    barChart.addXAxis();

    // X Ticks     
    barChart.createSvgChart("#barChart-xTicks");
    barChart.createScaleFxs();
    barChart.addBars();   
    barChart.addXAxis();
    barChart.addXTicks();    

    // X Labels     
    barChart.createSvgChart("#barChart-xLabels");
    barChart.createScaleFxs();
    barChart.addBars();   
    barChart.addXAxis();
    barChart.addXTicks();
    barChart.addXLabels();   

    // Bar Labels     
    barChart.createSvgChart("#barChart-barLabels");
    barChart.createScaleFxs();
    barChart.addBars();   
    barChart.addXAxis();
    barChart.addXTicks();
    barChart.addXLabels();
    barChart.addBarLabels();   

    // Stat Labels     
    barChart.createSvgChart("#barChart-statLabels");
    barChart.createScaleFxs();
    barChart.addBars();   
    barChart.addXAxis();
    barChart.addXTicks();
    barChart.addXLabels();
    barChart.addBarLabels(); 
    barChart.addStatLabels();         

    // Transitions
    barChart.createSvgChart("#barChart-transitions");
    barChart.createScaleFxs();
    barChart.addBars();   
    barChart.addXAxis();
    barChart.addXTicks();
    barChart.addXLabels();
    barChart.addBarLabels(); 
    barChart.addStatLabels();  

    // Transition Labels
    barChart.createSvgChart("#barChart-label-transitions");
    barChart.createScaleFxs();
    barChart.addBars();   
    barChart.addXAxis();
    barChart.addXTicks();
    barChart.addXLabels();
    barChart.addBarLabels(); 
    barChart.addStatLabels();       
  }
}