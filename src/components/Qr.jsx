import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode-generator';

const StyledQRCode = ({ value, size, bgColor, fgColor, padding }) => {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      const qrCode = QRCode(0, 'L');
      qrCode.addData(value);
      qrCode.make();

      const qrCodeSvg = qrCode.createSvgTag({
        cellSize: size,
        margin: padding,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });

      qrCodeRef.current.innerHTML = qrCodeSvg;
    }
  }, [value, size, bgColor, fgColor, padding]);

  return <div ref={qrCodeRef} style={{ backgroundColor: bgColor }} />;
};

export default StyledQRCode;
