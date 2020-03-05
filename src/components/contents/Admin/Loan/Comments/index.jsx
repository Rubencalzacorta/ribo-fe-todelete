import React, { useState, useEffect } from 'react'
import CommentService from './../../../../../services/CommentService'
import Table from './Table.jsx'
import Dialog from '../../../../Modal/Dialog'
import CommentModal from '../../../../Modal/CommentModal'

function Comments(props) {
    const commentService = new CommentService()
    const [response, setResponse] = useState({ data: [] });
    const [comment, setComment] = useState()
    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await commentService.getLoanComments(props.loanId);
                const newRes = {
                    ...response,
                    data: res
                }
                return setResponse(newRes);
            } catch (error) {
                console.log(error)
            }
        };
        FetchData();
        // eslint-disable-next-line
    }, []);

    const toggleComment = () => {
        setComment(!comment)
    }

    return (
        <div style={{ 'padding': '20px' }}>
            {comment &&
                <Dialog
                    toggle={toggleComment}
                    open={comment}
                    title='Inserte comentario'
                >
                    <CommentModal
                        submitTitle={'insertar'}
                        toggle={toggleComment}
                    />
                </Dialog>
            }
            <Table model={response.data} toggleComment={toggleComment} />
        </div>
    )
}



export default Comments
