
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './acc-options.scss'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import NewFee from './NewFeeModal'
import useModal from '../../../../hooks/useModal'

const AccOptions = (props) => {
    const { isShowing, toggle } = useModal()

    let {
        investorFees,
        investorType,
        isAutoInvesting,
        toggleAutoInvest,
        changeInvestorType,
        feeReceivers,
        handleNewFee,
        newPct,
        newManager,
        saveNewFee,
        deleteFee
    } = props


    return (
        <div className="account-options">
            <div className="investment-options">
                <div className="option-holder">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Auto Invertir Fondos</FormLabel>
                        <div className="toggle-holder">
                            <p className="detail-on">Off</p>
                            <FormControlLabel className="toggle"
                                control={
                                    <Switch className="toggle" checked={isAutoInvesting} onChange={() => toggleAutoInvest()} value="checkedA" />
                                }
                            />
                            <p className="detail-off">On</p>
                        </div>
                    </FormControl>
                </div>
                <div className="option-holder">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo de Inversionista</FormLabel>
                        <RadioGroup
                            aria-label="Tipo de Inversionista"
                            name="investorType"
                            value={investorType}
                            onChange={(e) => changeInvestorType(e)}
                        >
                            <FormControlLabel className="selection" value="FIXED_INTEREST" control={<Radio />} label="Fijo" />
                            <FormControlLabel className="selection" value="VARIABLE_INTEREST" control={<Radio />} label="Variable" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="option-holder">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Esquema de Fees de Gestión</FormLabel>

                    {investorFees ? investorFees.map((e, i) => {
                        return (
                            <div key={i} className="fee-scheme line">
                                <div className="mg-accounts">
                                    {e._managementAccount.firstName + ' ' + e._managementAccount.lastName}
                                </div>
                                <div className="mg-fee">
                                    {e.pct * 100 + "%"}
                                </div>
                                <div className="mg-icon" onClick={() => deleteFee(e._id)}>
                                    <i className="material-icons">
                                        delete
                                    </i>
                                </div>
                            </div>)
                    }) : ""}

                    <Fab className='line' size="small" color="primary" aria-label="add" >
                        <AddIcon onClick={toggle} />
                    </Fab>
                </FormControl>
            </div>
            <Modal open={isShowing} onClose={toggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NewFee
                    feeReceivers={feeReceivers}
                    handleNewFee={handleNewFee}
                    newPct={newPct}
                    newManager={newManager}
                    saveNewFee={saveNewFee}
                />
            </Modal>
        </div>

    )

}

export default AccOptions;