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
import '../Detail/Investors.scss'

const CollateralTableConstants = [
    'Tipo',
    'Fecha',
    'Status',
    'Valor',
    'LTV',
    'LOTV']

const Collateral = (props) => {
    const { isShowing, toggle } = useModal()
    const [expanded, setExpanded] = useState(false);
    const [loan, setLoan] = useState(props.loanId)
    const [res, setCollaterals] = useState({ collaterals: [], add: false, isLoading: false, getCollaterals: true })
    const collateralService = new CollateralService()

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        setCollaterals(prevState => ({ ...prevState, isLoading: true }))
        collateralService.getCollaterals(loan).then(data => {
            if (data) {
                setCollaterals({ ...res, collaterals: data })
            }
        })
    })

    return (
        <div className="transactions-holder">
            <h3>Listado:</h3>
            <table>
                <thead>
                    <tr>
                        {CollateralTableConstants.map(e => {
                            return (
                                <th>
                                    {e}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {res.collaterals !== [] ? res.collaterals.map((e, i) => {
                        return (
                            <tr >
                                <ExpansionPanel expanded={expanded === `panel${i}`} className="expansion" onChange={i !== 0 ? handleChange(`panel${i}`) : null}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1c-content"
                                        id="panel1c-header"
                                    >
                                        <td>{e.type}</td>
                                        <td>{e.registerDate}</td>
                                        <td>{e.status}</td>
                                        <td>{e.value}</td>
                                        <td>{e.loanPrincipalToValue}</td>
                                        <td>{e.loanOutstandingToValue}</td>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <div>
                                            {e.condition}-{e.model}-{e.serialNumber}-{e.dateOfManufacture}
                                        </div>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </tr>
                        )
                    }) : null}
                    <ExpansionPanel expanded={false}>
                        <ExpansionPanelSummary
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                            onClick={toggle}
                        >
                            Agregar nuevo collateral<AddIcon />
                        </ExpansionPanelSummary>
                    </ExpansionPanel>
                </tbody>
            </table>
            <Modal open={isShowing} onClose={toggle} style={{ padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AddCollateral />
            </Modal>
        </div>
    )
}

export default Collateral