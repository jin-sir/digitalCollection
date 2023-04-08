import React, { useState, useCallback } from "react";
import DigitalCollectionCard from "../DigitalCollectionCard";
import { Image, Popup } from "antd-mobile";
import styles from "./index.less";
import { getUserProductSeriNum } from "../../../api/index";
import { useNavigate } from "react-router-dom";

export default function DigitalCollectionList(props) {
    const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const [seriNum, setSeriNum] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState({});
  const switchToGoodsPage = useCallback((cId, curData) => {
    setVisible(true);
    getUserProductSeriNum({ cId }).then(res => {
      const { code, data } = res;
      if (code === 0) {
        setSeriNum(data);
        setCollectionInfo(curData);
      }
    });
  }, []);
  const digitalCollections = props.collections.map(c => (
    <DigitalCollectionCard openPopup={switchToGoodsPage} key={c.cId} {...c} />
  ));

  return (
    <>
      <div className={styles.goods_container}>{digitalCollections}</div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
        }}
      >
        <div className={styles.popup_content}>
          <Image className={styles.img} src={collectionInfo.url} fit="fill" />
          <div className={styles.info_box}>
            <div className={styles.cName}>{collectionInfo.cName}</div>
            <div className={styles.num}>共{collectionInfo.count}个</div>
          </div>
        </div>
        {seriNum.length ? (
          <div className={styles.seri_num}>
            {seriNum.map(it => (
              <span onClick={() => {
                navigate("/goodsDetail", {
                    state: {
                      seri_num: it.seri_num,
                      goodsId: it.cId,
                      mode: 'my_digitalCollection',
                      path: '/my_digitalCollection'
                    },
                  });
              }} className={styles.seri_num_item} key={it.id}>
                #{it.seri_num}/{collectionInfo.circulation}
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
      </Popup>
    </>
  );
}
