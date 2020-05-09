import React, { Component } from 'react'
import { getCars, addCars, editCar, deleteCar } from './actions/car';
import { connect, } from 'react-redux';
import axios from 'axios';
import store from './store'

import { AgGridReact, AgGridColumn } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import _ from 'lodash';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';







class Home extends Component {

    state = {
        defaultColDef: {
            enableCellChangeFlash: true, cellClass: 'align-right',
        },
        columnDefs: [
            {
                headerName: 'Make', field: 'make', editable: true, checkboxSelection: true,
                // sort: 'asc'

                // headerName: 'Make', field: 'make', editable: true, checkboxSelection: true, cellEditor: 'agSelectCellEditor',
                // cellEditorParams: {
                //     values: Object.keys()
                // },
                // valueFormatter: function (params) {
                //     return lookupValue(carMappings, params.value);
                // },
                // valueParser: function (params) {
                //     return lookupKey(carMappings, params.newValue);
                // }
            },
            {
                headerName: 'Model', field: 'model', editable: true,
                valueSetter: (params) => {

                    params.data.model = params.newValue;

                    this.gridApi.flashCells({
                        rowNodes: [params.node],
                        columns: [params.column.colId]
                    });

                }
            },
            {
                headerName: 'Year', field: 'year', editable: true,

                valueSetter: (params) => {

                    params.data.year = params.newValue;

                    this.gridApi.flashCells({
                        rowNodes: [params.node],
                        columns: [params.column.colId]
                    });

                }
            },
            {
                headerName: 'Mileage', field: 'mileage', editable: true,
                valueSetter: (params) => {

                    params.data.mileage = params.newValue;

                    this.gridApi.flashCells({
                        rowNodes: [params.node],
                        columns: [params.column.colId]
                    });

                }
            }
        ],
        isSaveButtonDisabled: true,
        isDeleteButtonDisabled: true,
        modifiedRowsCount: 0,
        rowDataCopy: null,
        rowData: null,
        gridApi: {},
        columnApi: null,
        dropDown: null,
        getRowNodeId: function (data) {
            console.log('data.trade: ', data)
            return data.trade;
        }
    }

    async componentDidMount() {
        Promise.resolve(this.props.getCars()).then(() => {



            // const makes = this.props.cars.reduce((obj, item) => Object.assign(obj, { [item.id]: item.make }), {})

            // this.gridApi.setColumnDefs([
            //     {
            //         headerName: 'Make', field: 'make', editable: true, checkboxSelection: true,
            //         cellEditor: 'agSelectCellEditor',

            //         cellEditorParams: {

            //             //keys
            //             values: Object.keys(makes)
            //         },

            //         valueGetter: function (params) {
            //             console.log('value getter: ', params.node)
            //             return params.node.data.make
            //         },

            //         valueSetter: function (params) {
            //             console.log('value setter:')
            //             params.data.make = params.newValue;
            //             return true;
            //         },

            //         // displaying values
            //         valueFormatter: function (params) {
            //             return makes[params.value];
            //             return ('$' + params.value)
            //         },

            //         // converting back to keys before saving.
            //         valueParser: function (params) {
            //             return lookupKey(makes, params.newValue);
            //         }
            //     },
            //     this.state.columnDefs[1],
            //     // { headerName: 'Model', field: 'model', editable: true },

            //     this.state.columnDefs[2],
            //     // { headerName: 'Year', field: 'year', editable: true },

            //     this.state.columnDefs[3]
            //     // { headerName: 'Mileage', field: 'mileage', editable: true }
            // ])

            this.setState((state) => ({

                // columnDefs: [
                //     {
                //         headerName: 'Make', field: 'make', editable: true, checkboxSelection: true,
                //         cellEditor: 'agSelectCellEditor',

                //         cellEditorParams: {

                //             //keys
                //             values: Object.keys(makes)
                //         },

                //         valueGetter: function (params) {
                //             console.log('value getter: ', params.node)
                //             return params.node.data.make
                //         },

                //         valueSetter: function (params) {
                //             console.log('value setter:')
                //             params.data.make = params.newValue;
                //             return true;
                //         },

                //         displaying values
                //         valueFormatter: function (params) {
                //             return makes[params.value];
                //             return ('$' + params.value)
                //         },

                //         converting back to keys before saving.
                //         valueParser: function (params) {
                //             return lookupKey(makes, params.newValue);
                //         }
                //     },
                //     state.columnDefs[1],
                //     { headerName: 'Model', field: 'model', editable: true },

                //     state.columnDefs[2],
                //     { headerName: 'Year', field: 'year', editable: true },

                //     state.columnDefs[3]
                //     { headerName: 'Mileage', field: 'mileage', editable: true }
                // ],
                // rowData: this.props.cars.concat()
                rowDataCopy: JSON.parse(JSON.stringify(this.props.cars))
            }))


        })
        console.log('componentDidmount')
        // this.setState({ rowData: this.props.cars })


    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.gridApi !== prevState.gridApi) {
            console.log('gridApi not undefined: ', this.state.gridApi)
            // this.state.gridApi.setRowData(this.props.cars)

        }

        // if (this.state.columnDefs !== prevState.columnDefs) {
        //     // console.log('column def has changed')

        // }

        if (this.state.columnApi !== prevState.columnApi) {
            var columnState = this.state.columnApi.getColumnState();
            console.log('column def has changed', columnState)



        }


        if (this.props.cars !== prevProps.cars) {
            console.log('car props CHANGING...')
            this.setState({
                rowDataCopy: JSON.parse(JSON.stringify(this.props.cars))

            })


        }






        // if (!_.isEqual(this.props.cars, prevProps.cars)) {
        //     console.log('column def is being updated')

        //     const makes = this.props.cars.reduce((obj, item) => Object.assign(obj, { [item.id]: item.make }), {})

        //     this.setState((state) => ({
        //         columnDefs: [
        //             {
        //                 headerName: 'Make', field: 'make', editable: true, checkboxSelection: true
        //                 , cellEditor: 'agSelectCellEditor',
        //                 cellEditorParams: {
        //                     values: Object.keys(makes)
        //                 },
        //                 valueFormatter: function (params) {
        //                     return makes[params.value];
        //                 },
        //                 valueParser: function (params) {
        //                     return lookupKey(makes, params.newValue);
        //                 }
        //             },
        //             state.columnDefs[1],
        //             // { headerName: 'Model', field: 'model', editable: true },

        //             state.columnDefs[2],
        //             // { headerName: 'Year', field: 'year', editable: true },

        //             state.columnDefs[3]
        //             // { headerName: 'Mileage', field: 'mileage', editable: true }
        //         ]
        //     }), () => {
        //         // if (this.state.columnApi !== null) {
        //         //     this.state.columnApi.resetColumnState();
        //         // }

