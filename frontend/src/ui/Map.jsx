import React, { Component } from 'react'
import * as d3 from 'd3'
import {getImageURL} from '../utils/config' 
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class MapItem {
    constructor(image, w, id, type) {
        this.image = image;
        this.w = w;
        this.id = id;
        this.type = type;
    }
}
class Map extends Component {
    updateSliceImage(image, x, y, name) {
        let index = -1;
        console.log(name);
        for (var z = 0; z < this.map[x][y].length; z++) {
            console.log("Procurando:", this.map[x][y][z])
            if (this.map[x][y][z].id == name) {
                index = z;
                break;
            }
        }
        if (index != -1 && this.svg.select("#comp_" + x + "_" + y + "_" + index).node()) {
            console.log(this.svg.select("#comp_" + x + "_" + y + "_" + index).node());
            this.svg.select("#comp_" + x + "_" + y + "_" + index).node().src = image;
            this.svg.select("#comp_" + x + "_" + y + "_" + index).attr("xlink:href", image);
        }
    }
    constructor(props) {
        super(props)
        this.map = props.map || [];
        this.baseX = this.map.length * 25;
        this.comps = [];
    }
    componentDidMount() {
        this.mode = 0;
        this.rootsvg = d3.select(this.root).append('svg');//.append('g');
        this.mainsvg = this.rootsvg.append('g');//.append('g'); 
        this.grid = this.mainsvg.append('g');//.append('g');
        this.svg = this.mainsvg.append('g');//.append('g');
        this.svg.attr('fill', 'antiquewhite');
        this.svg.attr('width', '100%');
        this.svg.attr('height', '100%');
        this.rootsvg.attr('width', '100%');
        this.rootsvg.attr('height', '100%');
        this.mainsvg.attr('width', '100%');
        this.mainsvg.attr('height', '100%');
        this.grid.attr('width', '100%');
        this.grid.attr('height', '100%');
        this.rootsvg.on('mouseleave', (a) => {
            if (this.component && this.dragingElement) {
                this.dragingElement.remove();
                let idx = this.comps.indexOf(this.dragingElement, 0);
                if (idx >= -1) {
                    this.comps.splice(idx, 1);
                }
                this.dragingElement = null;
            }
        })
        this.mainsvg.on("contextmenu", () => {
            d3.event.preventDefault();
            // let coords = d3.mouse(d3.event.currentTarget);
            // let p = this.twoDToIso(this.get2dFromTileCoordinates(this.getTileCoordinates(this.isoTo2D(new Point(coords[0], coords[1] + 25)), 50), 50));

            // let pmap = this.getTileCoordinates(this.isoTo2D(new Point(coords[0], coords[1] + 25)), 50);
            // let i = pmap.x.toFixed(0)
            // let j = pmap.y.toFixed(0);
            // this.map[i][j].forEach((item, index) => {
            //     this.svg.selectAll("#comp_" + i + "_" + j + "_" + index).remove()
            // });
            // this.map[i][j] = []
            return false
        });


        this.mainsvg.on('mousedown', (a) => {
            if (d3.event.button == 2) {
                this.mode = 'SELECT_AREA';
                this.selectElement = this.createRect('selectArea')
                let coords = d3.mouse(d3.event.currentTarget);
                let p1 = this.getTileCoordinates(this.isoTo2D(new Point(coords[0], coords[1] + 25)), 50);
                this.selectElement.attr('stroke', '#00FF00');
                this.selectElement.p1 = p1;
            }
        })
        this.mainsvg.on('mouseup', (a) => {
            switch (this.mode) {
                case 'SELECT_AREA':
                    // TODO Add slices
                    if (this.component) {
                        let x1 = Math.min(this.selectElement.p1.x, this.selectElement.p2.x);
                        let x2 = Math.max(this.selectElement.p1.x, this.selectElement.p2.x);
                        let y1 = Math.min(this.selectElement.p1.y, this.selectElement.p2.y);
                        let y2 = Math.max(this.selectElement.p1.y, this.selectElement.p2.y);
                        for (let x = x1; x <= x2; x++) {
                            for (let y = y1; y <= y2; y++) {
                                this.props.addItem({ ...this.component }, x, y)
                            }
                        }
                    }
                    this.selectElement.remove()
                    break;
            }
            this.mode = 0;
        })
        this.mainsvg.on('click', (a) => {
            let coords = d3.mouse(d3.event.currentTarget);
            let p = this.getTileCoordinates(this.isoTo2D(new Point(coords[0], coords[1] + 25)), 50);
            if (this.component) {
                // let p = this.twoDToIso(this.get2dFromTileCoordinates(this.getTileCoordinates(this.isoTo2D(new Point(coords[0], coords[1] + 25)), 50), 50));
                // let pInMap = (this.getTileCoordinates(this.isoTo2D(new Point(coords[0], coords[1] + 25)), 50));


                this.props.addItem({ ...this.component }, p.x, p.y)

            } else {
                this.props.itemSelected(p.x, p.y)
            }

        });

        this.mainsvg.on('mousemove', (a) => {
            let coords = d3.mouse(d3.event.currentTarget);
            const p1 = this.getTileCoordinates(this.isoTo2D(new Point(coords[0], coords[1] + 25)), 50);

            let p = this.twoDToIso(this.get2dFromTileCoordinates(p1, 50));

            switch (this.mode) {
                case 'SELECT_AREA':
                    this.selectElement.attr('points', this.getRectPoints(this.selectElement.p1, p1))
                    this.selectElement.p2 = p1;
                    break;

                default:
                    this.svg.selectAll("#point")
                        .attr('transform', 'translate(' + (p.x) + ',' + (p.y) + ')')
                    if (this.component) {
                        this.dragingElement = this.svg.selectAll('#moving');

                        if (!this.dragingElement.node()) {
                            let teste = this.component.image;
                            let image = new Image();
                            image.onload = (event) => {

                                this.dragingElement = this.svg.append('image')
                                    .attr('xlink:href', teste)
                                    .attr('x', p.x * this.component.w)
                                    .attr('y', p.y)
                                    .attr('id', "moving")
                                    .attr('opacity', 0.5)
                                    .attr('width', 100 * this.component.w);
                                this.comps.push(this.dragingElement)

                                this.dragingElement.call(d3.drag().on('drag', (a, b, c) => {

                                    let coordinates = d3.mouse(c[b]);
                                    let p = this.twoDToIso(this.get2dFromTileCoordinates(this.getTileCoordinates(this.isoTo2D(new Point(coordinates[0], coordinates[1] + 25)), 50), 50));
                                    this.svg.selectAll("#point")
                                        .attr('transform', 'translate(' + (p.x) + ',' + (p.y) + ')')
                                    d3.select(c[b])
                                        .attr('x', p.x)
                                        .attr('y', p.y - this.dragingElement.node().getBBox().height)
                                    //  this.sort()

                                }).on('end', (j) => {

                                }));
                            };
                            image.src = teste;

                        } else {
                            this.dragingElement
                                .attr('x', p.x - 50 * this.component.w)
                                .attr('y', p.y - this.dragingElement.node().getBBox().height + 25);
                            // this.sort()
                            if (this.dragingElement.node())
                                this.dragingElement.node().parentNode.appendChild(this.dragingElement.node())
                        }

                    }
                    break;
            }

        });


        let zoom = d3.zoom()
            .filter(() => {
                return d3.event instanceof WheelEvent || d3.event.button == 1
            })
            .scaleExtent([0.1, 10])
            .on('zoom', () => {
                this.mainsvg.attr('transform', d3.event.transform);
            });

        this.rootsvg.call(zoom).call(zoom.transform, d3.zoomIdentity.translate(this.baseX, 0).scale(0.5));
        this.mainsvg.attr("transform", "translate(" + this.baseX + ",0)scale(.5,.5)");
        // Desenhar Grid
        this.createGrid(true);
    }
    componentDidUpdate() {
        this.createGrid();
        if (this.props.selectedItem) {
            this.component = new MapItem(getImageURL(this.props.selectedItem._id, 0), this.props.selectedItem.width, this.props.selectedItem._id, this.props.selectedItem.type);
        } else {
            this.component = null;
        }
    }
    getRectPoints(p1, p2) {
        let _p1 = this.twoDToIso(this.get2dFromTileCoordinates(new Point(p1.x, p1.y), 50))
        let _p2 = this.twoDToIso(this.get2dFromTileCoordinates(new Point(p1.x, p2.y), 50))
        let _p3 = this.twoDToIso(this.get2dFromTileCoordinates(new Point(p2.x, p2.y), 50))
        let _p4 = this.twoDToIso(this.get2dFromTileCoordinates(new Point(p2.x, p1.y), 50))

        let x1 = _p1.x - 50;
        let y1 = _p1.y;
        let x2 = _p2.x;
        let y2 = _p2.y - 25;
        let x3 = _p3.x + 50;
        let y3 = _p3.y;
        let x4 = _p4.x;
        let y4 = _p4.y + 25;
        return x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x3 + ',' + y3 + ' ' + x4 + ',' + y4 + ' ' + x1 + ',' + y1;
    }

