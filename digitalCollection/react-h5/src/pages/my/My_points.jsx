import React, { useState } from "react";
import NavigationBar from "../../components/common/NavigationBar";
import IconFont from "../../components/common/IconFont";
import { Button } from 'antd-mobile'
import styles from "../../assets/css/my/my_points.less";

export default function My_points() {
    const [isSign, setIsSign] = useState(false)
  return (
    <>
      <NavigationBar path="/my" title="我的积分" />
      <div className={styles.points_page}>
        <div className={styles.points}>
          <div className={styles.point_logo}>
            <IconFont
              style={{
                fontSize: "28px",
              }}
              type="icon-jifen"
            />
          </div>
          <div className={styles.points_value}>{'12312'}</div>
          <div className={styles.sign}>
              <Button block  shape='rounded' color="danger" disabled={isSign}>签到</Button>
          </div>
        </div>
      </div>
    </>
  );
}
