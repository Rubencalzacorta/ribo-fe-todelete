import React, { useState, useEffect } from 'react'
import CommentService from './../../../../../services/CommentService'
import Table from './Table.jsx'
import Dialog from '../../../../Modal/Dialog'
import CommentModal from '../../../../Modal/CommentModal'

function Comments(props) {
    const commentService = new CommentService()
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState()
    useEffect(() => {
        const FetchData = async () => {
            try {
                const comments = await commentService.getLoanComments(props.loanId);

                return setComments(comments);
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


    const insertComment = (comment) => {
        commentService.newComment({ ...comment, _loan: props.loanId })
            .then(newComment => {
                setComment(false)
                setComments([...comments, newComment.response])
            })
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
                        submitTitle={'insertar comentario'}
                        toggle={toggleComment}
                        handleCommentInsert={insertComment}
                    />
                </Dialog>
            }
            <Table model={comments} toggleComment={toggleComment} />
        </div>
    )
}



export default Comments
