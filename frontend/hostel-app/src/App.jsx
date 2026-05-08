import './App.css'
import {Route , Routes} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './pages/tenant/profile'
import Dashboard from './pages/tenant/dashboard'
import NotFound from './components/NotFound'
import Complaints from './pages/tenant/complaints'
import Feedback from './pages/tenant/feedback'
import Room from './pages/tenant/room'
import AdminRooms from './pages/admin/rooms'
import Menu from './pages/tenant/menu'
import BookRoom from './pages/tenant/bookRoom'
import AdminDashboard from './pages/admin/dashboard'
import Tenants from './pages/admin/tenants'
import FeePayment from './pages/tenant/feePayment'
import FeePayments from './pages/admin/feePayments'
import AdminComplaints from './pages/admin/complaints'
import AdminFeedback from './pages/admin/feedback'
import Attendance from './pages/admin/attendance'
import ForgetPassword from './components/ForgetPassword'
import Announcement from './pages/tenant/announcements'
import AdminAnnouncements from './pages/admin/announcements'
import UpdateProfile from './pages/tenant/updateProfile'
import AddRoom from './pages/admin/addRoom'
import ViewFeedback from './pages/tenant/viewFeedback'
import AvailableRooms from './pages/tenant/availableRooms'
import ViewComplaints from './pages/tenant/viewComplaints'
import EmergencyContacts from './pages/tenant/emergencyContacts'
import StockManagement from './pages/admin/stockManagement'
import AddStock from './pages/admin/addStock'
import Contacts from './pages/admin/contacts'
import ContactForm from './pages/admin/contactForm'
import StockHelp from './pages/admin/stockHelp'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/admin/profile" element={<Tenants />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/room" element={<Room />} />
      <Route path="/add-room" element={<AddRoom />} />
      <Route path="/forget-password" element={<ForgetPassword />} /> 
      <Route path="/admin/rooms" element={<AdminRooms />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/book-room" element={<BookRoom />} />
      <Route path="/rent-payment" element={<FeePayment />} />
      <Route path="/admin/fee-payment" element={<FeePayments />} />
      <Route path="/admin/complaints" element={<AdminComplaints />} />
      <Route path="/admin/feedback" element={<AdminFeedback />} />
      <Route path="/admin/attendance" element={<Attendance />} />
      <Route path="/announcements" element={<Announcement />} />
      <Route path="/admin/announcements" element={<AdminAnnouncements />} />
      <Route path="/view-feedback" element={<ViewFeedback />} />
      <Route path="/available-rooms" element={<AvailableRooms />} />
      <Route path="/view-complaints" element={<ViewComplaints />} />
      <Route path="/emergency-contacts" element={<EmergencyContacts />} />
      <Route path="/admin/stock-management" element={<StockManagement />} />
      <Route path="/admin/add-stock" element={<AddStock />} />
      <Route path="/admin/contacts" element={<Contacts />} />
      <Route path="/admin/contacts/contact-form" element={<ContactForm />} />
      <Route path="/admin/stock-help" element={<StockHelp />} />
      <Route path="*" element={<NotFound />} />
    </Routes> 
  ) 
}

export default App