    createRect(id) {

        return this.svg
            .append('g')
            .attr('id', id)
            .append('polygon')
            .attr('points', this.getRectPoints(new Point(0, 0), new Point(0, 0)))
            .attr('fill', '#FFFFFF')
            .attr('stroke', '#FF0000')
            .attr('stroke-width', 2)
            .attr('opacity', 0.5)
    }
    createGrid(init) {
        let hw = 100 / 2;
        let hh = 50 / 2;
        let len = this.map.length || 50;
        for (let i = 0; i < len; i++) {
            this.map[i] = this.map[i] || []
            let het = this.map[i].length || 50;
            for (let j = 0; j < het; j++) {
                this.map[i][j] = this.map[i][j] || []
                let p = this.twoDToIso(this.get2dFromTileCoordinates(new Point(i, j), 50));

                if (init) {
                    let _p = new Point(i, j)
                    this.grid.append('polygon')
                        .attr('points', this.getRectPoints(_p, _p))
                        .attr('fill', '#FFFFFF')
                        .attr('stroke', '#CCCCCC')
                        .attr('stroke-width', 2)
                        .attr('opacity', 0.5)
                }
                if (this.map[i][j]) {

                    for (let t = 0; t < this.map[i][j].length; t++) {
                        let teste = this.map[i][j][t].image;

                        if (this.svg.select("#comp_" + i + "_" + j + "_" + t).node())
                            continue; // Ignorando pois já esta no svg
                        let image = new Image();
                        let temp = this.dragingElement = this.svg.append('image')
                            .attr('xlink:href', teste)
                            .attr('x', p.x - 50 * this.map[i][j][t].w)
                            .attr('y', p.y - 25)
                            .attr('id', "comp_" + i + "_" + j + "_" + t)
                            .attr('width', 100 * this.map[i][j][t].w);
                        image.onload = (event) => {
                            temp.attr('y', p.y - (100.0 / image.width * image.height) + 25);
                            this.comps.push(temp);
                            this.sort()
                            temp.call(d3.drag().on('drag', (a, b, c) => {

                                let coordinates = d3.mouse(c[b]);
                                let p = this.twoDToIso(this.get2dFromTileCoordinates(this.getTileCoordinates(this.isoTo2D(new Point(coordinates[0], coordinates[1] + 25)), 50), 50));
                                d3.select(c[b])
                                    .attr('x', p.x - 50)
                                    .attr('y', p.y - c[b].getBBox().height + 25)
                                this.sort()


                            }).on('end', (j) => {

                            }));
                        };
                        image.src = teste;
                    }
                }
            }
        }

        if (init) {
            this.svg
                .append('g')
                .attr('id', 'point')
                .append('polygon')
                .attr('points', this.getRectPoints(new Point(0, 0), new Point(0, 0)))
                .attr('fill', '#FFFFFF')
                .attr('stroke', '#FF0000')
                .attr('stroke-width', 2)
                .attr('opacity', 0.5)
            this.svg
                .append('g')
                .attr('id', '_select')
                .append('polygon')
                .attr('points', this.getRectPoints(new Point(0, 0), new Point(0, 0)))
                .attr('fill', '#CCCCCC')
                .attr('stroke', '#2222CC')
                .attr('stroke-width', 2)
                .attr('opacity', 0.5)
        } else {
            // TODO Posicionar baseado no valor de currentSelected
            if (this.props.currentSelected) {
                let p = this.twoDToIso(this.get2dFromTileCoordinates(this.props.currentSelected, 50));
                this.svg.selectAll("#_select").attr('transform', 'translate(' + (p.x) + ',' + (p.y) + ')')
            }

        }
    }

