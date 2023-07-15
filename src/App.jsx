import { useState, useEffect, useRef } from 'react';
import './App.scss';
import { FaInstagram, FaPhone, FaQrcode, FaTelegram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { FiFacebook, FiMail } from 'react-icons/fi';
import CopyButton from './components/CopyText';
import Input from './components/Input';
import QRCode from 'qrcode-generator';
import { Button } from '@mui/material';
import BackUP from './components/BackUP';


function generateQRCode(value, size, bgColor, fgColor, padding) {
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
  
  return qrCodeSvg;
}

function App() {
  const [UserName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [webSite, setWebSite] = useState('');

  const [vCardData, setvCardData] = useState('');
  const [prevVCardData, setPrevVCardData] = useState(0)
  const [Root, setRoot] = useState('');
  const [prevRoot, setPrevRoot] = useState(0)
  const [showPrevBtn, setShowPrevBtn] = useState(false)
  


  const handleRestore = () => {
    setvCardData(prevVCardData); // Восстанавливаем предыдущее состояние
    setRoot(prevRoot); // Восстанавливаем предыдущее состояние
    setShowPrevBtn(false)
  };


  const qrCodeRef = useRef(null);
  const value = vCardData;
  const size = 6;
  const bgColor = '#FFFFFF';
  const fgColor = '#000000';
  const padding = 8;

  function Rest() {
    setPrevVCardData(vCardData); 
    setPrevRoot(Root); 
    setRoot('')
    setvCardData('')
    setLastName('')
    setFirstName('')
    setCompany('')
    setPosition('')
    setWebSite('')
    setShowPrevBtn(true)
  }

  function downloadVCF() {

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lastName + '-' + firstName}.vcf`;
    link.click();
  }

  useEffect(() => {
    if (qrCodeRef.current) {
      const qrCodeSvg = generateQRCode(value, size, bgColor, fgColor, padding);
      qrCodeRef.current.innerHTML = qrCodeSvg;
    }
  }, [value, size, bgColor, fgColor, padding]);

  const downloadQRCodeAsSvg = () => {
    if (qrCodeRef.current) {
      const svgElement = qrCodeRef.current.firstChild;
      const svgData = new XMLSerializer().serializeToString(svgElement);

      const link = document.createElement('a');
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'qrcode.svg';
      link.click();
      URL.revokeObjectURL(url);
    }
  };
  const downloadQRCodeAsPng = () => {
    if (qrCodeRef.current) {
      const svgElement = qrCodeRef.current.firstChild;
      const svgData = new XMLSerializer().serializeToString(svgElement);

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        link.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };



  useEffect(() => {
    const updatedVCardData =
      `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
TITLE:${position}
ORG:${company}
EMAIL;TYPE=work:${email}
TEL;TYPE=work:${phoneNumber}
URL:${webSite}
URL;type=Whatsapp:https://wa.me/${whatsapp}
URL;type=Telegram:https://www.t.me/${telegram}
END:VCARD`;
    setvCardData(updatedVCardData);
  }, [firstName, lastName, position, company, email, phoneNumber, webSite, whatsapp, telegram]);

  function forPhone() {
    setRoot(Root + `
    <a class="roma__content-a" href="tel:${`${UserName}`}" target="_blank">
      <div class="roma__content roma__content-p">
        <i class="fa-solid fa-phone"></i>
        <p>Позвонить на номер</p>
      </div>
    </a>
  `)
    setPhoneNumber(UserName);
    setUserName('')
  }

  function forWhatsApp() {
    setRoot(Root + `
    <a class="roma__content-a" href="https://wa.me/${`${UserName}`}" target="_blank">
      <div class="roma__content roma__content-w">
        <i class="fa-brands fa-whatsapp"></i>
        <p>Написать на WhatsApp</p>
      </div>
    </a>
    `)
    setWhatsapp(UserName)
    setUserName('')
  }
  function forInstagram() {
    setRoot(Root + `
      <a class="roma__content-a" href="https://www.instagram.com/${`${UserName}`}" target="_blank">
        <div class="roma__content  roma__content-i">
        <i class="fa-brands fa-instagram"></i>
          <p>Мой Instagram</p>
        </div>
      </a>
      `)
    setUserName('')
  }
  function forTelegram() {
    setRoot(Root + `
      <a class="roma__content-a" href="${`https://www.t.me/${UserName}/`}" target="_blank">
        <div class="roma__content  roma__content-t">
        <i class="fa-brands fa-telegram"></i>
          <p>Мой Telegram</p>
        </div>
      </a>
      `)
    setTelegram(UserName)
    setUserName('');
  }
  function forTikTok() {
    setRoot(Root + `
      <a class="roma__content-a" href="https://www.tiktok.com/${UserName}" target="_blank">
        <div class="roma__content  roma__content-tt">
        <i class="fa-brands fa-tiktok"></i>
          <p>Мой Tik tok</p>
        </div>
      </a>
      `)
    setUserName('')
  }
  function forGmail() {
    setRoot(Root + `
      <a class="roma__content-a" href="mailto:${`${UserName}`}" target="_blank">
        <div class="roma__content  roma__content-e">
        <i class="fa-solid fa-envelope"></i>
          <p>Моя электронная почта</p>
        </div>
      </a>
      `);
    setEmail(UserName)
    setUserName('');
  }
  function forFacebook() {
    setRoot(Root + `
      <a class="roma__content-a" href="${`${UserName}`}" target="_blank">
        <div class="roma__content  roma__content-f">
        <i class="fa-brands fa-facebook-f"></i>
          <p>Moй Facebook</p>
        </div>
      </a>
      `)
    setUserName('')
  }



  return (
    <>
      <div className="App">
        <div className="left pl-8">
          <div className='inputOther flex items-center'>
            <Input
              type='search'
              variant="plain"
              onChange={(e) => setUserName(e.target.value)}
              value={UserName}
              placeholder="пиши че хотел"
            />
           {showPrevBtn && <div className='ml-2 '><Button variant='outlined' onClick={handleRestore}><RiArrowGoBackFill/> {'\u00A0'} Вернуть</Button></div>} 
          </div>
          <br />
          <div className="roma__content roma__content-p">
            <FaPhone className='text-2xl' />
            <p>Позвонить на номер</p>
            <button onClick={forPhone} className="adder">+</button>
          </div>
          <div className="roma__content roma__content-w">
            <FaWhatsapp className='text-2xl' />
            <p>Написать на Whats'App</p>
            <button onClick={forWhatsApp} className="adder">+</button>
          </div>
          <div className="roma__content  roma__content-i">
            <FaInstagram className='text-2xl' />
            <p>Мой Instagram</p>
            <button onClick={forInstagram} className="adder">+</button>
          </div>
          <div className="roma__content  roma__content-tt">
            <FaTiktok className='text-2xl' />
            <p>Мой Tik tok</p>
            <button onClick={forTikTok} className="adder">+</button>
          </div>
          <div className="roma__content  roma__content-t">
            <FaTelegram className='text-2xl' />
            <p>Telegram</p>
            <button onClick={forTelegram} className="adder">+</button>
          </div>
          <div className="roma__content  roma__content-f">
            <FiFacebook className='text-2xl' />
            <p>Facebook</p>
            <button onClick={forFacebook} className="adder">+</button>
          </div>
          <div className="roma__content  roma__content-g">
            <FiMail className='text-2xl' />
            <p>Gmain</p>
            <button onClick={forGmail} className="adder">+</button>
          </div>

          <div className="Vcard__wrapper">
            <h1 className='text-2xl font-500 text-white mt-4'>Vcard</h1>
            <div className="flex flex-wrap gap-8 border p-4 border-border rounded-lg">
              <Input hint='Имя' onChange={(e) => setLastName(e.target.value)} value={lastName} />
              <Input hint='Фамилия' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
              <Input hint='Компания' onChange={(e) => setCompany(e.target.value)} value={company} />
              <Input hint='Должность' onChange={(e) => setPosition(e.target.value)} value={position} />
              <Input hint='Сайт' onChange={(e) => setWebSite(e.target.value)} value={webSite} />
            </div>
          </div>
        </div>
        <div className="right__content fixed right-0 ">
          <div className="right__block">
            <div className='sticky flex justify-end items-end top-0 right-0 p-2 z-10'><Button onClick={Rest} variant='contained' color='error'>Сброс</Button></div>
            <pre>{Root}</pre>
            <div className="sticky flex justify-end items-end right-0 bottom-0 p-2 "><CopyButton text={Root} label="Скопировать" /></div>
          </div>
          <div className="right__block p-8">
            <div className="flex justify-between h-full ">
              <div className=" w-[50%] h-full relative">
                <div className="absolute flex justify-end right-0 -bottom-2 p-2 gap-x-4"><Button variant='contained' color="success" onClick={downloadVCF}>Скачать VCF</Button> <CopyButton text={vCardData} label="Скопировать" /></div>
                <pre>{vCardData}</pre>
              </div>
              <div className="qr-code w-[50%] flex flex-col	justify-center items-center border-l h-full pl-8 gap-y-4">
                <div ref={qrCodeRef} />
                <div className="w-full flex justify-center gap-x-6 ">
                  <Button variant='contained' color="success" onClick={downloadQRCodeAsSvg}>Скачать (SVG)</Button>
                  <Button variant='contained' color="success" onClick={downloadQRCodeAsPng}>Скачать (PNG)</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
