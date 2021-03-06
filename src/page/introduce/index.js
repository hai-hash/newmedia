import styles from './styles.module.scss';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import filmApi from '../../api/film/filmApi';
import LogInModal from '../../library/modal/loginModal';
import ReactStars from "react-rating-stars-component";
import { AiOutlineBook, AiFillEye ,AiOutlineShareAlt} from 'react-icons/ai';
import Comments from '../comments/comments';
import ShareModal from '../../library/share/shareModal';
import viewApi from '../../api/view/viewApi';

const Introduct = () => {
    const [data, setData] = useState({});
    const [activeSignIn, setActiveSignIn] = useState(false);
    const [activeShare, setActiveShare] = useState(false);
    let { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        const fetchFilmId = async () => {
            try {
                const res = await filmApi.get(id);
                setData(res);
            } catch (error) {
                console.log("Failed to fetch film detail :", error);
            }
        }

        fetchFilmId();
    }, [id])

    const onViewNow = () => {
        var token = localStorage.getItem("token");
        if (token) {
            const addView = async () => {
                try {
                    const res = await viewApi.addViewByFilm(id)
                    console.log(res);
                } catch (error) {
                    console.log(error)
                }
            }

            history.push(`/home/firm/${id}`);
            addView();
        }
        else {
            setActiveSignIn(true);
        }

    }

    const onShare = () => {
        setActiveShare(!activeShare);
    }
    const onSignIn = () => {
        setActiveSignIn(!activeSignIn);
    }

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    return (
        <>
            <div className={styles.wap_introduct}>
                <div className={styles.top_introduct}>
                    <div className={styles.image_introduct}>
                        <img src={data.illustration ? data.illustration : ""} alt="" />
                        <div className={styles.view} onClick={onViewNow}><p>Xem ngay</p></div>
                    </div>
                    <div className={styles.info_introduct}>
                        <p className={styles.name}>{data.nameFilm ? data.nameFilm : ""}</p>
                        <p className={styles.time}>{data.title ? data.title : ""}</p>
                        <p className={styles.status}>Tr???ng th??i: <span>{data.status ? data.status : ""}</span></p>
                        <p className={styles.director}>?????o di???n: <span>{data.director ? data.director : ""}</span></p>
                        <p className={styles.actor}>Di???n vi??n: <span>{data.actor ? data.actor : ""}</span></p>
                        <p className={styles.type}>Th??? lo???i: <span>{data.category ? data.category : "Phim d??i t???p"}</span></p>
                        <p>Qu???c gia: {data.nation ? data.nation : ""}</p>
                        <p>Th???i l?????ng: {data.viewingTime ? data.viewingTime : ""}</p>
                        <p>L?????t xem: <AiFillEye />  {data.countView ? data.countView : 0}</p>
                        <p>N??m xu???t b???n: {data.year ? data.year : ""}</p>
                        <div className={styles.evaluate}>
                            <div className={styles.number_star_tb}>5</div>
                            <div className={styles.evaluate_star}>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={34}
                                    activeColor="#ffd700"
                                />
                                <span className={styles.total_count_evaluate}>7 l?????t ????nh gi??</span>
                            </div>

                        </div>


                    </div>


                </div>
                <LogInModal activeSignIn={activeSignIn} onSignIn={onSignIn} />

            </div>
            <div className={styles.content_film}>
                <div className={styles.icon_content}><AiOutlineBook size={40} /> N???I DUNG PHIM</div>
                <div className={styles.content}>
                    N??y! C???u R???t ???n ??p / ?? Hay! ?????i S??? C???a Ng????i Th???t Vi Di???u - Hei! Ni Da Shi Hen Miao xoay quanh c??u chuy???n v??? hai ng?????i b???n thanh mai tr??c m?? H??ng K??? K??? v?? L?? Nh???t H??a, c??? hai ?????u sinh c??ng ng??y v?? c??ng m???t th??? tr???n, c??ng nhau l???n l??n. Nh??ng t??nh c??ch c???a c??? hai l???i tr??i ng?????c nhau khi H??ng K??? K??? l?? m???t c?? g??i v?? c??ng l?????i nh??t lu??n th??ch ??? trong nh??, c??n ch??ng trai L?? Nh???t H??a l???i v?? c??ng th???ng th???n nghi??m t???c. M???c d?? t??nh c??ch kh??c nhau nh??ng c??? hai v???n lu??n c?? m???i quan h??? t???t ?????p v?? gi??p ????? nhau trong cu???c s???ng v?? tr??n con ???????ng th???c hi???n ?????c m?? c???a m???i ng?????i.
                </div>
                <div className={styles.content_image} style={{ background: `url(${data.illustration ? data.illustration : ""})` }}>

                </div>
            </div>
            <div className={styles.share}>
                <span className={styles.facebook} onClick={onShare}><AiOutlineShareAlt size={20} />  Chia S???</span>
                <ShareModal activeShare={activeShare} onShare={onShare} id={id} />
            </div>
            <Comments id={id} />
        </>
    )
}
export default Introduct;