        //     })
        // }





    }

    componentWillUnmount() {
        console.log('unmounting...')
    }

    changeColumns = () => {
        this.setState({
            columnDefs: [
                { headerName: 'Make11', field: 'make', editable: true, checkboxSelection: true },
                { headerName: 'Model', field: 'model', editable: true },
                { headerName: 'Year', field: 'year', editable: true },
                { headerName: 'Mileage', field: 'mileage', editable: true }
            ]
        })

    }

    onNewRowClick = () => {
        const newCar = {
            "make": '',
            "model": '',
            "year": '',
            "mileage": ''
        }
        console.log('displayedRowCount: ', this.state.gridApi.getDisplayedRowCount())

        this.state.gridApi.updateRowData(
            { add: [newCar], addIndex: this.state.gridApi.getDisplayedRowCount() }

        )
        this.state.gridApi.startEditingCell(
            {
                rowIndex: 0,
                colKey: 'make_1'
            })
        // this.state.gridApi.setFocusedCell(0, "model")
        this.setState({ isSaveButtonDisabled: false })

        console.log('displayed rows count: ', this.gridApi.getDisplayedRowCount())


    }


    onGetSelectedRows = e => {
        const selectedNodes = this.state.gridApi.getSelectedNodes()
        console.log('selected nodes', selectedNodes)
        console.log(this.columnApi.getColumnState())
        this.columnApi.resetColumnState()
        var allData = [];
        this.gridApi.forEachNode((node) =>
            allData.push(node)
        )
        console.log('all Data: ', allData)

        console.log('column state: ', this.columnApi.getColumnState())
    }

    editCars = () => {
        const newCar = {
            "make": "WFord",
            "model": "Caravan4",
            "year": 2000,
            "mileage": 2000
        }

        this.props.editCar(1, newCar)
    }

    saveData = () => {
        this.setState({ isSaveButtonDisabled: true })
        let dbData = this.props.cars
        let tableData = []
        console.log('1')
        //populating the array with data
        this.gridApi.forEachNode(node =>
            tableData.push(node.data)

        )
        console.log('tableDataLength: ', tableData.length)
        console.log('dbDataLength: ', this.state.rowDataCopy.length)
        var i = 0;
        for (i; i < this.state.rowDataCopy.length; i = i + 1) {
            console.log('current i: ', i)
            let dbDataObject = this.state.rowDataCopy[i];
            let tableDataObject = tableData[i];
            console.log('DbDataObject: ', dbDataObject, '\n',
                'tableDataObject: ', tableDataObject,
            )
            if (!_.isEqual(dbDataObject, tableDataObject)) {
                this.props.editCar(tableDataObject.id, tableDataObject);

                console.log('they are different.')
            }
        }

        if (tableData.length > this.state.rowDataCopy.length) {
            let numberOfnewRows = tableData.length - this.state.rowDataCopy.length
            console.log('number of new Rows: ', numberOfnewRows)
            console.log('this.props.cars: ', this.props.cars)
            var i = 0;
            for (i; i < numberOfnewRows; i = i + 1) {
                console.log('row: ', tableData[(tableData.length - numberOfnewRows + i)])
                console.log('key: ', (tableData.length - numberOfnewRows + i))
                this.props.addCars(tableData[(tableData.length - numberOfnewRows + i)])

            }
        }

        this.gridApi.deselectAll()
    }

    deleteRow = () => {

        this.state.gridApi.getSelectedNodes().map(node =>
            this.props.deleteCar(node.data.id)
        )
        this.setState({ isDeleteButtonDisabled: true })
    }

    onSelectionChanged = () => {
        this.state.gridApi.getSelectedNodes()
    }

    displayprops = () => {
        console.log('props: ', this.props.cars)
    }

    addCar = () => {
        const newCar = {
            "make": "newCar",
            "model": "BMW",
            "year": 2020,
            "mileage": 2000
        }
        Promise.resolve(this.props.addCars(newCar)).then(() =>
            this.setState({ rowData: this.props.cars }))
    }

    onGridReady = async (params) => {
        this.setState({
            gridApi: params.api,
            columnApi: params.columnApi
        })

        this.gridApi = params.api;
        this.columnApi = params.columnApi;


        console.log('onGrid is ready', this.gridApi, '\n', this.props.cars)
        if (this.props.cars === undefined) {
            await store.dispatch(getCars());

        }
        console.log('reaqdyyy: ', this.props.cars)

        const modelColumn = { ...this.state.columnDefs[1] }
        // const yearColumn = JSON.parse(JSON.stringify(this.state.columnDefs[2]))
        const yearColumn = { ...this.state.columnDefs[2] }

        const mileageColumn = { ...this.state.columnDefs[3] }
        const makes = this.props.cars.reduce((obj, item) => Object.assign(obj, { [item.id]: item.make }), {})



        // this.gridApi.setColumnDefs(
        this.setState({
            columnDefs: [
                {
                    headerName: 'Make', field: 'make', editable: true, checkboxSelection: true,
                    sort: 'asc',
                    // cellEditor: 'agSelectCellEditor',

                    // cellEditorParams: {

                    //     //keys
                    //     values: Object.keys(makes)
                    // },

                    valueGetter: function (params) {
                        console.log('value getter: ', params.node)
                        return params.node.data.make
                    },

                    valueSetter: (params) => {
                        console.log('params: ', params)
                        console.log('params.coldef.field: ', params.colDef.field)

                        this.gridApi.flashCells({
                            rowNodes: [params.node],
                            columns: ['make_1'],
                        });

                        params.data.make = params.newValue;
                        const tableData = []
                        let count = 0;
                        this.gridApi.forEachNode(node =>
                            tableData.push(node.data)

                        )
                        console.log('value setter:')

                        if (tableData.length === this.state.rowDataCopy.length) {
                            console.log('equal: true')
                            this.gridApi.forEachNode(node => {
                                console.log('node.rowIndex: ', node.rowIndex)

                                console.log('tableData: ', node.data.make, '\n', 'dbData :', this.state.rowDataCopy[node.rowIndex].make)

                                this.state.rowDataCopy.map(dbRow => {
                                    if (dbRow.id === node.data.id) {
                                        if (node.data.make !== dbRow.make) {
                                            count += 1

                                        }

                                        if (count > 0) {
                                            this.setState({ isSaveButtonDisabled: false })
                                        }

                                        else {
                                            this.setState({ isSaveButtonDisabled: true })
                                        }

                                    }


                                })

                            })
                        }


                        else {
                            this.setState({ isSaveButtonDisabled: false })
                        }


                        // var x = 0;
                        // for (x; x < this.state.rowDataCopy.length; x = x + 1) {
                        //     console.log('tableData: ', tableData[x].make, '\n', 'rowData :', this.state.rowDataCopy[x].make)
                        //     if (this.state.rowDataCopy[x].make !== tableData[x].make) {

                        //         count += 1
                        //     }

                        //     else {

                        //         // this.setState({ isSaveButtonDisabled: true })
                        //     }

                        //     if (count > 0) {
                        //         this.setState({ isSaveButtonDisabled: false })
                        //     }

                        //     else {
                        //         this.setState({ isSaveButtonDisabled: true })
                        //     }


                        // }



                        if (params.newValue !== params.oldvalue) {
                            return true;

                        }
                    },

                    // displaying values
                    // valueFormatter: function (params) {
                    //     return makes[params.value];
                    //     // return ('$' + params.value)
                    // },

                    // converting back to keys before saving.
                    // valueParser: function (params) {
                    //     return lookupKey(makes, params.newValue);
                    // }
                },
                modelColumn, yearColumn, mileageColumn
                // this.state.columnDefs[1], this.state.columnDefs[2], this.state.columnDefs[3]



                //     // { headerName: 'Model', field: 'model', editable: true },

                //     // { headerName: 'Year', field: 'year', editable: true },

                // { headerName: 'Model', field: 'model', editable: true },
                // { headerName: 'Year', field: 'year', editable: true },
                // { headerName: 'Mileage', field: 'mileage', editable: true }
            ]
        })

        this.setState((state) => ({ defaultColDef: state.defaultColDef }))



        // })
        // this.gridApi.setColumnDefs(
        //     [
        //         {
        //             headerName: 'Make', field: 'make', editable: true, checkboxSelection: true
        //             // , cellEditor: 'agSelectCellEditor',
        //             // cellEditorParams: {
        //             //     values: Object.keys()
        //             // },
        //             // valueFormatter: function (params) {
        //             //     return lookupValue(carMappings, params.value);
        //             // },
        //             // valueParser: function (params) {
        //             //     return lookupKey(carMappings, params.newValue);
        //             // }
        //         },
        //         { headerName: 'Model', field: 'model', editable: true },
        //         { headerName: 'Year', field: 'year', editable: true },
        //         { headerName: 'Mileage', field: 'mileage', editable: true }
        //     ]
        // )



    }

    displayCopy = () => {
        var array = []

        this.state.gridApi.forEachNode(node =>
            array.push(node)

        )
        console.log('Db data: ', this.state.rowDataCopy)
        console.log('table Data: ', array)
        console.log('displayed rows count: ', this.gridApi.getDisplayedRowCount())

        var rowNode = this.gridApi.getDisplayedRowAtIndex(0);
        this.gridApi.flashCells({
            rowNodes: [rowNode],
        });

    }





    rowSelected = () => {

        if (this.gridApi.getSelectedNodes().length > 0) {
            this.setState({ isDeleteButtonDisabled: false })

        }

        else {
            this.setState({ isDeleteButtonDisabled: true })
        }





        // //unselected
        // if (this.gridApi.getSelectedNodes() < 1) {
        //     console.log('row has been unselelected')
        // }

        // //selected
        // else {
        //     console.log('selected')
        // }

    }


    render() {
        console.log('render.. ', this.props.cars)


        return (
            <React.Fragment>
                <IconButton onClick={this.onNewRowClick}>
                    <AddIcon color="secondary" style={{ fontSize: 35 }} />
                </IconButton>

                <IconButton onClick={this.saveData} disabled={this.state.isSaveButtonDisabled} color="secondary" style={{ fontSize: 35 }}>
                    <SaveIcon />
                </IconButton>

                <IconButton onClick={this.deleteRow} disabled={this.state.isDeleteButtonDisabled} color="secondary" style={{ fontSize: 35 }} >
                    <DeleteSharpIcon />
                </IconButton>

                <button onClick={this.addCar}>Add new car</button>
                <button onClick={this.editCars}>Edit car with id 1</button>
                <button onClick={this.changeColumns}>Edit column defs</button>
                <button onClick={this.onGetSelectedRows}>Get selected rows</button>
                <button onClick={this.onNewRowClick}>add new row</button>
                <button onClick={this.displayprops}>display props</button>
                <button onClick={this.displayCopy}> display</button>

                <div className="ag-theme-balham" style={{ height: '100%', width: '810px' }}>

                    <AgGridReact
                        // reactNext
                        // deltaRowDataMode
                        // getRowNodeId={data => data.transaction_id}




                        onGridReady={this.onGridReady}
                        // onRowSelected={this.rowSelected}
                        onSelectionChanged={this.rowSelected}
                        enableSorting={true}
                        columnDefs={this.state.columnDefs}
                        rowData={this.props.cars}
                        singleClickEdit={true}   // allows a single click to enable cell/row editing
                        rowSelection="multiple"
                        domLayout='autoHeight'
                        defaultColDef={this.state.defaultColDef}



                    // deltaRowDataMode={true}
                    // getRowNodeId={this.state.getRowNodeId}



                    >
                        {/* <AgGridColumn headerName='Make' field='make' editable={true} checkboxSelection={true}></AgGridColumn>
                        <AgGridColumn headerName='Model' field='model' editable={true} ></AgGridColumn>
                        <AgGridColumn headerName='Year' field='year' editable={true} ></AgGridColumn>
                        <AgGridColumn headerName='Mileage' field='mileage' editable={true} ></AgGridColumn> */}





                    </AgGridReact>
                </div>
            </React.Fragment>
        )
    }
}



