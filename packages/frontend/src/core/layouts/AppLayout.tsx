import { Outlet } from 'react-router-dom';
import { useUIStore } from '../state/uiStore';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Footer } from '../../components/navigation/Footer';

export const AppLayout = () => {
  const { toggleSidebar } = useUIStore();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
              ☰
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

// import { Outlet } from 'react-router-dom';
// import { useUIStore } from '../state/uiStore';
// import { Sidebar } from '../../components/navigation/Sidebar';
// import { Footer } from '../../components/navigation/Footer';

// export const AppLayout = () => {
//   const { toggleSidebar } = useUIStore();

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar />

//         <div className="flex-1 flex flex-col overflow-hidden">
//           <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
//             <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
//               ☰
//             </button>
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
//             </div>
//           </header>

//           <main className="flex-1 overflow-y-auto">
//             <div className="p-6">
//               <Outlet />
//             </div>
//           </main>

//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };
