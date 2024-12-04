import React from 'react';
import styles from "./index.less";
import HeaderForm from '@/pages/Edit/HeaderForm'


/**
 * 开单页面
 * @constructor
 */
const Edit: React.FC = () => {
   
    return <div className={styles.container}>
        <HeaderForm />
    </div>;
};

export default Edit;
