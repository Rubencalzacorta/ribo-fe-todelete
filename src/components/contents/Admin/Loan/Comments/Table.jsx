import React from 'react'
import MaterialTable from 'material-table'
import tableColumns from './columns'
import handleExportCsv from './tableExport'

function Table({ model, toggleComment }) {
    let handleCSV = handleExportCsv('comments')
    return (
        <MaterialTable
            columns={tableColumns}
            data={model}
            actions={[
                {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: (event) => toggleComment()
                }
            ]}
            title={`Comentarios`}
            options={{
                columnsButton: true,
                exportButton: true,
                // actionsColumnIndex: -1,
                // filtering: true,
                exportCsv: handleCSV,
                pageSize: 10,
                exportFileName: `comments.csv` // using custom this is not used anymore
            }}
            toolbar={true} />
    )
}

export default Table