import { Grid } from 'ag-grid-community';
import 'ag-grid-enterprise';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const gridOptions = {

    rowModelType: 'serverSide',

    columnDefs: [
        { colId: '675711452', field: 'country', headerName: 'Valstybė', rowGroup: true, hide: true },
        { colId: '675711456', field: 'sport', headerName: 'Sportas', rowGroup: true, hide: true },
        { colId: '675711454', field: 'year', headerName: 'Metai', rowGroup: true, hide: true, filter: 'number', filterParams: { newRowsAction: 'keep' } },
        { colId: '675711450', field: 'athlete', headerName: 'Atletas' },
        { colId: '675711457', field: 'gold', headerName: 'Auksas', aggFunc: 'sum' },
        { colId: '675711458', field: 'silver', headerName: 'Sidabras', aggFunc: 'sum' },
        { colId: '675711459', field: 'bronze', headerName: 'Bronza', aggFunc: 'sum' },
    ],

    defaultColDef: {
        sortable: true
    },
    onRowClicked: event => console.log('A row was clicked'),
    onColumnResized: event => console.log('A column was resized'),
    onGridReady: event => console.log('The grid is now ready'),


    // debug: true,
    // cacheBlockSize: 20,
    // maxBlocksInCache: 3,
    // purgeClosedRowNodes: true,
    // maxConcurrentDatasourceRequests: 2,
    // blockLoadDebounceMillis: 1000
};

const gridDiv = document.querySelector('#myGrid');
new Grid(gridDiv, gridOptions);

const datasource = {
    getRows(params) {
        console.log(JSON.stringify(params.request, null, 1));

        fetch('./olympicWinners/', {
                method: 'post',
                body: JSON.stringify(params.request),
                headers: { "Content-Type": "application/json; charset=utf-8" }
            })
            .then(httpResponse => httpResponse.json())
            .then(response => {
                params.successCallback(response.rows, response.lastRow);
            })
            .catch(error => {
                console.error(error);
                params.failCallback();
            })
    }
};

gridOptions.api.setServerSideDatasource(datasource);