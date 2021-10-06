import styles from './../styles.module.scss';
import { AiFillHome } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
// import {AiOutlineBlock} from 'react-icons/ai'
// import {BiGlobe} from 'react-icons/bi'
// import {GrMultimedia} from 'react-icons/gr'
// import {RiPlayList2Fill} from 'react-icons/ri'
// import {GiJusticeStar} from 'react-icons/gi'
// import {MdPlaylistPlay} from 'react-icons/md'
// import {BiCaretRightCircle} from 'react-icons/bi'

const Menu = () => {
    const history = useHistory();
    const onGoToHome = () => {
        history.push("/home");
    }
    return (
        <>
            <div className={styles.menu}>
                <ul className={styles.category}>
                    <li onClick={onGoToHome}><AiFillHome className={styles.icon_home} /></li>
                    <li><span>Thể loại</span></li>
                    <li><span>Quốc gia</span></li>
                    <li><span>Phim lẻ</span></li>
                    <li><span>Phim bộ</span></li>
                    <li><span>Hoạt Hình</span></li>
                    <li><span>Chiếu Rạp</span></li>
                    <li><span>TV Show</span></li>
                </ul>

            </div>
        </>
    );
}
export default Menu;