    sort() {
        let len = this.map.length || 50;
        for (let i = 0; i < len; i++) {
            this.map[i] = this.map[i] || []
            let het = this.map[i].length || 50;
            for (let j = 0; j < het; j++) {
                for (let t = 0; t < this.map[i][j].length; t++) {
                    let a = this.svg.select('#' + "comp_" + i + "_" + j + "_" + t)
                    if (a.node())
                        a.node().parentNode.appendChild(a.node())
                }
            }
        }
        // this.map.forEach((m1) => {
        //     m1.forEach((m2) => {
        //         m2.forEach((item) => {
        //             let a = this.svg.select('#' + item.id)
        //             if (a.node())
        //                 a.node().parentNode.appendChild(a.node())
        //         })
        //     })
        // })
    }


    download() {

        saveSvgAsPng(this.rootsvg.node(), "diagram.png")
        // this.createGrid();
        // this.rootsvg.selectAll('polygon').attr('opacity', 0.5);
    }
    isoTo2D(pt) {
        //gx=(2*isoy+isox)/2;
        //gy=(2*isoy-isox)/2
        let tempPt = new Point(0, 0);
        tempPt.x = (2 * pt.y + pt.x) / 2;
        tempPt.y = (2 * pt.y - pt.x) / 2;
        return (tempPt);
    }

