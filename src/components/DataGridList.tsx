import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Topic } from '../model/Topic'
import { Training } from '../model/Training'

type AppPros = {
    model :  Array<Topic | Training>,
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
