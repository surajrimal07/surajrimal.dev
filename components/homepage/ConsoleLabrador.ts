'use client';

import { useEffect } from 'react';

const ConsoleLabrador = (): JSX.Element | null => {
  useEffect(() => {
    // const labrador = `:-----
    //              --------:::---------
    //           ----:--:::::::::::------=-
    //           ---:--::::::::::::------===-
    //         :-==------:::::::----------++=--
    //       :--===----+=--::::--=+=------=*==-:
    //      :---=+=-=*#*+=-::::-=+*###+----===--:
    //     ----===-=*#*##+-::::-+*%###*=----==----
    //    -----===-==+**+--------===+===---===-----
    //    ------==--===-------------==-----==-------
    //   :-------==---=-----===--------===-----------
    //   :---------==--------==-------==-------------
    //    -----------=--=*******==---==-------------
    //    ------ :---===#*++++*##==-===------ :----
    //           --:--==#%%%%@%%#=====----:--
    //           :--::==+#%%%%%*======--:::--:
    //        .-------===+*####*+====--::::----
    //       :--------===*######*====-::::----+*
    //      --::------==+**++++**+==+--:---=-=*#
    //      :--:--------==++********+=---===*#
    //       ---:--------+*+++++++*+==---------
    //        -----------=++++++++++==------=-:`;

    // const style = `
    //   color: #FFD700;
    //   font-size: 12px;
    //   font-family: monospace;
    //   line-height: 12px;
    //   padding: 8px;
    //   background: #333;
    // `;

    // console.log('%c' + labrador, style);
    console.log(
      "%cWoof! Looking for something? 🐾\nIf someone told you to paste something here, it's probably a scam!\nBut since you found my secret spot, say hi at davidparkedme@gmail.com",
      'color: #FFD700; font-size: 14px; font-weight: bold;',
    );
  }, []);

  return null;
};

export default ConsoleLabrador;
