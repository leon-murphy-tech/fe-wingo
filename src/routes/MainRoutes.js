import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// pages routing
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

///

const ManifestPage = Loadable(lazy(() => import('pages/shipment/manifest/manifest')));
const AllShipment = Loadable(lazy(() => import('pages/shipment/allShipment')));
const CreateNewShipment = Loadable(lazy(() => import('pages/shipment/createNewShipment')));
const TrackingPage = Loadable(lazy(() => import('pages/shipment/tracking')));
const ListAllUserPage = Loadable(lazy(() => import('pages/manage/listAllUser')));
const AddressBookPage = Loadable(lazy(() => import('pages/addressBook/index')));
const EditShipment = Loadable(lazy(() => import('pages/shipment/EditShipment')));
const CreateManifest = Loadable(lazy(() => import('pages/shipment/manifest/createManifest')));
const EditManifest = Loadable(lazy(() => import('pages/shipment/manifest/editManifest')));
const ViewShipmentDetail = Loadable(lazy(() => import('pages/shipment/shipmentView')));
const ContactUs = Loadable(lazy(() => import('pages/contact')));

// render - sample page
const DashboardPage = Loadable(lazy(() => import('pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <DashboardPage />
        },
        {
          path: 'shipment',
          // element: <CommonLayout />,
          children: [
            {
              path: 'allShipment',
              element: <AllShipment />
            },
            {
              path: 'manifestShipment',
              // element: <ManifestPage />,
              children: [
                {
                  path: 'all',
                  element: <ManifestPage />
                },
                {
                  path: 'create',
                  element: <CreateManifest />
                },
                {
                  path: 'edit/:id',
                  element: <EditManifest />
                }
              ]
            },
            {
              path: 'trackingShipment',
              element: <TrackingPage />
            },
            {
              path: 'editShipment/:id',
              element: <EditShipment />
            },
            {
              path: 'createNewShipment',
              element: <CreateNewShipment />
            },
            {
              path: 'viewShipmentDetail/:id',
              element: <ViewShipmentDetail />
            }
          ]
        },

        {
          path: 'addressBook',
          element: <AddressBookPage />
        },
        {
          path: 'contact',
          element: <ContactUs />
        },
        {
          path: 'manage',
          children: [
            {
              path: 'allUser',
              element: <ListAllUserPage />
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    }
  ]
};

export default MainRoutes;
