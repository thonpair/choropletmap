import './style.css'

fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
.then(response => response.json())
.then(dataEducation => {
  fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
  .then(response => response.json())
  .then(dataCounty => {

    const colors = [
      "#3393ff", //blue
      "#ffffff", //white
      "#d2ff4f", //yellow
      "#ffaa4f", //orange
      "#ff4a4a" //red
  ]


    d3.select('#app')
    .append('h1')
    .text("United States Educational Attainment")
    .attr('id', 'title')

d3.select('#app')
    .append('h2')
    .text(" Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014) ")
    .attr('id', 'description')



    let tooltip = d3
            .select('#app')
            .append('div')
            .attr('id', 'tooltip')
            .style('opacity', 0);

            var path = d3.geoPath();

            const width = 700;
            const height = 500;
            const marginWidth = 100;
            const marginHeight = 50;
    
            let svgContainer = d3
                .select('#app')
                .append('svg')
                .attr('width', width + marginWidth)
                .attr('height', height + marginHeight)
                .attr('class', "svgContainer");
           
svgContainer
                .append('g')
                .attr('class', 'counties')
                .selectAll('path')
                .data(dataEducation)
                .enter()
                .append('path')
                .attr('class', 'county')
                .attr('data-fips', d => d.fips )
                .attr('data-education', d => d.bachelorsOrHigher)
                .attr('fill', d=> d.bachelorsOrHigher < 10
                ? colors[0]
                : d.bachelorsOrHigher < 15
                    ? colors[1]
                    : d.bachelorsOrHigher < 20
                        ? colors[2]
                        : d.bachelorsOrHigher < 25
                            ? colors[3]
                            : colors[4]

    )
    .on('mouseover', (d, i) => {
      tooltip
          .html("education : " + i.bachelorsOrHigher + "<br/>"
          )
          .attr('all', JSON.stringify(i))
          .attr('data-education', i.bachelorsOrHigher)
          .style('left', d.clientX + 'px')
          .style('top', height - 100 + 'px')
          .style('transform', 'translate('+d.clientX+'px, '+d.clientY+'px)')
          .style('opacity', 0.9);
  })
  .on('mouseout', function () {
    tooltip.style('opacity', 0);
});

           /*     .attr('data-education', function (d) {
                  var result = education.filter(function (obj) {
                    return obj.fips === d.id;
                  });
                  if (result[0]) {
                    return result[0].bachelorsOrHigher;
                  }})*/
                  const legend = d3.select("#app")
                  .append('div')
                  .attr('id', 'legend')
                  .text('Legend : ')
      
                  const svglegend = legend
                  .append('svg')
                  .attr("height", 25)
                  .attr("width", 300)
      
      

                  svglegend
                  .selectAll('rect')
                  .data(colors)
                  .enter()
                  .append("rect")
                  .attr("x", (d,i) => i*25)
                  .attr("y", 0)
                  .attr("width", 25)
                  .attr("height", 25)
                  .attr("fill", d =>d)


  })
})

