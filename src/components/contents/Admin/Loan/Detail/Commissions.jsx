
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './Commissions.scss'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import CommissionAdd from './CommissionsAdd'
import useModal from '../../../../../hooks/useModal'

const Commissions = (props) => {
    const { isShowing, toggle } = useModal()

    let {
        commissions,
        salesmen,
        handleNewCommission,
        newPct,
        newSalesman,
        saveNewCommission,
        deleteCommission
    } = props

    return (
        <div className="account-options">
            <div className="option-holder">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Comissiones</FormLabel>

                    {commissions ? commissions.map((e, i) => {
                        console.log('aqi')
                        return (
                            <div key={i} className="fee-scheme line">
                                <div className="mg-accounts">
                                    {e._salesman.firstName + ' ' + e._salesman.lastName}
                                </div>
                                <div className="mg-fee">
                                    {e.pct * 100 + "%"}
                                </div>
                                <div className="mg-icon" onClick={() => deleteCommission(e._id)}>
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
                <CommissionAdd
                    salesmen={salesmen}
                    handleNewCommission={handleNewCommission}
                    newPct={newPct}
                    newSalesman={newSalesman}
                    saveNewCommission={saveNewCommission}
                />
            </Modal>
        </div>

    )

}

export default Commissions;