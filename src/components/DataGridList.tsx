import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'


type AppPros = {
    model: any,
    columns: GridColDef[],
    cbsel?: boolean,
    excel?: boolean
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

export default function DataGridList({ model, columns, cbsel = false, excel = false }: AppPros) {
    return (
        <div style={{ padding: '2%', height: 450, width: '100%' }}>
            {
                excel ?

                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        rows={model ? model : []}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection={cbsel}
                        disableSelectionOnClick={true}
                    />

                    :

                    <DataGrid
                        rows={model ? model : []}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection={cbsel}
                        disableSelectionOnClick={true}
                    />


            }

        </div>
    )
}
