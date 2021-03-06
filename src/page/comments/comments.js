import React from 'react';
import styles from './styles.module.scss';
import ItemComment from './itemComment';
import { useState, useContext, useEffect } from 'react';
import { PublicContext } from '../../publicContexts/contexts';
import commentUserApi from '../../api/comment/commentApi';
import * as toasts from './../../library/toast/toast';
const Comments = ({ id }) => {
    const { infoAccount } = useContext(PublicContext);

    const [countComment, setCountComment] = useState(0);

    const [listComments, setListComments] = useState([]);

    const [comment, setComment] = useState({ createBy: infoAccount?.fullName ? infoAccount?.fullName : "" });

    useEffect(() => {
        setCountComment(listComments.length);
    }, [listComments])



    useEffect(() => {
        const getAllCommentByFilm = async () => {
            try {
                const params = {
                    size: 8,
                    page: 0
                }
                const res = await commentUserApi.getAllCommentByFilm(id, { params })
                setListComments(res);
            } catch (error) {
                console.log(error);
            }
        }
        getAllCommentByFilm();
    }, [id])


    const DisplayElementComment = (comments) => {
        var result = null;
        if (comments.length > 0) {
            result = comments.map((comment, index) => {
                return <ItemComment key={index} comment={comment} />
            })
        }
        return result;
    }


    const onAddComment = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setComment({ ...comment, [name]: value });
    }


    const onComment = (e) => {
        e.preventDefault();
        var token = localStorage.getItem("token");
        if (token) {
            var new_comments = [...listComments];
            new_comments.unshift(comment);
            setCountComment(countComment + 1);
            setListComments(new_comments);
            const SubmitComment = async () => {
                try {
                    const res = await commentUserApi.post(comment, id, infoAccount?.username ? infoAccount?.username : "");
                    console.log(res);
                    toasts.notifyInfo("B??nh lu???n ???? ???????c ghi l???i");
                } catch (error) {
                    console.log(error);
                    toasts.notifyError("b??nh lu???n th???t b???i");
                }
            }
            SubmitComment();
        }
        else {
            alert("b???n c???n ????ng nh???p ????? th???c hi???n b??nh lu???n");
        }

    }


    const getName = (name) => {
        var result = "";
        if (name !== null) {
            var arr_name = name?.split(" ");
            if (arr_name) {
                if (arr_name.length < 4) {
                    for (name of arr_name) {
                        result += name.charAt(0).toUpperCase();
                    }
                }
                else {
                    result += arr_name[0].charAt(0).toUpperCase() + arr_name[arr_name.length - 1].charAt(0).toUpperCase();
                }
            }
        }
        return result;
    }




    return (
        <div className={styles.wap_comment}>
            <div className={styles.count_comment}>
                {countComment} B??nh Lu???n
            </div>
            <div className={styles.comments}>
                <div className={styles.avatar_comment}>{getName(infoAccount?.fullName ? infoAccount?.fullName : "ng?????i d??ng")}</div>
                <div className={styles.input_comment}>
                    <form onSubmit={onComment}>
                        <input required type="text" name="contentComment" placeholder="N???i dung b??nh lu???n" onChange={onAddComment} />
                        <button>B??nh Lu???n</button>
                    </form>

                </div>
            </div>
            {DisplayElementComment(listComments)}

        </div>
    )
}

export default Comments
