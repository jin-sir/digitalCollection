import React from 'react'
import DigitalCollectionCard from '../DigitalCollectionCard'
import styles from "./index.less";

export default function DigitalCollectionList() {
    const digitalCollections = [1, 2, 3, 4, 5, 6, 7].map(it => <DigitalCollectionCard key={it} />);
    return <div className={styles.goods_container}>{digitalCollections}</div>;
}
