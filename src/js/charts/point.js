charts.point = function(args) {
    'use strict';
    this.args = args;

    this.init = function(args) {
        raw_data_transformation(args);
        process_point(args);
        init(args);
        x_axis(args);
        y_axis(args);
        this.$svg = document.querySelector(args.target + ' svg')
        this.svg = d3.select(this.$svg)
        return this;
    };

    this.markers = function() {
        markers(args);
        if (args.least_squares) {
            add_ls(args);
        }

        return this;
    };

    this.mainPlot = function() {
<<<<<<< HEAD:src/js/charts/point.js
        var svg = mg_get_svg_child_of(args.target);
        var $svg = $($(args.target).find('svg').get(0));
        var g;

        //remove the old points, add new one
        $svg.find('.mg-points').remove();

        // plot the points, pretty straight-forward
        g = svg.append('g')
            .classed('mg-points', true);
=======
        var g;

        //remove the old points, add new one
        var oldPoints = this.$svg.querySelector('.points');

        if(oldPoints)
          oldPoints.parentNode.removeChild(oldPoints);
        
        // plot the points, pretty straight-forward
        g = this.svg.append('g')
            .classed('points', true);
>>>>>>> fix(charts): Removed jquery occurences in charts:src/charts/point.js

        var pts = g.selectAll('circle')
            .data(args.data[0])
            .enter().append('svg:circle')
                .attr('class', function(d, i) { return 'path-' + i; })
                .attr('cx', args.scalefns.xf)
                .attr('cy', args.scalefns.yf);

        //are we coloring our points, or just using the default color?
        if (args.color_accessor !== null) {
            pts.attr('fill',   args.scalefns.color);
            pts.attr('stroke', args.scalefns.color);
        } else {
            pts.classed('mg-points-mono', true);
        }

        if (args.size_accessor !== null) {
            pts.attr('r', args.scalefns.size);
        } else {
            pts.attr('r', args.point_size);
        }

        return this;
    };

    this.rollover = function() {
<<<<<<< HEAD:src/js/charts/point.js
        var svg = mg_get_svg_child_of(args.target);
        var $svg = $($(args.target).find('svg').get(0));

        //remove the old rollovers if they already exist
        $svg.find('.mg-voronoi').remove();

        //remove the old rollover text and circle if they already exist
        $svg.find('.mg-active-datapoint').remove();

        //add rollover text
        svg.append('text')
            .attr('class', 'mg-active-datapoint')
=======

        [
          //remove the old rollovers if they already exist
          this.$svg.querySelector('.voronoi'),
          //remove the old rollover text and circle if they already exist
          this.$svg.querySelector('.active_datapoint')
        ].forEach(function(e, i) {
        
          if(!e)
            return;

          e.parentNode.removeChild(e);
        })

        //add rollover text
        this.svg.append('text')
            .attr('class', 'active_datapoint')
>>>>>>> fix(charts): Removed jquery occurences in charts:src/charts/point.js
            .attr('xml:space', 'preserve')
            .attr('x', args.width - args.right)
            .attr('y', args.top / 2)
            .attr('text-anchor', 'end');

        //add rollover paths
        var voronoi = d3.geom.voronoi()
            .x(args.scalefns.xf)
            .y(args.scalefns.yf)
            .clipExtent([[args.buffer, args.buffer], [args.width - args.buffer, args.height - args.buffer]]);

<<<<<<< HEAD:src/js/charts/point.js
        var paths = svg.append('g')
            .attr('class', 'mg-voronoi');
=======
        var paths = this.svg.append('g')
            .attr('class', 'voronoi');
>>>>>>> fix(charts): Removed jquery occurences in charts:src/charts/point.js

        paths.selectAll('path')
            .data(voronoi(args.data[0]))
            .enter().append('path')
                .attr('d', function(d) {
                    if (d === undefined) {
                        return;
                    }

                    return 'M' + d.join(',') + 'Z';
                })
                .attr('class', function(d,i) {
                    return 'path-' + i;
                })
                .style('fill-opacity', 0)
                .on('mouseover', this.rolloverOn(args))
                .on('mouseout', this.rolloverOff(args))
                .on('mousemove', this.rolloverMove(args));

        return this;
    };

    this.rolloverOn = function(args) {
<<<<<<< HEAD:src/js/charts/point.js
        var svg = mg_get_svg_child_of(args.target);
=======
        var svg = this.svg;
>>>>>>> fix(charts): Removed jquery occurences in charts:src/charts/point.js

        return function(d, i) {
            svg.selectAll('.mg-points circle')
                .classed('selected', false);

            //highlight active point
            var pts = svg.selectAll('.mg-points circle.path-' + i)
                .classed('selected', true);

            if (args.size_accessor) {
                pts.attr('r', function(di) {
                    return args.scalefns.size(di) + 1;
                });
            } else {
                pts.attr('r', args.point_size);
            }

            //trigger mouseover on all points for this class name in .linked charts
            if (args.linked && !globals.link) {
                globals.link = true;

                //trigger mouseover on matching point in .linked charts
                d3.selectAll('.mg-voronoi .path-' + i)
                    .each(function() {
                        d3.select(this).on('mouseover')(d,i);
                    });
            }

            var fmt = d3.time.format('%b %e, %Y');
            var num = rolloverNumberFormatter(args);

            //update rollover text
            if (args.show_rollover_text) {
                svg.select('.mg-active-datapoint')
                    .text(function() {
                        if (args.time_series) {
                            var dd = new Date(+d.point[args.x_accessor]);
                            dd.setDate(dd.getDate());

                            return fmt(dd) + '  ' + args.yax_units + num(d.point[args.y_accessor]);
                        } else {
                            return args.x_accessor + ': ' + num(d.point[args.x_accessor])
                                + ', ' + args.y_accessor + ': ' + args.yax_units
                                + num(d.point[args.y_accessor]);
                        }
                    });
            }

            if (args.mouseover) {
                args.mouseover(d, i);
            }
        };
    };

    this.rolloverOff = function(args) {
<<<<<<< HEAD:src/js/charts/point.js
        var svg = mg_get_svg_child_of(args.target);
=======
        var svg = this.svg;
>>>>>>> fix(charts): Removed jquery occurences in charts:src/charts/point.js

        return function(d,i) {
            if (args.linked && globals.link) {
                globals.link = false;

                d3.selectAll('.mg-voronoi .path-' + i)
                    .each(function() {
                        d3.select(this).on('mouseout')(d,i);
                    });
            }

            //reset active point
            var pts = svg.selectAll('.mg-points circle')
                .classed('unselected', false)
                .classed('selected', false);

            if (args.size_accessor) {
                pts.attr('r', args.scalefns.size);
            } else {
                pts.attr('r', args.point_size);
            }

            //reset active data point text
            svg.select('.mg-active-datapoint')
                .text('');

            if (args.mouseout) {
                args.mouseout(d, i);
            }
        };
    };

    this.rolloverMove = function(args) {
        return function(d, i) {
            if (args.mousemove) {
                args.mousemove(d, i);
            }
        };
    };

    this.update = function(args) {
        return this;
    };

    this.windowListeners = function() {
        mg_window_listeners(this.args);
        return this;
    };

    this.init(args);

    return this;
};
