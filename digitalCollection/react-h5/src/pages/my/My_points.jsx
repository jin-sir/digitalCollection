import React, { useCallback, useEffect, useState } from "react";
import NavigationBar from "../../components/common/NavigationBar";
import IconFont from "../../components/common/IconFont";
import { Button, Toast } from "antd-mobile";
import styles from "../../assets/css/my/my_points.less";
import {getPoints, openWallet, pointsSign} from '../../api'

export default function My_points() {
  const [isSign, setIsSign] = useState(false);
  const [points, setPoints] = useState(0)
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  const [, forceUpdate] = useState({})
  const openWalletFn = useCallback(() => {
    openWallet().then(res => {
      const {code, msg} = res
      if (code === 0) {
        forceUpdate({})
      } else {
        Toast.show({
          content: msg
        })
      }
    })
  }, [])
  const signPointsFn = useCallback(() => {
    pointsSign().then(res => {
      const {code, msg} = res
      if (code === 0) {
        forceUpdate({})
      } else {
        Toast.show({
          content: msg
        })
      }
    })
  }, [])
  useEffect(() => {
    getPoints().then(res => {
      const {code, data} = res;
      if (code === 0) {
        setIsOpenWallet(true)
        setIsSign(data.isSign)
        setPoints(data.points)
      } else if (code === 1) {
        setIsOpenWallet(false)
      }
    })
  })
  return (
    <>
      <NavigationBar path="/my" title="我的积分" />
      <div className={styles.points_page}>
        {isOpenWallet ? (
          <div className={styles.points}>
            <div className={styles.point_logo}>
              <IconFont
                style={{
                  fontSize: "28px",
                }}
                type="icon-jifen"
              />
            </div>
            <div className={styles.points_value}>{points}</div>
            <div className={styles.sign}>
              <Button onClick={signPointsFn} block shape="rounded" color="danger" disabled={isSign}>
                签到
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.points}>
            <div className={styles.point_logo}>
              <IconFont
                style={{
                  fontSize: "28px",
                }}
                type="icon-jifen"
              />
            </div>
            <div className={styles.sign}>
              <Button onClick={openWalletFn} block shape="rounded" color="success" disabled={isSign}>
                开通
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
