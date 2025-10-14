import { useUser, SignIn } from "@clerk/clerk-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModelsManagement from "../components/ModelsManagement";
import AdminSetup from "../components/AdminSetup";


// Color constants
const GOLD = '#d4af37';
const NOTIF_BG = '#2a2a2a';
const DARK_BG = '#1a1a1a';
const SIDEBAR_BG = '#242424';
const CARD_BG = '#2d2d2d';
const STAT_BG = '#323232';
const BORDER_COLOR = '#404040';
const TEXT_PRIMARY = '#ffffff';
const TEXT_SECONDARY = '#b0b0b0';
const RADIUS = '12px';

// Main layout with proper space distribution
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${DARK_BG};
  color: ${TEXT_PRIMARY};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  padding: 0;

  @media (min-width: 769px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Desktop Sidebar with mobile hamburger functionality
const Sidebar = styled.aside`
  @media (min-width: 769px) {
    width: 280px;
    min-width: 280px;
    background: ${SIDEBAR_BG};
    padding: 2rem;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${BORDER_COLOR};
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${props => props.isOpen ? '0' : '-100%'};
    width: 280px;
    height: 100vh;
    background: ${SIDEBAR_BG};
    padding: 2rem;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${BORDER_COLOR};
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    transition: left 0.3s ease;
  }
`;

const MobileHeader = styled.div`
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${SIDEBAR_BG};
    padding: 1rem;
    border-bottom: 1px solid ${BORDER_COLOR};
    position: sticky;
    top: 0;
    z-index: 100;
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: ${TEXT_PRIMARY};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
  }
`;

const SidebarTitle = styled.h2`
  color: ${GOLD};
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 2rem;
`;

const NavButton = styled.button`
  background: ${props => props.active ? GOLD : 'transparent'};
  color: ${props => props.active ? '#000' : TEXT_PRIMARY};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.95rem;
  font-weight: ${props => props.active ? 600 : 500};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  position: relative;
  
  &:hover {
    background: ${props => props.active ? GOLD : 'rgba(212, 175, 55, 0.15)'};
    color: ${props => props.active ? '#000' : GOLD};
    transform: translateX(2px);
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  color: ${TEXT_SECONDARY};
  font-size: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid ${BORDER_COLOR};
  text-align: center;
`;

const MobileOverlay = styled.div`
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const CloseButton = styled.button`
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: ${TEXT_SECONDARY};
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background 0.2s ease;
    
    &:hover {
      background: rgba(212, 175, 55, 0.1);
      color: ${GOLD};
    }
  }
`;

// Enhanced Text Editor with formatting toolbar
const TextEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 8px;
  overflow: hidden;
`;

const EditorToolbar = styled.div`
  background: ${STAT_BG};
  padding: 0.5rem;
  border-bottom: 1px solid ${BORDER_COLOR};
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ToolbarButton = styled.button`
  background: ${props => props.active ? GOLD : 'transparent'};
  color: ${props => props.active ? '#000' : TEXT_SECONDARY};
  border: 1px solid ${BORDER_COLOR};
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? GOLD : 'rgba(212, 175, 55, 0.2)'};
    color: ${props => props.active ? '#000' : GOLD};
  }
`;

const EditorTextarea = styled.textarea`
  background: ${CARD_BG};
  color: ${TEXT_PRIMARY};
  border: none;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: vertical;
  min-height: 200px;
  outline: none;
  
  &::placeholder {
    color: ${TEXT_SECONDARY};
  }
`;

// Main content area with proper space utilization
const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  min-width: 0;
  width: 100%;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// Top bar with proper width utilization
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${CARD_BG};
  border-bottom: 1px solid ${BORDER_COLOR};
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  background: ${SIDEBAR_BG};
  border-radius: 2rem;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  gap: 0.75rem;
  border: 1px solid ${BORDER_COLOR};
`;

const ProfileInfo = styled.div`
  line-height: 1.3;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const AdminRole = styled.span`
  color: ${GOLD};
  font-size: 0.8rem;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: ${GOLD};
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f4c842;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  }
`;

// Content Card with better space utilization
const ContentCard = styled.section`
  background: ${CARD_BG};
  border-radius: ${RADIUS};
  border: 1px solid ${BORDER_COLOR};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1400px;
  width: calc(100% - 4rem);
  margin: 2rem;
  padding: 2rem;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: calc(100% - 2rem);
    margin: 1rem;
  }

  @media (max-width: 768px) {
    width: calc(100% - 2rem);
    margin: 1rem;
    padding: 1.5rem;
    overflow-x: auto;
  }
`;

// Stats section with improved desktop styling
const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  color: ${TEXT_PRIMARY};
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  color: ${TEXT_SECONDARY};
  margin: 0;
  font-size: 0.9rem;
`;

const AddButton = styled.button`
  background: ${GOLD};
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f4c842;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: ${STAT_BG};
  border-radius: ${RADIUS};
  border: 1px solid ${BORDER_COLOR};
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${GOLD};
  margin-bottom: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${TEXT_PRIMARY};
  margin-bottom: 0.5rem;
`;

const ActivitySection = styled.div`
  background: ${STAT_BG};
  border-radius: ${RADIUS};
  border: 1px solid ${BORDER_COLOR};
  padding: 1.5rem;
`;

