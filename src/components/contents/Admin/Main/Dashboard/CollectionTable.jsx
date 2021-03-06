import React from 'react';
import {
    Link
} from "react-router-dom";
import { CsvBuilder } from 'filefy';
import ReportingService from '../../../../../services/ReportingService'
import MaterialTable from 'material-table';
import moment from 'moment';
import numbro from 'numbro';
import './collectionCard.scss';


const dataColumns = [
    {
        title: 'Name', field: 'name', render: rowData => <Link to={
            `/admin/loan/${rowData._id}`
        } >{rowData.name}</Link>
    },
    {
        title: 'Telefono', field: 'cellphoneNumber', type: 'string'
    },
    {
        title: 'Cuota', field: 'oldest_payment', hidden: true, type: 'numeric',
        render: rowData => numbro(rowData.oldest_payment).format({
            thousandSeparated: true,
            mantissa: 2,
        })
    },
    { title: 'Vencimiento', field: 'date', type: 'date', render: rowData => moment(rowData.date).format('YYYY/MM/DD') },
    {
        title: 'Dias', field: 'dayDiff', type: 'numeric',
        render: rowData => numbro(rowData.dayDiff).format({
            thousandSeparated: true,
            mantissa: 0,
        })
    },
    { title: 'Cuotas Vencidas', field: 'number_unpaid', type: 'numeric' },
    {
        title: 'Monto Total Vencido', field: 'value', type: 'numeric',
        render: rowData => numbro(rowData.value).format({
            thousandSeparated: true,
            mantissa: 2,
        }),
    },
    {
        title: 'Interes adeudados', field: 'interest_unpaid', render: rowData => numbro(rowData.interest_unpaid).format({
            thousandSeparated: true,
            mantissa: 2,
        }), type: 'numeric'
    },
    {
        title: 'Capital', field: 'remainingCapital',
        render: rowData => numbro(rowData.remainingCapital).format({
            thousandSeparated: true,
            mantissa: 2,
        }), type: 'numeric'
    },
    {
        title: 'Pago total', field: 'remainingCapital',
        render: rowData => numbro(rowData.interest_unpaid + rowData.remainingCapital).format({
            thousandSeparated: true,
            mantissa: 2,
        }), type: 'numeric'
    },
    { title: 'Estatus', field: 'status' }
]


export default function CollectionTable({ tableData, togglePaymentOption, handleDownload, country }) {

    const handleExportCsv = (columns, renderData) => {
        const csvColumns = columns
            .filter(columnDef => {
                return columnDef.field && columnDef.export !== false;
            });

        const data = renderData.map(rowData =>
            csvColumns.map(columnDef => rowData[columnDef.field])
        );

        const builder = new CsvBuilder(`${moment().format('YYYY-MM-DD')}-cobranza.csv`)
            .setDelimeter(',')
            .setColumns(csvColumns.map(columnDef => columnDef.title))
            .addRows(data)
            .exportFile();
        return builder
    }

    return (<MaterialTable
        title={`Cobranza`}
        columns={dataColumns}
        data={tableData}
        options={{
            search: true,
            sort: true,
            exportButton: true,
            showTitle: true,
            toolbar: true,
            pageSize: 10,
            actionsColumnIndex: 4,
            exportCsv: handleExportCsv,
            exportFileName: `${moment().format('YYYY-MM-DD')}-cobranza.csv`
        }}
        localization={{
            header: {
                actions: 'Cuota',
            }
        }}
        actions={[{
            icon: "Check",
            tooltip: "Cuota",
            onClick: (event, rowData) => togglePaymentOption(rowData)
        }
        ]}
        components={{
            Action: props => <a onClick={(event) => props.action.onClick(event, props.data)}>{numbro(props.data.oldest_payment).format({
                thousandSeparated: true,
                mantissa: 2,
            })}</a>
        }}
    />)

}