const mapStateToProps = (state) => ({
    cars: state.carReducer.cars

});

export default connect(mapStateToProps,
    { getCars, addCars, editCar, deleteCar }, null, { forwardRef: true })(Home)



function extractValues(mappings) {
    return Object.keys(mappings);
}
function lookupValue(mappings, key) {
    return mappings[key];
}
function lookupKey(mappings, name) {
    for (var key in mappings) {
        if (mappings.hasOwnProperty(key)) {
            if (name === mappings[key]) {
                return key;
            }
        }
    }
}


        // let result = Promise.resolve(store.dispatch(addCars(newCar)))
        //     .then(() => { console.log(this.props.cars) })


    // axios.get('http://localhost:8000/api/cars/')
    //   .then((response => {
    //     console.log('response: ', response.data)

    //   }))

    // let response = await fetch('http://localhost:8000/api/cars/');
    // let data = await response.json()
    // console.log('data :', data)


    // state = {
    //     cars: ['cars']
    // }

    // componentDidMount() {
    //     this.props.getCars()
    // }

    // editCars = () => {
    //     const newCar = {
    //         "make": "111",
    //         "model": "Caravan",
    //         "year": 2000,
    //         "mileage": 2000
    //     }

    //     this.props.editCar(80, newCar)


    // }

    // deleteCar = () => {
    //     this.props.deleteCar(2)

    // }

    // dispatchCars = () => {

    //     const newCar = {
    //         "make": "Dodge",
    //         "model": "Caravan",
    //         "year": 2003,
    //         "mileage": 250000


    //     }

    //     this.props.addCars(newCar)
    //     console.log(this.props.cars)

    // }


    // dispatchCars1 = () => {

    //     const newCar = {
    //         "make": "Dodge",
    //         "model": "Caravan",
    //         "year": 2003,
    //         "mileage": 250000

    //     }



    //     store.dispatch(addCars(newCar))



    // }



    // return (
    //     <div>
    //         <p>{this.state.cars}</p>
    //         <p>working</p>
    //         <button onClick={this.dispatchCars}>this.props.addCars(newCar)</button>
    //         <br />
    //         <button onClick={this.dispatchCars1}>store.dispatch(newCar)</button>
    //         <br />
    //         <button onClick={this.editCars}>Edit car with id 2</button>
    //         <br />
    //         <button onClick={this.deleteCar}>Delete car with id2</button>


    //         {
    //             this.props.cars.map(car => {
    //                 return <h1>{car.make}</h1>
    //             })
    //         }

    //     </div >
    // )

      // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.gridApi !== prevState.gridApi) {
    //         console.log('gridApi not undefined: ', this.state.gridApi)
    //     }
    // }




// GRID IS READY AND THIS.PROPS.DATA IS AVAILABLE.

    // onGridReady = async (params) => {
    //     this.setState({ gridApi: params.api })
    //     this.gridApi = params.api;
    //     this.columnApi = params.columnApi;
    //     console.log('onGrid is ready', this.gridApi, '\n', this.props.cars)
    //     Promise.resolve(this.props.getCars()).then(() => {
    //         console.log('reaqdyyy: ', this.props.cars)
    //         this.gridApi.setColumnDefs(