const ActivityTitle = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: ${TEXT_PRIMARY};
`;

// Table styles with better desktop design
const AdminTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  background: ${CARD_BG};
  border-radius: ${RADIUS};
  overflow: hidden;
  border: 1px solid ${BORDER_COLOR};

  @media (max-width: 768px) {
    min-width: 600px;
    overflow-x: auto;
  }
`;

const TableHeader = styled.th`
  background: ${STAT_BG};
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${TEXT_PRIMARY};
  font-size: 0.9rem;
  border-bottom: 1px solid ${BORDER_COLOR};
`;

const TableCell = styled.td`
  padding: 1rem;
`;

const TableRow = styled.tr`
  background: ${CARD_BG};
`;

const ActionButton = styled.button`
  background: ${props => props.danger ? '#dc3545' : GOLD};
  color: ${props => props.danger ? '#fff' : '#000'};
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  margin-right: ${props => props.danger ? '0' : '0.5rem'};
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.danger ? '#c82333' : '#f4c842'};
    transform: translateY(-1px);
  }
`;

function AdminDashboard() {
  // Notification dropdown state
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  
  // Session management
  const [adminSessionToken, setAdminSessionToken] = useState(localStorage.getItem('adminSessionToken'));
  const createSession = useMutation(api.adminSessions.createSession);
  const invalidateSession = useMutation(api.adminSessions.invalidateSession);
  const handleLogout = async () => {
    // Invalidate admin session
    if (adminSessionToken) {
      try {
        await invalidateSession({ sessionToken: adminSessionToken });
        localStorage.removeItem('adminSessionToken');
        setAdminSessionToken(null);
      } catch (error) {
        console.error('Failed to invalidate session:', error);
      }
    }
    
    if (window.Clerk) {
      window.Clerk.signOut();
    } else if (typeof window !== 'undefined') {
      // Fallback: redirect to Clerk sign out URL
      window.location.href = '/sign-out';
    }
  };
  const userId = user?.id;
  const notifications = useQuery(api.notifications.getForUser, userId ? { userId } : { userId: "" });
  const markRead = useMutation(api.notifications.markRead);
  
  // Check if any admin users exist
  const adminUsers = useQuery(api.adminUsers.getAll);
  const currentUserEmail = user?.emailAddresses?.[0]?.emailAddress;
  const isCurrentUserAdmin = adminUsers?.some(admin => admin.email === currentUserEmail && admin.status === 'active');
  
  // Create admin session when user is authenticated and is an admin
  useEffect(() => {
    if (isSignedIn && user && isCurrentUserAdmin && !adminSessionToken) {
      const createAdminSession = async () => {
        try {
          const session = await createSession({
            userId: user.id,
            email: user.emailAddresses?.[0]?.emailAddress || "",
          });
          setAdminSessionToken(session.sessionToken);
          localStorage.setItem('adminSessionToken', session.sessionToken);
        } catch (error) {
          console.error('Failed to create admin session:', error);
        }
      };
      createAdminSession();
    }
  }, [isSignedIn, user, isCurrentUserAdmin, adminSessionToken, createSession]);
  
    // Blog management state
    const blogs = useQuery(api.blogs.getAll) || [];
    const createBlog = useMutation(api.blogs.create);
    const updateBlog = useMutation(api.blogs.update);
    const deleteBlog = useMutation(api.blogs.remove);
    const [blogForm, setBlogForm] = useState({
      title: "",
      subtitle: "",
      date: "",
      excerpt: "",
      content: "",
      author: "",
      imageUrl: ""
    });
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [blogError, setBlogError] = useState("");

    const handleBlogFormChange = (e) => {
      setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
      setBlogError("");
    };

    const handleEditBlog = (blog) => {
      setBlogForm({
        title: blog.title,
        subtitle: blog.subtitle,
        date: blog.date,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        imageUrl: blog.imageUrl || ""
      });
      setEditingBlogId(blog._id);
      setShowBlogForm(true);
    };

    const handleDeleteBlog = async (id) => {
      if (window.confirm("Delete this blog post?")) {
        if (!adminSessionToken) {
          alert("Session expired. Please refresh the page.");
          return;
        }
        try {
          await deleteBlog({ id, sessionToken: adminSessionToken });
        } catch (error) {
          console.error('Error deleting blog:', error);
          alert(error.message || "Failed to delete blog post.");
        }
      }
    };

    const notifyBlogAction = useMutation(api.notifications.create);
    const handleSaveBlog = async () => {
      // Basic validation
      if (!blogForm.title.trim() || !blogForm.content.trim() || !blogForm.date.trim()) {
        setBlogError("Title, date, and content are required.");
        return;
      }
      if (!adminSessionToken) {
        setBlogError("Session expired. Please refresh the page.");
        return;
      }
      try {
        let actionType;
        if (editingBlogId) {
          await updateBlog({ id: editingBlogId, ...blogForm, sessionToken: adminSessionToken });
          actionType = "updated";
        } else {
          await createBlog({ ...blogForm, sessionToken: adminSessionToken });
          actionType = "created";
        }
        // Trigger notification for blog action
        await notifyBlogAction({
          message: `Blog post '${blogForm.title}' was ${actionType}.`,
          type: "info",
          userId: userId || "admin"
        });
        setBlogForm({ title: "", subtitle: "", date: "", excerpt: "", content: "", author: "", imageUrl: "" });
        setEditingBlogId(null);
        setShowBlogForm(false);
        setBlogError("");
      } catch (error) {
        console.error('Error saving blog:', error);
        setBlogError(error.message || "Failed to save blog post.");
      }
    };
  // ...existing code...
  useEffect(() => {
    if (user?.id) {
      console.log("Clerk user ID:", user.id);
    }
  }, [user]);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Text editor helper functions
  const insertTextAtCursor = (textarea, text) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;
    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
    return { newValue, newCursorPos: start + text.length };
  };

  const wrapSelectedText = (textarea, wrapper) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const wrappedText = `${wrapper}${selectedText}${wrapper}`;
    const currentValue = textarea.value;
    const newValue = currentValue.substring(0, start) + wrappedText + currentValue.substring(end);
    return { newValue, newCursorPos: end + wrapper.length * 2 };
  };

  const handleTextFormat = (format) => {
    const textarea = document.querySelector('#blog-content-editor');
    if (!textarea) return;

    let result;
    switch (format) {
      case 'bold':
        result = wrapSelectedText(textarea, '**');
        break;
      case 'italic':
        result = wrapSelectedText(textarea, '_');
        break;
      case 'heading':
        result = insertTextAtCursor(textarea, '\n## ');
        break;
      case 'link':
        result = insertTextAtCursor(textarea, '[Link Text](https://example.com)');
        break;
      case 'image':
        result = insertTextAtCursor(textarea, '![Alt Text](https://example.com/image.jpg)');
        break;
      case 'list':
        result = insertTextAtCursor(textarea, '\n- ');
        break;
      default:
        return;
    }

    setBlogForm({...blogForm, content: result.newValue});
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(result.newCursorPos, result.newCursorPos);
    }, 0);
  };

  // Admin user management state
  const createAdmin = useMutation(api.adminUsers.create);
  const updateAdmin = useMutation(api.adminUsers.update);
  const deleteAdmin = useMutation(api.adminUsers.remove);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [adminError, setAdminError] = useState('');

  const handleAdminFormChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
    setAdminError('');
  };

  const handleEditAdmin = (admin) => {
    setAdminForm({
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
    setEditingAdminId(admin._id);
    setShowAdminForm(true);
  };

  const handleDeleteAdmin = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin user?")) {
      if (!adminSessionToken) {
        alert("Session expired. Please refresh the page.");
        return;
      }
      try {
        await deleteAdmin({ id, sessionToken: adminSessionToken });
      } catch (error) {
        alert(error.message || 'Failed to delete admin user.');
      }
    }
  };

  const handleSaveAdmin = async (e) => {
    e.preventDefault();
    if (!adminForm.name.trim() || !adminForm.email.trim() || !adminForm.role) {
      setAdminError("All fields are required.");
      return;
    }
    if (!adminSessionToken) {
      setAdminError("Session expired. Please refresh the page.");
      return;
    }

    try {
      if (editingAdminId) {
        await updateAdmin({
          id: editingAdminId,
          ...adminForm,
          status: 'active',
          sessionToken: adminSessionToken
        });
      } else {
        await createAdmin({
          ...adminForm,
          createdBy: userId || 'system',
          sessionToken: adminSessionToken
        });
      }

      setAdminForm({ name: '', email: '', role: '' });
      setEditingAdminId(null);
      setShowAdminForm(false);
      setAdminError('');
    } catch (error) {
      setAdminError(error.message || 'Failed to save admin user.');
    }
  };

  // Site settings state
  const settings = useQuery(api.settings.get);
  const [settingsError, setSettingsError] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const updateSettings = useMutation(api.settings.update);
  const initSettings = useMutation(api.settings.initDefault);

  useEffect(() => {
    if (settings === undefined) {
      setSettingsLoading(true);
      setSettingsError(null);
    } else if (settings === null) {
      // Initialize default settings
      initSettings().then(() => {
        setSettingsLoading(false);
        setSettingsError(null);
      }).catch(() => {
        setSettingsLoading(false);
        setSettingsError("Failed to initialize settings. Please try again.");
      });
    } else {
      setSettingsLoading(false);
      setSettingsError(null);
    }
  }, [settings, initSettings]);
  const [form, setForm] = useState({
    siteName: "",
    logoUrl: "",
    contactEmail: "",
    phoneNumber: "",
    address: ""
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Load settings from backend
  useEffect(() => {
    if (settings) {
      setForm({
        siteName: settings.siteName || "",
        logoUrl: settings.logoUrl || "",
        contactEmail: settings.contactEmail || "",
        phoneNumber: settings.phoneNumber || "",
        address: settings.address || ""
      });
    }
  }, [settings]);

  // Handle form changes
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  // Strict validation
  const validate = () => {
    const newErrors = {};
    if (!form.siteName.trim()) newErrors.siteName = "Site name is required.";
    if (!form.logoUrl.trim()) newErrors.logoUrl = "Logo URL is required.";
    if (!form.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.contactEmail)) {
      newErrors.contactEmail = "Enter a valid email address.";
    }
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    return newErrors;
  };

  // Toast notification
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  // Save settings to backend
  const handleSaveSettings = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setSaving(true);
    try {
      await updateSettings(form);
      showToast("Settings saved successfully!", "success");
    } catch {
      showToast("Failed to save settings.", "error");
    }
    setSaving(false);
  };

  if (!isSignedIn) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: DARK_BG,
        zIndex: 9999,
        flexDirection: 'column'
      }}>
        <SignIn />
      </div>
    );
  }

  // Show admin setup if no admin users exist
  if (adminUsers !== undefined && adminUsers.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: DARK_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AdminSetup />
      </div>
    );
  }

  // Show access denied if user is signed in but not an admin
  if (adminUsers !== undefined && adminUsers.length > 0 && !isCurrentUserAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        background: DARK_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: TEXT_PRIMARY,
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#ff4444', marginBottom: '1rem' }}>Access Denied</h2>
        <p style={{ marginBottom: '2rem', color: TEXT_SECONDARY }}>You are not authorized to access the admin panel.</p>
        <button 
          onClick={handleLogout}
          style={{
            background: GOLD,
            color: '#000',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  // Desktop sidebar layout with mobile hamburger menu
  return (
    <DashboardContainer>
      {/* Mobile Header with Hamburger Menu */}
      <MobileHeader>
        <HamburgerButton onClick={() => setMobileSidebarOpen(true)}>
          ☰
        </HamburgerButton>
        <SidebarTitle style={{margin: 0, fontSize: '1.3rem'}}>Admin Panel</SidebarTitle>
        <div style={{width: '40px'}} /> {/* Spacer for centering */}
      </MobileHeader>

      {/* Mobile Overlay */}
      <MobileOverlay isOpen={mobileSidebarOpen} onClick={() => setMobileSidebarOpen(false)} />

      {/* Sidebar (Desktop always visible, Mobile slide-in) */}
      <Sidebar isOpen={mobileSidebarOpen}>
        <CloseButton onClick={() => setMobileSidebarOpen(false)}>
          ✕
        </CloseButton>
        <SidebarTitle>Admin Panel</SidebarTitle>
        <NavList>
          <NavButton 
            active={activeSection === 'dashboard'} 
            onClick={() => {
              setActiveSection('dashboard');
              setMobileSidebarOpen(false);
            }}
          >
            Dashboard
          </NavButton>
          <NavButton 
            active={activeSection === 'models'} 
            onClick={() => {
              setActiveSection('models');
              setMobileSidebarOpen(false);
            }}
          >
            Models
          </NavButton>
          <NavButton 
            active={activeSection === 'blog'} 
            onClick={() => {
              setActiveSection('blog');
              setMobileSidebarOpen(false);
            }}
          >
            Blog
          </NavButton>
          <NavButton 
            active={activeSection === 'analytics'} 
            onClick={() => {
              setActiveSection('analytics');
              setMobileSidebarOpen(false);
            }}
          >
            Analytics
          </NavButton>
          <NavButton 
            active={activeSection === 'admins'} 
            onClick={() => {
              setActiveSection('admins');
              setMobileSidebarOpen(false);
            }}
          >
            Admins
          </NavButton>
          <NavButton 
            active={activeSection === 'settings'} 
            onClick={() => {
              setActiveSection('settings');
              setMobileSidebarOpen(false);
            }}
          >
            Settings
          </NavButton>
        </NavList>
        <SidebarFooter>
          © 2025 GenV Studios
        </SidebarFooter>
      </Sidebar>

      {/* Main Content Area */}
      <MainContent>
        {/* TopBar with profile/logout */}
        <TopBar>
          <ProfileBox>
            <img 
              src={user?.imageUrl || "https://via.placeholder.com/40"} 
              alt="Profile" 
              style={{width: "40px", height: "40px", borderRadius: "50%"}} 
            />
            <ProfileInfo>
              {user?.firstName || user?.fullName || "Admin"}<br />
              <AdminRole>
                {adminUsers?.find(admin => admin.email === currentUserEmail)?.role?.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Admin'}
              </AdminRole>
            </ProfileInfo>
          </ProfileBox>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  transition: 'background 0.2s ease'
                }}
                aria-label="Notifications"
                onClick={() => setShowDropdown((v) => !v)}
                onMouseEnter={(e) => e.target.style.background = 'rgba(212, 175, 55, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'none'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </button>
              {showDropdown && (
                <div style={{ 
                  position: 'absolute', 
                  top: '3rem', 
                  right: 0, 
                  minWidth: '360px', 
                  background: NOTIF_BG, 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)', 
                  zIndex: 9999, 
                  padding: '1.5rem', 
                  color: TEXT_PRIMARY, 
                  border: `1px solid ${BORDER_COLOR}` 
                }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: GOLD }}>Notifications</div>
                  {notifications ? (
                    notifications
                      .sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1))
                      .slice(0, 4)
                      .map((notif) => {
                        let icon, color;
                        if (notif.type === 'success') {
                          icon = <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke={GOLD} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>;
                          color = GOLD;
                        } else if (notif.type === 'warning') {
                          icon = <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke="#e67e22" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>;
                          color = '#e67e22';
                        } else if (notif.type === 'info') {
                          icon = <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke="#3498db" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>;
                          color = '#3498db';
                        } else {
                          icon = <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke={TEXT_PRIMARY} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>;
                          color = TEXT_PRIMARY;
                        }
                        return (
                          <div key={notif._id} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '0.75rem', 
                            background: notif.read ? SIDEBAR_BG : CARD_BG, 
                            cursor: 'pointer', 
                            transition: 'all 0.2s', 
                            borderRadius: '8px', 
                            marginBottom: '0.5rem', 
                            border: notif.read ? 'none' : `1px solid ${BORDER_COLOR}` 
                          }}
                            onClick={async () => { if (!notif.read) await markRead({ id: notif._id }); }}>
                            {icon}
                            <div style={{ fontWeight: notif.read ? 400 : 600, color, flex: 1, fontSize: '0.9rem' }}>{notif.message}</div>
                            <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginLeft: '12px', minWidth: '100px', textAlign: 'right' }}>{new Date(notif.createdAt).toLocaleString()}</div>
                          </div>
                        );
                      })
                  ) : (
                    <div style={{ color: TEXT_SECONDARY, fontSize: '0.9rem', padding: '1rem 0', textAlign: 'center' }}>No notifications.</div>
                  )}
                  <button
                    style={{background: GOLD, color: '#000', border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem', fontWeight: 600, cursor: 'pointer', marginTop: '1rem', width: '100%', fontSize: '0.9rem'}}
                    onClick={() => navigate('/admin/notifications')}
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </div>
            <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
          </div>
        </TopBar>
        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <ContentCard>
            <StatsHeader>
              <div>
                <SectionTitle>Dashboard Overview</SectionTitle>
                <SectionSubtitle>Quick insights & system actions</SectionSubtitle>
              </div>
              <AddButton>+ Add New Model</AddButton>
            </StatsHeader>
            <StatsGrid>
              <StatCard>
                <StatLabel>Total Models</StatLabel>
                <StatValue>2</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Blog Posts</StatLabel>
                <StatValue>1</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Visitors (7d)</StatLabel>
                <StatValue>200</StatValue>
              </StatCard>
            </StatsGrid>
            <ActivitySection>
              <ActivityTitle>Recent Activity</ActivityTitle>
              {/* Activity content can be added here */}
            </ActivitySection>
          </ContentCard>
        )}
        {/* Models Section */}
        {activeSection === 'models' && (
          <ContentCard>
            <ModelsManagement sessionToken={adminSessionToken} />
          </ContentCard>
        )}
        {/* Blog Section */}
        {activeSection === 'blog' && (
            <ContentCard>
              <SectionTitle>Blog</SectionTitle>
              <SectionSubtitle>Manage and publish blog posts</SectionSubtitle>
              <button
                style={{ background: GOLD, color: '#111', border: 'none', borderRadius: '8px', padding: '0.7rem 1.2rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem', alignSelf: 'flex-start' }}
                onClick={() => {
                  setShowBlogForm(true);
                  setEditingBlogId(null);
                  setBlogForm({ title: "", subtitle: "", date: "", excerpt: "", content: "", author: "" });
                }}
              >+ Add New Blog</button>
              {showBlogForm && (
                <form style={{display: 'flex', flexDirection: 'column', gap: '1rem', background: STAT_BG, borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: `1px solid ${BORDER_COLOR}`}} onSubmit={e => e.preventDefault()}>
                  <h3 style={{color: GOLD, margin: '0 0 1rem 0'}}>
                    {editingBlogId ? 'Edit Blog Post' : 'Add New Blog Post'}
                  </h3>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                    <input 
                      name="title" 
                      type="text" 
                      placeholder="Title" 
                      value={blogForm.title} 
                      onChange={handleBlogFormChange} 
                      style={{
                        padding: '0.75rem', 
                        borderRadius: 8, 
                        border: `1px solid ${BORDER_COLOR}`, 
                        background: CARD_BG, 
                        color: TEXT_PRIMARY
                      }} 
                      required 
                    />
                    <input 
                      name="date" 
                      type="date" 
                      placeholder="Date" 
                      value={blogForm.date} 
                      onChange={handleBlogFormChange} 
                      style={{
                        padding: '0.75rem', 
                        borderRadius: 8, 
                        border: `1px solid ${BORDER_COLOR}`, 
                        background: CARD_BG, 
                        color: TEXT_PRIMARY
                      }} 
                      required 
                    />
                  </div>
                  <input 
                    name="subtitle" 
                    type="text" 
                    placeholder="Subtitle" 
                    value={blogForm.subtitle} 
                    onChange={handleBlogFormChange} 
                    style={{
                      padding: '0.75rem', 
                      borderRadius: 8, 
                      border: `1px solid ${BORDER_COLOR}`, 
                      background: CARD_BG, 
                      color: TEXT_PRIMARY
                    }} 
                  />
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                    <input 
                      name="author" 
                      type="text" 
                      placeholder="Author" 
                      value={blogForm.author} 
                      onChange={handleBlogFormChange} 
                      style={{
                        padding: '0.75rem', 
                        borderRadius: 8, 
                        border: `1px solid ${BORDER_COLOR}`, 
                        background: CARD_BG, 
                        color: TEXT_PRIMARY
                      }} 
                    />
                    <input 
                      name="imageUrl" 
                      type="url" 
                      placeholder="Image URL" 
                      value={blogForm.imageUrl} 
                      onChange={handleBlogFormChange} 
                      style={{
                        padding: '0.75rem', 
                        borderRadius: 8, 
                        border: `1px solid ${BORDER_COLOR}`, 
                        background: CARD_BG, 
                        color: TEXT_PRIMARY
                      }} 
                    />
                  </div>
                  <input 
                    name="excerpt" 
                    type="text" 
                    placeholder="Excerpt" 
                    value={blogForm.excerpt} 
                    onChange={handleBlogFormChange} 
                    style={{
                      padding: '0.75rem', 
                      borderRadius: 8, 
                      border: `1px solid ${BORDER_COLOR}`, 
                      background: CARD_BG, 
                      color: TEXT_PRIMARY
                    }} 
                  />
                  
                  {/* Enhanced Text Editor */}
                  <div style={{marginBottom: '1rem'}}>
                    <label style={{color: GOLD, fontWeight: '500', marginBottom: '0.5rem', display: 'block'}}>
                      Content
                    </label>
                    <TextEditorContainer>
                      <EditorToolbar>
                        <ToolbarButton type="button" onClick={() => handleTextFormat('bold')} title="Bold">
                          <strong>B</strong>
                        </ToolbarButton>
                        <ToolbarButton type="button" onClick={() => handleTextFormat('italic')} title="Italic">
                          <em>I</em>
                        </ToolbarButton>
                        <ToolbarButton type="button" onClick={() => handleTextFormat('heading')} title="Heading">
                          H
                        </ToolbarButton>
                        <ToolbarButton type="button" onClick={() => handleTextFormat('link')} title="Link">
                          🔗
                        </ToolbarButton>
                        <ToolbarButton type="button" onClick={() => handleTextFormat('image')} title="Image">
                          🖼️
                        </ToolbarButton>
                        <ToolbarButton type="button" onClick={() => handleTextFormat('list')} title="List">
                          •
                        </ToolbarButton>
                      </EditorToolbar>
                      <EditorTextarea
                        id="blog-content-editor"
                        name="content"
                        placeholder="Write your blog content here... 

You can use:
- **bold text** for bold formatting
- _italic text_ for italic formatting  
- ## Heading for headings
- [Link Text](URL) for links
- ![Alt Text](Image URL) for images
- - List item for bullet lists"
                        value={blogForm.content}
                        onChange={handleBlogFormChange}
                        required
                      />
                    </TextEditorContainer>
                    <div style={{fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: '0.5rem'}}>
                      Use markdown syntax for formatting. Select text and click toolbar buttons for quick formatting.
                    </div>
                  </div>

                  {blogError && <div style={{color: '#dc3545', fontSize: '0.9rem'}}>{blogError}</div>}
                  <div style={{display: 'flex', gap: '1rem'}}>
                    <ActionButton type="button" onClick={handleSaveBlog}>
                      {editingBlogId ? 'Update Post' : 'Save Post'}
                    </ActionButton>
                    <ActionButton 
                      type="button" 
                      variant="delete"
                      onClick={() => { 
                        setShowBlogForm(false); 
                        setEditingBlogId(null); 
                        setBlogError(""); 
                        setBlogForm({
                          title: "", 
                          subtitle: "", 
                          date: "", 
                          excerpt: "", 
                          content: "", 
                          author: "", 
                          imageUrl: ""
                        });
                      }}
                    >
                      Cancel
                    </ActionButton>
                  </div>
                </form>
              )}
              <div style={{display: 'flex', flexDirection: 'column', gap: '1.2rem'}}>
                {blogs.length === 0 ? (
                  <div style={{color: '#ccc', textAlign: 'center'}}>No blog posts yet.</div>
                ) : (
                  blogs.map(blog => (
                    <div key={blog._id} style={{
                      background: CARD_BG,
                      borderRadius: '10px',
                      padding: '1.2rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      border: `1px solid #222`,
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      position: 'relative'
                    }}>
                      {blog.imageUrl && (
                        <img src={blog.imageUrl} alt={blog.title} style={{width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: '8px', marginBottom: '0.7rem'}} />
                      )}
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3 style={{margin: 0, color: GOLD}}>{blog.title}</h3>
                        <span style={{fontSize: '0.95rem', color: '#ccc'}}>{blog.date}</span>
                      </div>
                      <div style={{fontWeight: 500, color: GOLD}}>{blog.subtitle}</div>
                      <div style={{fontSize: '1rem', color: '#eee'}}>{blog.excerpt}</div>
                      <div style={{fontSize: '0.98rem', color: '#bbb', marginBottom: '0.5rem'}}>{blog.author}</div>
                      <div style={{fontSize: '0.98rem', color: '#ccc', marginBottom: '0.5rem'}}>{blog.content.slice(0, 120)}{blog.content.length > 120 ? '...' : ''}</div>
                      <div style={{display: 'flex', gap: '0.7rem', marginTop: '0.5rem'}}>
                        <button onClick={() => handleEditBlog(blog)} style={{background: GOLD, color: '#111', border: 'none', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer'}}>Edit</button>
                        <button onClick={() => handleDeleteBlog(blog._id)} style={{background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer'}}>Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ContentCard>
        )}
        {/* Analytics Section */}
        {activeSection === 'analytics' && (
          <ContentCard>
            <SectionTitle>Analytics Dashboard</SectionTitle>
            <SectionSubtitle>Real-time insights powered by Google Analytics</SectionSubtitle>
            
            {/* Quick Stats Grid */}
            <StatsGrid style={{marginBottom: '2rem'}}>
              <StatCard>
                <StatLabel>Total Visitors (30d)</StatLabel>
                <StatValue>2,340</StatValue>
                <div style={{fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: '0.5rem'}}>
                  ↑ 12% from last month
                </div>
              </StatCard>
              <StatCard>
                <StatLabel>Page Views</StatLabel>
                <StatValue>8,420</StatValue>
                <div style={{fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: '0.5rem'}}>
                  ↑ 8% from last month
                </div>
              </StatCard>
              <StatCard>
                <StatLabel>Avg Session Duration</StatLabel>
                <StatValue>3:42</StatValue>
                <div style={{fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: '0.5rem'}}>
                  ↑ 15% from last month
                </div>
              </StatCard>
            </StatsGrid>

            {/* Popular Pages */}
            <div style={{marginBottom: '2rem'}}>
              <h3 style={{color: GOLD, marginBottom: '1rem'}}>Most Popular Pages</h3>
              <div style={{background: STAT_BG, borderRadius: RADIUS, padding: '1rem', border: `1px solid ${BORDER_COLOR}`}}>
                {[
                  {page: '/models', views: '1,234', percentage: '35%'},
                  {page: '/about', views: '892', percentage: '25%'},
                  {page: '/blog', views: '567', percentage: '16%'},
                  {page: '/contact', views: '234', percentage: '7%'},
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: index < 3 ? `1px solid ${BORDER_COLOR}` : 'none'
                  }}>
                    <span style={{color: TEXT_PRIMARY}}>{item.page}</span>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                      <span style={{color: TEXT_SECONDARY, fontSize: '0.9rem'}}>{item.views} views</span>
                      <span style={{color: GOLD, fontWeight: '600', fontSize: '0.9rem'}}>{item.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div>
              <h3 style={{color: GOLD, marginBottom: '1rem'}}>Traffic Sources</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                {[
                  {source: 'Organic Search', visitors: '1,234', color: '#28a745'},
                  {source: 'Direct', visitors: '892', color: '#17a2b8'},
                  {source: 'Social Media', visitors: '567', color: '#ffc107'},
                  {source: 'Referral', visitors: '234', color: '#dc3545'},
                ].map((item, index) => (
                  <div key={index} style={{
                    background: STAT_BG,
                    borderRadius: RADIUS,
                    padding: '1rem',
                    border: `1px solid ${BORDER_COLOR}`,
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: item.color,
                      borderRadius: '50%',
                      margin: '0 auto 0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      {index === 0 ? '🔍' : index === 1 ? '🔗' : index === 2 ? '📱' : '↗️'}
                    </div>
                    <div style={{color: TEXT_PRIMARY, fontWeight: '600', marginBottom: '0.25rem'}}>
                      {item.source}
                    </div>
                    <div style={{color: GOLD, fontSize: '1.1rem', fontWeight: '700'}}>
                      {item.visitors}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(212, 175, 55, 0.1)',
              borderRadius: RADIUS,
              border: `1px solid ${GOLD}`,
              textAlign: 'center'
            }}>
              <div style={{color: GOLD, fontWeight: '600', marginBottom: '0.5rem'}}>
                📊 Google Analytics Integration Active
              </div>
              <div style={{color: TEXT_SECONDARY, fontSize: '0.9rem'}}>
                Data updates every 24 hours. Real-time tracking is enabled for your website.
              </div>
            </div>
          </ContentCard>
        )}
        {/* Admins Section */}
        {activeSection === 'admins' && (
          <ContentCard>
            <StatsHeader>
              <div>
                <SectionTitle>Admin Management</SectionTitle>
                <SectionSubtitle>Manage admin users, assign roles, and set permissions.</SectionSubtitle>
              </div>
              <AddButton onClick={() => setShowAdminForm(true)}>+ Add Admin</AddButton>
            </StatsHeader>
            
            {showAdminForm && (
              <form style={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem', 
                background: STAT_BG, 
                borderRadius: '12px', 
                padding: '1.5rem', 
                marginBottom: '2rem',
                border: `1px solid ${BORDER_COLOR}`
              }} onSubmit={handleSaveAdmin}>
                <h3 style={{color: GOLD, margin: '0 0 1rem 0'}}>
                  {editingAdminId ? 'Edit Admin User' : 'Add New Admin User'}
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={adminForm.name}
                    onChange={handleAdminFormChange}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`,
                      background: CARD_BG,
                      color: TEXT_PRIMARY
                    }}
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={adminForm.email}
                    onChange={handleAdminFormChange}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: `1px solid ${BORDER_COLOR}`,
                      background: CARD_BG,
                      color: TEXT_PRIMARY
                    }}
                    required
                  />
                </div>
                <select
                  name="role"
                  value={adminForm.role}
                  onChange={handleAdminFormChange}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${BORDER_COLOR}`,
                    background: CARD_BG,
                    color: TEXT_PRIMARY
                  }}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="super_admin">Super Admin - Full access to everything</option>
                  <option value="content_manager">Content Manager - Manage models, blogs, settings</option>
                  <option value="editor">Editor - Edit content but cannot publish/delete</option>
                  <option value="viewer">Viewer - Read-only access for clients</option>
                </select>
                {adminError && <div style={{color: '#dc3545', fontSize: '0.9rem'}}>{adminError}</div>}
                <div style={{display: 'flex', gap: '1rem'}}>
                  <ActionButton type="submit">
                    {editingAdminId ? 'Update Admin' : 'Create Admin'}
                  </ActionButton>
                  <ActionButton 
                    type="button" 
                    variant="delete" 
                    onClick={() => {
                      setShowAdminForm(false);
                      setEditingAdminId(null);
                      setAdminForm({name: '', email: '', role: ''});
                      setAdminError('');
                    }}
                  >
                    Cancel
                  </ActionButton>
                </div>
              </form>
            )}
            
            <AdminTable>
              <thead>
                <tr>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Last Login</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map(admin => (
                  <TableRow key={admin._id}>
                    <TableCell>{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <span style={{
                        background: admin.role === 'super_admin' ? GOLD : admin.role === 'content_manager' ? '#28a745' : admin.role === 'editor' ? '#17a2b8' : '#6c757d',
                        color: admin.role === 'super_admin' ? '#000' : '#fff',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {admin.role.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span style={{
                        background: admin.status === 'active' ? '#28a745' : '#dc3545',
                        color: '#fff',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {admin.status}
                      </span>
                    </TableCell>
                    <TableCell style={{fontSize: '0.85rem', color: TEXT_SECONDARY}}>
                      {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell>
                      <ActionButton onClick={() => handleEditAdmin(admin)}>Edit</ActionButton>
                      <ActionButton 
                        variant="delete" 
                        onClick={() => handleDeleteAdmin(admin._id)}
                      >
                        Delete
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </AdminTable>
          </ContentCard>
        )}
        {/* Settings Section */}
        {activeSection === 'settings' && (
          <ContentCard>
            <SectionTitle>Site Settings</SectionTitle>
            <SectionSubtitle>Configure branding and contact info</SectionSubtitle>
            {settingsLoading ? (
              <div style={{textAlign: 'center', padding: '2rem'}}>
                <span style={{fontSize: '1.2rem', color: GOLD}}>Loading settings...</span>
              </div>
            ) : settingsError ? (
              <div style={{textAlign: 'center', padding: '2rem'}}>
                <span style={{fontSize: '1.1rem', color: '#e74c3c'}}>{settingsError}</span>
              </div>
            ) : (
              <form style={{display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: 480}} onSubmit={e => e.preventDefault()}>
                <div>
                  <label style={{fontWeight: 500, color: GOLD}}>Site Name</label>
                  <input name="siteName" type="text" placeholder="My Website" value={form.siteName} onChange={handleFormChange} style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #333', marginTop: '0.4rem', background: '#191919', color: '#fff'}} />
                  {errors.siteName && <div style={{color: '#e74c3c', fontSize: '0.95rem', marginTop: '0.2rem'}}>{errors.siteName}</div>}
                </div>
                <div>
                  <label style={{fontWeight: 500, color: GOLD}}>Logo URL</label>
                  <input name="logoUrl" type="url" placeholder="https://example.com/logo.png" value={form.logoUrl} onChange={handleFormChange} style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #333', marginTop: '0.4rem', background: '#191919', color: '#fff'}} />
                  {errors.logoUrl && <div style={{color: '#e74c3c', fontSize: '0.95rem', marginTop: '0.2rem'}}>{errors.logoUrl}</div>}
                </div>
                <div>
                  <label style={{fontWeight: 500, color: GOLD}}>Contact Email</label>
                  <input name="contactEmail" type="email" placeholder="contact@example.com" value={form.contactEmail} onChange={handleFormChange} style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #333', marginTop: '0.4rem', background: '#191919', color: '#fff'}} />
                  {errors.contactEmail && <div style={{color: '#e74c3c', fontSize: '0.95rem', marginTop: '0.2rem'}}>{errors.contactEmail}</div>}
                </div>
                <div>
                  <label style={{fontWeight: 500, color: GOLD}}>Phone Number</label>
                  <input name="phoneNumber" type="tel" placeholder="+1234567890" value={form.phoneNumber} onChange={handleFormChange} style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #333', marginTop: '0.4rem', background: '#191919', color: '#fff'}} />
                  {errors.phoneNumber && <div style={{color: '#e74c3c', fontSize: '0.95rem', marginTop: '0.2rem'}}>{errors.phoneNumber}</div>}
                </div>
                <div>
                  <label style={{fontWeight: 500, color: GOLD}}>Address</label>
                  <input name="address" type="text" placeholder="123 Main St, City" value={form.address} onChange={handleFormChange} style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #333', marginTop: '0.4rem', background: '#191919', color: '#fff'}} />
                  {errors.address && <div style={{color: '#e74c3c', fontSize: '0.95rem', marginTop: '0.2rem'}}>{errors.address}</div>}
                </div>
                <button type="button" onClick={handleSaveSettings} disabled={saving} style={{background: GOLD, color: '#111', border: 'none', borderRadius: '8px', padding: '0.7rem 1.2rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', marginTop: '0.7rem', opacity: saving ? 0.7 : 1}}>Save Settings</button>
              </form>
            )}
            {/* Toast notification (bottom) */}
            {toast.show && (
              <div style={{
                position: 'fixed',
                left: '50%',
                bottom: '32px',
                transform: 'translateX(-50%)',
                background: toast.type === 'success' ? GOLD : '#e74c3c',
                color: toast.type === 'success' ? '#111' : '#fff',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                zIndex: 9999
              }}>{toast.message}</div>
            )}
          </ContentCard>
        )}
      </MainContent>
    </DashboardContainer>
  );
}

export default AdminDashboard;
