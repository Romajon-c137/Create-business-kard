// import React, { useState, useEffect, useRef } from 'react';
// import './App.scss';
// import { FaInstagram, FaPhone, FaTelegram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
// import { FiFacebook, FiMail } from 'react-icons/fi';
// import CopyButton from './components/CopyText';
// import Input from './components/Input';
// import DownloadButtons from './components/DownloadButtons';

// function App2() {
//   const [UserName, setUserName] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [company, setCompany] = useState('');
//   const [position, setPosition] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [telegram, setTelegram] = useState('');
//   const [whatsapp, setWhatsapp] = useState('');
//   const [webSite, setWebSite] = useState('');
//   const [vCardData, setVCardData] = useState('');
//   const qrCodeRef = useRef(null);

//   useEffect(() => {
//     const updatedVCardData = `BEGIN:VCARD
// VERSION:3.0
// N:${lastName};${firstName};;;
// FN:${firstName} ${lastName}
// TITLE:${position}
// ORG:${company}
// EMAIL;TYPE=work:${email}
// TEL;TYPE=work:${phoneNumber}
// URL:${webSite}
// URL;type=Whatsapp:https://wa.me/${whatsapp}
// URL;type=Telegram:https://www.t.me/${telegram}
// END:VCARD`;
//     setVCardData(updatedVCardData);
//   }, [firstName, lastName, position, company, email, phoneNumber, webSite, whatsapp, telegram]);

//   const downloadQRCodeAsSvg = () => {
//     if (qrCodeRef.current) {
//       const svgElement = qrCodeRef.current.firstChild;
//       const svgData = new XMLSerializer().serializeToString(svgElement);
//       const link = document.createElement('a');
//       const blob = new Blob([svgData], { type: 'image/svg+xml' });
//       link.href = URL.createObjectURL(blob);
//       link.download = 'qrcode.svg';
//       link.click();
//     }
//   };

//   const downloadQRCodeAsPng = () => {
//     if (qrCodeRef.current) {
//       const svgElement = qrCodeRef.current.firstChild;
//       const svgData = new XMLSerializer().serializeToString(svgElement);

//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');

//       const img = new Image();
//       img.onload = () => {
//         ctx.drawImage(img, 0, 0);
//         const pngData = canvas.toDataURL('image/png');

//         const link = document.createElement('a');
//         link.href = pngData;
//         link.download = 'qrcode.png';
//         link.click();
//       };

//       img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
//     }
//   };

//   function forPhone() {
//     setPhoneNumber(UserName);
//     setUserName('');
//   }

//   function forWhatsApp() {
//     setWhatsapp(UserName);
//     setUserName('');
//   }

//   function forInstagram() {
//     setUserName('');
//   }

//   function forTelegram() {
//     setTelegram(UserName);
//     setUserName('');
//   }

//   function forTikTok() {
//     setUserName('');
//   }

//   function forGmail() {
//     setEmail(UserName);
//     setUserName('');
//   }

//   function forFacebook() {
//     setUserName('');
//   }

//   const [Root, setRoot] = useState('');

//   return (
//     <>
//       <div className="App">
//         <div className="left pl-8">
//           <div className='inputOther'>
//             <Input
//               type='search'
//               variant="plain"
//               onChange={(e) => setUserName(e.target.value)}
//               value={UserName}
//               placeholder="пиши че хотел"
//             />
//           </div>
//           <br />
//           <div className="roma__content roma__content-p">
//             <FaPhone className='text-2xl' />
//             <p>Позвонить на номер</p>
//             <button onClick={forPhone} className="adder">+</button>
//           </div>
//           <div className="roma__content roma__content-w">
//             <FaWhatsapp className='text-2xl' />
//             <p>Написать на Whats'App</p>
//             <button onClick={forWhatsApp} className="adder">+</button>
//           </div>
//           <div className="roma__content  roma__content-i">
//             <FaInstagram className='text-2xl' />
//             <p>Мой Instagram</p>
//             <button onClick={forInstagram} className="adder">+</button>
//           </div>
//           <div className="roma__content  roma__content-tt">
//             <FaTiktok className='text-2xl' />
//             <p>Мой Tik tok</p>
//             <button onClick={forTikTok} className="adder">+</button>
//           </div>
//           <div className="roma__content  roma__content-t">
//             <FaTelegram className='text-2xl' />
//             <p>Telegram</p>
//             <button onClick={forTelegram} className="adder">+</button>
//           </div>
//           <div className="roma__content  roma__content-f">
//             <FiFacebook className='text-2xl' />
//             <p>Facebook</p>
//             <button onClick={forFacebook} className="adder">+</button>
//           </div>
//           <div className="roma__content  roma__content-g">
//             <FiMail className='text-2xl' />
//             <p>Gmain</p>
//             <button onClick={forGmail} className="adder">+</button>
//           </div>

//           <div className="Vcard__wrapper">
//             <h1 className='text-2xl font-500 text-white mt-4'>Vcard</h1>
//             <div className="flex flex-wrap gap-8 border p-4 border-border rounded-lg">
//               <Input hint='Имя' />
//               <Input hint='Фамилия' />
//               <Input hint='Компания' />
//               <Input hint='Должность' />
//               <Input hint='Сайт' />
//             </div>
//           </div>
//         </div>
//         <div className="right__content fixed right-0 ">
//           <div className="right__block">
//             <pre>{Root}</pre>
//             <div className="sticky flex justify-end right-0 bottom-0 p-2"><CopyButton text={Root} label="Скопировать" /></div>
//           </div>
//           <div className="right__block p-8">
//             <div className="flex justify-between h-full">
//               <pre>{vCardData}</pre>
//               <div className="qr-code w-[50%] flex row justify-center items-center border-l h-full">
//                 <div className=" bg-white">
//                   <StyledQRCode
//                     ref={qrCodeRef}
//                     value={vCardData}
//                     size={4.5}
//                     padding={8}/>
//                   <DownloadButtons
//                     onDownloadAsSvg={downloadQRCodeAsSvg}
//                     onDownloadAsPng={downloadQRCodeAsPng}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App2;
