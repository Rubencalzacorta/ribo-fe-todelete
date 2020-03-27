import { CsvBuilder } from 'filefy';

const handleExportCsv = (tableName) => {
    return (columns, renderData) => {
        const csvColumns = columns
            .filter(columnDef => {
                return !columnDef.hidden && columnDef.field && columnDef.export !== false;
            });

        const data = renderData.map(rowData =>
            csvColumns.map(columnDef => rowData[columnDef.field])
        );

        const builder = new CsvBuilder(`${tableName}.csv`)
            .setDelimeter(',')
            .setColumns(csvColumns.map(columnDef => columnDef.title))
            .addRows(data)
            .exportFile();
        return builder
    }
}

export default handleExportCsv