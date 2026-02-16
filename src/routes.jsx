import { Routes, Route } from 'react-router-dom'
import App from './App'
import React from 'react' 
import SalesReport from './Report/SalesReport'
import ProjectReport from './Report/ProjectReport'
import CustomerView from './Customer/View'
import CustomerNew from './Customer/CreateNew'
import LeadView from './Leads/LeadView'
import LeadCreate from './Leads/LeadCreate'
import ProjectView from './project/ProjectView'
import ProjectCreate from './project/ProjectCreate'
import Setting from './Setting/Setting'
import Notes from './application/Notes'
import Storage from './application/Storage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/salesReport" element={<SalesReport/>} />
      <Route path="/projectReport" element={<ProjectReport/>} />
      <Route path="/CustomerView" element={<CustomerView/>} />
      <Route path="/CustomerNew" element={<CustomerNew/>} />
      <Route path="/LeadView" element={<LeadView/>} />
      <Route path="/LeadCreate" element={<LeadCreate/>} />
      <Route path="/ProjectView" element={<ProjectView/>} />
      <Route path="/ProjectCreate" element={<ProjectCreate/>} />
      <Route path="/Setting" element={<Setting/>} />
      <Route path="/applicationNotes" element={<Notes/>} />
      <Route path="/applicationStorage" element={<Storage/>} />
    
    </Routes>
  )
}