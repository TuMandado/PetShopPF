// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUsers } from '../store/actions';
// // import { Link } from 'react-router-dom';

// import "./widgetLg.css";

// export default function WidgetLg() {

//   const dispatch = useDispatch();
//   const allUsers = useSelector((state)=> state.users);
//   const [firtUsers, setFirtUsers] = useState([]);

//   useEffect (()=>{
//     dispatch(getUsers());
//     setFirtUsers(allUsers.slice(allUsers.length-5))
//   },[dispatch])


//   const Button = ({ type }) => {
//     return <button className={"widgetLgButton " + type}>{type}</button>;
//   };



//   return (
//     <div className="widgetLg">
//       <h3 className="widgetLgTitle">Ultimas Ventas</h3>
//       <table className="widgetLgTable">
//         <tr className="widgetLgTr">
//           <th className="widgetLgTh">Usuario</th>
//           <th className="widgetLgTh">Fecha</th>
//           <th className="widgetLgTh">Monto</th>
//           <th className="widgetLgTh">Estado</th>
//         </tr>

//         {
//              firtUsers?.map(u =>{
//                return (
//                   <tr className="widgetLgTr">
//                     <td className="widgetLgUser">
//                       <img
//                         src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
//                         alt=""
//                         className="widgetLgImg"
//                       />
//                       <span className="widgetLgName">{u.nickname}</span>
//                     </td>
//                     <td className="widgetLgDate">{u.createdAt}</td>
//                     <td className="widgetLgAmount">{u.}</td>
//                     <td className="widgetLgStatus">{u.}</td>
//                   </tr>

//                )
//              })
//          }




//         <tr className="widgetLgTr">
//           <td className="widgetLgUser">
//             <img
//               src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
//               alt=""
//               className="widgetLgImg"
//             />
//             <span className="widgetLgName">Mafalda Quino</span>
//           </td>
//           <td className="widgetLgDate">2 Jun 2021</td>
//           <td className="widgetLgAmount">$122.00</td>
//           <td className="widgetLgStatus">
//             <Button type="Declined" />
//           </td>
//         </tr>
//         <tr className="widgetLgTr">
//           <td className="widgetLgUser">
//             <img
//               src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
//               alt=""
//               className="widgetLgImg"
//             />
//             <span className="widgetLgName">Mafalda Quino</span>
//           </td>
//           <td className="widgetLgDate">2 Jun 2021</td>
//           <td className="widgetLgAmount">$122.00</td>
//           <td className="widgetLgStatus">
//             <Button type="Pending" />
//           </td>
//         </tr>
//         <tr className="widgetLgTr">
//           <td className="widgetLgUser">
//             <img
//               src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
//               alt=""
//               className="widgetLgImg"
//             />
//             <span className="widgetLgName">Mafalda Quino</span>
//           </td>
//           <td className="widgetLgDate">2 Jun 2021</td>
//           <td className="widgetLgAmount">$122.00</td>
//           <td className="widgetLgStatus">
//             <Button type="Approved" />
//           </td>
//         </tr>
//         <tr className="widgetLgTr">
//           <td className="widgetLgUser">
//             <img
//               src="https://img2.freepng.es/20180428/vkw/kisspng-computer-icons-avatar-user-profile-5ae456d60e4fd5.8740532115249138780586.jpg"
//               alt=""
//               className="widgetLgImg"
//             />
//             <span className="widgetLgName">Mafalda Quino</span>
//           </td>
//           <td className="widgetLgDate">2 Jun 2021</td>
//           <td className="widgetLgAmount">$122.00</td>
//           <td className="widgetLgStatus">
//             <Button type="Approved" />
//           </td>
//         </tr>
//       </table>
//     </div>
//   );
// }
