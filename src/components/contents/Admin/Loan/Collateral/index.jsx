import React, { useState, useEffect } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CollateralService from '../../../../../services/CollateralService'
import useModal from '../../../../../hooks/useModal'
import AddIcon from '@material-ui/icons/Add';
import AddCollateral from './AddCollateral.jsx'
import Modal from '@material-ui/core/Modal';
import './collateral.scss'
import '../Detail/Investors.scss'
import numbro from 'numbro'
import { format } from 'date-fns'


const Collateral = (props) => {
    const { isShowing, toggle } = useModal()
    const [expanded, setExpanded] = useState(false);
    const loan = props.loanId
    const [collaterals, setCollaterals] = useState([])
    const collateralService = new CollateralService()

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        collateralService.getCollaterals(loan).then(collaterals => {
            console.log(collaterals)
            if (collaterals) {
                setCollaterals(collaterals)
            }
        })
    }, [collateralService, loan])

    const addCollateral = (newCollateral) => {
        collateralService.addCollateral({ ...newCollateral, _loan: loan })
            .then((resp) => {
                setCollaterals([...collaterals, resp.response])
            })
            .then(() => {
                toggle()
            })
    }

    return (
        <div className="colateralHolder">
            <ExpansionPanel expanded={false}>
                <ExpansionPanelSummary
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className="collateralHeader">
                        <div className="collateralType">Tipo</div>
                        <div className="collateralValue">Valor</div>
                        <div className="collateralDateNumb">Fecha de Registro</div>
                        <div className="collateralStatus">Ultimo Estatus</div>
                        <div className="collateralDateNumb">LTV</div>
                        <div className="collateralDateNumb">LOTV</div>
                    </div>
                </ExpansionPanelSummary>
            </ExpansionPanel>
            {collaterals !== [] ? collaterals.map((e, i) => {
                return (
                    <ExpansionPanel expanded={expanded === `panel${i}`} className="expansion" onChange={handleChange(`panel${i}`)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                        >
                            <div className="collateralContent">
                                <div className="collateralType">{e.type}</div>
                                <div className="collateralValue">{numbro(e.value).formatCurrency({ mantissa: 2 })}</div>
                                <div className="collateralDateNumb">{format(new Date(e.registerDate), 'yyyy-MM-dd')}</div>
                                <div className="collateralStatus">{e.currentStatus[e.currentStatus.length - 1].status}</div>
                                <div className="collateralDateNumb">{numbro(e.loanPrincipalToValue).format({
                                    output: "percent",
                                    mantissa: 2
                                })}</div>
                                <div className="collateralDateNumb">{numbro(e.loanOutstandingToValue ? e.loanOutstandingToValue : null).format({
                                    output: "percent",
                                    mantissa: 2
                                })}</div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div>
                                <h4>Detalles</h4>
                                {e.condition}-{e.model}-{e.serialNumber}-{e.dateOfManufacture}
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            }) : null}
            <ExpansionPanel expanded={false}>
                <ExpansionPanelSummary
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                    onClick={toggle}
                >
                    Agregar nuevo colateral<AddIcon />
                </ExpansionPanelSummary>
            </ExpansionPanel>
            <Modal open={isShowing} onClose={toggle} style={{ padding: '30px 30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AddCollateral addCollateral={addCollateral} />
            </Modal>
        </div >
    )
}

export default Collateral