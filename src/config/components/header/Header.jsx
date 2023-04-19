import React from 'react';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.HeaderArea}>
      <h1>条件付き表示制御プラグイン</h1>
      <p>
        「条件式」と「表示するフィールド」を指定してください。「条件式」は「フィールド」「条件」「値」を組み合わせたものです。
        <br />
        「条件式」の条件が満たされた場合のみ、「表示するフィールド」で指定したフィールドが表示されます。（満たされていない場合は、表示されません。）
        <br />
        設定した内容は、上から順に優先されて反映されます。
      </p>
    </div>
  );
};
