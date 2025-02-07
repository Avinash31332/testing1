// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function CardsCarousel() {
//   const [data, setData] = useState({});
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 950);
//   useEffect(() => {
//     function handleResize() {
//       setIsSmallScreen(window.innerWidth <= 950);
//     }
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/admin/data`)
//       .then((res) => {
//         setData(res.data[1].uses);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className="my-4">
//       <p className="mx-4 my-2 text-3xl font-medium text-green-700">
//         What Naturopathy does?
//       </p>
//       <div
//         className={`${
//           isSmallScreen ? "flex-col" : ""
//         }flex p-4 w-full items-center gap-[10px]`}
//       >
//         {/* container-1 */}
//         <div className={`${isSmallScreen ? "w-full" : "w-1/2"} flex  flex-col`}>
//           {/* container-1-1 */}
//           <div className={`rounded-xl w-[100%] bg-gray-400 h-[500px]`}>
//             <img
//               src={`https://cdn.create.vista.com/api/media/medium/396234748/stock-photo-top-view-herbs-green-leaves-mortar-pestle-bottles-pills-wooden?token=`}
//               alt="image1"
//               className="object-cover rounded-lg w-[100%] h-[100%]"
//             />
//           </div>
//           {/* container-1-2 */}
//           <div className="flex gap-[10px]">
//             <div
//               className={`p-4 flex items-center rounded-xl w-1/2 my-2 bg-green-700 h-[300px] text-gray-100
//               `}
//             >
//               {/* image <link rel="stylesheet" href="bg-[url('https://st4.depositphotos.com/1000589/21181/i/450/depositphotos_211816808-stock-photo-bottles-essential-oils-herbal-medicine.jpg')]" /> */}
//               <p className="text-lg font-medium">
//                 Naturopathy focuses on healing the body naturally by addressing
//                 the root cause of health issues rather than just the symptoms.
//                 It enhances overall well-being through holistic treatments and
//                 lifestyle modifications.
//               </p>
//             </div>
//             <div
//               className={`flex items-center justify-center rounded-xl w-1/2 my-2 bg-gray-300 h-[300px]`}
//             >
//               <p>School</p>
//             </div>
//           </div>
//         </div>

//         {/* container-2 */}
//         <div className={`${isSmallScreen ? "w-full" : "w-1/2"} flex  flex-col`}>
//           {/* container-2-1 */}
//           {/* container-2-2 */}
//           <div className="flex gap-[10px]">
//             <div
//               className={`rounded-xl w-1/2 mb-2 bg-gray-300 h-[300px]`}
//             ></div>
//             <div
//               className={`rounded-xl w-1/2 mb-2 bg-gray-300 h-[300px]`}
//             ></div>
//           </div>
//           <div
//             className={`bg-cover rounded-xl w-[100%] bg-gray-400 h-[500px] bg-[url('https://t4.ftcdn.net/jpg/07/90/17/99/360_F_790179961_6TU3ajIxJ7HLByyem957OrbCe8YQgTY9.jpg')]`}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CardsCarousel;
