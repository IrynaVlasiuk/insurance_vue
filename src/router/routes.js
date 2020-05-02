import DashboardLayout from 'src/components/Dashboard/Layout/DashboardLayout.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import ForgotPassword from 'src/components/Dashboard/Views/Pages/ForgotPassword.vue'
import Dashboard from 'src/components/Gedosin/Dashboard/Dashboard.vue'

import Main from 'src/components/Gedosin/Management/Claims/ClaimsMain.vue'
import Claims from 'src/components/Gedosin/Management/Claims/Claims.vue'

import ClaimMap from 'src/components/Gedosin/Maps/ClaimMap.vue'

import ClaimCreatePage from 'src/components/Gedosin/Management/Claims/ClaimCreate.vue'
import SurveysListPage from 'src/components/Gedosin/Management/Surveys/SurveysListPage.vue'
import DocumentsIndexPage from 'src/components/Gedosin/Management/Documents/DocumentsIndexPage.vue'

import Users from 'src/components/Gedosin/Administration/Users/Users.vue'
import ActiveUsers from 'src/components/Gedosin/Administration/Users/ActiveUsers.vue'
import UserDetailsPage from 'src/components/Gedosin/Administration/Users/show/UserDetailsPage.vue'

import UserCreatePage from 'src/components/Gedosin/Administration/Users/create/UserCreatePage.vue'

import ExcelImport from 'src/components/Gedosin/Administration/ExcelImport/ExcelImport.vue'
import Roles from 'src/components/Gedosin/Administration/Roles/Roles.vue'

import SurveyCreate from 'src/components/Gedosin/Management/Surveys/SurveyCreate.vue'
import SurveyShow from 'src/components/Gedosin/Management/Surveys/SurveyShow.vue'
import UserProfilePage from 'src/components/Gedosin/Management/Profile/UserProfilePage.vue'

import ContractDetailsLayout from 'src/components/Gedosin/Management/Contracts/show/ContractDetailsLayout.vue'
import ContractGeneralDetails
  from 'src/components/Gedosin/Management/Contracts/show/components/ContractGeneralDetails.vue'
import ContractClaims from 'src/components/Gedosin/Management/Contracts/show/components/ContractClaims.vue'

import ClaimDetailsLayout from 'src/components/Gedosin/Management/Claims/Components/ClaimDetailsLayout.vue'
import ClaimDetails from 'src/components/Gedosin/Management/Claims/Components/ClaimDetails.vue'
import ClaimDamageSurveys from 'src/components/Gedosin/Management/Claims/Components/ClaimDamageSurveys.vue'
import ClaimHistory from 'src/components/Gedosin/Management/Claims/Components/ClaimHistory.vue'

const routes = [
  {
    path: '/login', // Login page
    component: Login,
    name: 'login'
  },
  {
    path: '/forgot-password', // Forgot Password
    component: ForgotPassword,
    name: 'forgot'
  },
  {
    path: '/surveys',
    component: DashboardLayout,
    redirect: '/surveys',
    children: [
      {
        path: '/surveys',
        name: 'routes.search_surveys',
        component: SurveysListPage, // layout
        props: true,
      }
    ]
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Tableau de bord',
        component: Dashboard
      },
      {
        path: 'claim-map',
        name: 'Carte',
        component: ClaimMap
      },
      {
        path: 'profile',
        name: 'Mon Profil',
        component: UserProfilePage
      },
      {
        path: 'documents',
        name: 'Documents',
        component: DocumentsIndexPage
      },
      {
        path: 'claims',
        component: Main, // layout
        props: true,
        children: [
          {
            path: '/:id',
            name: 'routes.search_claims',
            component: Claims
          },
          {
            path: '/claims/:id',
            component: ClaimDetailsLayout, // Works good
            props: true,
            children: [
              {
                path: '/',
                name: 'Détails du sinistre',
                component: ClaimDetails
              },
              {
                path: 'surveys',
                name: 'routes.search_surveys',
                component: ClaimDamageSurveys
              },
              {
                path: 'history',
                name: 'routes.history',
                component: ClaimHistory
              }
            ]
          }
        ]
      },
      {
        path: 'claim/create',
        name: 'Create Claim',
        component: ClaimCreatePage
      },
      {
        path: 'claim/:claim_id/survey/create',
        name: 'Planifier un rendez-vous',
        component: SurveyCreate
      },
      {
        path: 'surveys/:survey_id', // /surveys/:survey_id
        name: 'Détails du rendez-vous',
        component: SurveyShow
      },
      /** Contract Related Routes **/
      {
        path: 'contract/:id',
        component: ContractDetailsLayout,
        props: true,
        children: [
          {
            path: '/',
            name: 'routes.contract_details',
            component: ContractGeneralDetails
          },
          {
            path: 'contract-claims',
            name: 'Sinistres du contrat',
            component: ContractClaims
          }
        ]
      },
    ]
  },
  // Management
  {
    path: '/',
    component: DashboardLayout
  },
  // Administration
  {
    path: '/gedosin/administration',
    component: DashboardLayout,
    children: [
      {
        path: 'Users',
        name: 'Users',
        component: Users
      },
      {
        path: 'users/create',
        name: 'Create User',
        component: UserCreatePage
      },
      {
        path: 'users/:user_id',
        name: 'User Details',
        component: UserDetailsPage
      },
      {
        path: 'supervisor',
        name: 'routes.active_users',
        component: ActiveUsers
      },
      {
        path: 'excelimport',
        name: 'ExcelImport',
        component: ExcelImport
      },
      {
        path: 'roles',
        name: 'Roles',
        component: Roles
      }
    ]
  },

]

export default routes
