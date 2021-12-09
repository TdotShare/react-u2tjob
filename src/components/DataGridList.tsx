import { DataGrid, GridColDef } from '@mui/x-data-grid'

type AppPros = {
    model :  any,
    columns: GridColDef[],
    cbsel?: boolean
}

export default function DataGridList({ model, columns , cbsel = false }: AppPros) {
    return (
        <div style={{ padding: '2%', height: 450, width: '100%' }}>
            <DataGrid
                rows={model ? model : []}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection={cbsel}
                disableSelectionOnClick={true}
            />
        </div>
    )
}