    /**
     * convert a 2d point to isometric
     * */
    twoDToIso(pt) {
        //gx=(isox-isoxy;
        //gy=(isoy+isox)/2
        let tempPt = new Point(0, 0);
        tempPt.x = pt.x - pt.y;
        tempPt.y = (pt.x + pt.y) / 2;
        return (tempPt);
    }

    getTileCoordinates(pt, tileHeight) {
        let tempPt = new Point(0, 0);
        tempPt.x = Math.floor(pt.x / tileHeight);
        tempPt.y = Math.floor(pt.y / tileHeight);

        return (tempPt);
    }

    /**
     * convert specific tile row/column to 2d point
     * */
    get2dFromTileCoordinates(pt, tileHeight) {
        let tempPt = new Point(0, 0);
        tempPt.x = pt.x * tileHeight;
        tempPt.y = pt.y * tileHeight;

        return (tempPt);
    }




    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;
        return (<div>
            <div style={{ width: 800, height: 500 }} ref={el => this.root = el}></div>
        </div>)

    }
    componentWillReceiveProps(nextProps) {

        if (!this.props.isOver && nextProps.isOver) {
            // You can use this as enter handler
        }

        if (this.props.isOver && !nextProps.isOver) {
            // You can use this as leave handler
        }

        if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
            // You can be more specific and track enter/leave
            // shallowly, not including nested targets
        }
    }
}

// const mapStateToProps = state => ({
//     selectedItem: state.map.selectedItem,
//     // map: state.map.map,
//     currentSelected: state.map.currentSelected
// })
// const mapDispatchToProps = ({
//     addItem: addItem,
//     itemSelected: itemPointSelected
// })
// export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Map)
export default Map