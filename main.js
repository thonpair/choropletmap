fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
.then(response => response.json())
.then(dataEducation => {
  fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
  .then(response => response.json())
  .then(dataCounty => {
    d3.select('#app')
    .append('h1')
    .text("United States Educational Attainment")
    .attr('id', 'title')

d3.select('#app')
    .append('h2')
    .text(" Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014) ")
    .attr('id', 'description')

    d3.queue()

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
console.log(dataCounty)
console.log(dataEducation)
           
svgContainer
                .append('g')
                .attr('class', 'counties')
                .selectAll('path')
                .data(dataCounty.objects.counties)
                .enter()
                .append('path')
                .attr('class', 'county')
                .attr('data-fips', d => d.id )
           /*     .attr('data-education', function (d) {
                  var result = education.filter(function (obj) {
                    return obj.fips === d.id;
                  });
                  if (result[0]) {
                    return result[0].bachelorsOrHigher;
                  }})*/




  })
})

